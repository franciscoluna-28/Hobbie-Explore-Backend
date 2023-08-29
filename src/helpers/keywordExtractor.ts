import {
  BrillPOSTaggedWord,
  BrillPOSTagger,
  Lexicon,
  RegexpTokenizer,
  RuleSet,
} from "natural";
import { BoredAPIModifiedActivity } from "../types/boredAPITypes";
import { removeStopwords, eng } from "stopword";

// Settings for natural.js
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
  const tokens = tokenizer.tokenize(sentence.name.toLowerCase());

  // We get the tokens back but if they're empty we get an empty string
  return tokens && tokens.length > 0 ? processTokens(tokens) : "";
}

// Logic for processing tokens
function processTokens(tokens: string[]): string {
  const filteredTokens = removeStopwords(tokens, eng);
  const tagger = new BrillPOSTagger(lexicon, ruleSet);
  const taggedSentence = tagger.tag(filteredTokens);
  const taggedWords = taggedSentence.taggedWords;

  // Get nouns and verbs
  const nouns = getWordsByTag(taggedWords, /^NN/);
  const verbs = getWordsByTag(taggedWords, /^VB/);

  // Get the best keyword
  const bestKeyword = getBestKeywordFromTags(nouns, verbs);

  return bestKeyword;
}

// Save words by tag
function getWordsByTag(
  taggedWords: BrillPOSTaggedWord[],
  tagRegex: RegExp
): string[] {
  return taggedWords
    .filter(({ tag }) => tag.match(tagRegex))
    .map(({ token }) => token);
}

function getBestKeywordFromTags(nouns: string[], verbs: string[]) {
  let bestKeyword = "";

  // Names are more important than verbs for Unsplash search
  if (nouns.length > 0) {
    bestKeyword = nouns[0];
  } else if (verbs.length > 0) {
    // We ignore the first verb if there's more than once
    const [firstVerb, ...restVerbs] = verbs;
    bestKeyword = restVerbs.length > 0 ? restVerbs[0] : firstVerb;
  }

  return bestKeyword;
}
