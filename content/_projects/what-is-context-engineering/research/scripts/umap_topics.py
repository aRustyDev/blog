#!/usr/bin/env python3
"""
UMAP topic coverage visualization for literature surveys.

Outputs two visualizations:
  1. UMAP scatter plot — sources projected to 2D, topic cluster halos, citation edges
  2. Coverage bar chart — per-topic coverage depth with tier classification

Usage:
  # Single snapshot (outputs both UMAP + bar chart):
  python umap_topics.py data/topics.yaml

  # Before/after comparison (bar chart only — UMAP uses last file):
  python umap_topics.py data/before.yaml data/after.yaml

  # Custom output prefix:
  python umap_topics.py data/topics.yaml -o my-survey

Data file format (YAML):
  label: "My Survey (N sources)"
  topics:
    - "Topic A"
    - "Topic B"
  sources:
    - name: "Author et al. Title"
      type: academic        # or practitioner
      weights: [1.0, 0.5]   # one weight per topic
  edges:                     # optional — citation links
    - ["Source A", "Source B"]
"""

import argparse
import sys
from pathlib import Path

import numpy as np
import umap
import matplotlib.pyplot as plt
import matplotlib.patheffects as pe
from matplotlib.gridspec import GridSpec
from matplotlib.lines import Line2D
from matplotlib.patches import Patch

try:
    import yaml
except ImportError:
    yaml = None


# ---------- Data loading ----------

def _parse_yaml_fallback(path: str) -> dict:
    """Minimal YAML parser for our simple flat YAML format."""
    text = Path(path).read_text()
    data = {"sources": [], "topics": [], "edges": []}
    current_source = None
    in_topics = False
    in_sources = False
    in_edges = False

    for line in text.splitlines():
        stripped = line.strip()
        if stripped.startswith("#"):
            continue
        if stripped.startswith("label:"):
            data["label"] = stripped.split(":", 1)[1].strip().strip('"').strip("'")
            in_topics = in_sources = in_edges = False
        elif stripped == "topics:":
            in_topics, in_sources, in_edges = True, False, False
        elif stripped == "sources:":
            in_topics, in_sources, in_edges = False, True, False
        elif stripped == "edges:":
            in_topics, in_sources, in_edges = False, False, True
        elif in_topics and stripped.startswith("- "):
            data["topics"].append(stripped[2:].strip().strip('"').strip("'"))
        elif in_edges and stripped.startswith("- "):
            # Parse ["A", "B"] format
            inner = stripped[2:].strip().strip("[]")
            parts = [p.strip().strip('"').strip("'") for p in inner.split(",")]
            if len(parts) == 2:
                data["edges"].append(parts)
        elif in_sources and stripped.startswith("- name:"):
            if current_source:
                data["sources"].append(current_source)
            current_source = {"name": stripped.split(":", 1)[1].strip().strip('"').strip("'")}
        elif in_sources and current_source:
            if stripped.startswith("type:"):
                current_source["type"] = stripped.split(":", 1)[1].strip()
            elif stripped.startswith("weights:"):
                w_str = stripped.split(":", 1)[1].strip().strip("[]")
                current_source["weights"] = [float(x.strip()) for x in w_str.split(",")]

    if current_source:
        data["sources"].append(current_source)

    return data


def load_data(path: str) -> dict:
    if yaml is not None:
        with open(path) as f:
            data = yaml.safe_load(f)
        if "edges" not in data:
            data["edges"] = []
        return data
    else:
        return _parse_yaml_fallback(path)


def data_to_matrix(data: dict):
    topics = data["topics"]
    sources = data["sources"]
    label = data.get("label", f"{len(sources)} sources")

    matrix = np.array([s["weights"] for s in sources], dtype=float)
    types = [s.get("type", "academic") for s in sources]
    names = [s.get("name", f"Source {i}") for i, s in enumerate(sources)]
    edges = data.get("edges", [])

    return {
        "label": label,
        "topics": topics,
        "matrix": matrix,
        "types": types,
        "names": names,
        "edges": edges,
    }


# ---------- Coverage computation ----------

