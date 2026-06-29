# 🍀 CLO-VER

> **C**hain **L**inked **O**nchain — **V**erified **E**conomic **R**ails

A monorepo for building fast, mobile-first onchain experiences on the **Stellar** ecosystem — powered by **Soroban smart contracts (Rust)**, an **Express** API layer, and a **React** frontend.

---

## 🍀 About CLO-VER

CLO-VER is a unified development framework and monorepo for shipping consumer-grade onchain products on **Stellar**. It exists to solve a recurring problem for teams building games, mini-apps, and social-fi experiences: contracts, backend services, and frontend clients tend to drift apart, duplicate logic, and slow teams down as they scale across multiple products.

CLO-VER fixes that by giving every layer — Rust/Soroban contracts, the Express API, and the React client — a shared home, shared types, and shared tooling, so a single team (or even a single developer) can move from idea to deployed onchain experience without stitching together disconnected repos.

At its core, CLO-VER is built around three guiding ideas:

- **Speed without sacrificing trust.** Onchain consumer apps live and die by how fast they feel. CLO-VER's API layer and client SDKs are designed to make Stellar/Soroban interactions feel instant, while every critical state change is still verified and settled onchain.
- **One codebase, many products.** Whether you're building a brick-breaker arcade game, a card-flip mini-app, or a social-fi rewards hub, CLO-VER's shared packages (auth, wallet connections, contract clients, UI primitives) mean you're not rebuilding the same plumbing for every new app.
- **Mobile-first, wallet-native.** CLO-VER is designed with mobile mini-app contexts in mind — quick onboarding, lightweight sessions, and frictionless wallet interactions — so players and users can go from tap to transaction in seconds.

In short: **CLO-VER is the "four-leaf" foundation — contracts, API, frontend, and infra — that lets teams plant an idea and grow a fully onchain product on Stellar, fast.**

---

## 🍀 Why CLO-VER?

Just like a four-leaf clover, CLO-VER brings together four core pillars in one lucky, unified codebase:

| 🍀 | Layer | Stack |
|----|-------|-------|
| 1 | **Smart Contracts** | Rust + Soroban (Stellar) |
| 2 | **Backend API** | Express (Node.js / TypeScript) |
| 3 | **Frontend** | React |
| 4 | **Infra & Tooling** | Monorepo-managed, shared configs & CI |

CLO-VER is built for teams shipping **onchain consumer apps** — games, mini-apps, and social-fi products — that need to move fast across web, wallets, and mobile-first surfaces, with Stellar as the settlement and asset layer underneath.

---

## 🎮 What You Can Build with CLO-VER

CLO-VER's shared architecture is designed to support a wide range of onchain consumer products, including:

- **Arcade & skill-based games** — fast, session-based games where rounds settle onchain (e.g. brick-breaker style arcade titles, timing/reflex games).
- **Card & chance-based mini-apps** — deposit-once, play-many experiences where users mint in-app credits and redeem winnings back to their wallet.
- **Brain & focus training hubs** — memory, pattern recognition, and reaction-based mini-games with optional staking and reward vaults.
- **Competitive on-chain mind games** — strategy and prediction-based games where a player's on-chain history becomes part of the gameplay itself.
- **Social-fi & rewards platforms** — token-gated communities, staking hubs, and utility-unlock systems built around a native or partner token.

Each of these product types shares the same underlying needs — wallet connection, fast reads/writes against Soroban contracts, session management, and a clean mobile UI — which is exactly what CLO-VER's monorepo structure provides out of the box.

---

## 📁 Monorepo Structure

```
clo-ver/
├── apps/
│   ├── web/              # React frontend
│   └── api/               # Express backend
├── contracts/
│   └── soroban/           # Rust / Soroban smart contracts
├── packages/
│   ├── shared/             # Shared types, utils, constants
│   └── stellar-sdk-client/  # Stellar/Soroban client wrappers
├── scripts/                # Build, deploy & dev tooling
└── README.md
```

---

## 🌱 Tech Stack

- **Blockchain:** Stellar / Soroban
- **Smart Contracts:** Rust
- **Backend:** Express.js (Node.js)
- **Frontend:** React
- **Monorepo Tooling:** npm/yarn/pnpm workspaces (or Turborepo/Nx)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Rust & Cargo
- Soroban CLI
- A Stellar account (Testnet/Futurenet recommended for development)

### Installation

```bash
# Clone the repo
git clone https://github.com/your-org/clo-ver.git
cd clo-ver

# Install dependencies across the monorepo
npm install
```

### Running the Backend (Express)

```bash
cd apps/api
npm run dev
```

### Running the Frontend (React)

```bash
cd apps/web
npm run dev
```

### Building & Deploying Soroban Contracts (Rust)

```bash
cd contracts/soroban
soroban contract build
soroban contract deploy --network testnet
```

---

## 🍀 Core Principles

- **Onchain-first** — Stellar/Soroban as the source of truth for assets, balances, and state.
- **Mobile-first UX** — fast load, simple flows, instant interactions.
- **Monorepo discipline** — shared types and clients keep frontend, backend, and contracts in sync.
- **Composable by design** — built to support multiple apps/mini-apps sharing the same contract and infra layer.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes
4. Push to the branch
5. Open a pull request

---

## 📜 License

This project is licensed under the MIT License — see the `LICENSE` file for details.

---

<p align="center">Built with 🍀 luck and on-chain logic, on Stellar.</p>
