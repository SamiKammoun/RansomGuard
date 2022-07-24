import { encrypt, calculateHash, makeFileObjectFromBuffer, storeFiles, makeMetadataFile } from "./utils.js";
import fs from "fs";
//encrypt file.txt with public key then store the encrypted file on IPFS
//and then store the cid of encrypted file and hash of original file on ipfs (this is what the user provides)
const main = async () => {
  const file = fs.readFileSync("file.txt");
  const key = fs.readFileSync("public_key", "utf8");
  const encrypted = encrypt(key, file);
  const userGeneratedMetadata = makeFileObjectFromBuffer(encrypted, "encrypted");
  const encryptedCID = await storeFiles(userGeneratedMetadata);
  const hash = calculateHash(file);
  const userGeneratedCID = await storeFiles(makeMetadataFile(encryptedCID, hash));

  console.log("User Generated CID:", userGeneratedCID);
  fs.writeFileSync("userCID", userGeneratedCID);

  const private_key = fs.readFileSync("private_key");
  const attackerKey = makeFileObjectFromBuffer(private_key, "key");
  const PRIVATE_KEY_CID = await storeFiles(attackerKey);
  console.log("Attacker CID:", PRIVATE_KEY_CID);
  fs.writeFileSync("attackerCID", PRIVATE_KEY_CID);
};

main();
