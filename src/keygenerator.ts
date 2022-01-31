import * as elliptic from "elliptic";

const EC = elliptic.ec;
const ec = new EC("secp256k1");
const key = ec.genKeyPair();
const publicKey = key.getPublic("hex");
const privateKey = key.getPrivate("hex");

console.log(`My public key is ${publicKey}`);
console.log(`My private key is ${privateKey}`);