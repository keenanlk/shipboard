<div align="center">

<img src="https://shipboardapp.com/og-image.png" alt="ShipBoard — every pipeline, one glance" width="100%" />

# ShipBoard

**Every pipeline, one glance.**

A free macOS menu-bar app that keeps AWS CodePipeline, GitHub Actions, GitLab CI,
Vercel, and Netlify on one status board — green when it ships, red the moment it doesn't.

[**⬇ Download for macOS**](https://github.com/keenanlk/shipboard/releases/latest) · [shipboardapp.com](https://shipboardapp.com) · [Report an issue](https://github.com/keenanlk/shipboard/issues/new/choose)

</div>

---

## What it does

ShipBoard lives in your menu bar and watches every CI/CD pipeline you care about, across
providers, in a single board. No dashboards to keep open, no tabs to refresh — just a glance
at the menu bar tells you whether everything shipped.

- **One board, five providers** — AWS CodePipeline, GitHub Actions, GitLab CI, Vercel, Netlify
- **Menu-bar native** — built in SwiftUI, feather-light, out of the way
- **At-a-glance status** — green / amber / red per pipeline, with stage-by-stage detail
- **Your credentials stay local** — tokens live in the macOS Keychain; AWS uses your existing `~/.aws` profiles
- **Auto-updating** — ships signed, notarized updates via Sparkle

## Requirements

- macOS 14 (Sonoma) or later
- Apple Silicon or Intel

## Install

1. [Download the latest `.dmg`](https://github.com/keenanlk/shipboard/releases/latest)
2. Drag **ShipBoard** to Applications and launch it
3. Click the menu-bar icon → add a provider token, and your pipelines appear

The app is signed and notarized by Apple, so it opens without Gatekeeper warnings.

## Privacy

ShipBoard collects nothing. Everything runs on your Mac; credentials never leave it.
See the [full privacy policy](https://shipboardapp.com/privacy.html).

## Support

Found a bug or want a provider added? [Open an issue](https://github.com/keenanlk/shipboard/issues/new/choose).

---

<div align="center">
<sub>ShipBoard is free software you can download and use today. This repository hosts releases, the website, and issue tracking.</sub>
</div>
