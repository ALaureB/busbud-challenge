export class Language {
    value: string;
    keyTranslation: string;

    constructor(value: string, keyTranslation: string) {
        this.value = value;
        this.keyTranslation = keyTranslation;
    }

    static getLanguages(): Language[]
    {
        return [new Language("fr-FR", "FRENCH_LANGUAGE"), new Language("en-CA", "ENGLISH_LANGUAGE")]
    }

    isLanguageActive(currentLanguage: string): boolean {
        return currentLanguage === this.value;
    }
}