const { CONTRACT_ADDRESS, PRIVATE_KEY } = require("./config");

async function main() {
  Guard = await ethers.getContractFactory("Guard");
  guard = await Guard.attach(CONTRACT_ADDRESS);
  [account0, account1, account2] = await ethers.getSigners();
  console.log("Commiting");
  await guard
    .connect(account2)
    .Commit(
      0,
      ethers.utils.solidityKeccak256(["address", "string", "string"], [account2.address, PRIVATE_KEY, "blind"])
    );
  console.log("Revealing");
  await guard.connect(account2).Reveal(0, PRIVATE_KEY, "blind");
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
