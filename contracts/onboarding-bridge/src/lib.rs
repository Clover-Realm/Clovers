#![no_std]

use soroban_sdk::{
    contract, contracterror, contractimpl, contracttype, token, Address, Env, Vec,
};

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
pub enum BridgeError {
    NotInitialized = 1,
    AlreadyInitialized = 2,
    InvalidAmount = 3,
    FeeTooHigh = 4,
    MismatchedArrays = 5,
}

#[contracttype]
pub enum DataKey {
    Admin,
    FeeCollector,
    FeeBps,
    Initialized,
}

const MAX_FEE_BPS: u32 = 1_000;
const FEE_DENOMINATOR: i128 = 10_000;

fn save_admin(env: &Env, admin: &Address) {
    env.storage().instance().set(&DataKey::Admin, admin);
}

fn read_admin(env: &Env) -> Address {
    env.storage()
        .instance()
        .get(&DataKey::Admin)
        .unwrap()
}

fn save_fee_collector(env: &Env, addr: &Address) {
    env.storage()
        .instance()
        .set(&DataKey::FeeCollector, addr);
}

fn read_fee_collector(env: &Env) -> Address {
    env.storage()
        .instance()
        .get(&DataKey::FeeCollector)
        .unwrap()
}

fn save_fee_bps(env: &Env, fee_bps: &u32) {
    env.storage().instance().set(&DataKey::FeeBps, fee_bps);
}

fn read_fee_bps(env: &Env) -> u32 {
    env.storage()
        .instance()
        .get(&DataKey::FeeBps)
        .unwrap_or(0)
}

fn read_initialized(env: &Env) -> bool {
    env.storage().instance().has(&DataKey::Initialized)
}

fn mark_initialized(env: &Env) {
    env.storage()
        .instance()
        .set(&DataKey::Initialized, &true);
}

fn check_initialized(env: &Env) {
    if !read_initialized(env) {
        panic!("not initialized");
    }
}

fn calculate_fee(amount: i128, fee_bps: u32) -> i128 {
    (amount * fee_bps as i128) / FEE_DENOMINATOR
}

#[contract]
pub struct OnboardingBridge;

#[contractimpl]
impl OnboardingBridge {
    /// Initializes the bridge contract configuration.
    ///
    /// # Arguments
    /// * `env` - Soroban environment for storage and authorization.
    /// * `admin` - Address authorized to update bridge configuration.
    /// * `fee_collector` - Address authorized to withdraw accumulated fees.
    /// * `fee_bps` - Fee in basis points; must not exceed the contract maximum.
    ///
    /// # Authorization
    /// Requires authorization from `admin`.
    ///
    /// # Panics
    /// Panics if the contract is already initialized or if `fee_bps` is too high.
    ///
    /// # Security
    /// Call this once during deployment with reviewed admin and fee collector addresses.
    pub fn initialize(env: Env, admin: Address, fee_collector: Address, fee_bps: u32) {
        if read_initialized(&env) {
            panic!("already initialized");
        }
        if fee_bps > MAX_FEE_BPS {
            panic!("fee too high");
        }
        admin.require_auth();
        save_admin(&env, &admin);
        save_fee_collector(&env, &fee_collector);
        save_fee_bps(&env, &fee_bps);
        mark_initialized(&env);
    }

    /// Funds a single C-address with tokens from a source account.
    ///
    /// The contract transfers the gross amount from `source`, deducts the configured fee, sends the net amount to `target`, and records the fee balance on the contract.
    ///
    /// # Arguments
    /// * `env` - Soroban environment for token calls and events.
    /// * `source` - Account providing tokens; must authorize the transfer.
    /// * `target` - C-address receiving the net amount.
    /// * `asset` - Token contract address.
    /// * `amount` - Gross amount before fee deduction.
    ///
    /// # Authorization
    /// Requires authorization from `source`.
    ///
    /// # Events
    /// Emits `CAddressFunded` with source, target, asset, net amount, and fee.
    ///
    /// # Panics
    /// Panics if the contract is not initialized, amount is non-positive, auth fails, or the token transfer fails.
    ///
    /// # Security
    /// Validate the target C-address and asset before asking a user to sign.
    pub fn fund_c_address(
        env: Env,
        source: Address,
        target: Address,
        asset: Address,
        amount: i128,
    ) {
        check_initialized(&env);
        if amount <= 0 {
            panic!("invalid amount");
        }
        source.require_auth();

        let token_client = token::Client::new(&env, &asset);
        token_client.transfer(&source, &env.current_contract_address(), &amount);

        let fee_bps = read_fee_bps(&env);
        let fee = calculate_fee(amount, fee_bps);
        let net_amount = amount - fee;

        if net_amount > 0 {
            token_client.transfer(&env.current_contract_address(), &target, &net_amount);
        }

        env.events().publish(
            ("CAddressFunded", source, target),
            (amount, fee, asset),
        );
    }

