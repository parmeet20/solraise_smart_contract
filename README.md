<!--
  ====== Welcome ======
  Paste this into your profile’s README.md for a modern, interactive showcase.
-->

<!-- Hero Section -->
<div align="center">
  <h1>💰 Solraise</h1>
  <p><em>Decentralized Crowdfunding Platform on Solana</em></p>

  <!-- Badges -->
  <p>
    <a href="https://github.com/parmeet20/solraise_smart_contract/stargazers">
      <img src="https://img.shields.io/github/stars/parmeet20/solraise_smart_contract?style=social" alt="Stars" />
    </a>
    <a href="https://github.com/parmeet20/solraise_smart_contract/network/members">
      <img src="https://img.shields.io/github/forks/parmeet20/solraise_smart_contract?style=social" alt="Forks" />
    </a>
    <a href="https://github.com/parmeet20/solraise_smart_contract/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/parmeet20/solraise_smart_contract" alt="License" />
    </a>
    <a href="https://github.com/parmeet20/solraise_smart_contract/issues">
      <img src="https://img.shields.io/github/issues/parmeet20/solraise_smart_contract" alt="Issues" />
    </a>
    <a href="https://crates.io/crates/anchor-lang">
      <img src="https://img.shields.io/crates/v/anchor-lang" alt="Anchor Version" />
    </a>
  </p>

  <!-- Demo GIF / Screenshot -->
  <p>
    <img src="https://raw.githubusercontent.com/parmeet20/solraise_smart_contract/main/docs/demo.gif" alt="Solraise Demo" width="80%" />
  </p>
</div>

---

## 🚀 Why Solraise?

<p align="center">
  Empower creators and communities with on‑chain crowdfunding—transparent, permissionless, and low‑fee on Solana.
</p>

---

## ✨ Core Features

<details>
  <summary><strong>⚙️ Initialize Platform</strong> <em>(Platform Settings)</em></summary>
  <br>
  • **initialize.rs**: Set up global PDAs, platform fee structure, and admin authority.  
  • **Extensible Config**: Easily adjust platform fees, campaign limits, and payout rules.  
</details>

<details>
  <summary><strong>🆕 Create Campaign</strong> <em>(Launch Fundraisers)</em></summary>
  <br>
  • **create_campaign.rs**: Mint a new campaign account with title, goal, deadline, and metadata URI.  
  • **Metadata-Driven**: Link to off‑chain JSON for rich descriptions and media.  
</details>

<details>
  <summary><strong>✏️ Update Campaign</strong> <em>(Edit Campaign Details)</em></summary>
  <br>
  • **update_campaign.rs**: Modify campaign goal, deadline, or metadata before first donation.  
  • **Ownership Check**: Only campaign creator PDA can update its parameters.  
</details>

<details>
  <summary><strong>❌ Delete Campaign</strong> <em>(Cancel Fundraiser)</em></summary>
  <br>
  • **delete_campaign.rs**: Close a campaign, refunding all donors automatically.  
  • **Graceful Cleanup**: Reclaim lamports and archive campaign state.  
</details>

<details>
  <summary><strong>💸 Donate</strong> <em>(Back a Campaign)</em></summary>
  <br>
  • **donate.rs**: Transfer donor’s SOL into campaign escrow PDA.  
  • **Atomic Donation**: Donation and state update occur in a single transaction.  
</details>

<details>
  <summary><strong>🏦 Withdraw</strong> <em>(Collect Funds)</em></summary>
  <br>
  • **withdraw.rs**: Allow campaign creator to withdraw funds once goal met.  
  • **Safety Checks**: Ensures deadline passed and goal reached before withdrawal.  
</details>

<details>
  <summary><strong>🔧 Update Platform Settings</strong> <em>(Admin Controls)</em></summary>
  <br>
  • **update_platform_settings.rs**: Admin can adjust global fee percentage and platform caps.  
  • **Secure Authority**: Only the admin PDA can invoke.  
</details>

---

## 📂 Code Highlights

| 📄 File                                                                                                    | 🔍 Description                                           |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [initialize.rs](programs/c-funding/src/instructions/initialize.rs)                                         | Bootstraps platform PDAs & fee settings                 |
| [create_campaign.rs](programs/c-funding/src/instructions/create_campaign.rs)                               | Launches new crowdfunding campaigns                     |
| [update_campaign.rs](programs/c-funding/src/instructions/update_campaign.rs)                               | Edits existing campaign metadata & parameters           |
| [delete_campaign.rs](programs/c-funding/src/instructions/delete_campaign.rs)                               | Cancels campaigns and refunds donors                    |
| [donate.rs](programs/c-funding/src/instructions/donate.rs)                                                 | Handles donor contributions into escrow PDA             |
| [withdraw.rs](programs/c-funding/src/instructions/withdraw.rs)                                             | Allows creators to withdraw funds after goal completion |
| [update_platform_settings.rs](programs/c-funding/src/instructions/update_platform_settings.rs)             | Adjusts global platform fees & limits                   |
| [mod.rs](programs/c-funding/src/instructions/mod.rs)                                                       | Re‑exports all instruction handlers                     |

---

## 🛠️ Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/parmeet20/solraise_smart_contract.git

# 2. Change into project directory
cd solraise_smart_contract

# 3. Build & Deploy (requires Solana CLI + Anchor)
anchor build
anchor deploy
