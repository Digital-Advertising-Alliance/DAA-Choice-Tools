# AppChoices Implementation Instructions

The DAA's AppChoices app enables users to opt out of interest-based advertising that occurs within applications on their mobile devices. To facilitate consumer choice, the DAA's AppChoices app collects device IDs used to customize ads for users and passes those IDs back to the ad customization platforms when a user chooses to opt out of that platform.

## Table of Contents

[Introduction](#introduction)

[Onboarding to AppChoices](#onboarding-to-appchoices)

[Standard Integrations](#standard-integration)

[Supported IDs](#supported-ids)

[Frequently Asked Questions](#frequently-asked-questions)

## Introduction

The purpose of the AppChoices tool is to provide consumers with a destination to identify participating companies that have committed to responsible advertising practices and are engaged in interest-based advertising (IBA), also known as targeted advertising, within mobile applications on their mobile device. The AppChoices tool also allows consumers to exercise their choices by opting out of the collection and use of mobile app data for IBA from one, several, or all of the participating companies listed in the AppChoices tool.

## Onboarding to AppChoices

Below you will find a checklist of what needs to be accomplished in order to successfully integrate with AppChoices:

1. Please ensure that your company has executed and has an active DAA AppChoices Agreement or has a tool addendum in place.
2. Provide the DAA with your onboarding information (company name, logo, company description, and requested URLs). See the [Frequently Asked Questions](#frequently-asked-questions) section for the full list.
3. Determine which ID(s) you use to track devices. For more guidance, please review the [Supported IDs](#supported-ids) section.
4. Create the opt-out URL to receive ID(s) identified above. For Android and for iOS.
5. Provide the opt-out URLs with the ID order to DAA.
6. DAA will schedule a testing time frame for your URLs to ensure you are receiving the opt-out request correctly. During this time, there will be more back-and-forth communication between the DAA and your company to ensure that, when the opt-out request is sent, you receive the correct ID(s).
7. Integration completed. If you receive the ID(s) correctly, then integration is complete. If you do not receive ID(s) correctly, we will have to work through the issue(s).


## Standard Integration

Once the necessary agreement is in place between your company and the DAA, the AppChoices technical integration process can be initiated.

1. In conjunction with the DAA, your company must develop an HTTPS URL that will ping your server on user opt-out. The URL syntax is at the company's discretion, with the end of the string reserved for a comma-separated list of IDs used for tracking, to be passed in GET or POST.

- Comma Separated Example: https://www.companyA.com/optout/mobile?ID1,ID2,ID3
  - Submitted as: [https://www.companyA.com/optout/mobile?**%adid,%adid,%md5-ad-id**](https://www.companyA.com/optout/mobile?%adid,%adid,%md5-ad-id)

- Key Value Example: https://www.companyA.com/optout/mobile?idfa=ID1&mac=ID2&o_udid=ID3
  - Submitted as: [https://www.companyA.com/optout/mobile?idfa=**%adid**&mac=**%md5-mac-b**&o_udid=**%uudid**](https://www.companyA.com/optout/mobile?idfa=%adid&mac=%md5-mac-b&o_udid=%uudid)

- *Notes:*
  - AppChoices will only pass the IDs required for opt-out. The list is defined during URL integration.
  - It is possible to use a delimiter other than a comma; please request this during the setup process.
  - AppChoices supports, and we encourage you to use, secure URLs.
  - In the event that the ID is not used by the device, you will receive an empty value with the defined key. If you do not use keys, the returned ID list will simply have fewer values.

2. The DAA will integrate this URL into AppChoices with a corresponding company profile. Users will now see the platform listed as an opt-out option within the AppChoices app.

3. When a user opts out, AppChoices will ping the URL with the IDs specific to the device/user.

4. AppChoices will consider the opt-out as being successful when the HTTPS Status Code returns a successful value.

5. After receiving the opt-out beacon from AppChoices, it is the platform's responsibility to recognize and interact with the user as being opted out.

6. The DAA recommends creating an opt-in URL1 working with the same basic structure. Opt-in URLs are not currently supported, but will be in the future. In this use case, the URL syntax should indicate that the user is requesting opt-in.

- Comma Separated Example: https://www.companyA.com/optin/mobile?ID1,ID2,ID3
  - Submitted as: [https://www.companyA.com/**optin**/mobile?**%adid,%adid,%md5-ad-id**](https://www.companyA.com/optin/mobile?%adid,%adid,%md5-ad-id)

- Key Value Example: https://www.companyA.com/optin/mobile?idfa=ID1&mac=ID2&o_udid=ID3
  - Submitted as: [https://www.companyA.com/**optin**/mobile?idfa=**%adid**&mac=**%md5-mac-b**&o_udid=**%uudid**](https://www.companyA.com/optin/mobile?idfa=%adid&mac=%md5-mac-b&o_udid=%uudid)



## Supported IDs

The following IDs are supported by the AppChoices app (or have been supported on a historical basis).

| **Token** | **Description** | **iOS Validity** | **Android Validity** |
|----|----|----|----|
| %o-udid | OpenUDID | Yes |  |
| %md5-mac-b | MD5HashedRawMAC | Yes | Yes |
| %sha1-mac-b | SHA1HashedRawMAC | Yes | Yes |
| %md5-mac-h | MD5HashedMAC | Yes |  |
| %sha1-mac-h | SHA1HashedMAC | Yes |  |
| %adid | AdvertisingIdentifier | Yes | Yes |
| %md5-ad-id | MD5HashedAdvertisingIdentifier | Yes | Yes |
| %sha1-ad-id | SHA1HashedAdvertisingIdentifier | Yes | Yes |

- iOS 7+ no longer supports MAC Address. In these instances, you will be passed "02:00:00:00:00:00"
- The DAA recommends using %adid



## Frequently Asked Questions

**1. What information does the DAA need to include a company in AppChoices?**

The DAA requires the following:

- **Company name:** the name of the company as it should appear in the app
- **Company description:** a brief description of the company and what it does
- **Website URL:** a properly formatted internet address for the company
- **Privacy Policy URL:** a properly formatted internet address for the company's privacy policy (direct link, no redirects)
- **Android Mobile opt-out URL:** The URL where calls from Android devices are made to opt out via one of the supported  types
- **iOS Mobile opt-out URL:** The URL where calls from iOS devices are made to opt out via one of the supported  types
- **Logo:** An image file in PNG format 187 pixels wide 83 pixels high (whitespace can be added to meet dimensional requirements).


**2. Where should this information be sent?**

Please send all material to Jamie Monaco (jamie@aboutads.info).


**3. What  formats are supported?**

AppChoices currently supports the following device ID formats:

**iOS**
- OpenUDID (cleartext)
- MD5HashedRawMAC (MD5 hashed)
- SHA1HashedRawMAC (SHA1 hashed)
- MD5HashedMAC (MD5 hashed)
- SHA1HashedMAC (SHA1 hashed)
- AdvertisingIdentifier (cleartext)
- MD5HashedAdvertisingIdentifier (MD5 hashed)
- SHA1HashedAdvertisingIdentifier (SHA1 hashed)

**Android**
- MD5HashedRawMAC (MD5 hashed)
- SHA1HashedRawMAC (SHA1 hashed)
- AdvertisingIdentifier (cleartext)
- MD5HashedAdvertisingIdentifier (MD5 hashed)
- SHA1HashedAdvertisingIdentifier (SHA1 hashed)


**4. How many device ID formats does a vendor need to support?**

Only one supported format for each device type (Android and iOS) is required.


**5. How should opt-out URLs be formatted?**

URLs can be formatted how your company prefers. AppChoices is compatible with most existing web based mobile opt out APIs. A key and key value pair can be used for device type and device ID, or a key value only configuration with only the device ID, so long as the opt-out API can distinguish between them.


**6. Does AppChoices support encrypted requests?**

Yes, AppChoices supports SSL/TLS over HTTPS connections. TLS 1.0 or higher is recommended as recent security exploits have compromised older encryption protocols.

Examples:
- [https://example.com/mobile_optout?idtype=**device type**&value=**device id**]()
- [https://example.com/mobile_optout?**device type**=**device id**]()
- [https://example.com/mobile_optout?**device id**]()

**7. How long does it take for a company to be added to AppChoices?**

The target turnaround time from request to live in-app is two business weeks. Times can vary based on testing and workload.
