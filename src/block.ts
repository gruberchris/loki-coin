import { SHA256 } from "crypto-js";

export default class Block {
    index: number;
    timestamp: string;
    data: any;
    previousHash: string;
    hash: string;
    nonce: number;

    constructor(index: number, timestamp: string, data: any, previousHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }


    calculateHash = (): string => {
        const message = this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce;
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
