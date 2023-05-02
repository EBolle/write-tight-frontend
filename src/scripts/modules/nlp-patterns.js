"use strict;";

async function isAdverb(word) {
  const response = await fetch(`http://localhost:8000/pos/is-adverb/${word}`);
  const data = await response.json();

  return data.outcome;
}

async function lyAdverbs(text) {
  const name = "adverbs-ending-with-ly";
  const description =
    "'Adverbs that end on ly can *typically* be removed without losing any meaning.'";
  const pattern = /\w+ly\b/gi;
  const matches = Array.from(text.matchAll(pattern), (match) => match[0]);

  for (const match of matches) {
    const response = await isAdverb(match);

    if (response === true) {
      text = text.replace(
        match,
        `<span class=${name} title=${description}>${match}</span>`
      );
    }
  }

  return text;
}

const nlpPatterns = [lyAdverbs];

export { lyAdverbs, nlpPatterns };
