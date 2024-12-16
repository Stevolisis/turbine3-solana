import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";
import wallet from "./new-wallet.json";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const keypair = Keypair.fromSecretKey(Uint8Array.from(wallet));
const sender = keypair.publicKey;

(async()=>{
    const keypair2 = Keypair.generate();
    const reciever = keypair2.publicKey;
    const balance1 = await connection.getBalance(sender);
    const balance2 = await connection.getBalance(reciever);
    console.log(`Wallet balance: ${balance1 / LAMPORTS_PER_SOL} SOL`);
    console.log(`Wallet balance: ${balance2 / LAMPORTS_PER_SOL} SOL`);

    const tx = new Transaction().add(SystemProgram.transfer({
        fromPubkey: sender,
        toPubkey: reciever,
        lamports: 30 * LAMPORTS_PER_SOL
    }));

    tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
    console.log("recentBlockhash: ", tx.recentBlockhash);
    tx.feePayer = sender;
    const { context, value } = await connection.getFeeForMessage(tx.compileMessage());
    console.log(`Fee: ${value} lamports`);

})();