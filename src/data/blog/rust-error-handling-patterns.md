---
title: "Rust Error Handling: Beyond Result and Option"
description: "Practical patterns for error handling in Rust applications, from simple CLI tools to complex services."
pubDatetime: 2024-02-08T00:00:00Z
featured: false
draft: false
tags:
  - rust
  - programming
  - patterns
  - errors
---

Coming from Go, Rust's error handling felt alien at first. `Result<T, E>` everywhere, the `?` operator, and a dozen crates all claiming to be "the" solution. After shipping a few production services in Rust, here's what actually works.

## The Problem with Vanilla Errors

The standard library gives us `Result<T, E>` and `std::error::Error`. For a simple CLI tool, this is plenty:

```rust
fn read_config(path: &str) -> Result<Config, std::io::Error> {
    let contents = std::fs::read_to_string(path)?;
    // parse config...
}
```

But real applications have multiple error types. Database errors, network errors, validation errors - they all need to coexist. Boxing everything as `Box<dyn Error>` loses type information and makes pattern matching painful.

## Enter thiserror

For library code, `thiserror` is the right choice. It generates the boilerplate for custom error types:

```rust
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ConfigError {
    #[error("failed to read config file: {0}")]
    Io(#[from] std::io::Error),

    #[error("invalid config format: {0}")]
    Parse(#[from] toml::de::Error),

    #[error("missing required field: {0}")]
    MissingField(String),
}
```

The `#[from]` attribute auto-implements `From`, so `?` just works across error types.

## anyhow for Applications

For application code where you don't need to match on specific errors, `anyhow` simplifies everything:

```rust
use anyhow::{Context, Result};

fn load_service_config() -> Result<ServiceConfig> {
    let path = std::env::var("CONFIG_PATH")
        .context("CONFIG_PATH not set")?;

    let contents = std::fs::read_to_string(&path)
        .with_context(|| format!("failed to read {}", path))?;

    toml::from_str(&contents)
        .context("invalid TOML")
}
```

The `context()` method adds layers of information without losing the original error. When something fails in production, you get a full trace of what went wrong.

## The Pattern I Actually Use

For services with both library and application code:

1. **Library modules**: Custom error types with `thiserror`
2. **Application entry points**: `anyhow::Result` with context
3. **Boundaries**: Convert library errors at the edges

```rust
// In lib.rs
pub mod db {
    use thiserror::Error;

    #[derive(Error, Debug)]
    pub enum DbError {
        #[error("connection failed: {0}")]
        Connection(String),
        #[error("query failed: {0}")]
        Query(String),
    }
}

// In main.rs
use anyhow::{Context, Result};

async fn run() -> Result<()> {
    let pool = db::connect(&config.database_url)
        .await
        .context("database connection failed")?;

    // ...
}
```

## Don't Overdo It

A few things I've learned the hard way:

- **Not every error needs a custom type.** If you're just propagating errors upward, `anyhow` is fine.
- **Avoid error enums with 20+ variants.** If your error type is that complex, your module probably does too much.
- **Log at boundaries, not everywhere.** One structured log when handling an error is worth ten scattered throughout the call stack.

Error handling is infrastructure. Get it right once, then focus on the actual problem you're solving.
