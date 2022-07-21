import { randomBytes } from 'node:crypto';
import { privateToPublic } from 'ethereumjs-util';
import { createWriteStream } from 'node:fs';
import 'dotenv/config';

let numberToGenerate = process.env.NUMBER_TO_GENERATE;
let writeStream = createWriteStream('./generated.csv');

console.log('Generating keys...');

const main = async () => {
    writeStream.write('Private Key,Public Key\n');
    for(let i = 0; i < numberToGenerate; i++) {
        let privateKey = randomBytes(32);
        let publicKey = privateToPublic(privateKey);
        writeStream.write(`${privateKey.toString('hex')},${publicKey.toString('hex')}${i + 1 == numberToGenerate ? '' : '\n'}`);
    }
    writeStream.end();
    console.log('Wallets generated!');
}

main();