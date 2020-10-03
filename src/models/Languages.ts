export class Language {
    value: string;
    keyTranslation: string;

    constructor(value: string, keyTranslation: string) {
        this.value = value;
        this.keyTranslation = keyTranslation;
    }

    static getLanguages(): Language[]
    {
        return [new Language("fr-FR", "French"), new Language("en-CA", "English")]
    }
}