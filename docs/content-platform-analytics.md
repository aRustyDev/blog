# Content Platform Analytics for Technical Blog Authors

A comprehensive guide to metrics, analytics tools, and tracking approaches across content distribution platforms.

---

## Blog (Self-Hosted/Cloudflare)

### Cloudflare Web Analytics

**Overview**: Free, privacy-first analytics built into Cloudflare. No cookies required, GDPR-compliant out of the box.

| Metric | Description |
|--------|-------------|
| Visits | Sessions starting from external referrer or direct link |
| Page Views | Successful HTML responses |
| Unique Visitors | Deduplicated by user per day |
| Page Load Time | Total time to load page |
| Core Web Vitals | LCP, FID, CLS metrics |
| Bounce Rate | Sessions with single page view |
| Visit Duration | Time spent per session |

**Dimensions Available**:
- Country, Device Type, Browser, Operating System
- Referrer (host and path via GraphQL API)
- Path (internal navigation)
- Bot exclusion option

**Access**: Cloudflare Dashboard > Web Analytics
- Automatic setup for Pages projects (one-click enable)
- JavaScript beacon for non-Cloudflare sites
- Weekly email summaries available

**Data Export**: GraphQL API for programmatic access

**Recommended Approach**: Enable by default for all Cloudflare-hosted sites. Sufficient for basic traffic analysis without privacy concerns.

---

### Plausible Analytics

**Overview**: Open-source, privacy-focused alternative to Google Analytics. Lightweight (~1KB script).

| Metric | Description |
|--------|-------------|
| Unique Visitors | Real visitors (deduplicated) |
| Total Visits | Sessions |
| Page Views | Total pages viewed |
| Views per Visit | Engagement depth |
| Bounce Rate | Single-page sessions |
| Visit Duration | Time on site |

**Reports Available**:
- **Top Sources**: Traffic acquisition with UTM support (Medium, Source, Campaign, Term, Content)
- **Top Pages**: Entry pages, exit pages, time on page, scroll depth
- **Locations**: Country, region, city breakdown
- **Devices**: Browser, OS, device type with version details
- **Goals & Conversions**: Custom event tracking, funnels, revenue attribution

**Unique Features**:
- Realtime dashboard (last 5 minutes)
- Time period comparison (previous period, year-over-year)
- Advanced filtering and segmentation
- Custom properties for pageviews/events

**Access**: Self-hosted or cloud (plausible.io)
- Dashboard: `plausible.io/your-site.com`
- Full API for data export

**Data Export**: REST API, CSV export

**Recommended Approach**: Best choice for privacy-conscious technical blogs. Self-host for full control or use cloud for convenience. Integrates well with static site generators.

---

### Umami Analytics

**Overview**: Open-source, self-hosted analytics. Privacy-focused, GDPR compliant without consent banners.

| Metric | Description |
|--------|-------------|
| Pageviews | Page loads |
| Visitors | Unique users |
| Bounce Rate | Single-page sessions |
| Session Duration | Time per visit |
| Referrers | Traffic sources |
| Countries | Geographic distribution |
| Browsers/OS/Devices | Technical breakdown |

**Advanced Features**:
- **Custom Events**: Track clicks, form submissions, interactions
- **Funnels**: User journey analysis
- **Retention**: Cohort analysis
- **UTM Campaign Tracking**: Marketing attribution
- **Sessions**: Individual visitor activity (anonymized)
- **Teams**: Multi-user collaboration

**Access**: Self-hosted (Docker) or Umami Cloud
- Full REST API for all data
- Team management and role-based access

**Data Export**: REST API (comprehensive)

**Recommended Approach**: Excellent for developers who want full data ownership. Deploy via Docker in minutes. Use API for custom dashboards.

---

### Google Analytics 4

**Overview**: Industry standard with comprehensive features. Requires cookie consent in many jurisdictions.

| Metric Category | Key Metrics |
|-----------------|-------------|
| Acquisition | Users, Sessions, Traffic Sources |
| Engagement | Engaged Sessions, Engagement Rate, Events |
| Monetization | Revenue, Transactions (if applicable) |
| Retention | Returning Users, Cohort Analysis |
| Demographics | Age, Gender, Interests |
| Technology | Browser, Device, Screen Resolution |

