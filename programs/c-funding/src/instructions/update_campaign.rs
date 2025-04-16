use crate::errors::ErrorCode::*;
use crate::states::Campaign;
use anchor_lang::prelude::*;

pub fn update_campaign(
    ctx: Context<UpdateCampaignCtx>,
    cid: u64,
    title: String,
    description: String,
    image_url: String,
    goal: u64,
) -> Result<()> {
    let campaign = &mut ctx.accounts.campaign;
    let creator = &mut ctx.accounts.creator;

    if campaign.creator != creator.key() {
        return Err(Unauthorized.into());
    }

    if campaign.cid != cid {
        return Err(CampaignNotFound.into());
    }

    if title.len() > 64 {
        return Err(TitleTooLong.into());
    }
    if description.len() > 512 {
        return Err(DescriptionTooLong.into());
    }
    if image_url.len() > 256 {
        return Err(ImageUrlTooLong.into());
    }
    if goal < 1_000_000_000 {
        return Err(InvalidGoalAmount.into());
    }

    campaign.title = title;
    campaign.description = description;
    campaign.image_url = image_url;
    campaign.goal = goal;

    Ok(())
}

#[derive(Accounts)]
#[instruction(cid: u64)]
pub struct UpdateCampaignCtx<'info> {
    #[account(
        mut,
        seeds = [
            b"campaign",
            cid.to_le_bytes().as_ref()
        ],
        bump
    )]
    pub campaign: Account<'info, Campaign>,

    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}
