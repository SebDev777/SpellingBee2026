type Difficulty = 'Easy' | 'Medium' | 'Hard';

export default function calcLevelDifficulty(word: string): Difficulty {
    const normalizedWord = word.toLowerCase().trim();

    const lengthScore = Math.min(normalizedWord.length * 5, 50);

    const uncommonLetters = normalizedWord.match(/[jqxz]/g)?.length ?? 0;
    const uncommonScore = uncommonLetters * 10;

    const repeatedLetters =
        normalizedWord.length -
        new Set(normalizedWord).size;

    const repetitionScore = repeatedLetters * -2;

    const score =
        lengthScore +
        uncommonScore +
        repetitionScore;

    if (score >= 60) return 'Hard';
    if (score >= 30) return 'Medium';

    return 'Easy';
}