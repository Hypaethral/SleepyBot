class BrailleCharacter {
    asciiHex: string;
    asciiGlyph: string;
    brailleDots: string;
    brailleGlyph: string;
    brailleMeaning: string;

    constructor(
    asciiHex: string,
    asciiGlyph: string,
    brailleDots: string,
    brailleGlyph: string,
    brailleMeaning: string
    ) {
        this.asciiHex = asciiHex;
        this.asciiGlyph = asciiGlyph;
        this.brailleDots = brailleDots;
        this.brailleGlyph = brailleGlyph;
        this.brailleMeaning = brailleMeaning;
    }
}

class BrailleNumber {
    brailleGlyph: string;
    asciiNumber: number;

    constructor(
    asciiNumber: number,
    brailleGlyph: string,
    ) {
        this.asciiNumber = asciiNumber;
        this.brailleGlyph = brailleGlyph;
    }
}

class BrailleDataManager {
    data: BrailleCharacter[];
    numbers: BrailleNumber[];


    private sanitizeInput(str) {
        return str.replace(/\s+/g, ' ');
    }


    // todo: stop this silly nonsense with converting numbers...
    // todo: write a tokenizer instead (will help with capitals / contractions too)
    private convertBrailleNumbersToEnglish(brailleStr) {
        let result = brailleStr;
        this.numbers.forEach(num => {
            result = result.replace(num.brailleGlyph, num.asciiNumber);
        });
        return result;
    }

    private convertEnglishNumbersToBraille(englishStr) {
        let result = englishStr;
        this.numbers.forEach(num => {
            result = result.replace(num.asciiNumber + '', num.brailleGlyph);
        });
        return result;
    }

    convertBrailleCharToEnglish(brailleChar: string): string  {
        if (brailleChar.length !== 1) {
            throw new Error('Incorrect argument supplied to convertBrailleCharStringToEnglish, must be string of length one');
        }

        const brailleLibraryChar: BrailleCharacter = this.data.find(data => data.brailleGlyph === brailleChar);

        if (brailleLibraryChar === undefined) {
            return brailleChar;
        }

        switch (brailleLibraryChar.brailleMeaning) {
            case('(space)'):
                return ' ';
            default:
                return brailleLibraryChar.brailleMeaning;
        }
    }

    convertEnglishCharToBraille(englishChar: string): string {
        if (englishChar.length !== 1) {
            throw new Error('Incorrect argument supplied to convertEnglishCharToBraille, must be string of length one');
        }

        if (englishChar === ' ') {
            return '   ';
        }

        const brailleLibraryChar: BrailleCharacter = this.data.find(data => data.brailleMeaning === englishChar.toLocaleLowerCase());

        if (brailleLibraryChar === undefined) {
            return englishChar;
        }

        return brailleLibraryChar.brailleGlyph;
    }

    convertBrailleStringToEnglish(braille: string): string {
        const brailleWithConvertedNumbers = this.convertBrailleNumbersToEnglish(braille);
        console.log('b2e', brailleWithConvertedNumbers);
        return this.sanitizeInput(brailleWithConvertedNumbers).split('').map(char => this.convertBrailleCharToEnglish(char)).join('');
    }

    convertEnglishStringToBraille(english: string): string {
        const convertedBraille = this.sanitizeInput(english).split('').map(char => this.convertEnglishCharToBraille(char)).join('');
        return this.convertEnglishNumbersToBraille(convertedBraille);
    }

    constructor() {
        this.data = [];
        this.numbers = [];

        const table = [
            '20	 	000000	⠀	(space)',
            '21	!	011011	⠮	the',
            '22	"	000100	⠐	(contraction)',
            '23	#	010111	⠼	(number prefix)',
            '24	$	111001	⠫	ed',
            '25	%	110001	⠩	sh',
            '26	&	111011	⠯	and',
            '27	\'	000010	⠄	',
            '28	(	101111	⠷	of',
            '29	)	011111	⠾	with',
            '2A	*	100001	⠡	ch',
            '2B	+	010011	⠬	ing',
            '2C	,	000001	⠠	(uppercase prefix)',
            '2D	-	000011	⠤	-',
            '2E	.	010001	⠨	(italic prefix)',
            '2F	/	010010	⠌	st',
            '30	0	000111	⠴	”',
            '31	1	001000	⠂	,',
            '32	2	001010	⠆	;',
            '33	3	001100	⠒	:',
            '34	4	001101	⠲	.',
            '35	5	001001	⠢	en',
            '36	6	001110	⠖	!',
            '37	7	001111	⠶	( or )',
            '38	8	001011	⠦	“ or ?',
            '39	9	000110	⠔	in',
            '3A	:	100101	⠱	wh',
            '3B	;	000101	⠰	(letter prefix)',
            '3C	<	101001	⠣	gh',
            '3D	=	111111	⠿	for',
            '3E	>	010110	⠜	ar',
            '3F	?	110101	⠹	th',
            '40	@	010000	⠈	(accent prefix)',
            '41	A	100000	⠁	a',
            '42	B	101000	⠃	b',
            '43	C	110000	⠉	c',
            '44	D	110100	⠙	d',
            '45	E	100100	⠑	e',
            '46	F	111000	⠋	f',
            '47	G	111100	⠛	g',
            '48	H	101100	⠓	h',
            '49	I	011000	⠊	i',
            '4A	J	011100	⠚	j',
            '4B	K	100010	⠅	k',
            '4C	L	101010	⠇	l',
            '4D	M	110010	⠍	m',
            '4E	N	110110	⠝	n',
            '4F	O	100110	⠕	o',
            '50	P	111010	⠏	p',
            '51	Q	111110	⠟	q',
            '52	R	101110	⠗	r',
            '53	S	011010	⠎	s',
            '54	T	011110	⠞	t',
            '55	U	100011	⠥	u',
            '56	V	101011	⠧	v',
            '57	W	011101	⠺	w',
            '58	X	110011	⠭	x',
            '59	Y	110111	⠽	y',
            '5A	Z	100111	⠵	z',
            '5B	[	011001	⠪	ow',
            '5C	\\	101101	⠳	ou',
            '5D	]	111101	⠻	er',
            '5E	^	010100	⠘	(currency prefix)',
            '5F	_	010101	⠸	(contraction)'
        ];

        table.forEach(row => {
            const args = row.split('	');

            this.data.push(new BrailleCharacter(args[0], args[1], args[2], args[3], args[4]));
        });


        // special cases for numbers
        this.numbers.push(new BrailleNumber(0, '⠼⠚'));
        this.numbers.push(new BrailleNumber(1, '⠼⠁'));
        this.numbers.push(new BrailleNumber(2, '⠼⠃'));
        this.numbers.push(new BrailleNumber(3, '⠼⠉'));
        this.numbers.push(new BrailleNumber(4, '⠼⠙'));
        this.numbers.push(new BrailleNumber(5, '⠼⠑'));
        this.numbers.push(new BrailleNumber(6, '⠼⠋'));
        this.numbers.push(new BrailleNumber(7, '⠼⠛'));
        this.numbers.push(new BrailleNumber(8, '⠼⠓'));
        this.numbers.push(new BrailleNumber(9, '⠼⠊'));
    }
}

export default BrailleDataManager;