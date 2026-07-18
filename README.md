# CASPER Atlas

CASPER Atlas is a local, deterministic planning tool for turning project briefs into sprint plans, agent assignments, milestone gates, and exportable handoff bundles.

The recovered standalone build is intentionally credential-free:

- project text stays in the browser;
- no API keys are collected or persisted;
- the page has no third-party JavaScript or font dependency;
- Content Security Policy forbids outbound connections;
- the app continues to generate, inspect, reset, and export plans without a backend.

## Run locally

```sh
npm ci
npm run serve
```

Open <http://127.0.0.1:4278>.

## Validate

```sh
npm test
npm run test:e2e
npm audit --audit-level=high
```

The contract suite checks the self-contained publication boundary and JavaScript syntax. The browser suite exercises project intake, deterministic plan generation, agent rendering, clipboard export, theme switching, reset behavior, and the no-credential/no-network boundary.
