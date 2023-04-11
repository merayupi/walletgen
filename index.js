import { randomBytes } from 'node:crypto';
import { privateToAddress } from 'ethereumjs-util';
import { createWriteStream, existsSync } from 'node:fs';
import readline from 'readline-sync';

let filename = 'generated.csv';
let i = 2;

while(existsSync(filename)) {
  filename = `generated_${i}.csv`;
  i++;
}

let writeStream = createWriteStream(`./${filename}`);



const main = async () => {

    console.log(`
    +-----------------------------------------+
    |
    | 	EVM Wallet Generator
    |   by Conny
    |	
    +-----------------------------------------+
            `)
    const numberToGenerate = readline.question('[?] How Many Wallet: ')
    console.log('Generating keys...');

    writeStream.write('Private Key,Public Key\n');
    for(let i = 0; i < numberToGenerate; i++) {
        let privateKey = randomBytes(32);
        writeStream.write(`${privateKey.toString('hex')},0x${privateToAddress(privateKey).toString('hex')}${i + 1 == numberToGenerate ? '' : '\n'}`);
    }
    writeStream.end();
    console.log(`Wallets generated and saved in ${filename}!`);
}

main();