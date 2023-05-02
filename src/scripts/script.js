"use strict";

import { regexPatterns } from "./modules/regex-patterns.js";
import { getPosList, lyAdverbs, nlpPatterns } from "./modules/nlp-patterns.js";

const outputContainer = document.querySelector("#output-container");
const textArea = document.querySelector("#text-area");

const textPosDivClasses = ["flex", "flex-col", "space-y-1"];
const posClasses = ["text-medium", "text-orange-500"];

// Initialize with 0 so always get the correct slice after a keyup event
const cursorIdxArray = [0];

textArea.addEventListener("keyup", (event) => {
  if (event.code === "Period" || event.key === "?" || event.key === "!") {
    cursorIdxArray.push(textArea.selectionStart);
    let text = textArea.value.slice(cursorIdxArray.at(-2));

    getPosList(text).then((data) => {
      const textPos = data.text.map(function (value, idx) {
        return [value, data.pos[idx]];
      });

      textPos.forEach((element) => {
        let textPosDiv = document.createElement("div");
        textPosDiv.classList.add(...textPosDivClasses);

        let textSpan = document.createElement("span");
        let posSpan = document.createElement("span");
        posSpan.classList.add(...posClasses);

        textSpan.innerHTML = element[0];
        posSpan.innerHTML = element[1];
        textPosDiv.append(textSpan);
        textPosDiv.append(posSpan);

        outputContainer.append(textPosDiv);
      });
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
