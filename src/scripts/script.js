"use strict";

import { getAllPatterns, renderTokens } from "./modules/pattern-utils.js";

const posButton = document.querySelector("#posButton");
const posExplanation = document.querySelector("#posExplanation");
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
      const allPatterns = await getAllPatterns(text);

      // Prepare the HTML element which is appended to the outputContainer
      const sentenceDiv = document.createElement("div");
      sentenceDiv.classList.add(...sentenceDivClasses);

      allPatterns.forEach((token) => {
        sentenceDiv.append(renderTokens(token));
      });

      outputContainer.append(sentenceDiv);
    })();
  }
});

posButton.addEventListener("click", (event) => {
  posExplanation.classList.toggle("hidden");
});
