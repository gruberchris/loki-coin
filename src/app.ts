import Blockchain from "./blockchain";
import Block from "./block";

const lokicoin = new Blockchain();
lokicoin.addBlock(new Block(1, new Date().toISOString(), { amount: 4 }));
lokicoin.addBlock(new Block(2, new Date().toISOString(), { amount: 6 }));

console.log(JSON.stringify(lokicoin, null, 2));
console.log(`Is Lokicoin blockchain valid? ${lokicoin.isChainValid() ? "Yes" : "No"}`);