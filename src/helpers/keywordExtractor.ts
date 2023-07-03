import natural, {
  BrillPOSTagger,
  Lexicon,
  RegexpTokenizer,
  RuleSet,
} from "natural";
import { BoredAPIModifiedActivity } from "../types/boredAPITypes";
import { removeStopwords, eng } from "stopword";

// Settings for natural
const naturalSettings = {
  language: "EN",
  defaultCategory: "N",
};

// Lexicon setup
const lexicon = new Lexicon(
  naturalSettings.language,
  naturalSettings.defaultCategory
);

// Rules for language processing
const ruleSet = new RuleSet(naturalSettings.language);

// Getting the best keyword using Natural
export function getBestKeyword(sentence: BoredAPIModifiedActivity): string {
    const tokenizer = new RegexpTokenizer({ pattern: / / });
    const tokens = tokenizer.tokenize(sentence.activity.toLowerCase());
    
    // TODO make this logic cleaner
    return tokens && tokens.length > 0 ? processTokens(tokens) : "";
  }
  
  // TODO make this logic cleaner
  // Logic for processing
  function processTokens(tokens: string[]): string {
    const filteredTokens = removeStopwords(tokens, eng);
    const tagger = new BrillPOSTagger(lexicon, ruleSet);
    const taggedSentence = tagger.tag(filteredTokens);
    const taggedWords = taggedSentence.taggedWords;
    const nouns = taggedWords
      .filter(({ tag }) => tag.match(/^NN/))
      .map(({ token }) => token);
    const verbs = taggedWords
      .filter(({ tag }) => tag.match(/^VB/))
      .map(({ token }) => token);
  
    // Obtener la mejor palabra clave
    const bestKeyword = getBestKeywordFromTags(nouns, verbs);
  
    return bestKeyword;
  }
  
  // TODO refactor this
  function getBestKeywordFromTags(nouns: string[], verbs: string[]): string {
    let bestKeyword = "";
  
    // Priorizar sustantivos sobre verbos
    if (nouns.length > 0) {
      bestKeyword = nouns[0];
    } else if (verbs.length > 0) {
      // Ignorar el primer verbo si existen más de uno
      const filteredVerbs = verbs.slice(1); // Ignorar el primer verbo
      bestKeyword = filteredVerbs.length > 0 ? filteredVerbs[0] : verbs[0];
    }
  
    return bestKeyword;
  }
  
