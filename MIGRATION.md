# Migration Guide

This guide describes how to plan, test, and execute upgrades for the
C-Address Onboarding Bridge contract and SDK.

The current baseline is `0.1.0`. Future releases should document breaking
changes, storage changes, SDK compatibility, and rollback guidance here.

## Version Compatibility

| Contract Version | SDK Version | Compatibility Notes |
| --- | --- | --- |
| 0.1.x | 0.1.x | Initial bridge, fee, admin, fee collector, and off-ramp SDK flows |
| Future minor versions | Matching minor SDK preferred | Check release notes for new fields or events |
| Future major versions | Matching major SDK required | Review all breaking changes before deployment |

When possible, upgrade the SDK after the contract migration has been rehearsed on
testnet and before directing production users to new functionality.

## Upgrade Checklist

Before upgrading from `0.1.0` or any later release:

1. Read the target release notes and changelog.
2. Identify every changed contract function, event, and storage key.
3. Confirm whether the SDK needs new parameters, return types, or error handling.
4. Run the full contract and SDK test suites locally.
5. Deploy the target contract to testnet.
6. Rehearse the upgrade using testnet state that mirrors production roles,
   assets, limits, and fee settings.
7. Confirm indexer and webhook consumers can read the new events.
8. Prepare rollback instructions and a communication plan.

## Storage Migration Steps

If a release changes storage layout or introduces new persistent keys:

1. Document the old and new storage shape.
2. Add a migration function or initialization guard when needed.
3. Make the migration idempotent so repeated calls do not corrupt state.
4. Test migration from a `0.1.0`-style fixture.
5. Verify balances, accrued fees, admin, fee collector, asset allowlist, daily
   limits, and pause state after migration.
6. Emit an event or keep an auditable transaction record for the migration.

Avoid destructive storage rewrites unless the release notes explicitly require
them. Prefer adding new keys with safe defaults.

## Testnet Rehearsal

Always test upgrades on the Stellar testnet first.

Recommended rehearsal:

```bash
cargo build -p onboarding-bridge --release --target wasm32-unknown-unknown
cargo test -p onboarding-bridge --features testutils
cd sdk && npm test && npm run build
```

Then deploy to testnet, run the expected funding and withdrawal flows, and
compare the observed events with the SDK and indexer expectations.

At minimum, verify:

- `fund_c_address`
- `batch_fund_c_address`
- fee accrual and `withdraw_fees`
- admin-only configuration changes
- pause and unpause behavior
- SDK transaction construction against the upgraded contract

## Example Upgrade Flow

The exact command depends on the final deployment tooling, but an upgrade runbook
should follow this structure:

```bash
# 1. Build the new WASM.
cargo build -p onboarding-bridge --release --target wasm32-unknown-unknown

# 2. Record the current deployed contract ID and admin account.
export CONTRACT_ID="C..."
export ADMIN_SECRET_KEY="S..."

# 3. Deploy or upload the new WASM through the project deployment script.
npx ts-node scripts/deploy.ts upgrade

# 4. Run smoke checks against testnet or production.
npx ts-node scripts/deploy.ts status
```

Keep transaction hashes, WASM hashes, and deployment logs with the release notes.

## Rollback Procedure

If an upgrade fails before users rely on the new version:

1. Pause the contract if the current release supports pausing.
2. Stop relayer or indexer jobs that depend on the broken version.
3. Repoint the deployment configuration to the previous verified WASM hash.
4. Re-run smoke checks for funding, fees, and withdrawal.
5. Publish a status update with the affected version and mitigation.

If storage was migrated, do not assume rollback is safe. First confirm that the
old contract code can read the new storage shape or provide a forward fix.

## Breaking Change Notes

Breaking changes include:

- Renamed or removed contract functions.
- Changed event topics or event payload shape.
- New required authorization paths.
- Storage layout changes.
- SDK method signature changes.
- Changed error codes or panic conditions.
- Required environment or deployment configuration changes.

Each release that includes a breaking change should add a dated section to this
guide or link to a dedicated release note.
