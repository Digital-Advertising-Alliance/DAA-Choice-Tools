# Protect My Choices (PMC) v2.0 Technical Specifications
This document outlines how participants can read the AdChoices Signal from the Protect My Choices browser extension. The extension stores preferences expressed through the WebChoices tool as an AdChoices Signal string.

## Getting Started

1.	<b>Read the overview first.</b> Start with the PMC2 Overview to understand what PMC does, what the AdChoices Signal represents, and which integration approach fits your use case.
2.	<b>Choose your integration approach</b>:
    1. JavaScript "Reader" (in-page)
    2. Header String (server-side / edge)


## About the Protect My Choices Browser Extension

Protect My Choices ("PMC") is a consumer-facing browser extension that stores a user's WebChoices selections locally and makes those selections available to participating companies as an AdChoices Signal.

In practical terms:

- <b>Where preferences come from:</b> The user expresses choices through the WebChoices tool (for example, opting out of interest-based advertising or selecting preference options supported by the tool).
- <b>Where preferences are stored:</b> PMC stores those choices on the user's device as an AdChoices Signal string.
- <b>How companies can access preferences:</b> PMC can expose the AdChoices Signal in two ways:
  1.	In-page messaging (JavaScript "Reader") for real-time access by site scripts.
  2.	Request headers for server-side and edge use cases.

PMC is designed to support preference persistence in modern browser environments, including scenarios where cookie behavior differs by browser or user settings. The extension is controlled by the user and can be removed by uninstalling it, which also removes the locally stored preference state.


## Key Concepts

**Accessing User Preferences (JavaScript "Reader"):** Web participants can access user preferences in real-time by listening for the "ExtensionLoaded" event and then sending a "GetAdPreferences" message via window.postMessage(). The extension will respond with an "AdPreferences" event containing the preference data.

**Accessing User Preferences (Header String):** The extension inserts the AdChoices Signal into an HTTP header for every request. This header is "X-Adchoices" for Chrome and "Cookie2" for Safari. The header value can then be decoded to interpret the AdChoices Signal.

**Important Note on Decoding:** When decoding the base64url string back to binary, extra zeros (padding) may appear at the end due to the conversion process. These should be ignored when parsing the binary strings.