    /// Funds multiple C-addresses in one transaction.
    ///
    /// # Arguments
    /// * `env` - Soroban environment for token calls and events.
    /// * `source` - Account providing tokens for every transfer; must authorize once.
    /// * `targets` - C-address recipients.
    /// * `asset` - Token contract address shared by the batch.
    /// * `amounts` - Gross amounts matching the `targets` order.
    ///
    /// # Authorization
    /// Requires authorization from `source`.
    ///
    /// # Events
    /// Emits one `CAddressFunded` event for each successful target transfer.
    ///
    /// # Panics
    /// Panics if the contract is not initialized, array lengths differ, an amount is invalid, authorization fails, or token transfer fails.
    ///
    /// # Security
    /// Callers should cap batch sizes at the UI or service layer to keep fees and execution costs predictable.
    pub fn batch_fund_c_address(
        env: Env,
        source: Address,
        targets: Vec<Address>,
        amounts: Vec<i128>,
        asset: Address,
    ) {
        check_initialized(&env);
        if targets.len() != amounts.len() {
            panic!("mismatched arrays");
        }
        if targets.len() == 0 {
            return;
        }
        source.require_auth();

        let mut total: i128 = 0;
        for i in 0..targets.len() {
            let amount = amounts.get(i).unwrap();
            if amount <= 0 {
                panic!("invalid amount");
            }
            total += amount;
        }

        let token_client = token::Client::new(&env, &asset);
        token_client.transfer(&source, &env.current_contract_address(), &total);

        let fee_bps = read_fee_bps(&env);
        let contract_addr = env.current_contract_address();

        for i in 0..targets.len() {
            let target = targets.get(i).unwrap();
            let amount = amounts.get(i).unwrap();
            let fee = calculate_fee(amount, fee_bps);
            let net_amount = amount - fee;

            if net_amount > 0 {
                token_client.transfer(&contract_addr, &target, &net_amount);
            }

            env.events().publish(
                ("CAddressFunded", source.clone(), target),
                (amount, fee, asset.clone()),
            );
        }
    }

    /// Updates the bridge fee in basis points.
    ///
    /// # Arguments
    /// * `env` - Soroban environment for storage and authorization.
    /// * `new_fee_bps` - New fee value, capped by the contract maximum.
    ///
    /// # Authorization
    /// Requires authorization from the current admin.
    ///
    /// # Panics
    /// Panics if the contract is not initialized, admin auth fails, or the fee exceeds the maximum.
    ///
    /// # Security
    /// Treat fee changes as admin operations that should be reviewed and monitored.
    pub fn set_fee_bps(env: Env, new_fee_bps: u32) {
        check_initialized(&env);
        if new_fee_bps > MAX_FEE_BPS {
            panic!("fee too high");
        }
        let admin = read_admin(&env);
        admin.require_auth();
        save_fee_bps(&env, &new_fee_bps);
    }

    /// Updates the address allowed to withdraw accumulated fees.
    ///
    /// # Arguments
    /// * `env` - Soroban environment for storage and authorization.
    /// * `new_fee_collector` - Replacement fee collector address.
    ///
    /// # Authorization
    /// Requires authorization from the current admin.
    ///
    /// # Panics
    /// Panics if the contract is not initialized or admin auth fails.
    ///
    /// # Security
    /// Verify custody and operational ownership of the new fee collector before changing it.
    pub fn set_fee_collector(env: Env, new_fee_collector: Address) {
        check_initialized(&env);
        let admin = read_admin(&env);
        admin.require_auth();
        save_fee_collector(&env, &new_fee_collector);
    }

