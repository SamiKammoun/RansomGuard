import dotenv from "dotenv";
dotenv.config();
import { ethers } from "ethers";
import { abi } from "./abi.js";
import { calculateHash, decrypt, retrieveFiles } from "./utils.js";
const main = async () => {
  const address = "0x0C3FbA678A7F77C3ec634E9E1254441814Ed770E";
  const provider = new ethers.providers.WebSocketProvider(
    "wss://polygon-mumbai.g.alchemy.com/v2/JCc5AElyDSIX0FdDABzhhDqRrPYJelUu"
  );
  const contract = new ethers.Contract(address, abi, provider);

  contract.on("Revealed", async (attacker, privateKey, cid, counter) => {
    const userGeneratedFile = await retrieveFiles(cid);
    const privateKeyFile = await retrieveFiles(privateKey);
    const userJSON = JSON.parse(userGeneratedFile.toString());
    const encryptedFile = await retrieveFiles(userJSON.encryptedCID);

    const decrypted = decrypt(privateKeyFile.toString(), encryptedFile);
    const calculatedHash = calculateHash(decrypted);
    console.log(userJSON.hash == calculatedHash);
  });
};
main();
