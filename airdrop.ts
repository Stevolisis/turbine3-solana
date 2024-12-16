import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from "./new-wallet.json";

const keypair = Keypair.fromSecretKey(Uint8Array.from(wallet));
// const connection = new Connection("http://127.0.0.1:8899");
// const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const connection = new Connection("https://devnet.rpcpool.com", "confirmed");
const publicKey = keypair.publicKey;

(async () => {
    console.log(`Code Wallet Public Key: ${publicKey.toString()}`);

    const balance = await connection.getBalance(publicKey);
    console.log(`Wallet balance: ${balance / LAMPORTS_PER_SOL} SOL`);
    const requestSol = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
    console.log(`Request Tx: ${requestSol} SOL`);
    if(requestSol){
        const balance2 = await connection.getBalance(publicKey);
        console.log(`Wallet balance: ${balance2 / LAMPORTS_PER_SOL} SOL`);
    }
})();