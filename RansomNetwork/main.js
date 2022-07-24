import dotenv from "dotenv";
dotenv.config();
import { ethers } from "ethers";
import { abi } from "./abi.js";
import { calculateHash, decrypt, retrieveFiles } from "./utils.js";
const main = async () => {
  const address = "0xFfb3c5a5CBa2705DfC8C88D8DbDDa7BBCb5Deaa6";
  const provider = new ethers.providers.WebSocketProvider(
    "wss://polygon-mumbai.g.alchemy.com/v2/JCc5AElyDSIX0FdDABzhhDqRrPYJelUu"
  );
  const wallet = new ethers.Wallet("0678c85b937711d5a2640863fee5dbd373df6ce70721a022929640a9f54c30ae");
  const signer = wallet.connect(provider);
  const contract = new ethers.Contract(address, abi, provider);
  contract.on("Revealed", async (attacker, privateKey, cid, counter) => {
    const userGeneratedFile = await retrieveFiles(cid);
    const privateKeyFile = await retrieveFiles(privateKey);
    const userJSON = JSON.parse(userGeneratedFile.toString());
    const encryptedFile = await retrieveFiles(userJSON.encryptedCID);

    const decrypted = decrypt(privateKeyFile.toString(), encryptedFile);
    const calculatedHash = calculateHash(decrypted);
    console.log(userJSON.hash == calculatedHash);
    if (userJSON.hash == calculatedHash) {
      const tx = await contract.connect(signer).check(counter, true, {
        gasLimit: 88224,
      });
      console.log(tx);
    } else {
      const tx = await contract.connect(signer).check(counter, false, { gasLimit: 88224 });
      console.log(tx);
    }
  });
};
main();
