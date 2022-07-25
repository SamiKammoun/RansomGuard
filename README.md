### RansomGuard

RansomGuard is a solution to pay a ransomware attacker in a decentralized way.

### How does it work ?

- Assuming the victim has got a backup for one of his files, he: 
  - Uploads the [encrypted file](https://ipfs.io/ipfs/bafybeidcn3behzra2x2w5vtreexvo5qdnpmp4f57jmog3fjyvlj3e6pt4a) and the original file's [hash](https://ipfs.io/ipfs/bafybeid25lfxripic7qhfewh3gtglq6yrguw3ujjtbbzjzq2dqlnqbbzcq/metadata.json) to IPFS.
  - Stake MATIC and sends his file's metadata to the smart contract.
- The attacker:
  - Verifies that he could decrypt the files
  - Sends his [key](https://ipfs.io/ipfs/bafybeigp62pvixexgcydyriogihvsbd6vwo3t7c2oco5qg3qava5nu24eu) through a commit-reveal scheme
- Ransom Network:
  - Checks if the key can decrypt the encrypted file resulting in the hash of the original file.
  - Key valid ? distribute funds : repeat;
  
### Things to consider

- This project was done in 15 hours by one person so it lacks the following:
  - [ ] Front-End
  - [ ] Distributing the Ransom Network ( this could be done by making verifier nodes stake a certain token and slashing them when they do something malicious)
  - [ ] Implementing more decryption/encryption algorithms

### [Smart contract verified on Mumbai](https://mumbai.polygonscan.com/address/0xFfb3c5a5CBa2705DfC8C88D8DbDDa7BBCb5Deaa6)

### [HackFS submission](https://ethglobal.com/showcase/ransom-network-v5u0u)

### Credits

Credits go to Malek Salaani for hearing the idea and giving feedback, and to Ahmed Abid for helping me choose the encryption algorithm.