**Key Reports**:
- **Overview**: High-level performance summary
- **Content**: Page and screen performance
- **Reach**: How users find your content
- **Engagement**: User interaction depth
- **Audience**: User demographics and behavior
- **Revenue**: Monetization (Partner Program)
- **Trends**: Content discovery opportunities

**Access**: analytics.google.com
- Integration with Google Ads, Search Console
- BigQuery export (360 plan)
- Looker Studio integration

**Data Export**: API, BigQuery, Looker Studio

**Recommended Approach**: Use if you need advertising attribution or detailed demographics. Be aware of privacy implications and consent requirements.

---

## Developer Platforms

### Medium

**Overview**: Built-in stats for all stories with Partner Program earnings tracking.

| Metric | Description |
|--------|-------------|
| Presentations | Times Medium suggested your story (feeds, search, notifications) |
| Views | Story accesses (>5 seconds, deduplicated per user/day) |
| Reads | 30+ seconds engagement (deduplicated per user/day) |
| Followers | Account followers gained |
| Subscribers | Email notification opt-ins |
| Claps | Reader appreciation (up to 50 per reader) |

**Dashboard Sections**:
- **Monthly**: Aggregate stats with daily graph
- **Lifetime**: All-time metrics per story
- **Audience**: Follower and subscriber insights
- **Partner Program**: Earnings breakdown (if enrolled)

**Access**: Medium.com > Profile > Stats
- Web and mobile app
- Hourly updates for recent stories, daily for older

**Data Export**: No official API or export. Third-party tools limited.

**Recommended Approach**: Monitor Views-to-Reads ratio to assess content quality. Track follower growth for audience building. No aggregation possible without manual tracking.

---

### Dev.to (Forem)

**Overview**: Built on Forem platform with dashboard analytics.

| Metric | Description |
|--------|-------------|
| Post Views | Total article views |
| Reactions | Hearts, unicorns, etc. |
| Comments | Engagement count |
| Saves/Bookmarks | Reader interest indicator |
| Followers | Profile followers |

**Dashboard Features**:
- Per-article performance
- Historical view trends
- Reaction breakdown
- Comment activity

**Access**: dev.to/dashboard/analytics (requires login)

**API**: Forem API v1 available
- Endpoints for articles, comments, followers
- Requires API key from settings
- Headers: `accept: application/vnd.forem.api-v1+json`

**Data Export**: API access for programmatic retrieval

**Recommended Approach**: Use API to aggregate data into personal dashboard. Track reaction types to understand content resonance.

---

### Hashnode

**Overview**: Developer blogging platform with built-in analytics.

| Metric | Description |
|--------|-------------|
| Page Views | Total and per-article views |
| Comments | Reader engagement |
| Reactions | Likes and feedback |
| Referrers | Traffic sources |
| Browsers | Visitor technology |
| Countries | Geographic reach |
| Devices | Desktop/mobile breakdown |

**Dashboard Sections**:
- **Basic Analytics**: Views, comments, reactions per article
- **Advanced Analytics (Beta)**: Detailed referrers, geography, devices

**Access**: Blog Dashboard > Analytics tab

**Data Export**: GraphQL API available for programmatic access

**Recommended Approach**: Good for developers who want a simple, integrated experience. Advanced analytics beta provides more granular data.

---

### Substack

**Overview**: Newsletter platform with subscriber-focused metrics.

| Metric | Description |
|--------|-------------|
| Subscribers | Total email list size |
| Free Subscribers | Non-paying readers |
| Paid Subscribers | Revenue-generating readers |
| Open Rate | Email open percentage |
| Click Rate | Link click-through percentage |
| Views | Web post views |
| Growth Rate | Subscriber trend |

**Dashboard Features**:
- Subscriber growth over time
- Post performance (opens, clicks, views)
- Paid conversion tracking
- Churn analysis

**Access**: Substack Dashboard > Stats

**Data Export**: CSV export for subscriber list. Limited analytics export.

