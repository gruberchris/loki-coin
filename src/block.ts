import { SHA256 } from "crypto-js";

export default class Block {
    index: number;
    timestamp: string;
    data: any;
    previousHash: string;
    hash: string;

    constructor(index: number, timestamp: string, data: any, previousHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }


    calculateHash = (): string => {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}
