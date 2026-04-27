# DAA Choice Tools - Technical Documentation

The global Digital Advertising Alliance (DAA) self-regulatory frameworks are designed to support responsible data practices in digital advertising by providing consumers with meaningful transparency and control over the collection and use of their data for interest-based advertising (IBA). The tools offered by the DAA align with evolving regulatory expectations by enabling standardized mechanisms for notice, choice, and accountability across the advertising ecosystem.

This GitHub repository serves as a centralized resource for technical specifications related to the DAA’s consumer choice tools and supporting infrastructure. It is intended for product managers and engineers responsible for implementing these specifications to support transparency and consumer choice across digital advertising environments.

The DAA provides a set of interoperable tools that enable consumers to exercise choice across different identifier environments used in digital advertising, including browser-based, mobile, and token-based identifiers.

<div align="center">
  <img src="https://assets.youradchoices.ca/github/toolsoverview.png" alt="DAA Consumer Choice Framework Across Identifier Environments">
</div>

## DAA Choice Tools Overview
The DAA ecosystem includes the following tools:

### Consumer Choice Tools
- **WebChoices:** Browser-based tool that allows consumers to opt out of interest-based advertising using cookies. Also generates the AdChoices Signal.
- **AppChoices:** Mobile application that enables consumers to opt out of interest-based advertising using mobile advertising identifier (e.g., device advertising IDs).
- **TokenChoices:** Tool that enables consumers to opt out of, or express preferences related to, interest-based advertising using tokenized identifiers (e.g., hashed email addresses or hashed phone numbers).

### Signal & Persistence
- **AdChoices Signal:** A machine-readable signal that communicates consumer advertising preferences to participating companies.
- **Protect My Choices:** A browser extension that stores and helps persist consumer opt-out preferences across browsing sessions.

Together, these tools provide consumers with transparency and control across the different technologies used to support interest-based advertising.


## Getting Started
To understand how to integrate with the DAA's ecosystem of tools, we recommend reviewing the specifications in the following order:

1. **AdChoices Signal Specification:** Understand the core data format (a machine-readable string) for encoding user preferences. Important data flow diagrams contained within.
2. **WebChoices Implementation Instructions:** For browser-based opt-out integrations using cookies and signal generation.
3. **AppChoices Implementation Instructions:** For integrations involving mobile advertising identifiers.
4. **TokenChoices Implementation Instructions:** For integrations involving tokenized identifiers such as hashed email addresses or phone numbers.
5. **Protect My Choices Technical Specifications:** Understand how to access and persist user preferences via the AdChoices Signal.

Each specification provides examples and detailed field descriptions to support implementation.

## Participation & Next Steps
If you're already a DAA participant, these tools are available to you now in the U.S., Canada, and Argentina (no extra jurisdictional cost at this time). Future fees may apply.

For integration questions, please contact [jamie@aboutads.info](mailto:jamie@aboutads.info)

## About the DAA and AdChoices
The Digital Advertising Alliance (DAA) is a non-profit industry self-regulatory body backed by leading advertising trade associations. For over a decade, the DAA has operated the AdChoices program, which provides consumers with transparency (clear notice) and control (easy-to-use tools) over interest-based advertising (IBA), also known as online behavioral advertising.

The AdChoices Icon is the program's most visible element. It appears on ads, websites, and apps, and links users to information about data collection and their privacy options. It is served billions of times per day worldwide and is widely recognized as a signal of transparency and consumer choice.
