import Block from "./block";

export default class Blockchain {
    chain: Block[] = [];

    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock = (): Block => new Block(0, new Date("01/29/2022").toISOString(), "Genesis block", "0");

    getLatestBlock = (): Block => this.chain[this.chain.length - 1];

    addBlock = (newBlock: Block): void => {
        newBlock.previousHash = this.getLatestBlock().hash;

        // since block properties have changed, must calculate hash
        newBlock.hash = newBlock.calculateHash();

        // should not be this easy to add new block to the chain as there should be many checks that should succeed before this is allowed
        this.chain.push(newBlock);
    }

    isChainValid = ():boolean => {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()) return false;

            if(currentBlock.previousHash !== previousBlock.hash) return false;
        }

        return true;
    }
}