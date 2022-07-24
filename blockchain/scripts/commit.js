const config = require("./config");

async function main() {
  Guard = await ethers.getContractFactory("Guard");
  guard = await Guard.attach(config.CONTRACT_ADDRESS);
  [account0, account1, account2] = await ethers.getSigners();
  console.log("Commiting");
  await guard
    .connect(account2)
    .Commit(
      0,
      ethers.utils.solidityKeccak256(
        ["address", "string", "string"],
        [account2.address, config.PRIVATE_KEY_CID, "blind"]
      )
    );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
