import dotenv from "dotenv";
dotenv.config();
import { File, Web3Storage } from "web3.storage";
import { getFilesFromPath } from "web3.storage";
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
  const buffer = Buffer.from(JSON.stringify(obj));
  const files = [new File([buffer], "metadata.json")];
  return files;
};
export const storeFiles = async (files) => {
  const client = makeStorageClient();
  const cid = await client.put(files);
  return cid;
};
export const getFiles = async (path) => {
  const files = await getFilesFromPath(path);
  return files;
};
//web3Storage RETRIEVE
export const retrieveFiles = async (cid) => {
  const client = makeStorageClient();
  const res = await client.get(cid);
  if (!res.ok) {
    throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`);
  }
  const files = await res.files();
  const arrayBuffer = files[0].arrayBuffer();
  return toBuffer(await arrayBuffer);
};
const toBuffer = (ab) => {
  const buf = Buffer.alloc(ab.byteLength);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
};
//Encryption
export const encrypt = (publicKey, file) => {
  return crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    file
  );
};

export const decrypt = (privateKey, file) => {
  return crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    file
  );
};

export const calculateHash = (fileBuffer) => {
  const hashSum = crypto.createHash("sha256");
  hashSum.update(fileBuffer);

  const hex = hashSum.digest("hex");
  return hex;
};
