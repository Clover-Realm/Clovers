# Security Policy

## Supported Versions

Security fixes are provided for the current `main` branch and the latest published
contract and SDK releases. Older deployments should upgrade to the latest audited
contract package before requesting support.

| Component | Supported |
| --- | --- |
| Onboarding Bridge contract on `main` | Yes |
| Latest released TypeScript SDK | Yes |
| Older contract or SDK releases | Best effort |
| Private forks or modified deployments | No |

## Reporting a Vulnerability

Please do not open a public issue for security-sensitive findings.

Report vulnerabilities through one of these private channels:

- GitHub private vulnerability reporting, if enabled for this repository.
- A private message to the repository maintainers with the affected component,
  impact, reproduction steps, and any proof-of-concept transaction or test.

Include as much detail as possible:

- Affected contract, SDK, relayer, or indexer version.
- Network and contract ID, when relevant.
- Minimal reproduction steps or failing test.
- Expected impact and whether funds, admin privileges, or user data are at risk.
- Suggested fix, if known.

## Disclosure Timeline

The maintainers aim to acknowledge a valid report within 3 business days.
After triage, the target timeline is:

1. Confirm severity and affected versions.
2. Prepare and review a fix privately when needed.
3. Coordinate deployment, upgrade, or user guidance.
4. Publish a security advisory after users have a reasonable upgrade window.

Public disclosure may be delayed for critical issues that could put active
deployments or user funds at immediate risk.

## Scope

In scope:

- Soroban contract authorization, accounting, fee, pause, upgrade, and fund
  routing behavior.
- TypeScript SDK transaction construction and validation.
- Relayer, indexer, deployment, and configuration paths that can affect bridge
  security.
- Documentation issues that could cause unsafe deployment or key handling.

Out of scope:

- Vulnerabilities in third-party wallets, exchanges, RPC providers, or on-ramp
  services.
- Social engineering, phishing, spam, or denial-of-service against public
  infrastructure.
- Issues that require compromised private keys or maintainer credentials.
- Findings without a reproducible security impact.

## Bug Bounty Information

This repository does not guarantee a standing cash bounty unless a separate
program, grant, or issue explicitly offers one. Maintainers may still recognize
high-quality reports at their discretion.

Never attempt to exploit live users, drain funds, or access private data while
researching a report.

## Recognition

Reporters who follow this policy and provide actionable findings may be credited
in release notes, advisories, or a public acknowledgements section, unless they
request anonymity.
