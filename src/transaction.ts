import {SHA256} from "crypto-js";
import * as elliptic from "elliptic";

export default class Transaction {
    fromAddress: string | null;
    toAddress: string;
    amount: number;
    signature: string | null;

    constructor(fromAddress: string | null, toAddress: string, amount: number) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.signature = null;
    }

    calculateHash = (): string => SHA256(this.fromAddress + this.toAddress + this.amount).toString();

    signTransaction = (signingKey: elliptic.ec.KeyPair): void => {
        if(signingKey.getPublic("hex") !== this.fromAddress) {
            throw new Error("You cannot sign transactions for other wallets!");
        }

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, "base64");
        this.signature = sig.toDER("hex");
    }

    isValid = ():boolean => {
        if(!this.fromAddress) return true;

        if(!this.signature || this.signature.length === 0) {
            throw new Error("No signature in this transaction");
        }

        const EC = elliptic.ec;
        const ec = new EC("secp256k1");
        const publicKey = ec.keyFromPublic(this.fromAddress, "hex");

        return publicKey.verify(this.calculateHash(), this.signature);
    }
}