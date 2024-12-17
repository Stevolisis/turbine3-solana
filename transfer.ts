import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import wallet from "./new-wallet.json";

const keypair =  Keypair.fromSecretKey(Uint8Array.from(wallet));
const from = keypair.publicKey;
const to = new PublicKey("HRxY3GTqbWJD28bnsL4zGjF9ir2ykmh7LC8cgYZZiD7f");
const connection = new Connection("https://api.devnet.solana.com");

(async()=>{
    try{
        const balance1 = await connection.getBalance(from);
        const balance2 = await connection.getBalance(to);
        console.log(`Wallet balance: ${balance1 / LAMPORTS_PER_SOL} SOL`);
        console.log(`Wallet balance: ${balance2 / LAMPORTS_PER_SOL} SOL`);

        const transaction = new Transaction().add(SystemProgram.transfer({
            fromPubkey: from,
            toPubkey: to,
            lamports: LAMPORTS_PER_SOL/100
        }));
        transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        transaction.feePayer = from;
        const signature = await sendAndConfirmTransaction(connection, transaction, [keypair]);
        console.log(`transaction-Data: `, signature);
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`);

        const balance3 = await connection.getBalance(from);
        const balance4 = await connection.getBalance(to);
        console.log(`Wallet balance: ${balance3 / LAMPORTS_PER_SOL} SOL`);
        console.log(`Wallet balance: ${balance4 / LAMPORTS_PER_SOL} SOL`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();