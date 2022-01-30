import Blockchain from "./blockchain";
import Block from "./block";

const lokicoin = new Blockchain();

console.log("Mining block 1...");
const hash_block1 = lokicoin.addBlock(new Block(1, new Date().toISOString(), { amount: 4 }));
console.log(hash_block1);

console.log("Mining block 2...");
const hash_block2 = lokicoin.addBlock(new Block(2, new Date().toISOString(), { amount: 6 }));
console.log(hash_block2);

console.log("The complete Lokicoin blockchain:")
console.log(JSON.stringify(lokicoin, null, 2));
console.log(`Is Lokicoin blockchain valid? ${lokicoin.isChainValid() ? "Yes" : "No"}`);