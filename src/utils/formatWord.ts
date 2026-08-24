export default function formatWord(word: string): string {
    // Set the first word to uppercase and the rest to lowercase
    const formattedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    return formattedWord;
}