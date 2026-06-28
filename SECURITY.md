# Security Policy

## Supported Versions

We provide security patches for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

Only the latest minor release of the `0.1.x` line is actively supported with security updates.

## Reporting a Vulnerability

We take security vulnerabilities seriously. Please report any security issues via **GitHub Private Vulnerability Reporting**:

1. Navigate to the repository's **Security** tab.
2. Click **Report a vulnerability**.
3. Provide a detailed description, including steps to reproduce, affected versions, and any potential impact.

Alternatively, you can email us at: **security@stellar.org** (PGP key available at [stellar.org/security](https://stellar.org/security)).

We ask that you **do not** disclose the vulnerability publicly until we have had a chance to address it.

## Disclosure Timeline

- **Acknowledgment**: We will acknowledge your report within 48 hours.
- **Assessment**: We will triage and assess the issue within 5 business days.
- **Fix & Release**: A fix will be developed and released within 90 days of confirmation (depending on severity).
- **Public Disclosure**: After a fix is released, we will publicly disclose the vulnerability with credit to the reporter.

If the vulnerability is critical or under active exploitation, we may accelerate this timeline.

## Bug Bounty Program

This project is part of the **Stellar Ecosystem Bug Bounty** program. Eligible vulnerabilities may qualify for rewards. For details on scope and rewards, see [stellar.org/bug-bounty](https://stellar.org/bug-bounty).

All reports are reviewed on a case-by-case basis. The bounty is managed by the Stellar Development Foundation.

## Scope

### In Scope

- The Soroban smart contract (`contracts/onboarding-bridge/`) – logic, fee calculations, access controls, replay attacks.
- The TypeScript SDK (`sdk/`) – transaction construction, key handling, validation logic.
- The indexer (`indexer/`) – event processing, database interactions, API endpoints.
- The relayer (`relayer/`) – transaction submission logic.
- Any dependencies explicitly imported and used in a security-critical context.

### Out of Scope

- Third-party services (e.g., CEX withdrawal endpoints, Moonpay, Transak).
- Infrastructure configurations (except where they directly affect the security of the on-chain contracts).
- Issues that require physical access, social engineering, or denial-of-service attacks on the Stellar network itself.
- Theoretical attacks with no practical exploit path.
- Already publicly known vulnerabilities (check our issue tracker).

## Recognition Policy

We believe in giving credit where it’s due. Reporters who follow responsible disclosure will be:

- Acknowledged in the release notes for the fix.
- Listed on our **Security Hall of Fame** page (if they consent).
- Eligible for a **bug bounty** (if the report qualifies).

We appreciate your contributions to keeping this project secure.
