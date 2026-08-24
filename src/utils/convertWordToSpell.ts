import { spellingData } from "@/lib/spelling";

interface WordToSpellResult {
    isSpecialCharacter: boolean;
    spelling: string;
    letter: string;
    index: number;
}

export default function convertWordToSpell(
    word: string,
): WordToSpellResult[] {
    return word
        .toLowerCase()
        .split('')
        .map((letter, index) => {
            const dictionary = spellingData.dictionary;
            const specialCharacters = spellingData.specialCharacters;

            const isSpecialCharacter = letter in spellingData.specialCharacters;

            const spelling =
                letter in dictionary
                    ? dictionary[letter as keyof typeof dictionary]
                    : letter in specialCharacters
                      ? specialCharacters[
                            letter as keyof typeof specialCharacters
                        ]
                      : '';

            return {
                isSpecialCharacter,
                spelling,
                letter,
                index,
            };
        });
}