import Blockchain from "./blockchain";
import Transaction from "./transaction";
import * as elliptic from "elliptic";

const lokicoin = new Blockchain();

const EC = elliptic.ec;
const ec = new EC("secp256k1");

// run keygenerator.ts and paste in your private key into the following line
const myKey = ec.keyFromPrivate("YOUR PRIVATE KEY GOES HERE");
const myWalletAddress = myKey.getPublic("hex");

const tx1 = new Transaction(myWalletAddress, "someone elses public key goes here", 10);
tx1.signTransaction(myKey);
lokicoin.addTransaction(tx1);

console.log("Starting miner...");
lokicoin.minePendingTransactions(myWalletAddress);

const tx2 = new Transaction(myWalletAddress, "someone elses public key goes here", 20);
tx2.signTransaction(myKey);
lokicoin.addTransaction(tx2);

console.log("Starting miner...");
lokicoin.minePendingTransactions(myWalletAddress);

console.log(`My wallet balance is ${lokicoin.updateAddressBalance(myWalletAddress)}`);

// Uncomment the following line to test trying to modify the blockchain. This will result in an invalid chain
// lokicoin.chain[1].transactions[0].amount = 1;

console.log("The complete Lokicoin blockchain:")
console.log(JSON.stringify(lokicoin, null, 2));
console.log(`Is Lokicoin blockchain valid? ${lokicoin.isChainValid() ? "Yes" : "No"}`);