**Recommended Approach**: Focus on open rates and conversion to paid. Monitor churn for retention insights. Cross-reference with web analytics for complete picture.

---

## Social Platforms

### Twitter/X

**Overview**: Native analytics for tweets and audience.

| Metric | Description |
|--------|-------------|
| Impressions | Times tweet appeared in timelines |
| Engagements | Total interactions (clicks, likes, retweets, replies) |
| Engagement Rate | Engagements / Impressions |
| Profile Visits | Clicks to your profile |
| Link Clicks | URL click-throughs |
| Detail Expands | Tweet clicks for more |
| Follows | New followers from tweet |
| Retweets/Reposts | Amplification count |
| Likes | Appreciation metric |
| Replies | Conversation starters |

**Dashboard Features**:
- Tweet-level analytics
- 28-day summary
- Top tweets ranking
- Audience demographics (Premium)

**Access**: analytics.twitter.com or x.com > Analytics
- Available for all accounts
- Premium features for verified users

**API**: X API v2 provides metrics access
- Requires developer account
- Rate limits apply

**Data Export**: CSV download from dashboard, API access

**Recommended Approach**: Track link clicks for blog traffic attribution. Monitor engagement rate to optimize posting times and content format.

---

### Mastodon

**Overview**: Decentralized platform with limited built-in analytics (by design).

| Metric | Description |
|--------|-------------|
| Boosts | Reposts to followers' timelines |
| Favorites | Likes/stars on posts |
| Replies | Direct responses |
| Bookmarks | Saved posts (private, not visible to author) |
| Followers | Account followers |

**What's NOT Tracked** (intentionally):
- Impressions/reach
- Profile views
- Link clicks
- Read time

**Server-Level Metrics** (if you run your own):
- Monthly Active Users
- Total users
- Federation statistics

**Access**: Per-post interaction counts visible on each toot
- No centralized analytics dashboard
- Third-party tools available (Mastodon Analytics, Fedifollows)

**Data Export**: API available for your own posts/interactions

**Recommended Approach**: Focus on engagement quality over quantity. Track boosts as primary amplification metric. Use external tools with UTM parameters for traffic attribution.

---

### Threads

**Overview**: Meta's Twitter alternative with growing analytics.

| Metric | Description |
|--------|-------------|
| Views | Post impressions |
| Likes | Appreciation count |
| Replies | Comment engagement |
| Reposts | Amplification |
| Quotes | Quoted reposts |
| Followers | Profile followers |

**Access**: In-app insights (requires professional/creator account)
- Part of Meta's Instagram ecosystem
- Linked to Instagram Professional Dashboard

**Data Export**: Limited. Part of Meta Business Suite for professional accounts.

**Recommended Approach**: Treat as supplementary to Instagram strategy. Cross-post to maintain presence while platform matures.

---

### Instagram

**Overview**: Visual platform with comprehensive Insights for business/creator accounts.

| Metric | Description |
|--------|-------------|
| Views | Content impressions |
| Interactions | Likes, comments, shares, saves |
| New Followers | Follower growth |
| Reach | Unique accounts reached |
| Engagement Rate | Interactions / Reach |
| Profile Visits | Account page views |
| Website Clicks | Link in bio clicks |
| Saves | Bookmarked content |
| Shares | Sent to others |

**Insights Sections**:
- Account Overview (30-90 day summaries)
- Content Performance (Reels, Posts, Stories)
- Audience Demographics (age, gender, location)
- Active Times (best posting times)

**Access**: Instagram App > Professional Dashboard
- Requires Business or Creator account
- 7/14/30/90 day date ranges

**Data Export**: Meta Business Suite, limited export options

**Recommended Approach**: Useful for visual content (diagrams, code snippets as images). Track Website Clicks for traffic attribution. Stories for ephemeral announcements.

---

### TikTok

**Overview**: Short-video platform with creator analytics.

| Metric | Description |
|--------|-------------|
| Video Views | Total plays |
| Profile Views | Account page visits |
| Likes | Appreciation count |
| Comments | Engagement responses |
| Shares | Distribution count |
| Followers | Account followers |
| Watch Time | Total and average |
| Traffic Sources | How viewers found you |
| Audience Demographics | Age, gender, geography |

