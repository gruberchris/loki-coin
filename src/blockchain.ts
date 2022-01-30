import Block from "./block";

export default class Blockchain {
    chain: Block[] = [];
    difficulty: number;

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock = (): Block => new Block(0, new Date("01/29/2022").toISOString(), "Genesis block", "0");

    getLatestBlock = (): Block => this.chain[this.chain.length - 1];

    addBlock = (newBlock: Block): string => {
        newBlock.previousHash = this.getLatestBlock().hash;

        newBlock.mineBlock(this.difficulty);

        // should not be this easy to add new block to the chain as there should be many checks that should succeed before this is allowed
        this.chain.push(newBlock);

        return newBlock.hash;
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