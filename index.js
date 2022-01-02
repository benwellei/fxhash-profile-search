import fetch from "node-fetch";

const address = 'tz1UPfsrzqrJ2DrYnZdrVsjBohtxxyQ8fK2e';

fetch(`https://api.tzkt.io/v1/contracts/KT1Ezht4PDKZri7aVppVGT4Jkw39sesaFnww/bigmaps/users_name/keys?limit=10000`)
    .then(res => res.json())
    .then(res => {
        console.log(`There are ${res.length} registered wallets`)
        res.forEach(a => {
            if (a.key == address) {
                const value = a.value;

                console.log(`Found address ${address}`);
                console.log(`The username associated with this address is ${hexToUtf8(value)}`);
            }
        });
    });

function hexToUtf8 (hex) {
    return decodeURIComponent(
        hex.replace(/\s+/g, '')
            .replace(/[0-9a-f]{2}/g, '%$&')
    )
};