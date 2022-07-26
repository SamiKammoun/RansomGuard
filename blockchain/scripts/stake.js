const config = require("./config");
async function main() {
  Guard = await ethers.getContractFactory("Guard");
  guard = await Guard.attach(config.CONTRACT_ADDRESS);
  [account0, account1, account2] = await ethers.getSigners();
  await guard.connect(account1).Stake(config.USER_CID, { value: ethers.BigNumber.from("200000") });
  console.log("Staked Successfully");
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
