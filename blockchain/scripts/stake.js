const { CONTRACT_ADDRESS, CID } = require("./config");

async function main() {
  Guard = await ethers.getContractFactory("Guard");
  guard = await Guard.attach(CONTRACT_ADDRESS);
  [account0, account1, account2] = await ethers.getSigners();

  await guard.connect(account1).Stake(CID, { value: ethers.BigNumber.from("2000000000000000000") });
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
