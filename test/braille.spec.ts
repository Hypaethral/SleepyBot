import 'mocha';

import { expect } from 'chai';

import BrailleManager from '../src/lib/braille';

const examples = [
    {
        text: 'hello, world',
        braille: '⠓⠑⠇⠇⠕⠂   ⠺⠕⠗⠇⠙'
    },
    {
        text: 'abcdefg hijklmnop qrstuv wxyz',
        braille: '⠁⠃⠉⠙⠑⠋⠛   ⠓⠊⠚⠅⠇⠍⠝⠕⠏   ⠟⠗⠎⠞⠥⠧   ⠺⠭⠽⠵'
    },
    {
        text: ':3 that\'s funny but have you seen 8===D',
        braille: '⠒⠼⠉   ⠞⠓⠁⠞⠄⠎   ⠋⠥⠝⠝⠽   ⠃⠥⠞   ⠓⠁⠧⠑   ⠽⠕⠥   ⠎⠑⠑⠝   ⠼⠓===⠙'
    }
];

describe('the braille manager', () => {
    const bm = new BrailleManager();

    it('should convert text to braille correctly', () => {
        examples.forEach((example) => {
            expect(bm.convertEnglishStringToBraille(example.text)).to.equal(example.braille);
        });
    });

    it('should convert braille to text correctly', () => {
        examples.forEach((example) => {
            expect(bm.convertBrailleStringToEnglish(example.braille)).to.equal(example.text);
        });
    });
});