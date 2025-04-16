import * as anchor from '@coral-xyz/anchor';
import { CFunding } from '../target/types/c_funding';
const { PublicKey, SystemProgram } = anchor.web3;
const idl = require('../target/idl/c_funding.json');

describe('c-funding', () => {
  let CID: any, DONORS_COUNT: any, WITHDRAWS_COUNT: any;
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);
  const program = new anchor.Program<CFunding>(idl, provider);

  it('creates a new campaign', async () => {
    const creator = provider.wallet;
    const [programStatePda] = PublicKey.findProgramAddressSync(
      [Buffer.from("program_state")],
      program.programId
    );
    const state = await program.account.programState.fetch(programStatePda);
    CID = state.campaignCount.add(new anchor.BN(1));
    const [campaignPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("campaign"), CID.toArrayLike(Buffer, 'le', 8)],
      program.programId
    )
    const title = `Test campaign title #${CID.toString()}`;
    const description = `Test campaign description #${CID.toString()}`;
    const image_url = `Test campaign image_url #${CID.toString()}`;
    const goal = new anchor.BN(25 * 1_000_000_000);

    const tx = await program.methods.createCampaign(title, description, image_url, goal).accountsPartial({
      programState: programStatePda,
      creator: creator.publicKey,
      systemProgram: SystemProgram.programId,
      campaign: campaignPda,
    }).rpc();
    console.log(`Transaction successful: ${tx}`);
    const res = await program.account.campaign.fetch(campaignPda);
    console.log('Campaign: ', res);
    DONORS_COUNT = res.donors;
    WITHDRAWS_COUNT = res.withdrawals;
  })
  it('donates to campaign', async () => {
    const donor = provider.wallet;
    const [campaignPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("campaign"), CID.toArrayLike(Buffer, 'le', 8)],
      program.programId
    )

    const donation_amount = new anchor.BN(10.5 * 1_000_000_000);

    const [transactionPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("donor"),
      donor.publicKey.toBuffer(),
      CID.toArrayLike(Buffer, 'le', 8),
      DONORS_COUNT.add(new anchor.BN(1)).toArrayLike(Buffer, 'le', 8),
      ],
      program.programId,
    )
    const tx = await program.methods.donate(CID, donation_amount).accountsPartial({
      donor: donor.publicKey,
      transaction: transactionPda,
      systemProgram: SystemProgram.programId,
      campaign: campaignPda,
    }).rpc();
    console.log(`Transaction: ${tx}`);
  })
  it('withdraws from the campaign', async () => {
    const creator = provider.wallet;
    const [campaignPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("campaign"), CID.toArrayLike(Buffer, 'le', 8)],
      program.programId
    );
    const [transactionPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("withdraw"),
      creator.publicKey.toBuffer(),
      CID.toArrayLike(Buffer, 'le', 8),
      WITHDRAWS_COUNT.add(new anchor.BN(1)).toArrayLike(Buffer, 'le', 8),
      ],
      program.programId,
    )
    const [programStatePda] = PublicKey.findProgramAddressSync(
      [Buffer.from("program_state")],
      program.programId
    );

    const programState = await program.account.programState.fetch(programStatePda);

    const withdraw_amount = new anchor.BN(3.5 * 1_000_000_000);
    const tx = await program.methods.withdraw(CID, withdraw_amount).accountsPartial({
      creator: creator.publicKey,
      programState: programStatePda,
      transaction: transactionPda,
      systemProgram: SystemProgram.programId,
      campaign: campaignPda,
      platformAddress:programState.platformAddress,
    }).rpc();
    console.log(`Transaction: ${tx}`);
  })
  it('updates campaign', async () => {
    const creator = provider.wallet;
    const [campaignPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("campaign"), CID.toArrayLike(Buffer, 'le', 8)],
      program.programId
    )
    const newtitle = `Updated campaign title #${CID.toString()}`;
    const newdescription = `Updated campaign description #${CID.toString()}`;
    const newimage_url = `Updated campaign image_url #${CID.toString()}`;
    const newgoal = new anchor.BN(25 * 1_000_000_000);

    const tx = await program.methods.updateCampaign(CID, newtitle, newdescription, newimage_url, newgoal).accountsPartial({
      creator: creator.publicKey,
      systemProgram: SystemProgram.programId,
      campaign: campaignPda,
    }).rpc();
    console.log(`Transaction successful: ${tx}`);
    const res = await program.account.campaign.fetch(campaignPda);
    console.log('Campaign: ', res);
  })
  it('deletes the campaign', async () => {
    const creator = provider.wallet;
    const [campaignPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("campaign"), CID.toArrayLike(Buffer, 'le', 8)],
      program.programId
    )

    const tx = await program.methods.deleteCampaign(CID).accountsPartial({
      creator: creator.publicKey,
      systemProgram: SystemProgram.programId,
      campaign: campaignPda,
    }).rpc();
    console.log(`Transaction successful: ${tx}`);
    const res = await program.account.campaign.fetch(campaignPda);
    console.log('Campaign: ', res);
  })
})