**Dashboard Sections**:
- **Overview**: High-level metrics
- **Content**: Per-video performance
- **Followers**: Audience analysis
- **LIVE**: Streaming metrics (if applicable)

**Access**: TikTok Creator Tools > Analytics
- Requires switching to Business or Creator account
- 7/28/60 day periods

**Data Export**: Limited. API available for registered developers.

**Recommended Approach**: Emerging platform for technical content. Monitor Watch Time and completion rates. Good for explaining concepts visually.

---

### YouTube

**Overview**: Comprehensive YouTube Studio analytics.

| Metric Category | Key Metrics |
|-----------------|-------------|
| **Overview** | Views, Watch Time, Subscribers, Revenue |
| **Reach** | Impressions, CTR, Traffic Sources, External Sites |
| **Engagement** | Watch Time, Average View Duration, End Screens |
| **Audience** | Unique Viewers, Returning Viewers, Demographics |
| **Revenue** | Estimated Revenue, RPM, CPM (Partner Program) |

**Key Metrics for Technical Content**:
- **Impressions Click-Through Rate (CTR)**: Thumbnail/title effectiveness
- **Average View Duration**: Content quality indicator
- **Audience Retention**: Drop-off points in videos
- **Traffic Sources**: How viewers find you (search, suggested, external)
- **Top Search Terms**: What your audience seeks

**Dashboard Tabs**:
- **Overview**: Summary with typical performance comparison
- **Content**: Per-video/Shorts performance
- **Reach**: Discovery and traffic
- **Engagement**: Viewing behavior
- **Audience**: Who's watching
- **Revenue**: Monetization (if eligible)
- **Trends**: Topic discovery

**Access**: studio.youtube.com > Analytics
- Web and mobile YouTube Studio app
- Real-time data available

**API**: YouTube Analytics API (requires OAuth)
- Detailed reports programmatically
- Bulk data export possible

**Data Export**: CSV from Studio, API for automation

**Recommended Approach**: CTR + Average View Duration are key quality signals. Track search terms to inform content strategy. Use end screens to drive to blog.

---

## Community Platforms

### Hacker News

**Overview**: No native analytics. Community-driven discovery.

| What You Can Track | How |
|-------------------|-----|
| Points (Upvotes) | Check submission page |
| Comments | Count on submission |
| Position on Front Page | Manual monitoring or tools |
| Time on Front Page | Third-party tracking |

**Third-Party Tools**:
- HN Analytics (hnrankings.info)
- Algolia HN Search API
- Custom scripts via HN API

**HN API Available**:
- `https://hacker-news.firebaseio.com/v0/`
- Item details, user info, top stories
- No rate limiting documented

**Tracking Approach**:
1. Use UTM parameters on submitted URLs
2. Monitor referrer traffic in your analytics
3. Track via HN API for submission performance
4. Set up alerts for mentions

**Recommended Approach**: Focus on referral traffic to your site (will show as `news.ycombinator.com`). Use HN API to build custom tracking. Monitor comments for feedback.

---

### Reddit

**Overview**: Subreddit-specific posting with post analytics.

| Metric | Description |
|--------|-------------|
| Upvotes/Downvotes | Net score |
| Upvote Ratio | Approval percentage |
| Comments | Discussion engagement |
| Shares | Cross-posting count |
| Awards | Premium recognition |
| View Count | Impressions (limited rollout) |

**Access**: Post details page
- View count available for some posts
- Upvote ratio visible on desktop

**API**: Reddit API available
- Rate limited
- Requires OAuth for full access
- PRAW (Python library) for easy access

**Data Export**: API access, no native export

**Tracking Approach**:
1. UTM parameters on links
2. Monitor referrer traffic (`reddit.com`, specific subreddit)
3. Reddit API for post metrics
4. Track karma changes over time

**Recommended Approach**: Monitor specific subreddits relevant to your content (r/programming, r/webdev, r/devops, etc.). Engagement (comments, upvote ratio) matters more than raw score.

---

### Discord

**Overview**: Community server analytics (Server Insights, requires 500+ members).

