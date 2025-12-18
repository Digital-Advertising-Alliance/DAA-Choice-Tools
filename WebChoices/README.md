# WebChoices Implementation Instructions
The [WebChoices Implementation document](WebChoices%20Implementation.md) provides instructions for DAA participating companies to integrate with WebChoices, the DAA's centralized consumer opt-out platform. It focuses on enabling the transparent and reliable setting of opt-out choices for interest-based advertising (IBA).


## Key Concepts

### Purpose
Provides consumers with a destination to:
- Identify DAA-aligned companies
- Receive a detailed report of companies engaging in IBA on their browser.
- Opt out of data collection and use for IBA from one, several, or all listed companies.

### Tool Access
The WebChoices tool resides at [optout.aboutads.info](https://optout.aboutads.info)

### Integration Requirements for Opt-Out Service Endpoints
- **Browser Compatibility:** Endpoints must function reliably and quickly on all major browsers and operating systems (desktop and mobile).
- **Opt-Out Cookies:**
    - Generic values should be used for opt-out cookies.
    - Minimum lifespan of 5 years, renewed upon subsequent opt-out requests.
    - Only cookies necessary to maintain opt-out status should persist.
    - Non-cookie based IBA technologies (e.g., statistical identifiers, HTML5 local storage) must honor the presence of an opt-out cookie.
- **Anti-CSRF Tokens:** Allowed but not required; companies using them may face elevated performance SLAs.
- **Opt Out Failures:** All failures/errors must return a result for processing to avoid endpoint deactivation.
- **Performance:** Endpoints must respond quickly, ideally using HTTP 302 redirects for non-cookie technologies.
- **Status and Token (action_id=3):** Endpoints must return the consumer's status regarding IBA identifiers or opt-outs, including cookie-status and other-status for non-cookie technologies.
- **Opt Out (action_id=4):** Endpoints facilitate opting out by setting an opt-out cookie (for cookie tech) and persisting opt-out on the server (for server-side non-cookie tech). Responses include cookie-result and other-result.
- **Establishing a First-Party Trust Relationship (action_id=5):** This new feature is critical for setting opt-outs reliably in third-party cookie-blocking environments. It involves setting a session cookie (e.g., FPtrust=1) via HTTP headers from the company's domain, creating a temporary trust relationship. JavaScript is prohibited in this step.
