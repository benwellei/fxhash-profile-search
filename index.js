import fetch from "node-fetch";
import * as readline from 'node:readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('\nWhat Tezos address would you like to check?\n', (address) => {
    fetch(`https://api.tzkt.io/v1/contracts/KT1Ezht4PDKZri7aVppVGT4Jkw39sesaFnww/bigmaps/users_name/keys?limit=10000`)
    .then(res => res.json())
    .then(res => {
        console.log(`\nThere are ${res.length} registered wallets\n`)
        res.forEach(a => {
            if (a.key == address) {
                const value = a.value;

                console.log(`Found address ${address}`);
                console.log(`The username associated with this address is ${hexToUtf8(value)}`);
                console.log(encodeURI(`https://www.fxhash.xyz/u/${hexToUtf8(value)}`))
            }
        });
    })
    .then(() => {rl.close();})
});

function hexToUtf8 (hex) {
    return decodeURIComponent(
        hex.replace(/\s+/g, '')
            .replace(/[0-9a-f]{2}/g, '%$&')
    )
};