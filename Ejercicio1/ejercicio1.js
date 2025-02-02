import fs from 'fs';

const [ M1, M2, N ] = fs.readFileSync('ejercicio1.txt', 'utf8').split('\n')[0].split(' ').map(Number);
const instruccion1 = fs.readFileSync('ejercicio1.txt', 'utf8').split('\n')[1].trim()
const instruccion2 = fs.readFileSync('ejercicio1.txt', 'utf8').split('\n')[2].trim()
const message = fs.readFileSync('ejercicio1.txt', 'utf8').split('\n')[3].trim()

const validateLength = (instruccion1, instruccion2, message) => M1 === instruccion1.length && M2 === instruccion2.length && N === message.length
const isValidateLength = validateLength(instruccion1, instruccion2, message)

if (isValidateLength) {
    const removeRepeatedLetters  = (text) => {
        let cleanText = text[0]
        for (let i = 1; i < text.length; i++) {
            if (text[i] !== text[i - 1]) {
                cleanText += text[i]
            }
        }
        return cleanText
    }

    const getLetterCount = (word) => {
        const count = {};
        for (const letter of word) {
            count[letter] = (count[letter] || 0) + 1;
        }
        return count;
    };

    const hasRequiredLetters = (message, instruction) => {
        const messageClean = removeRepeatedLetters(message);
        const instructionClean = removeRepeatedLetters(instruction);
        const messageCount = getLetterCount(messageClean);
        const instructionCount = getLetterCount(instructionClean);

        for (const letter in instructionCount) {
            if (!messageCount[letter] || messageCount[letter] < instructionCount[letter]) {
                return false
            }
        }
        return true;
    }

    const instructionFound = [
        hasRequiredLetters(message, instruccion1),
        hasRequiredLetters(message, instruccion2)
    ]
    if (fs.existsSync('Verificacion_del_mensaje.txt')) {
        fs.unlinkSync('Verificacion_del_mensaje.txt');
    }

    fs.writeFileSync('Verificacion_del_mensaje.txt', `${instructionFound[0] ? 'SI' : 'NO'}\n${instructionFound[1] ? 'SI' : 'NO'}`);
}

if (!isValidateLength) {
    fs.writeFileSync('Error.txt', 'La longitud de los valores no coincide con los valores ingresados');
}
