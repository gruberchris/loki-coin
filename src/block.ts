import { SHA256 } from "crypto-js";
import Transaction from "./transaction";

export default class Block {
    timestamp: string;
    transactions: Transaction[];
    previousHash: string;
    hash: string;
    nonce: number;

    constructor(timestamp: string, transactions: Transaction[], previousHash = "") {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }


    calculateHash = (): string => {
        const message = this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce;
        return SHA256(message).toString();
    }

    mineBlock = (difficulty: number): void => {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            // incrementing nonce allows us to calculate a new hash despite the fact none of the other block properties has changed
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}