def compute_coverage(matrix, types):
    total_weight = matrix.sum(axis=0)
    source_count = (matrix > 0).sum(axis=0).astype(float)
    primary_count = (matrix >= 1.0).sum(axis=0).astype(float)

    acad_mask = np.array([t == "academic" for t in types])
    prac_mask = ~acad_mask
    acad_weight = matrix[acad_mask].sum(axis=0) if acad_mask.any() else np.zeros(matrix.shape[1])
    prac_weight = matrix[prac_mask].sum(axis=0) if prac_mask.any() else np.zeros(matrix.shape[1])
    balance = np.minimum(acad_weight, prac_weight) / (np.maximum(acad_weight, prac_weight) + 1e-9)

    norm = lambda x: (x - x.min()) / (x.max() - x.min() + 1e-9)
    score = (
        0.40 * norm(total_weight) +
        0.30 * norm(source_count) +
        0.20 * norm(primary_count) +
        0.10 * balance
    )

    return {
        "total_weight": total_weight,
        "source_count": source_count.astype(int),
        "primary_count": primary_count.astype(int),
        "acad_weight": acad_weight,
        "prac_weight": prac_weight,
        "balance": balance,
        "score": score,
    }


def tier(score):
    if score >= 0.65:
        return "READY", "#2ea043"
    elif score >= 0.35:
        return "REVIEW", "#d29922"
    else:
        return "GAP", "#f85149"


# ---------- UMAP scatter plot ----------

def plot_umap(ax, dataset, cov):
    """Render UMAP scatter with topic halos, source points, and citation edges."""
    ax.set_facecolor("#0d1117")

    matrix = dataset["matrix"]
    types = dataset["types"]
    names = dataset["names"]
    topics = dataset["topics"]
    edges = dataset["edges"]
    scores = cov["score"]

    # UMAP projection
    n_neighbors = min(15, max(2, matrix.shape[0] - 1))
    reducer = umap.UMAP(
        n_neighbors=n_neighbors,
        min_dist=0.25,
        n_components=2,
        metric="cosine",
        random_state=42,
    )
    embedding = reducer.fit_transform(matrix)

    # Topic cluster halos at weighted centroids
    norm_tw = lambda x: (x - x.min()) / (x.max() - x.min() + 1e-9)
    tw_normed = norm_tw(cov["total_weight"])
    for t_idx in range(len(topics)):
        weights = matrix[:, t_idx]
        if weights.sum() == 0:
            continue
        cx = np.average(embedding[:, 0], weights=weights)
        cy = np.average(embedding[:, 1], weights=weights)
        tier_label, tier_color = tier(scores[t_idx])

        radius = 0.6 + 1.5 * tw_normed[t_idx]
        circle = plt.Circle((cx, cy), radius, color=tier_color, alpha=0.06, zorder=0)
        ax.add_patch(circle)
        ring = plt.Circle(
            (cx, cy), radius, fill=False, edgecolor=tier_color,
            linewidth=1.0, alpha=0.30,
            linestyle="--" if tier_label == "GAP" else "-", zorder=1,
        )
        ax.add_patch(ring)

        # Multiline topic label
        tname = topics[t_idx].replace(" & ", "\n& ").replace("Eng.", "Eng.")
        ax.text(
            cx, cy, tname, fontsize=6.5, fontweight="bold",
            color=tier_color, alpha=0.55, ha="center", va="center",
            fontfamily="sans-serif",
            path_effects=[pe.withStroke(linewidth=2.5, foreground="#0d1117")],
            zorder=2,
        )

    # Citation edges
    name_to_idx = {n: i for i, n in enumerate(names)}
    for src_name, dst_name in edges:
        si = name_to_idx.get(src_name)
        di = name_to_idx.get(dst_name)
        if si is not None and di is not None:
            ax.plot(
                [embedding[si, 0], embedding[di, 0]],
                [embedding[si, 1], embedding[di, 1]],
                color="#484f58", linewidth=0.6, alpha=0.35, zorder=3,
            )

    # Source points
    for i in range(len(names)):
        is_acad = types[i] == "academic"
        color = "#4C72B0" if is_acad else "#DD8452"
        marker = "o" if is_acad else "s"
        size = 30 if matrix.shape[0] > 40 else 70
        ax.scatter(
            embedding[i, 0], embedding[i, 1],
            c=color, s=size, marker=marker,
            edgecolors="white", linewidths=0.3,
            zorder=5, alpha=0.85,
        )

    # Source labels — only label if few enough to read
    if matrix.shape[0] <= 30:
        for i in range(len(names)):
            short = names[i].split(" ", 2)[-1] if len(names[i]) > 20 else names[i]
            if len(short) > 25:
                short = short[:22] + "..."
            ax.annotate(
                short, (embedding[i, 0], embedding[i, 1]),
                xytext=(6, 4), textcoords="offset points",
                fontsize=5.5, color="#8b949e", fontfamily="monospace",
                path_effects=[pe.withStroke(linewidth=2, foreground="#0d1117")],
                zorder=6,
            )

    # Legend
    legend_elements = [
        Line2D([0], [0], marker="o", color="#0d1117", markerfacecolor="#4C72B0",
               markersize=7, markeredgecolor="white", markeredgewidth=0.4, label="Academic"),
        Line2D([0], [0], marker="s", color="#0d1117", markerfacecolor="#DD8452",
               markersize=6, markeredgecolor="white", markeredgewidth=0.4, label="Practitioner"),
        Line2D([0], [0], color="#2ea043", linewidth=5, alpha=0.25, label="Ready"),
        Line2D([0], [0], color="#d29922", linewidth=5, alpha=0.25, label="Review"),
        Line2D([0], [0], color="#f85149", linewidth=5, alpha=0.25, linestyle="--", label="Gap"),
    ]
    if edges:
        legend_elements.append(
            Line2D([0], [0], color="#484f58", linewidth=0.8, alpha=0.5, label="Citation")
        )
    leg = ax.legend(
        handles=legend_elements, loc="lower right", fontsize=6.5,
        facecolor="#161b22", edgecolor="#30363d", labelcolor="#c9d1d9", framealpha=0.9,
    )
    leg.get_frame().set_linewidth(0.4)

    ax.set_title(
        f"UMAP Topic Landscape — {dataset['label']}",
        fontsize=11, fontweight="bold", color="#e6edf3", pad=10,
    )
    ax.set_xlabel("UMAP 1", fontsize=8, color="#484f58")
    ax.set_ylabel("UMAP 2", fontsize=8, color="#484f58")
    ax.tick_params(colors="#30363d", labelsize=6)
    for spine in ax.spines.values():
        spine.set_color("#21262d")
        spine.set_linewidth(0.4)


