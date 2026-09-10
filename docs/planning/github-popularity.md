# Show GitHub popularity and sort games by stars

P0 user direction: provide a quick popularity signal and ranking using GitHub stars.

- [x] Collect real stargazers_count from GitHub repository metadata with canonical repository, fetched-at date and evidence URL; deduplicate subprojects by upstream repository.
- [x] Display stars on game cards and source detail, clearly repository-scoped when multiple catalog entries share it.
- [x] Offer Most GitHub stars descending sort; preserve search/model/runtime/platform constraints and existing default browser/model prioritization.
- [x] Unknown, unavailable and non-GitHub counts remain null rather than falsezero; sort them after knowncounts and show clearlabels.
- [x] Deterministic ties and zero-star handling are tested; metadata updates are reproducible and do not fetch pervisitor or require privatecredentials.
- [x] Independent reviewer verifies APIevidence and actual desktop/mobile sort/filter interactions; builder fixes findings until PASS.

Stars reflect repository popularity, not gamequality, code licensing or testedreuse. Data is a dated snapshot, not a livecount.

Independent acceptance: [PASS review](../reviews/github-popularity/REVIEW.md).
