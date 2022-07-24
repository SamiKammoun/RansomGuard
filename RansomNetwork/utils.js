require("dotenv").config();
import { File } from "web3.storage";
import fs from "fs";
import crypto from "crypto";

//web3Storage PUT
export const getAccessToken = () => {
  return process.env.WEB3STORAGE_TOKEN;
};
export const makeStorageClient = () => {
  return new Web3Storage({ token: getAccessToken() });
};
export const makeFileObjectFromBuffer = (buffer, fileName) => {
  const files = [new File([buffer], fileName)];
  return files;
};
export const makeMetadataFile = (encryptedFileCID, hash) => {
  const obj = { hash: hash, encryptedCID: encryptedFileCID };
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
  const files = [new File([blob], "metadata.json")];
  return files;
};
export const storeFiles = async (files) => {
  const client = makeStorageClient();
  const cid = await client.put(files);
  console.log("stored file with cid:", cid);
  return cid;
};

//web3Storage RETRIEVE
export const retrieveFiles = async (cid) => {
  const client = makeStorageClient();
  const res = await client.get(cid);
  if (!res.ok) {
    throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`);
  }
  const files = await res.files();
  return files[0].arrayBuffer();
};

//Encryption
export const encrypt = (data) => {
  return crypto.publicEncrypt(
    {
      key: process.env.PUBLIC_KEY,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    // We convert the data string to a buffer
    data
  );
};

export const decrypt = (data) => {
  return crypto.privateDecrypt(
    {
      key: process.env.PRIVATE_KEY,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    data
  );
};

export const calculateHash = (fileBuffer) => {
  const hashSum = crypto.createHash("sha256");
  hashSum.update(fileBuffer);

  const hex = hashSum.digest("hex");
  return hex;
};
