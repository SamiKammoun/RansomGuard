const config = require("./config");

async function main() {
  Guard = await ethers.getContractFactory("Guard");
  guard = await Guard.attach(config.CONTRACT_ADDRESS);
  [account0, account1, account2] = await ethers.getSigners();
  console.log("Revealing");
  await guard.connect(account2).Reveal(config.COUNTER, config.PRIVATE_KEY_CID, "blind");
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
