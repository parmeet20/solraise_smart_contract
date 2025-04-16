use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Th program has already been initialied.")]
    AlreadyInitialized,
    #[msg("Title exceeds the maximum length of 64 characters.")]
    TitleTooLong,
    #[msg("Description exceeds the maximum length of 512 characters.")]
    DescriptionTooLong,
    #[msg("Image URL exceeds the maximum length of 256 characters.")]
    ImageUrlTooLong,
    #[msg("Invalid goal amount. Goal must be greater than zero.")]
    InvalidGoalAmount,
    #[msg("Unauthorized access.")]
    Unauthorized,
    #[msg("Campaign not found.")]
    CampaignNotFound,
    #[msg("Campaign is inactive.")]
    InactiveCampaign,
    #[msg("Donation amount must be at least 1 SOL.")]
    InvalidDonationAmount,
    #[msg("Campaign goal reached.")]
    CampaignGoalActualized,
    #[msg("Withdrawal amount must be at least 1 SOL.")]
    InvalidWithdrawalAmount,
    #[msg("Insufficient funds in the campaign.")]
    InsufficientFund,
    #[msg("The provided platform address is invalid.")]
    InvalidPlatformAddress,
    #[msg("Invalid platform fee percentage.")]
    InvalidPlatformFee,
}
