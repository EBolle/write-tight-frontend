"use strict";

import { getAllPatterns, renderTokens } from "./modules/pattern-utils.js";

const outputContainer = document.querySelector("#output-container");
const textArea = document.querySelector("#text-area");
const sentenceDivClasses = ["flex", "flex-row", "flex-wrap", "space-x-1"];

// ** MAIN **

// Initialize the global cursorIdxArray with 0 to get the correct last slice after a keyup event
const cursorIdxArray = [0];

textArea.addEventListener("keyup", (event) => {
  if (event.key === "." || event.key === "?" || event.key === "!") {
    cursorIdxArray.push(textArea.selectionStart);
    let text = textArea.value.slice(cursorIdxArray.at(-2));

    // Use lexical scoping to pass text to the inner body of the IIFE
    (async function handleText() {
      const textPatterns = await getAllPatterns(text);

      // Convert object of objects to objects of arrays and loop over the arrays and values to render the text, pos, and span titles.
      const textPatternsArrays = Object.values(textPatterns);
      const arrayLength = textPatternsArrays[0].length;

      // Prepare the HTML element which is appended to the outputContainer
      const sentenceDiv = document.createElement("div");
      sentenceDiv.classList.add(...sentenceDivClasses);

      for (let idx = 0; idx < arrayLength; idx++) {
        const tokenPlaceholder = [];

        for (const key in textPatternsArrays) {
          tokenPlaceholder.push(textPatternsArrays[key][idx]);
        }

        sentenceDiv.append(renderTokens(tokenPlaceholder));
      }

      outputContainer.append(sentenceDiv);
    })();
  }
});
