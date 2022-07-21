import { randomBytes } from 'node:crypto';
import { privateToAddress } from 'ethereumjs-util';
import { createWriteStream } from 'node:fs';
import 'dotenv/config';

let numberToGenerate = process.env.NUMBER_TO_GENERATE;
let writeStream = createWriteStream('./generated.csv');

console.log('Generating keys...');

const main = async () => {
    writeStream.write('Private Key,Public Key\n');
    for(let i = 0; i < numberToGenerate; i++) {
        let privateKey = randomBytes(32);
        writeStream.write(`${privateKey.toString('hex')},0x${privateToAddress(privateKey).toString('hex')}${i + 1 == numberToGenerate ? '' : '\n'}`);
    }
    writeStream.end();
    console.log('Wallets generated!');
}

main();