# ---------- Bar chart ----------

def plot_bars(ax, topics, cov, title):
    ax.set_facecolor("#0d1117")
    scores = cov["score"]
    weights = cov["total_weight"]
    sort_idx = np.argsort(scores)
    y_pos = np.arange(len(topics))

    for j, idx in enumerate(sort_idx):
        t_label, t_color = tier(scores[idx])
        ax.barh(j, weights[idx], height=0.55, color=t_color, alpha=0.7, zorder=3)

    ax.set_yticks(y_pos)
    ax.set_yticklabels([topics[i] for i in sort_idx], fontsize=8.5, color="#c9d1d9")

    max_x = weights[sort_idx].max()
    for j, idx in enumerate(sort_idx):
        t_label, t_color = tier(scores[idx])
        ax.text(weights[idx] + 0.3, j,
                f"{cov['source_count'][idx]}s {cov['primary_count'][idx]}p",
                fontsize=6.5, color="#8b949e", va="center", fontfamily="monospace")
        ax.text(max_x + 2.5, j, t_label, fontsize=7, fontweight="bold", color=t_color,
                va="center", ha="center", fontfamily="monospace",
                bbox=dict(boxstyle="round,pad=0.2", facecolor=t_color, edgecolor="none", alpha=0.12))

    ax.set_xlabel("Cumulative Topic Weight", fontsize=8, color="#8b949e")
    ax.set_title(title, fontsize=11, fontweight="bold", color="#e6edf3", pad=10)
    ax.tick_params(axis="x", colors="#484f58", labelsize=6)
    ax.tick_params(axis="y", length=0)
    ax.xaxis.grid(True, color="#21262d", linewidth=0.4, alpha=0.5)
    ax.set_axisbelow(True)
    for spine in ax.spines.values():
        spine.set_color("#21262d")
        spine.set_linewidth(0.4)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)


def print_table(topics, cov, label, cov_prev=None):
    scores = cov["score"]
    print(f"\n--- {label} ---")
    header = f"{'Topic':<22} {'Weight':>6} {'Srcs':>4} {'Prim':>4} {'Score':>6} {'Tier':<8}"
    if cov_prev is not None:
        header += f" {'Delta':>6}"
    print(header)
    print("-" * len(header))
    for idx in np.argsort(-scores):
        t, _ = tier(scores[idx])
        line = (f"{topics[idx]:<22} {cov['total_weight'][idx]:>6.1f} "
                f"{cov['source_count'][idx]:>4} {cov['primary_count'][idx]:>4} "
                f"{scores[idx]:>6.3f} {t:<8}")
        if cov_prev is not None:
            delta = scores[idx] - cov_prev["score"][idx]
            line += f" {delta:>+6.3f}"
        print(line)