| Metric | Description |
|--------|-------------|
| Server Growth | Join/leave rates |
| Activation | Members who engage |
| Retention | Members who return |
| Message Activity | Channel engagement |
| Communication | Message volume |
| Audience | Demographics (age, region) |

**Bot-Based Analytics**:
- Statbot (detailed analytics)
- MEE6 (engagement tracking)
- ServerStats (member statistics)
- Custom bots via Discord.js

**Access**: Server Settings > Server Insights (500+ members)
- Bots for smaller servers

**Data Export**: Bot-dependent. Discord API available.

**Recommended Approach**: Use bots for analytics on smaller servers. Track which channels drive traffic to blog via UTM-tagged links.

---

## Aggregation Strategy

### Recommended Tracking Approach

1. **Primary Analytics**: Cloudflare Web Analytics or Plausible (privacy-first)
2. **UTM Parameters**: Consistent tagging across all platforms
   ```
   utm_source=<platform>
   utm_medium=<type>
   utm_campaign=<specific-campaign>
   ```
3. **Centralized Dashboard**: Build custom aggregation
   - Pull from APIs where available
   - Manual tracking for platforms without APIs
   - Spreadsheet or database for historical data

### Data Aggregation Options

| Tool | Platforms Supported | Cost |
|------|---------------------|------|
| **Custom Script** | All with APIs | Free (time) |
| **n8n/Zapier** | Most major platforms | Free-Paid |
| **Databox** | 70+ integrations | Freemium |
| **Geckoboard** | Various APIs | Paid |
| **Notion + API** | Custom integration | Free-Paid |

### Minimum Viable Tracking

For a technical blog author, focus on:

1. **Traffic**: Where do readers come from?
2. **Engagement**: What content resonates?
3. **Growth**: Is your audience expanding?
4. **Conversion**: Are readers taking desired actions?

### Metrics That Matter

| Metric Type | What It Tells You |
|-------------|-------------------|
| **Referrer Sources** | Distribution strategy effectiveness |
| **Time on Page / Scroll Depth** | Content quality |
| **Returning Visitors** | Audience loyalty |
| **Social Engagement** | Content amplification potential |
| **Click-Through** | Call-to-action effectiveness |

---

## Summary Table

| Platform | Native Analytics | API Available | Export Options | Privacy-Friendly |
|----------|------------------|---------------|----------------|------------------|
| Cloudflare Web Analytics | Yes | GraphQL | Yes | Yes |
| Plausible | Yes | REST | CSV, API | Yes |
| Umami | Yes | REST | API | Yes |
| Google Analytics | Yes | API | BigQuery, CSV | No (cookies) |
| Medium | Yes | No | No | N/A |
| Dev.to | Yes | REST (Forem) | API | N/A |
| Hashnode | Yes | GraphQL | Limited | N/A |
| Substack | Yes | No | CSV (subscribers) | N/A |
| Twitter/X | Yes | API v2 | CSV, API | N/A |
| Mastodon | Limited | REST | API | Yes |
| Instagram | Yes | Meta API | Limited | No |
| TikTok | Yes | Limited | Limited | No |
| YouTube | Yes | API | CSV, API | No |
| Hacker News | No | Firebase API | API | Yes |
| Reddit | Limited | REST | API | N/A |
| Discord | 500+ members | Bot API | Bot-dependent | N/A |

---

## References

- [Cloudflare Web Analytics Documentation](https://developers.cloudflare.com/web-analytics/)
- [Plausible Documentation](https://plausible.io/docs)
- [Umami Documentation](https://umami.is/docs)
- [Google Analytics Help](https://support.google.com/analytics/)
- [Medium Help Center - Stats](https://help.medium.com/hc/en-us/articles/215108608-Stats)
- [Forem API Documentation](https://developers.forem.com/api/)
- [Hashnode Documentation](https://docs.hashnode.com/)
- [YouTube Analytics Help](https://support.google.com/youtube/answer/9002587)
- [Instagram Insights Help](https://help.instagram.com/1533933820244654)
- [Hacker News API](https://github.com/HackerNews/API)
