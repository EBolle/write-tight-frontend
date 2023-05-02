"use strict";

import { regexPatterns } from "./modules/regex-patterns.js";
import { lyAdverbs, nlpPatterns } from "./modules/nlp-patterns.js";

const textArea = document.querySelector("#text-area");
const textContainer = document.querySelector("#text-container");

// Initialize with 0 so always get the correct slice after a keyup event
const cursorIdxArray = [0];

textArea.addEventListener("keyup", (event) => {
  if (event.code === "Period" || event.key === "?" || event.key === "!") {
    let newParagraph = document.createElement("p");
    textContainer.append(newParagraph);

    cursorIdxArray.push(textArea.selectionStart);

    let text = textArea.value.slice(cursorIdxArray.at(-2));

    regexPatterns.forEach(
      (regex) =>
        (text = text.replaceAll(
          regex.pattern,
          `<span class=${regex.name} title=${regex.description}>$1</span>`
        ))
    );

    newParagraph.innerHTML = text;

    lyAdverbs(text).then((data) => {
      newParagraph.innerHTML = data;
    });
  }
});
