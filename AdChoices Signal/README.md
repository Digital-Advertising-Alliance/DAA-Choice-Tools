# AdChoices Signal Specification
This specification defines the format for encoding users' interest-based advertising (IBA) preferences. It is designed to be extensible and can be associated with various identifiers such as cookie IDs, mobile advertising IDs, or hashed emails.

## Key Concepts

### Purpose
Encodes user choices regarding data collection and use for IBA, promoting transparency and consumer control.

### Format
The AdChoices Signal is a sequence of bits, representing a series of fields in big-endian format, transmitted as a base64url string without padding characters.

### Encoded Information
The signal includes:
- Header Section: Version number (current version is 1) and timestamp.
- Global IBA Choice Status: Indicates if the user has not expressed a choice, explicitly chosen to allow IBA, or explicitly chosen to limit IBA for all DAA participants.
- Per-Participant Records Section: Contains a count of per-participant choice status records, followed by individual participant IDs and their specific choice statuses (e.g., limit or allow IBA for a specific participant). Records are not included if a global status other than "no preference" (value 2) is provided, or if the participant's choice status is also "no preference".
- Per-Category Preferences Section: Contains a count of per-category preference records, followed by individual category IDs and the user's preference for that category (e.g., limit or allow/include for a specific interest category). Records are not included if the choice status for the category is "no preference".

### Usage and Passing
The AdChoices Signal can be received, read, and passed between participating companies in several ways: 
- DAA YourAdChoices Tool: Companies receive the signal directly via their integration endpoint, often with token-based identifiers. The string generation occurs only in the YourAdChoices tool to prevent conflicting versions.
- Protect My Choices Browser Extension: When installed (e.g. after visiting the DAA WebChoices tool), user preferences are stored in the extension as an AdChoices Signal string. Companies can read this value via JavaScript or by looking for specific HTTP headers (e.g., "X-Adchoices" for Chrome, "Cookie2" for Safari) set by the extension.
- URL-Based Passing: The signal can be included as a adchoices_signal parameter in URLs when making calls between parties (e.g., SSPs to DSPs).
- Macros: Recommended macro ${ADCHOICES_SIGNAL} for passing to third-party ad servers or measurement vendors.

### Participant Responsibilities
Participants receiving an AdChoices Signal must respect the choice statuses expressed within it, similar to handling an opt-out cookie, and should use category preferences to modify their IBA behavior. Real-time passing is supported to ensure preferences are respected even if identity is established later.

### Reference Files:
- Participants Reference File: A JSON file (participants.json) published by the DAA, enumerating participating companies with their IDs, names, and active status.
- Category Reference File: A JSON file (categories.json) published by the DAA, containing the taxonomy of categories users can express preferences for, including ID, name, and active status.
