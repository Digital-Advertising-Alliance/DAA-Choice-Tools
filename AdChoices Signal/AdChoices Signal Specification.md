# AdChoices Signal Specifications

Bridging User Choices


## Table of Contents

[Introduction](#introduction)

[AdChoices Signal Format](#adchoices-signal-format)

[Example Strings](#example-strings)

[Receiving, Reading and Passing AdChoices Signals](#receiving-reading-and-passing-adchoices-signals)

[Using the AdChoices Signal](#using-the-adchoices-signal)

[Appendix 1: Participants Reference File](#appendix-1-participants-reference-file)

[Appendix 2: Category Reference File](#appendix-2-category-reference-file)

[Appendix 3: Choice Statuses](#appendix-3-choice-statuses)

[Appendix 4: Category Preferences](#appendix-4-category-preferences)

[Appendix 5: OpenRTB 2.x Community Extension](#appendix-5-proposed-openrtb-2.x-community-extension)

[Appendix 6: String Format Graphic Illustration](#appendix-6-string-format-graphic-illustration)

[Appendix 7: AdChoices Signal Usage Illustration](#appendix-7-adchoices-signal-usage-illustration)

[Appendix 8: Reading The AdChoices Signal From The PMC Extension](#appendix-8-reading-the-adchoices-signal-from-the-pmc-extension)

## Introduction

The purpose of the AdChoices Interest-Based Self-Regulatory Programs across the world is to promote enhanced transparency of data practices outside the privacy policy, consumer control, and other elements of the DAA-family Self-Regulatory Programs (regardless of geographic region) related to the collection and use of data for Interest-Based Advertising (IBA), sometimes referred to as online behavioral advertising (OBA).

To achieve these ends, the **AdChoices Icon** provides a common method by which consumers can learn more about data collection and its use for online advertising. It also allows consumers to express their preferences to various parties in the advertising ecosystem.

The DAA's WebChoices tool has undergone a comprehensive rewrite to align with the evolving, cookie-and-beyond advertising ecosystem. This major update included back-end database enhancements, rigorous security reviews, and UI/UX improvements. This updated tool continues to support third-party cookie opt-outs. But it also features an integration with the Protect My Choices browser extension, which itself has been updated.

The new tighter integration of WebChoices and Protect My Choices means that companies can now access the AdChoices Signal from the extension or through headers. The AdChoices Signal will permit companies to read consumer choices in browsers without third-party cookie storage functionality, thus permitting consumer choice to be applied at the browser level for newer identifiers/targeting techniques such as IP-based and probabilistic, as well as category-based choices.

The DAA's strategic approach to tool development over recent years has prioritized modularity and adaptability to emerging identifier technologies, ensuring we can consistently uphold our mandate to provide consumers with meaningful transparency and choice.

The AdChoices Signal is an encoding of users' IBA preferences that can be passed to DAA Participants from DAA tools, retrieved by DAA Participants from HTTP headers or on-page JavaScript for users with Protect My Choices installed, as shown in Appendix 7. Participants in the ecosystem are expected to modify their IBA data collection and/or use behavior according to the preferences expressed in this string, consistent with the Self-Regulatory Principles[^1] in the jurisdiction(s) where they operate.

## Overview

The AdChoices Signal encodes the following information:[^2]

- For the user's choice of either a specific set of participants integrated with the DAAs, or all participants integrated with the DAA one of three actions regarding IBA choice:

    - The user has not expressed a choice

    - The user has explicitly chosen to allow data collection and use for IBA

    - The user has explicitly chosen to limit data collection and use for IBA

- The user's IBA preference(s) request for one or more of a set of interest categories, applicable across all participants consisting of one of the following states:

    - The user has expressed no preference.

    - The user explicitly desires to limit IBA for the interest category (i.e., category excluded)[^3]

**The specification does not prescribe what sort of identifier an AdChoices Signal is associated with.** It may be associated with a cookie ID, mobile advertising ID, token (e.g., hashed email), or any other identifier as desired or supported between the DAA and participants, or between participants interacting with each other.[^4] (See Appendix 7 for an illustration of the data flow.)

## AdChoices Signal Format

The AdChoices Signal is a sequence of bits, representing a series of fields, in big-endian format. It is transmitted as a base64url[^5] string. Padding characters ('=') must not be used. This encoding ensures an approach that is consistent with other such strings currently in use across the ad tech industry. All numeric values are unsigned integers.

| **Field**                 | **# of bits** | **Description**                                                                 |
|---------------------------|---------------|-------------------------------------------------------------------------------|
| **Header Section**        |               |                                                                               |
| Version                   | 6             | The version number of the string, incremented if a new version is released. The current version is 1.  |
| Timestamp                 | 32            | The timestamp at which the string was created as seconds since Unix epoch.     |
| Global IBA Choice Status  | 4             | A choice status as described in [Appendix 3: Choice Statuses](#appendix-3-choice-statuses), applying to all DAA participants. |
| **Per-Participant Records Section** |      |                                                                               |
| Number of Per-Participant Records | 12   | The number of per-participant choice status records to follow.<br>If zero, there are no per-participant choice status records, and the next bits will contain category preference data.<br>Per-participant records should not be included when a global status other than 2 has been provided, <br>since the global status applies to all. Per-participant statuses would provide no useful information in this case<br> and would unnecessarily consume space. Likewise, records should not be included for participants when the<br> choice status for that participant is 2.                |
| **Participant Choice Status Record**  |       | Repeated the number of times specified by the prior field.                    |
| Participant ID           | 12            | The participant ID assigned by the DAA. See [Appendix 1: Participants Reference File](#appendix-1-participants-reference-file). |
| Choice Status            | 4             | The choice status for this participant as described in [Appendix 3: Choice Statuses](#appendix-3-choice-statuses). |
| **Per-Category Preferences Section** |      |                                                                               |
| Number of Per-Category Records    | 12   | The number of per-category preference records to follow.<br>Records should not be included for categories with a choice status of 2 since this provides no useful information.                      |
| **Per-Category Preference Record**    |       | Repeated the number of times specified by the prior field.                    |
| Category ID              | 12            | The category ID assigned by the DAA. See [Appendix 2: Category Reference File](#appendix-2-category-reference-file). |
| Preference               | 4             | The user's preference for this category. See [Appendix 4: Category Preferences](#appendix-4-category-preferences). |


See [[Appendix 6: String Format Graphic Illustration]](#appendix-6-string-format-graphic-illustration) for a diagram illustrating the above.



## Example Strings

### Example 1: No Global Preference, Three Participant Preferences, One Category Preference

**Base64url:**

BYVHiWSADABAAIQAwABAZEA

**Binary:**

00000101100001010100011110001001011001🟡**0010**🟡000000000011000000000001🔵**0000**🔵000000000010🔵**0001**🔵000000000011🔵**0000**🔵000000000001000000011001🟢**0001**🟢

**Annotated Binary:**

| **Bits**                 | **Field** | **Value/Description**                                                                 |
|---------------------------|---------------|-------------------------------------------------------------------------------|
| 000001 | *(Header Section)* Version | Version 1 of the specification is used. |
| 01100001010100011110001001011001 | Timestamp | 1632756313 seconds since epoch, or Monday, September 27, 2021 3:25:13 PM UTC.  |
| 🟡0010🟡 | Global IBA Choice Status | 2; the user has not expressed a preference. |
| 000000000011 | *(Per-Participant Records Section)* Number of Per-Participant Records | 3 per-participant records will follow. |
| 000000000001 | *(First Participant Choice Status Record)* Participant ID | Participant ID 1 (as defined in the participants reference file). |
| 🔵0000🔵 | Choice Status | 0; the user has explicitly chosen to limit data collection and use for IBA. |
| 000000000010 | *(Second Participant Choice Status Record)* Participant ID | Participant ID 2. |
| 🔵0000🔵 | Choice Status | 1; the user has explicitly chosen to allow data collection & use for IBA. |
| 000000000011 | *(Third Participant Choice Status Record)* Participant ID | Participant ID 3. |
| 🔵0000🔵 | Choice Status | 0; the user has explicitly chosen to limit data collection and use for IBA. |
| 000000000001 | *(Per-Category Records Section)* Number of Per-Category Records | 1 per-category records will follow. |
| 000000011001 | *(First Category Record)* Category ID | Category ID 25: Travel (as defined in the category reference file). |
| 🟢0001🟢 | Category Preference | 1; the user has expressed an explicit preference to allow/include this category. |

*Symbols used above (🟡, 🔵, 🟢) are only for emphasis and documentation readability.*

### Example 2: Global Preference Only

**Base64url:**

BYVHiWQAAAAA

**Binary:**

00000101100001010100011110001001011001🟡**0000**🟡000000000000000000000000

**Annotated Binary:**

|**Bits**|**Field**|**Value/Description**|
|---------------------------|---------------|-------------------------------------------------------------------------------|
| 000001 | *(Header Section)* Version | Version 1 of the specification is used. |
| 01100001010100011110001001011001 | Timestamp | 1632756313 seconds since epoch, or Monday, September 27, 2021 3:25:13 PM UTC. |
| 🟡0010🟡 | Global IBA Choice Status | 0; the user has expressly chosen to limit IBA. |
| 000000000000 | *(Per-Participant Records Section)* Number of Per-Participant Records | 0 per-participant records will follow. |
| 000000000000 | *(Per-Category Records Section)* Number of Per-Category Records | 0 per-category records will follow. |

*Symbols used above (🟡) are only for emphasis and documentation readability.*

In this example, there are no per-participant or per-category records, so no such records appear, however the number of per-participant or per-category records fields are always required for correct parsing.

## Receiving, Reading and Passing AdChoices Signals

### DAA WebChoices Tool

Companies who participate in the DAA's [WebChoices](https://optout.aboutads.info/) tool may receive the AdChoices Signal directly as a part of the call to their integration endpoint like this:

```https://subdomain.company.com/pr.png?action=%action&pref=[STRING_HERE]```

The same applies in the case of a preference with a token-based identifier, for example:

```https://subdomain.company.com/pr.png?action=%action&idt=email&md5=%md5-emailID&sha1=%sha1-emailID&sha256=%sha256-emailID&sha512=%sha512-emailID&pref=[STRING_HERE]```

### Browser Extension: Protect My Choices 

When consumers install the Protect My Choices (v2.0) extension, any preferences expressed through the YourAdChoices tools will be stored as a string in the extension, according to this AdChoices Signal specification document. The value of the string can be read by any participant with the code on page, either via JavaScript or by looking for specific HTTP headers set by the extension (see Appendix 8 for illustration). For more details on how to access the AdChoices Signal in cases where consumers have the Protect My Choices extension installed, refer to the [PMC technical specifications documentation](../Protect%20My%20Choices/PMC2%20Vendor%20Implementation.md).

### Passing Between Participating Companies

Aside from communications between the DAA and participating companies, AdChoices Signals may be passed between companies when there is a need for one party to inform the other about the user's IBA choices.

### URL-Based Passing

Parties can include the AdChoices Signal as a parameter in the URL when making a call to another party. The recommended URL parameter for this scenario is ```adchoices_signal```. Ad networks, SSPs (supply-side platforms), and exchanges may support receipt of an AdChoices Signal, which they can further convey to DSPs (demand-side platforms) via OpenRTB Community Extension. This could be a URL parameter in the ad request, for example:

```<script src="https://ads.ssp.com/jstag?pid=18504&sid=955917&plid=7821315&sz=300x250&adchoices_signal=[STRING_HERE]"></script>```

### Macros

It is recommended that participating companies support a macro to allow an AdChoices Signal to be passed along to third-party ad servers or measurement vendors configured in an ad server or DSP, as appropriate given the nature of the company's product. The macro recommended for this purpose is ```${ADCHOICES_SIGNAL}```.

## Using the AdChoices Signal

### Ad Networks, SSPs, Exchanges, DSPs, and Other Companies Who Engage in IBA

Participants receiving an AdChoices Signal must respect the choice statuses expressed within it (similar to the behavior they have used when encountering an opt out cookie) and should use the category preferences provided to modify their IBA behavior. For example, a DSP or CDP (customer data platform) receiving such a string could store it in their user profile storage and read it back when making decisions. Participants must also respect any AdChoices Signal passed to them at a given transaction; for example, if a DSP receives an AdChoices Signal in the bid request for a user.

For clarity, it is **not** required that AdChoices Signals be handled in real-time only on a per-transaction basis --- participants should store the user's preferences when the YourAdChoices tool makes a call to the choice status endpoint, if possible. Real-time passing is supported so that choice information can be expressed to parties who may not already be able to identify a user. The real-time passing allows for preferences to be respected if those other parties establish identity later, for example, through probabilistic methods.

***Important:* Generation of the string occurs only in the YourAdChoices tool so that multiple parties may independently store the current preferences without the issue of conflicting versions. (Refer to the diagram in [Appendix 7](#appendix-7-adchoices-signal-usage-illustration) for clarification.)**

## Appendix 1: Participants Reference File

The DAA has published a JSON format reference file for participants at: <br>
**[https://files.aboutads.info/participants.json](https://files.aboutads.info/participants.json)**

This file enumerates the participating companies which may be indicated in the AdChoices Signal. This Appendix describes the file format. Additional fields may be added in the future and consumers of the file should handle unexpected fields gracefully.

Consumers of AdChoices Signals can poll this file from time to time to learn of new participants. **Consumers of the file should not poll the file more frequently than daily, and not less frequently than weekly.**

### Root object

| **Field**     | **Type**          | **Description**                                         |
|--------------|-------------------|---------------------------------------------------------|
| lastUpdated  | integer           | Time at which the file was last updated, expressed as seconds since Unix epoch.   |
| participants | array of objects  | An array of Participant objects.                        |

### Participant object

| **Field**   | **Type**  | **Description**                                                                 |
|------------|-----------|---------------------------------------------------------------------------------|
| id         | integer   | The ID assigned to the participant by the DAA. Numbers should not be assumed to be contiguous. |
| name       | string    | The name of the company.                                                         |
| active     | integer   | Indicates if the company is active in the program (0 = false, 1 = true).                        |
| direct     | integer   | DAA Internal Use Only.                                                           |
| verified   | integer   | Indicates if the company has a verified solution for retrieving the AdChoices Signal from Protect My Choices. |
| gvl        | integer   | The ID assigned to the participant within IAB Europe's Global Vendor List (optional). |

### Example file

``` 
{
  "lastUpdated": "1630612395",
  "participants": [
    {
      "id": "1",
      "name": "AdClicks",
      "active": "1",
      "direct": "0",
      "verified": "1",
      "gvl": "123"
    },
    {
      "id": "2",
      "name": "SuperDSP",
      "active": "0",
      "direct": "1",
      "verified": "0",
      "gvl": "456"
    },
  ]
}
```

## Appendix 2: Category Reference File

The DAA has published a JSON format reference file for categories at: <br>
**[https://files.aboutads.info/categories.json](https://files.aboutads.info/categories.json)**

This file contains the taxonomy of categories users can express a preference for and may be indicated in the AdChoices Signal. This Appendix describes the file format. Additional fields may be added in the future and consumers of the file should handle unexpected fields gracefully.

Consumers of AdChoices Signals can poll this file from time to time to learn of new categories. **Consumers of the file should not poll the file more frequently than daily and not less frequently than weekly.**

***Important:* The category-level preferences will initially be offered to consumers on a "best-effort-basis" as companies work over time to implement systemized ways in which to be responsive to these consumer signals.**

### Root object

| **Field**     | **Type**          | **Description**                                         |
|--------------|-------------------|---------------------------------------------------------|
| lastUpdated  | integer           | Time at which the file was last updated, expressed as seconds since Unix epoch.   |
| categories   | array of objects  | An array of category objects.                            |

## Category object

| **Field**   | **Type**  | **Description**                                                                 |
|------------|-----------|---------------------------------------------------------------------------------|
| id         | integer   | The ID assigned to the category by the DAA. Numbers are not necessarily contiguous. |
| name       | string    | The name of the category.                                                         |
| active     | integer   | Indicates if the category is in active use (0 = false, 1 = true).                |

### Example file

```
{
  "lastUpdated": "1630612395",
  "categories": [
    {
      "id": "1",
      "name": "Arts & Entertainment",
      "active": "1"
    },
    {
      "id": "2",
      "name": "Retail",
      "active": "1"
    },
  ]
}
```

### Sample category list

The following table is included to give a sense of the initial preference categories for the specification. Please note, this list is just an initial sample. **Always refer to the public resource file at [https://files.aboutads.info/categories.json](https://files.aboutads.info/categories.json) for the latest taxonomy**.

| **Category ID** | **Category name**                                 |
|-----------------|---------------------------------------------------|
| 1               | Automotive                                        |
| 2               | Careers                                           |
| 3               | Community & Culture                               |
| 4               | Consumer Electronics                              |
| ...             | ...                                               |
| 22              | Shopping: Consumer Packaged Good & Non-Apparel    |
| 23              | Sports & Outdoor                                  |
| 24              | Tech & Internet                                   |
| 25              | Travel                                            |

## Appendix 3: Choice Statuses

| **Value** | **Description**                                               |
|----------|---------------------------------------------------------------|
| 0        | The user has explicitly chosen to limit data collection and use for IBA. |
| 1        | The user has explicitly chosen to allow data collection and use for IBA. |
| 2        | The user has explicitly expressed that they have no preference.          |

## Appendix 4: Category Preferences

| **Value** | **Description**                                               |
|----------|---------------------------------------------------------------|
| 0        | The user has expressed an explicit preference to limit advertising in this category. |
| 1        | The user has expressed an explicit preference to allow/include this category.         |
| 2        | The user has explicitly expressed that they have no preference.                       |

## Appendix 5: OpenRTB 2.x Community Extension

To enable AdChoices Signals to be conveyed in OpenRTB bid requests, the following community extension is proposed for OpenRTB 2.x.

In the "ext" object of the "regs" object:

| **Field**   | **Type** | **Description**                                               |
|------------|----------|---------------------------------------------------------------|
| adchoices  | string   | An AdChoices Signal, as specified in the DAA's AdChoices Signal Specification. |

For context, OpenRTB 2.x supports additional fields through the use of ```ext``` objects. Fields included in ```ext``` objects are designed to be a "*placeholder for exchange-specific extensions to OpenRTB."* In other words, specific exchanges can include new fields (e.g., ```regs.ext.adchoices```) in these ```ext``` objects, unilaterally, to accommodate the AdChoices Signal.

In OpenRTB 2.6, there is also an object called ```regs``` ([section 3.2.3 of the specification](https://github.com/InteractiveAdvertisingBureau/openrtb2.x/blob/develop/2.6.md#objectregs)) that contains fields like '*coppa', 'gdpr', 'us_privacy', 'gpp'*, and so on. According to the specification, the ```regs``` object "*contains any legal, governmental, or industry regulations that the sender deems applicable to the request*." Therefore, the ```regs``` object appears to be the most appropriate place to include the AdChoices Signal.

## Appendix 6: String Format Graphic Illustration

![String Format Graphic Illustration](https://assets.aboutads.info/docs/appendix6.png)

## Appendix 7: AdChoices Signal Usage Illustration

![AdChoices Signal Usage Illustration](https://assets.aboutads.info/docs/appendix7.png)

## Appendix 8: Reading The AdChoices Signal From The PMC Extension

![Reading The AdChoices Signal From The PMC Extension](https://assets.aboutads.info/docs/appendix8.png)




[^1]: At the time of writing this specification, there are four jurisdictions where Self-Regulatory Programs on IBA exist: US (DAA), Canada (DAAC), Europe (EDAA), and Argentina (APDA).

[^2]: This specification is designed to be extensible, and the possible values may be extended in future versions.

[^3]: The user explicitly desires IBA for the interest category (i.e.,  category included) -- This feature may be available in a future release.

[^4]: The most recent version of the DAA token ID-based choice tool API acknowledges that ID types may be fluid and allows for a parameterizable 'ID Type' variable to be passed. The current default ID Type is email (idt=email). Future uses of idt could be idt=phone, idt=ami, etc.

[^5]: See [RFC 4648 sec 5](https://datatracker.ietf.org/doc/html/rfc4648#section-5).
