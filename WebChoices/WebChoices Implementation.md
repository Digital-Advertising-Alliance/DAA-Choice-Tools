# WebChoices Implementation Instructions

WebChoices provides a transparent, reliable opt-out from data collection and use for interest-based advertising (IBA) on major browsers. WebChoices and its Protect My Choices browser extension can request and store consumer choices via cookies and the AdChoices Signal.

## Table of Contents

[Introduction](#introduction)

[Onboarding to WebChoices](#onboarding-to-webchoices)

[Cookie-Based Integrations](#cookie-based-integrations)

[AdChoices Signal-Based Integrations](#adchoices-signal-based-integrations)

## Introduction

The purpose of the WebChoices tool is to provide consumers with a destination to identify a list of participating companies that have committed to conducting responsible advertising practices and are engaged in IBA (or targeted advertising) on a consumer's browser[^1]; as well as to provide consumers the ability to opt out of the collection and use of data for IBA from one, several, or all of the companies listed on the WebChoices tool.

The tool also includes a link to the Protect My Choices extension, which the tool can write to. Consumers are prompted to install the extension to preserve their choices via third-party cookies and/or the AdChoices Signal, depending on their browser. The PMC can be read via headers or a JS reader[^2], and can provide choice requests to companies in use cases where targeted ads are being used without cookies.

This document describes how the platform works and how to integrate your company's infrastructure with the WebChoices tool to set and/or read consumer choices[^3].

## Onboarding to WebChoices

### Production & Staging Environments

For testing purposes, companies may need to whitelist: 
- [optout.aboutads.info](https://optout.aboutads.info) (production)
- [dev.aboutads.info](https://dev.aboutads.info) (staging & onboarding)

The staging environment is essentially a sandbox where companies can test their choice functionality without releasing it to the public.

Links directing users to the WebChoices tool should point to [optout.aboutads.info](https://optout.aboutads.info).

### The Onboarding Process

This section provides information on how companies can onboard their organization's information and endpoints to the WebChoices platform.

- **Step 1 - Identify Your Onboarding Contact:**
Each company looking to be listed on WebChoices will receive a communication from the DAA on how to integrate. Please ensure that your designated point of contact ("POC") has the necessary rights to begin the onboarding process. While many companies use technical staff for this process, it is not required.

- **Step 2 - Respond Promptly:**
Your organization's POC will receive an email from the DAA to the email address you have provided. To update your contact email, please inform DAA staff directly. Please respond to our requests in a timely manner.
  
- **Step 3 - Provide the DAA with Set-Up Information:** Provide the DAA with the following:
    - A URL to your organization's website;
    - A URL to your organization's privacy policy or privacy notice;
    - A brief description of your company (this will appear inside WebChoices);
    - Ensure your logo is up-to-date on [logo.dev](https://www.logo.dev/). From that resource, a logo for your company  will appear inside WebChoices;
    - A designation of whether you can read the AdChoices Signal in the Protect My Choices extension, and how (header or reader - more information further in this documentation);
    - Ensure there are no rules in place that restrict location for accepting endpoint interactions; no geo-blocking of countries (e.g., Canada, Argentina, etc). The DAA shares this tool with various jurisdictions, and choice requests may be set from these and other countries; and,
    - The (non-unique) name and value of your opt-out cookie.

- **Step 4 - Your Endpoint(s) are Added to Staging:** After providing the necessary information, we will add your endpoint(s) to the WebChoices staging site [dev.aboutads.info](https://dev.aboutads.info), where you and the DAA can then test and review your integration. DAA staff will notify you of approval or with requests to repair any errors, if discovered.

- **Step 5 - Move to Production:** After testing is completed, you will receive a confirmation email indicating that your endpoint(s) have been approved and activated. DAA staff will then migrate the change to the production environment, and your endpoint will be available to consumers on [optout.aboutads.info](https://optout.aboutads.info).

## Cookie-Based Integrations

**1. Browser Compatibility:** No technologies shall be utilized in your implementation of an endpoint that will render it unable to function reliably and quickly on all major browsers and operating system combinations on desktop and mobile devices that support third-party cookies.

**2. Opt-Out Cookies:**
- Companies shall use generic values for their company's opt-out cookie value.
- Opt-out cookies that are generated by a company endpoint shall have a minimum lifespan of 5 years and shall be renewed for at least another 5 years upon each subsequent opt-out request received. When calculating the 5-year lifespan, add two extra days to account for leap years.
- Cookies not required to opt out a user shall never be set by a company's WebChoices endpoint. Any cookies that are necessary for a company's endpoints to function (e.g., tokens) shall not persist beyond the current browser session.  
- Any use of technology (including cookies) may still be permissible so long as the data cannot be collected or used for IBA after an opt-out choice. Violating this requirement may result in a breach of the terms under which this tool is offered to companies.
- Companies may not exploit the trusted relationship established via the WebChoices tool. But companies may leverage their existing first-party relationships or non-cookie technology for non-IBA purposes after opt-out.
- Some companies may have multiple opt-out endpoints, each with a different opt-out cookie value. Please contact DAA staff if you have multiple opt-out cookies with different values.
- Upon a successful opt-out through WebChoices, all cookies related to IBA activities shall expire, except those necessary to maintain the opt-out status of the consumer.
- Non-cookie-based IBA technologies, such as IBA made possible probabilistically, must honor the presence of an opt-out cookie being set, regardless of the non-cookie technology used.

**3. Use of Optional Anti-CSRF Tokens:**
- Companies are allowed (but not required) to exchange anti-CSRF tokens in advance of setting an opt-out cookie as part of this specification for a consumer opt-out process.
- Companies seeking the additional transactions that allow the anti-CSRF token exchange may be asked to meet elevated performance SLA's (such as endpoint response times) for their endpoints to ensure that the company's additional transactions do not negatively impact usability for consumers.
- If a request to an endpoint fails due to anti-CSRF token validation, the endpoint is required to return the appropriate error code back to the requestor and at no point shall it return rendered content or XML that is visible within a consumer's browser window.

**4. Opt Out Failure:**
- All failures/errors must return a result back for processing, regardless of the reason. Any failure to do so may result in your endpoint being deactivated to preserve a fast, accurate, and predictable consumer experience. Companies will use reasonable efforts to cure issues raised by the DAA. Failure to address the problem within a reasonable time may, at the DAA's discretion, result in a company's delisting.

**5. Recommendations:**
- Use some variation of "opt-out" as the name of your company's opt-out cookie. This helps consumers identify which cookies are opt-out cookies.
- Use request referrers to limit access to a company's endpoint, but each one must permit requests from allowable subdomains, including [dev.aboutads.info](https://dev.aboutads.info) and [optout.aboutads.info](https://optout.aboutads.info). Overly restrictive referrer validation logic within a company's endpoint can interfere with critical quality assurance processes when onboarding new companies or when releasing new features to the opt-out tool.

**5. Performance:**
- Maintaining fast endpoints is essential. Company endpoints should respond quickly (e.g., ideally in milliseconds) to ensure a fast opt-out experience for users. If endpoints are not quick enough, they may timeout and fail for the user.
- The recommended approach for companies that are not using non-cookie technologies is to use HTTP 302 redirects whenever possible. Endpoints that use JavaScript for browser redirection must focus particularly on browser compatibility and rapid response times. Each company endpoint has a limited time to deliver a response, and JavaScript (or chained redirects) can add undesirable processing time and possibly cause a failure to be reported to the consumer if the endpoint exceeds a reasonable allowable transaction response time.


### Status (Legacy Specification) and Token: (action_id=3)

#### Request

| **Attribute** | **Description / value** |
|----|----|
| Referer | https://\<dev \| optout\>.aboutads.info/\* |
| Accept | text/html,application/xhtml+xml |

*<u>Sample Request URL:</u>*

`https://your.domain/with/path/to/endpoint`
`?action_id=3`
`&participant_id=10`
`&rd=https%3A%2F%2Foptout.aboutads.info`
`&nocache=223442`

| **Field** | **Data Type** | **Description** |
|----|:--:|----|
| action_id | integer | Value "3" indicates a status request and token, if applicable |
| participant_id | string | Participant identifier for WebChoices to correlate your endpoint with operations. Value is subject to change without notice. |
| rd | string | hostname and protocol |
| nocache | string | Ignore: cache buster |

#### Response (Legacy Specification)

This is the existing specification and can be used by companies that use ONLY cookie identifiers for IBA (i.e. companies NOT employing non-cookie technologies).

<table>
<colgroup>
<col style="width: 19%" />
<col style="width: 15%" />
<col style="width: 65%" />
</colgroup>
<thead>
<tr>
<th><strong>Field</strong></th>
<th style="text-align: center;"><strong>Data Type</strong></th>
<th><strong>Description</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>rd</td>
<td style="text-align: center;">string</td>
<td><strong>rd</strong> value from request</td>
</tr>
<tr>
<td>participant_id</td>
<td style="text-align: center;">integer</td>
<td><strong>participant_id</strong> value from request</td>
</tr>
<tr>
<td>status</td>
<td style="text-align: center;">integer</td>
<td><p>1 = No IBA cookie(s) from participant on the browser</p>
<p>2 = IBA cookie(s) from participant present on the browser</p>
<p>3 = Opt-out cookie is present on the browser</p></td>
</tr>
<tr>
<td>token</td>
<td style="text-align: center;">string</td>
<td>Optional anti-CSRF string; must be valid ASCII characters allowed in a URL</td>
</tr>
</tbody>
</table>

*<u>Response URL:</u>*

\<**rd**\>/token/\<**participant_id**\>/\<**status**\>/\<**token**\>

<u>Example:</u>
`https://optout.aboutads.info/token/123/1/magic_string`

#### Response (New Specification)

This response is required for participants. Companies utilizing non-cookie technologies <u>are required</u> to provide accurate status as specified below.

<table>
<colgroup>
<col style="width: 18%" />
<col style="width: 16%" />
<col style="width: 65%" />
</colgroup>
<thead>
<tr>
<th><strong>Field</strong></th>
<th style="text-align: center;"><strong>Data Type</strong></th>
<th><strong>Description</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>rd</td>
<td style="text-align: center;">string</td>
<td><strong>rd</strong> value from request</td>
</tr>
<tr>
<td>participant_id</td>
<td style="text-align: center;">integer</td>
<td><strong>participant_id</strong> value from request</td>
</tr>
<tr>
<td>cookie-status</td>
<td style="text-align: center;">integer</td>
<td><p>0 = Not Applicable - Cookie technologies are not in use</p>
<p>1 = No IBA cookie(s) from participant on the browser</p>
<p>2 = IBA cookie(s) from participant present on the browser</p>
<p>3 = Opt-out cookie is present on the browser</p></td>
</tr>
<tr>
<td>other-status</td>
<td style="text-align: center;">integer</td>
<td><p>0 = Not Applicable - Non-cookie technologies are not in use</p>
<p>1 = No non-cookie IBA identifier from participant present for the browser</p>
<p>2 = Non-cookie IBA identifier from participant present for the browser</p>
<p>3 = Non-cookie opt-out from participant present for the browser</p></td>
</tr>
<tr>
<td>token</td>
<td style="text-align: center;">string</td>
<td>Optional anti-CSRF string; must be valid ASCII characters allowed in a URL</td>
</tr>
</tbody>
</table>

*<u>Response URL:</u>*

\<rd\>/token/\<participant_id\>/**\<cookie-status\>-\<other-status\>**/\<token\>

Example for a company using non-cookie technology:
`https://optout.aboutads.info/token/123/1-1/csrftoken`

Example for a company using only cookie technology:
`https://optout.aboutads.info/token/123/1-0/csrftoken`

### Opt Out: (action_id=4)

Opt out a consumer from the collection and use of data for IBA by setting an "opt-out" cookie on the consumer's browser. **This action reports success or failure and must be based on the actual presence of the opt-out cookie in the consumer's browser**. Verification of the presence of the "opt-out" cookie is usually accomplished by redirecting to a verification page or script before redirecting the result signal back to the WebChoices tool. If using server-side non-cookie technologies (e.g., statistical identifiers), the opt-out must also be persisted on the company's server.

#### Request

<table>
<colgroup>
<col style="width: 15%" />
<col style="width: 84%" />
</colgroup>
<thead>
<tr>
<th style="text-align: center;"><strong>Attribute</strong></th>
<th>
<p><strong>Description / value</strong></p>
</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: center;">Referer</td>
<td>https://&lt;dev | optout&gt;.aboutads.info/*</td>
</tr>
<tr>
<td style="text-align: center;">Accept</td>
<td>text/html,application/xhtml+xml</td>
</tr>
</tbody>
</table>

*<u>Sample Request URL:</u>*

`https://your.domain/endpoint`
`?action_id=4&participant_id=10`
`&rd=https://optout.aboutads.info`
`&token=magic_value&nocache=223442`

| **Field** | **Data Type** | **Description** |
|----|:--:|----|
| action_id | integer | Value "4" indicates an opt-out request |
| participant_id | string | Participant identifier for the WebChoices tool to correlate your endpoint with operations. Value is subject to change without notice. |
| rd | string | hostname and protocol |
| token | string | Optional anti-CSRF string if returned during the status check |
| nocache | string | Ignore: cache buster |

#### Response (Legacy Specification)

This is the existing specification and can continue to be used by companies that are utilizing only cookie-based identifiers for IBA purposes.

<table>
<colgroup>
<col style="width: 16%" />
<col style="width: 14%" />
<col style="width: 69%" />
</colgroup>
<thead>
<tr>
<th><strong>Field</strong></th>
<th style="text-align: center;"><strong>Data Type</strong></th>
<th><strong>Description</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>rd</td>
<td style="text-align: center;">string</td>
<td><strong>rd</strong> value from request</td>
</tr>
<tr>
<td>action_id</td>
<td style="text-align: center;">integer</td>
<td><strong>action_id</strong> value from request</td>
</tr>
<tr>
<td>participant_id</td>
<td style="text-align: center;">string</td>
<td><strong>participant_id</strong> value from request</td>
</tr>
<tr>
<td>result_id</td>
<td style="text-align: center;">integer</td>
<td><p>1 = <strong>Success</strong>: after an opt-out attempt, the opt-out cookie is present on the user's browser</p>
<p>2 = <strong>Failure</strong>: after an opt-out attempt, the cookie is not present on the user's browser</p>
<p>3 = <strong>Failure</strong>: anti-CSRF token mismatch [4..] = Reserved for future use</p></td>
</tr>
<tr>
<td>message</td>
<td style="text-align: center;">string</td>
<td>Optional simple ASCII text string fully URL compliant</td>
</tr>
</tbody>
</table>

*<u>Response URL:</u>*

\<**rd**\>/finish/\<**participant_id**\>/\<**action_id**\>/\<**result_id**\>/\<**message**\>

<u>Example:</u>
`https://optout.aboutads.info/finish/123/4/1/simple_string`

#### Response (New Specification)

This response is required for participants. Companies that use non-cookie technologies are required to provide an accurate opt-out result as specified below.

<table>
<colgroup>
<col style="width: 14%" />
<col style="width: 11%" />
<col style="width: 73%" />
</colgroup>
<thead>
<tr>
<th><strong>Field</strong></th>
<th style="text-align: center;"><strong>Data Type</strong></th>
<th><strong>Description</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>rd</td>
<td style="text-align: center;">string</td>
<td><strong>rd</strong> value from request</td>
</tr>
<tr>
<td>action_id</td>
<td style="text-align: center;">integer</td>
<td><strong>action_id</strong> value from request</td>
</tr>
<tr>
<td>participant_id</td>
<td style="text-align: center;">string</td>
<td><strong>participant_id</strong> value from request</td>
</tr>
<tr>
<td>cookie-result</td>
<td style="text-align: center;">integer</td>
<td><p>0 = <strong>Not Applicable</strong>: Cookie technologies are not in use</p>
<p>1 = <strong>Success</strong>: after an opt-out attempt, the opt-out cookie is present on the user's browser</p>
<p>2 = <strong>Failure</strong>: after an opt-out attempt, the cookie is not present on the user's browser</p>
<p>3 = <strong>Failure</strong>: anti-CSRF token mismatch [4..] = Reserved for future use</p></td>
</tr>
<tr>
<td>other-result</td>
<td style="text-align: center;">integer</td>
<td><p>0 = <strong>Not Applicable</strong>: Non-cookie technologies are not in use</p>
<p>1 = <strong>Opt Out Success</strong>: Non-cookie identifier for the browser has been received by the participant's server</p>
<p>2 = <strong>Opt Out Failure</strong>: Non-cookie identifier for the browser was not received by the participant's server</p>
<p>3 = <strong>Failure</strong>: Anti-CSRF token mismatch [4..] = Reserved for future use</p></td>
</tr>
<tr>
<td>message</td>
<td style="text-align: center;">string</td>
<td>Optional simple ASCII text string fully URL compliant</td>
</tr>
</tbody>
</table>

*<u>Response URL:</u>*

\<rd\>/finish/\<participant_id\>/\<action_id\>/\<cookie-result\>-\<other-result\>/\<message\>

<u>Example:</u>
`https://optout.aboutads.info/token/123/1-1/magic_string`

### Guidelines for Response

1.  The company's response shall be a single HTTP 200 response.

2.  Company shall set cookies using HTTP headers. **The use of JavaScript is prohibited.**

3.  No output shall be displayed to the screen unless for debugging purposes. This shall occur on: [dev.aboutads.info](https://dev.aboutads.info) AND NOT [optout.aboutads.info](https://optout.aboutads.info).

4.  The company's response time shall be below 250ms. Timeouts for this step are very low. To facilitate a positive user experience, it is vital to maintain adequate response times across all company endpoints to ensure timely opt-out delivery to consumers' browsers.

### Protect My Choices Browser Extension

Once the opt-out process is complete, consumers will be prompted to install the DAA's Protect My Choices browser extension. In some browsers (for example, Safari), this prompt appears before the opt-out flow begins.

Protect My Choices ("PMC") stores the consumer's choices locally using the AdChoices Signal. In browsers that support third-party cookies, these AdChoices Signal choices mirror the consumer's cookie-based choices in WebChoices. In those same browsers only, the extension can also re-create opt-out cookies if the consumer deletes cookies. This cookie re-creation applies only to opt-out cookies for companies included in WebChoices, and the extension does not re-create any other cookies.

The AdChoices Signal is placed on the consumer's device via a short-term first-party cookie set by the DAA after the consumer completes their opt-out(s) in WebChoices. The PMC extension will read that short-term cookie and store the AdChoices Signal indefinitely or until the consumer makes different selections (such as removing the PMC extension).

See our **AdChoices Signal** and **Protect My Choices** documentation for more information about these mechanisms.

## AdChoices Signal-Based Integrations

Even if your company mainly uses third-party cookies for ad targeting today, it's still a good idea to implement the AdChoices Signal now. It helps future-proof your implementation by carrying consumer choice signals across newer targeting approaches (hashed email, phone-based identifiers, IP-based signals, probabilistic methods, etc.), including in browsers where third-party cookies are limited or unavailable.

For browsers that do not support third-party cookies, consumers can still use WebChoices to make IBA choice requests. In these environments, choice requests are stored in the Protect My Choices extension using the AdChoices Signal specification. Companies can access these choice requests either by using a reader or by interrogating request headers.

The DAA will list a company in the non-third-party-cookie version of WebChoices only after validating that the company has deployed one of the supported methods to access choice requests (reader, header-based approach, or another approved method).

**Note:** In non-third-party-cookie environments, the PMC browser extension stores the AdChoices Signal only and does not regenerate or "harden" opt-out cookies. 

### <ins>Option 1</ins>: JavaScript Reader

Use a "reader" component to retrieve AdChoices Signal choice requests from the PMC environment and apply them to your ad delivery and/or measurement flows.

What this typically means:
- Implement the approved AdChoices Signal reader (JS reader[^2]) in the parts of your stack that decide whether to serve interest-based ads.
- On each relevant decision point (ad request, bid request, personalization decision), read the consumer's current choice state.
- Ensure the choice state is respected consistently.

### <ins>Option 2</ins>: HTTP Header Inspection

Instead of using a dedicated reader, you can access AdChoices Signal choices by inspecting headers on incoming requests (for example, when your infrastructure receives ad calls, bid requests, or tag calls).

What this typically means:
- Your edge/server inspects incoming HTTP requests for the AdChoices Signal header(s).
- If present, your systems interpret the header values to determine whether IBA is permitted for that user/session/context.
- You propagate the interpreted choice to downstream systems (decisioning, bidding, measurement) in a controlled and auditable way.

### <ins>Option 3</ins>: Other Approved Methods

If your stack uses a specialized integration path (for example, a wrapper/module approach such as a Prebid module), coordinate validation with the DAA.



[^1]: Companies can also install the extension to verify their ability to read and decode the AdChoices Signal stored by the extension.
[^2]: We have [sample code available](../Protect%20My%20Choices/Code/) for reading and decoding the AdChoices Signal in a browser header.
[^3]: The new WebChoices platform is fully backwards compatible with the DAA's old choice page.

