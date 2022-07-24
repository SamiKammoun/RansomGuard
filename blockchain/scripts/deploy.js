async function main() {
  Guard = await ethers.getContractFactory("Guard");
  guard = await Guard.deploy();
  await guard.deployed();

  console.log("Contract address:", guard.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
