import Blockchain from "./blockchain";
import Transaction from "./transaction";

const lokicoin = new Blockchain();

lokicoin.createTransaction(new Transaction("address1", "address2", 100));
lokicoin.createTransaction(new Transaction("address2", "address1", 50));

console.log("Mining block 1...");
lokicoin.minePendingTransactions("my-address");
console.log(`Balance of my-address is ${lokicoin.updateAddressBalance("my-address")}`);

console.log("Mining block 2...");
lokicoin.minePendingTransactions("my-address");
console.log(`Balance of my-address is ${lokicoin.updateAddressBalance("my-address")}`);

console.log("Mining block 3...");
lokicoin.minePendingTransactions("my-address");
console.log(`Balance of my-address is ${lokicoin.updateAddressBalance("my-address")}`);

console.log("The complete Lokicoin blockchain:")
console.log(JSON.stringify(lokicoin, null, 2));
console.log(`Is Lokicoin blockchain valid? ${lokicoin.isChainValid() ? "Yes" : "No"}`);