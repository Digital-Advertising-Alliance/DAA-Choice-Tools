# Protect My Choices 2.0 - Technical Overview

## Introduction

Protect My Choices (PMC) 2.0 is a browser extension that enables consumers to persist their advertising preferences across browsing sessions. This extension works in conjunction with the Digital Advertising Alliance (DAA) tools to provide a robust solution for maintaining user choice beyond cookies.

## Background

The original Protect My Choices extension allowed users to maintain their opt-out preferences set through the DAA's WebChoices tool. However, with the threat of third-party cookie deprecation across major browsers, a fundamental redesign was necessary to ensure continued functionality.

## Architecture Overview

### Core Approach

PMC 2.0 goes beyond the third-party cookie model with a signal-based approach that leverages browser local storage for preference persistence. This provides:

- **Superior persistence** compared to third-party cookies
- **Reduced CPU load** by eliminating the need to reload third-party resources on browser restart
- **Cross-browser compatibility** with Chrome, Safari, and Firefox

### Key Components

**Background Script**
- Manages preference initialization on extension install/update
- Handles storage operations
- Coordinates with DAA infrastructure

**Content Script**
- Facilitates communication between the extension and web pages
- Manages message passing for preference retrieval and updates
- Injects the AdChoices string into HTTP request headers

**Local Storage**
- Stores AdChoices user preference strings
- Stores detected user region (state and country)
- Provides persistent storage across browser sessions

## Features

### Preference Management

- **Automatic initialization**: Opens WebChoices URL to facilitate preference setting
- **Multiple initialization sources**: Retrieves existing preferences from cookies or DAA API endpoints
- **Update synchronization**: Real-time preference updates when users modify choices through DAA tools

## Browser Support

PMC 2.0 supports the following browsers:

- **Google Chrome**
- **Mozilla Firefox** (coming soon!)
- **Safari**

### Legacy Functionality

The extension includes legacy cookie-hardening functionality for Chrome, which regenerates any existing third-party opt-out cookies if deleted. This feature is not available on Safari and Firefox.

## Privacy & Security

- Local storage prevents server-side tracking
- No personal data transmission without user consent
- Compliance with browser extension security policies

## Resources

- [Chrome Web Store](https://chromewebstore.google.com/detail/protect-my-choices/hdgloanjhdcenjgiafkpbehddcnonlic)
- [Apple Store](http://apps.apple.com/us/app/protect-my-choices/id6475873704)
