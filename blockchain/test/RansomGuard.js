const { expect } = require("chai");

describe("RansomGuard", function () {
  before(async () => {
    [account0, account1, account2] = await ethers.getSigners();
    Guard = await ethers.getContractFactory("Guard");
    guard = await Guard.deploy();
  });
  it("should be able to stake", async () => {
    await expect(await guard.connect(account1).Stake("k", { value: ethers.BigNumber.from("2000000000000000000") }))
      .to.emit(guard, "Staked")
      .withArgs(account1.address, "2000000000000000000", 0, "k");
  });
  it("counter should increment when staking a second time", async () => {
    await expect(await guard.connect(account1).Stake("h", { value: ethers.BigNumber.from("3000000000000000000") }))
      .to.emit(guard, "Staked")
      .withArgs(account1.address, "3000000000000000000", 1, "h");
  });
  it("should be able to commit", async () => {
    expect(
      await guard
        .connect(account2)
        .Commit(
          0,
          ethers.utils.solidityKeccak256(
            ["address", "string", "string"],
            [account2.address, "c85221e2baf1b5b81613fc79e5f3d7c8e1d798179ddc83e27800b099b3102506", "blind"]
          )
        )
    )
      .to.emit(guard, "Commited")
      .withArgs(account2.address);
  });
  it("Should reveal", async () => {
    expect(
      await guard
        .connect(account2)
        .Reveal(0, "c85221e2baf1b5b81613fc79e5f3d7c8e1d798179ddc83e27800b099b3102506", "blind")
    )
      .to.emit(guard, "Revealed")
      .withArgs(account2.address, "c85221e2baf1b5b81613fc79e5f3d7c8e1d798179ddc83e27800b099b3102506", "k", 0);
  });
  it("Should check", async () => {
    expect(await guard.connect(account0).check(0, true))
      .to.emit(guard, "Distributed")
      .withArgs(account2.address, account1.address, "2000000000000000000");
  });
});
