import Block from "./block";
import Transaction from "./transaction";

export default class Blockchain {
    chain: Block[] = [];
    difficulty: number;
    pendingTransactions: Transaction[];
    miningReward: number;

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock = (): Block => {
        const transactions: Transaction[] = [new Transaction(null, "", 0)];

        // Lokicoin genesis block
        return new Block(new Date("01/29/2022").toISOString(), transactions, "0");
    }

    getLatestBlock = (): Block => this.chain[this.chain.length - 1];

    minePendingTransactions = (miningRewardAddresses: string): string => {
        const rewardTx = new Transaction(null, miningRewardAddresses, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        // in a real blockchain, it is not possible to stuff all pending transactions into a single block as it would make
        // for some really huge sized blocks. Instead, miner's choose which pending transactions go into a block
        let newBlock = new Block(new Date(Date.now()).toISOString(), this.pendingTransactions, this.getLatestBlock().hash);

        newBlock.mineBlock(this.difficulty);

        this.chain.push(newBlock);

        this.pendingTransactions = [];

        return newBlock.hash;
    }

    addTransaction = (transaction: Transaction): void => {
        if(!transaction.fromAddress || !transaction.toAddress) {
            throw new Error("Transaction must include from and to addresses");
        }

        if(!transaction.isValid()) {
            throw new Error("Cannot add invalid transaction to chain");
        }

        this.pendingTransactions.push(transaction);
    }

    updateAddressBalance = (address: string): number => {
        let balance = 0;

        for(const block of this.chain) {
            for(const trans of block.transactions) {
                if(trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if(trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid = ():boolean => {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(!currentBlock.hasValidTransactions()) return false;

            if(currentBlock.hash !== currentBlock.calculateHash()) return false;

            if(currentBlock.previousHash !== previousBlock.hash) return false;
        }

        return true;
    }
}