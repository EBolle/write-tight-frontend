"use strict";

import { regexPatterns } from "./modules/regex-patterns.js";
import {
  getTextPosList,
  lyAdverbs,
  nlpPatterns,
} from "./modules/nlp-patterns.js";

const outputContainer = document.querySelector("#output-container");
const textArea = document.querySelector("#text-area");

const sentenceDivClasses = ["flex", "space-x-1"];
const sentenceElementDivClasses = ["flex", "flex-col", "space-y-1"];
const posClasses = ["text-sm", "text-orange-500"];

// Initialize with 0 to get the correct last slice after a keyup event
const cursorIdxArray = [0];

textArea.addEventListener("keyup", (event) => {
  if (event.code === "Period" || event.key === "?" || event.key === "!") {
    cursorIdxArray.push(textArea.selectionStart);
    let text = textArea.value.slice(cursorIdxArray.at(-2));

    getTextPosList(text).then((data) => {
      // Zip text and POS to visually display them on top of each other
      const textPos = data.text.map(function (value, idx) {
        return [value, data.pos[idx]];
      });

      const sentenceDiv = document.createElement("div");
      sentenceDiv.classList.add(...sentenceDivClasses);

      textPos.forEach((element) => {
        let sentenceElementDiv = document.createElement("div");
        sentenceElementDiv.classList.add(...sentenceElementDivClasses);

        let textSpan = document.createElement("span");
        let posSpan = document.createElement("span");
        posSpan.classList.add(...posClasses);

        textSpan.innerHTML = element[0];
        posSpan.innerHTML = element[1];
        sentenceElementDiv.append(textSpan);
        sentenceElementDiv.append(posSpan);
        sentenceDiv.append(sentenceElementDiv);
      });

      outputContainer.append(sentenceDiv);
    });
  }
});

// regexPatterns.forEach(
//   (regex) =>
//     (text = text.replaceAll(
//       regex.pattern,
//       `<span class=${regex.name} title=${regex.description}>$1</span>`
//     ))
// );

// newParagraph.innerHTML = text;

// lyAdverbs(text).then((data) => {
//   newParagraph.innerHTML = data;
// });
