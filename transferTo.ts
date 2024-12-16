import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import wallet from "./new-wallet.json";

const keypair =  Keypair.fromSecretKey(Uint8Array.from(wallet));
const sender = keypair.publicKey;
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

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

    const txSignature = await sendAndConfirmTransaction(connection, tx, [keypair]);
    console.log(`TX-Data: `, txSignature);

    const balance3 = await connection.getBalance(sender);
    const balance4 = await connection.getBalance(reciever);
    console.log(`Wallet balance: ${balance3 / LAMPORTS_PER_SOL} SOL`);
    console.log(`Wallet balance: ${balance4 / LAMPORTS_PER_SOL} SOL`);

})();



// (async () => {
//   // Generate two wallets
//   const sender = Keypair.generate();
//   const receiver = Keypair.generate();
//   // Transfer 1 SOL to the receiver
//   const transaction = new Transaction().add(
//     SystemProgram.transfer({
//       fromPubkey: sender.publicKey,
//       toPubkey: receiver.publicKey,
//       lamports: 1 * LAMPORTS_PER_SOL, // 1 SOL
//     })
//   );

//   // Sign and send the transaction
//   const signature = await connection.sendTransaction(transaction, [sender]);
//   await connection.confirmTransaction(signature);
//   console.log("Transfer complete:", signature);

//   // Check balances
//   const senderBalance = await connection.getBalance(sender.publicKey);
//   const receiverBalance = await connection.getBalance(receiver.publicKey);
//   console.log("Sender Balance:", senderBalance / LAMPORTS_PER_SOL, "SOL");
//   console.log("Receiver Balance:", receiverBalance / LAMPORTS_PER_SOL, "SOL");
// })();