    /// Transfers bridge administration to a new address.
    ///
    /// # Arguments
    /// * `env` - Soroban environment for storage and authorization.
    /// * `new_admin` - Replacement admin address.
    ///
    /// # Authorization
    /// Requires authorization from the current admin.
    ///
    /// # Panics
    /// Panics if the contract is not initialized or admin auth fails.
    ///
    /// # Security
    /// Admin rotation should be rehearsed and recorded because the new admin controls future configuration changes.
    pub fn set_admin(env: Env, new_admin: Address) {
        check_initialized(&env);
        let admin = read_admin(&env);
        admin.require_auth();
        save_admin(&env, &new_admin);
    }

    /// Withdraws accumulated fees to the configured fee collector.
    ///
    /// # Arguments
    /// * `env` - Soroban environment for token calls and authorization.
    /// * `asset` - Token contract address whose fees should be withdrawn.
    /// * `amount` - Amount to withdraw from the contract fee balance.
    ///
    /// # Authorization
    /// Requires authorization from the configured fee collector.
    ///
    /// # Events
    /// Emits `FeesWithdrawn` with fee collector, asset, and amount.
    ///
    /// # Panics
    /// Panics if the contract is not initialized, amount is non-positive, fee collector auth fails, or the token transfer fails.
    ///
    /// # Security
    /// Withdrawals should be tied to an operational schedule and reconciled against emitted events.
    pub fn withdraw_fees(env: Env, asset: Address, amount: i128) {
        check_initialized(&env);
        if amount <= 0 {
            panic!("invalid amount");
        }
        let fee_collector = read_fee_collector(&env);
        fee_collector.require_auth();

        let token_client = token::Client::new(&env, &asset);
        token_client.transfer(&env.current_contract_address(), &fee_collector, &amount);

        env.events()
            .publish(("FeesWithdrawn", fee_collector), (amount, asset));
    }

    /// Returns the configured bridge fee in basis points.
    ///
    /// # Arguments
    /// * `env` - Soroban environment for reading instance storage.
    ///
    /// # Returns
    /// Current fee basis points, or zero if not set.
    pub fn query_fee_bps(env: Env) -> u32 {
        check_initialized(&env);
        read_fee_bps(&env)
    }

    /// Returns the configured fee collector address.
    ///
    /// # Arguments
    /// * `env` - Soroban environment for reading instance storage.
    ///
    /// # Returns
    /// Fee collector address.
    ///
    /// # Panics
    /// Panics if the fee collector has not been initialized.
    pub fn query_fee_collector(env: Env) -> Address {
        check_initialized(&env);
        read_fee_collector(&env)
    }

    /// Returns the configured admin address.
    ///
    /// # Arguments
    /// * `env` - Soroban environment for reading instance storage.
    ///
    /// # Returns
    /// Admin address.
    ///
    /// # Panics
    /// Panics if the admin has not been initialized.
    pub fn query_admin(env: Env) -> Address {
        check_initialized(&env);
        read_admin(&env)
    }

    /// Reads a token balance for an address.
    ///
    /// # Arguments
    /// * `env` - Soroban environment for token client calls.
    /// * `c_address` - Address whose balance should be read.
    /// * `asset` - Token contract address.
    ///
    /// # Returns
    /// Token balance as an `i128` amount.
    ///
    /// # Panics
    /// Panics if the token contract call fails.
    pub fn query_balance(env: Env, c_address: Address, asset: Address) -> i128 {
        let token_client = token::Client::new(&env, &asset);
        token_client.balance(&c_address)
    }

    /// Returns whether the bridge has been initialized.
    ///
    /// # Arguments
    /// * `env` - Soroban environment for reading instance storage.
    ///
    /// # Returns
    /// `true` if initialization state exists, otherwise `false`.
    pub fn query_is_initialized(env: Env) -> bool {
        read_initialized(&env)
    }
}

#[cfg(test)]
mod tests;
