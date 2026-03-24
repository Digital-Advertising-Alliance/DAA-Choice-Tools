# TokenChoices Implementation Instructions

The DAA's TokenChoices tool provides participating companies with a mechanism to receive and process consumer requests to opt out of, or revoke consent for, the use of tokenized identifiers such as hashed email addresses or hashed phone numbers for interest-based advertising (IBA). The tool also enables consumers to express preferences regarding advertising interest categories, expanding transparency and control alongside the DAA's existing WebChoices and AppChoices tools.

## Table of Contents

[Introduction](#introduction)

[Onboarding to TokenChoices](#onboarding-to-tokenchoices)

[User Flow 1: Token Opt-Out / Consent Revocation](#user-flow-1-token-opt-out--consent-revocation)

[User Flow 2: Category Preferences](#user-flow-2-category-preferences)

[API Parameters](#api-parameters)

[Example Requests](#example-requests)

[Frequently Asked Questions](#frequently-asked-questions)


## Introduction

TokenChoices is a DAA tool that enables consumers to exercise transparency and control over the use of token-based identifiers in interest-based advertising (IBA). These identifiers may include hashed email addresses or hashed phone numbers used by participating companies for advertising purposes. 

TokenChoices supports two distinct consumer choice mechanisms:

1. **Opt-Out / Consent Revocation**: 
Allows a consumer to request that participating companies stop using a tokenized identifier for IBA.

2. **Category Preferences**: 
Allows a consumer to express preferences about categories of advertising interests associated with their tokenized identifier.

Both mechanisms use a shared API structure and identifier format.

### What is a Token Identifier?

A token identifier is a hashed version of a consumer identifier, such as an email address or phone number, that is used within digital advertising systems to recognize audiences while limiting exposure of the original identifier. 

Like cookies or mobile advertising IDs, tokens function as technical identifiers that allow advertising systems to deliver relevant ads and measure campaign performance.

TokenChoices allows consumers to exercise control over the use of these token identifiers for interest-based advertising.

## Onboarding to TokenChoices

Below you will find a checklist of what needs to be accomplished in order to successfully integrate with TokenChoices:

1. Please ensure that your company has executed and has an active DAA TokenChoices Agreement or has a tool addendum in place.
2. Provide the DAA with your onboarding information (company name, logo, company description, main contact).
3. Create and share your company's endpoint(s) with the DAA.
4. The DAA will schedule a testing time frame to ensure integration is working correctly. During this time, there will be more back-and-forth communication between the DAA and your company.
5. Integration completed. If you receive the tokens correctly, then integration is complete. If you do not receive tokens correctly, we will have to work through the issue(s).

Once the necessary agreement is in place between your company and the DAA, the TokenChoices technical integration process can be initiated.

## User Flow 1: Token Opt-Out / Consent Revocation

### Purpose

Allows a consumer to request that participating companies stop collecting, using, or transferring data associated with a submitted token identifier for interest-based advertising.

### Supported Identifiers

The TokenChoices tool currently supports:
- Hashed email identifiers
- Hashed phone number identifiers

Future identifier types may be supported over time.

### Scope of Opt-Out

An opt-out request applies to:
- Interest-based advertising conducted using the submitted token identifier.

An opt-out request does not apply to:
- Other identifiers such as cookies or mobile advertising IDs.
- Non-IBA purposes permitted under the DAA Principles.

Consumers may exercise choices for other identifiers through [WebChoices](/WebChoices/) or [AppChoices](/AppChoices/).

## User Flow 2: Category Preferences

### Purpose

The Category Preferences feature allows consumers to signal preferences related to categories of advertising interests.

This feature is designed to provide additional transparency and more granular control over the types of advertising interests associated with a token identifier.

### Category Taxonomy

Categories are based in part on industry taxonomy frameworks and are intentionally simplified to make them understandable to consumers.

A machine-readable JSON file provides the current list of categories to integrated companies. The categories JSON file may be found here:  [https://files.aboutads.info/categories.json](https://files.aboutads.info/categories.json
)

### Preference States

For each category, consumers may signal:

| **Value** | **Meaning** |
|----|----|
| 0 | Limit / opt-out of category |
| 1 | Allow category |
| - | No preference (default state; no category selected) |

Category signals are currently implemented on a **best-effort basis** as industry capabilities mature. Individual companies' algorithms/processes may determine the exact details of preferences. If companies are unable to apply a consumer's advertising preferences, they may apply as an opt-out to all.


## API Parameters

TokenChoices requests include several parameters that allow participating companies to interpret the consumer request.

Both user flows use the same core API parameters:

---

```
action
```

Defines the type of consumer request being transmitted.

Supported values include:

| **Value** | **Meaning** |
|----|----|
| optout | Consumer requests to opt out of interest-based advertising using the submitted token identifier. |
| prefString | Consumer category preferences are provided in the pref parameter. |

*Examples:*
```
action=opt-out
action=prefString
```
For the Opt-Out / Consent Revocation user flow, the action parameter is set to **opt-out by default**.

Future implementations may support additional actions such as opt-in, revoke, or other signals.

---

```
idt
```

Defines the identifier type submitted by the consumer.

The identifier represents the tokenized input (such as a hashed email address or hashed phone number) used by participating companies for interest-based advertising.

Supported values include:

| **Value** | **Meaning** |
|----|----|
| email | The consumer submitted an email address that has been converted into hashed email tokens. |
| phone | The consumer submitted a phone number that has been converted into hashed phone tokens. |

*Examples:*
```
idt=email
idt=phone
```
Additional identifier types may be supported in the future as new identity frameworks emerge.

---

```
pref
```

Defines the preference string used to communicate consumer category preferences.

This parameter is used only in the **Category Preferences** user flow.

Supported values include:

| **Value** | **Meaning** |
|----|----|
| null | No category preferences are provided. Used in the Opt-Out / Consent Revocation user flow. |
| prefString | Encoded string representing consumer category preferences. |

*Examples:*
```
pref=null
pref=010-1--
```
The position of each value in the string corresponds to a category defined in the categories JSON taxonomy, found here: [https://files.aboutads.info/categories.json](https://files.aboutads.info/categories.json)


## Request Format

TokenChoices sends requests to integrated companies using a standard HTTPS endpoint. Requests include parameters that identify the action being requested, the identifier type, and any associated preferences.

Example request format:
```
https://subdomain.company.com/pr.png?action=%action&idt=%idt&md5=%md5-ID&sha1=%sha1-ID&sha256=%sha256-ID&sha512=%sha512-ID&pref=%prefString
```
All company endpoints must support HTTPS.

TokenChoices supports the following hashing formats:

- MD5
- SHA1
- SHA256
- SHA512

No clear-text email addresses or phone numbers are transmitted.


## Example Requests

TokenChoices supports both GET and POST request methods for transmitting consumer choice signals to participating companies.

All endpoints must use HTTPS.

### Opt-Out / Consent Revocation Examples
Example request sent to an integrated company when a consumer submits an opt-out request.

#### GET Example:
```
https://subdomain.company.com/pr.png?action=opt-out&idt=email&md5=%md5-ID&sha1=%sha1-ID&sha256=%sha256-ID&sha512=%sha512-ID&pref=null
```
Example using phone identifier:
```
https://subdomain.company.com/pr.png?action=opt-out&idt=phone&md5=%md5-ID&sha1=%sha1-ID&sha256=%sha256-ID&sha512=%sha512-ID&pref=null
```
#### POST Example:
Endpoint:
```
https://subdomain.company.com/pr.png?action=opt-out&idt=email
```
Body:
```
{
  "md5": "%md5-ID",
  "sha1": "%sha1-ID",
  "sha256": "%sha256-ID",
  "sha512": "%sha512-ID",
  "pref": null
}
```

### Category Preference Examples
Example request sent when a consumer submits category preference signals.

#### GET Example:
```
https://subdomain.company.com/pr.png?action=prefString&idt=email&md5=%md5-ID&sha1=%sha1-ID&sha256=%sha256-ID&sha512=%sha512-ID&pref=%prefString
```
#### POST Example:
Endpoint:
```
https://subdomain.company.com/pr.png?action=prefString&idt=email
```
Body:
```
{
  "md5": "%md5-ID",
  "sha1": "%sha1-ID",
  "sha256": "%sha256-ID",
  "sha512": "%sha512-ID",
  "pref": "%prefString"
}
```

The preference string represents category selections made by the consumer.

Category positions and definitions are available in JSON format, found here: [https://files.aboutads.info/categories.json](https://files.aboutads.info/categories.json)


### Optional Authentication Headers ###

If additional authentication is required for your POST endpoint, companies may include authentication headers such as an API key. If authentication headers are used, the header format must be provided to the DAA during onboarding.

Example header format:
```
Header:
x-api-key: AAAAAAAAAAAAAAAA0000000000000000
```


## Frequently Asked Questions

**1. What hashing formats are supported?**

TokenChoices currently supports the following hashing algorithms:

- MD5
- SHA1
- SHA256
- SHA512

Additional hashing approaches may be supported during onboarding if required. 

**2. What identifier types are supported?**

Currently supported identifier types include:

- Email (idt=email)
- Phone (idt=phone)

Phone number identifiers will be sent as a ten character string, which will then be hashed.

Additional identifier types may be supported in the future as new identity frameworks emerge. 

**3. Does an opt-out apply to all identifiers?**

No. An opt-out submitted through TokenChoices applies only to the tokenized identifier provided by the consumer.

Consumers must use other DAA tools to control additional identifiers:

- WebChoices for browser cookies
- AppChoices for mobile advertising IDs

**4. How should companies handle category preference signals?**

Category preferences are currently provided on a best-effort basis as the ecosystem continues to develop mechanisms for responding to these signals. Companies should interpret the preference string (pref) and apply the consumer's preferences where technically feasible. 

**5. Where can companies retrieve the category taxonomy?**

The current category list is available in machine-readable JSON format. This list can be used to map preference string positions to category definitions. The categories JSON file can be found here: [https://files.aboutads.info/categories.json](https://files.aboutads.info/categories.json)

**6. Can consumers submit multiple identifiers at once?**

No. The TokenChoices interface accepts only one email address or phone number per submission. Consumers must repeat the process for additional identifiers. Additionally, if a consumer revisits TokenChoices and resubmits the same identifier, their most recent choices may overrule their previous submission(s).

**7. Can companies add authentication to their endpoints?**

Yes. The DAA supports and recommends that participating companies protect their endpoints using authentication mechanisms such as API keys.

**8. Are clear-text email addresses or phone numbers transmitted?**

No. TokenChoices never transmits clear-text identifiers. Email addresses and phone numbers are converted to hashed tokens before being transmitted to participating companies. Phone numbers are transmitted as a ten-digit string before hashing.

**9. Are email identifiers normalized before hashing?**

Yes. Email addresses submitted by consumers are converted to lowercase before hashing to ensure consistent token generation.

**10. Does the DAA store user-submitted identifiers?**

No. TokenChoices does not retain consumer-submitted identifiers beyond operational needs. Inputs are not stored for more than 30 days.

**11. How does the tool protect against automated or fraudulent submissions?**

TokenChoices incorporates several safeguards, including:

- CAPTCHA validation during consumer submissions
- Verification of email or phone ownership (for example, one-time passwords or verification links)
- Throttling mechanisms to limit automated requests

Companies may also monitor submission volumes at their endpoints to detect potential abuse.

**12. Can consumer choices be updated?**

Yes. If a consumer revisits the TokenChoices interface and submits a new request, the most recent request may override previous submissions.

Together these tools provide consumers with transparency and control across different identifier environments used in digital advertising.
