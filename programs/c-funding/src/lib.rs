use anchor_lang::prelude::*;

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod states;

use instructions::*;

declare_id!("HwejASfjpMRUEGmD78gXnLX4Ga4YUMwqE45JdbQGbRKX");

#[program]
pub mod c_funding {
    use super::*;

    pub fn initialize(ctx: Context<InitializeCtx>) -> Result<()> {
        instructions::initialize(ctx)
    }

    pub fn create_campaign(
        ctx: Context<CreateCampaignCtx>,
        title: String,
        description: String,
        image_url: String,
        goal: u64,
    ) -> Result<()> {
        instructions::create_campaign(ctx, title, description, image_url, goal)
    }

    pub fn update_campaign(
        ctx: Context<UpdateCampaignCtx>,
        cid: u64,
        title: String,
        description: String,
        image_url: String,
        goal: u64,
    ) -> Result<()> {
        instructions::update_campaign(ctx, cid, title, description, image_url, goal)
    }

    pub fn delete_campaign(ctx: Context<DeleteCampaignCtx>, cid: u64) -> Result<()> {
        instructions::delete_campaign(ctx, cid)
    }

    pub fn donate(ctx: Context<DonateCtx>, cid: u64, amount: u64) -> Result<()> {
        instructions::donate(ctx, cid, amount)
    }

    pub fn withdraw(ctx: Context<WithdrawCtx>, cid: u64, amount: u64) -> Result<()> {
        instructions::withdraw(ctx, cid, amount)
    }

    pub fn update_platform_settings(
        ctx: Context<UpdatePlatformSettingsCtx>,
        new_platform_fee: u64,
    ) -> Result<()> {
        instructions::update_platform_settings(ctx, new_platform_fee)
    }
}
