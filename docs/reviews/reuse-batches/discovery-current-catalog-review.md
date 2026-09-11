# Discovery fixture follow-up

**PASS**, independent reviewer `reuse_handoff`, test-only270de42. The previous test searched for Yuka, which the approved strict public catalog now excludes. The new test searches actual eligible CityMaker and keeps its real server result/ID; an explicitly labeled response fixture removes only the preview to retain missing-image coverage. It does not restore excluded research, change the application gate or assert that real CityMaker media is absent. Route draining avoids cancelling an in-flight controlled request at teardown.

I inspected the diff and independently ran `SCREENSHOT_DIR=/tmp/headstart-review-discovery-current npm run test:discovery`. Both desktop/mobile full flows passed: real API result filtering, pagination/history, list/reload/search, unsupported/empty/error/retry, missing-preview fixture, retained bag, actual prompt fallback and demo email gate. No application or catalog source changed.

Linux AMD64 worker release gate is also resolved: I independently queried GitHub run34559035732 at48f61ac; integration-reference completed successfully. That covers the pinned Linux browser workflow after the XDG startup fix. Its separate checks job failed on the now-corrected obsolete discovery fixture; this record does not relabel that whole run successful. The coordinator must wait for the final complete checks run before merge.
