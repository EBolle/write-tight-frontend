"use strict";

import { regexPatterns } from "./modules/regex-patterns.js";
import { getAllPatterns } from "./modules/nlp-patterns.js";

const outputContainer = document.querySelector("#output-container");
const textArea = document.querySelector("#text-area");

// The analyzed text and POS tags are inserted live in the document
// To avoid code clutter the (tailwindCSS) CSS classes are defined here

const sentenceDivClasses = ["flex", "space-x-1"];
const sentenceElementDivClasses = ["flex", "flex-col", "space-y-1"];
const posClasses = ["text-base", "text-orange-500"];

// ** MAIN **

// Initialize the global cursorIdxArray with 0 to get the correct last slice after a keyup event
const cursorIdxArray = [0];

textArea.addEventListener("keyup", (event) => {
  if (event.code === "Period" || event.key === "?" || event.key === "!") {
    cursorIdxArray.push(textArea.selectionStart);
    let text = textArea.value.slice(cursorIdxArray.at(-2));

    // Use lexical scoping to pass text to the inner body of the IIFE
    (async function handleText() {
      const textPatterns = await getAllPatterns(text);

      // Convert object of objects to objects of arrays and loop over the arrays and values to render the text, pos, and span titles.
      const textPatternsArrays = Object.values(textPatterns);
      const arrayLength = textPatternsArrays[0].length;

      for (let idx = 0; idx < arrayLength; idx++) {
        const tokenPlaceholder = [];

        for (const key in textPatternsArrays) {
          tokenPlaceholder.push(textPatternsArrays[key][idx]);
        }
        console.log(tokenPlaceholder);
        // renderToken -> create new function in render.js
      }

      // const arrayLength = textPatterns.text.length;
      // const keys = Object.keys(textPatterns);
      // const values = Object.values(textPatterns);

      // const sentenceDiv = document.createElement("div");
      // sentenceDiv.classList.add(...sentenceDivClasses);

      // // Create tuple (list) for each column of array values

      // for (let idx = 0; idx < arrayLength; idx++) {
      //   const tokenCol = [];

      //   for (const key in keys) {
      //     tokenCol.push(values[key][idx]);
      //   }

      //   let sentenceElementDiv = document.createElement("div");
      //   sentenceElementDiv.classList.add(...sentenceElementDivClasses);
      //   let textSpan = document.createElement("span");
      //   let posSpan = document.createElement("span");
      //   posSpan.classList.add(...posClasses);

      //   textSpan.innerHTML = tokenCol[0];
      //   posSpan.innerHTML = tokenCol[1];

      //   sentenceElementDiv.append(textSpan);
      //   sentenceElementDiv.append(posSpan);

      //   sentenceDiv.append(sentenceElementDiv);
      // }
      // outputContainer.append(sentenceDiv);
    })();
  }
});
