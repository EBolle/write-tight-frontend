"use strict";

import { regexPatterns } from "./modules/regex-patterns.js";
import { getPosList, lyAdverbs, nlpPatterns } from "./modules/nlp-patterns.js";

const textArea = document.querySelector("#text-area");
const textContainer = document.querySelector("#text-container");

const textClasses = ["py-2"];
const posClasses = ["text-sm", "text-orange-500"];

// Initialize with 0 so always get the correct slice after a keyup event
const cursorIdxArray = [0];

textArea.addEventListener("keyup", (event) => {
  if (event.code === "Period" || event.key === "?" || event.key === "!") {
    let newParagraph = document.createElement("p");
    newParagraph.classList.add(...textClasses);
    textContainer.append(newParagraph);

    cursorIdxArray.push(textArea.selectionStart);

    let text = textArea.value.slice(cursorIdxArray.at(-2));

    getPosList(text).then((data) => {
      console.log(data);
      let posParagraph = document.createElement("p");
      posParagraph.classList.add(...posClasses);
      posParagraph.innerHTML = data.pos.join(" ");
      newParagraph.append(posParagraph);
    });

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