# ---------- Rendering ----------

def render(datasets, output_base):
    """Render UMAP scatter + coverage bar chart(s)."""
    last = datasets[-1]
    cov_last = compute_coverage(last["matrix"], last["types"])

    # --- Panel 1: UMAP scatter (always uses last/most-complete dataset) ---
    fig_umap = plt.figure(figsize=(14, 10))
    fig_umap.patch.set_facecolor("#0d1117")
    ax_umap = fig_umap.add_subplot(111)
    plot_umap(ax_umap, last, cov_last)
    plt.tight_layout()
    umap_path = f"{output_base}-umap.png"
    fig_umap.savefig(umap_path, dpi=200, facecolor="#0d1117", bbox_inches="tight")
    print(f"UMAP saved to {umap_path}")
    plt.close(fig_umap)

    # --- Panel 2: Coverage bar chart(s) ---
    n = len(datasets)
    fig_width = 10 if n == 1 else 18
    fig_bar = plt.figure(figsize=(fig_width, 10))
    fig_bar.patch.set_facecolor("#0d1117")

    if n == 1:
        ax = fig_bar.add_subplot(111)
        plot_bars(ax, last["topics"], cov_last, last["label"])
        print_table(last["topics"], cov_last, last["label"])
    else:
        gs = GridSpec(1, 2, figure=fig_bar, wspace=0.12)
        covs = []
        for i, d in enumerate(datasets):
            ax = fig_bar.add_subplot(gs[0, i])
            cov = compute_coverage(d["matrix"], d["types"])
            covs.append(cov)
            prefix = "BEFORE" if i == 0 else "AFTER"
            plot_bars(ax, d["topics"], cov, f"{prefix}: {d['label']}")

        print_table(datasets[0]["topics"], covs[0], datasets[0]["label"])
        print_table(datasets[1]["topics"], covs[1], datasets[1]["label"], covs[0])

        fig_bar.suptitle("Topic Coverage: Before vs After",
                         fontsize=13, fontweight="bold", color="#e6edf3", y=0.97)

    # Tier legend
    legend_elements = [
        Patch(facecolor="#2ea043", alpha=0.7, label="READY"),
        Patch(facecolor="#d29922", alpha=0.7, label="REVIEW"),
        Patch(facecolor="#f85149", alpha=0.7, label="GAP"),
    ]
    fig_bar.legend(handles=legend_elements, loc="lower center", ncol=3,
                   fontsize=8, facecolor="#161b22", edgecolor="#30363d",
                   labelcolor="#c9d1d9", framealpha=0.9, bbox_to_anchor=(0.5, 0.02))

    plt.tight_layout(rect=[0, 0.06, 1, 0.94])
    bar_path = f"{output_base}-coverage.png"
    fig_bar.savefig(bar_path, dpi=200, facecolor="#0d1117", bbox_inches="tight")
    print(f"Coverage saved to {bar_path}")
    plt.close(fig_bar)


# ---------- CLI ----------

def main():
    parser = argparse.ArgumentParser(
        description="Render UMAP topic scatter + coverage bar charts from YAML data files.",
        epilog="Examples:\n"
               "  python umap_topics.py data/topics.yaml\n"
               "  python umap_topics.py data/before.yaml data/after.yaml\n"
               "  python umap_topics.py data/topics.yaml -o my-survey\n\n"
               "Outputs: <prefix>-umap.png and <prefix>-coverage.png",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("data_files", nargs="+", metavar="FILE",
                        help="1 or 2 YAML data files (single or before/after)")
    parser.add_argument("-o", "--output", default=None,
                        help="Output prefix (default: <data_dir>/../topic-landscape)")

    args = parser.parse_args()
    if len(args.data_files) > 2:
        parser.error("At most 2 data files (before/after)")

    datasets = []
    for path in args.data_files:
        if not Path(path).exists():
            print(f"Error: {path} not found", file=sys.stderr)
            sys.exit(1)
        datasets.append(data_to_matrix(load_data(path)))

    if len(datasets) == 2 and datasets[0]["topics"] != datasets[1]["topics"]:
        print("Error: topic lists must match between data files", file=sys.stderr)
        sys.exit(1)

    output_base = args.output or str(
        Path(args.data_files[0]).parent.parent / "topic-landscape"
    )

    render(datasets, output_base)


if __name__ == "__main__":
    main()
