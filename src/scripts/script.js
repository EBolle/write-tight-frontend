"use strict";

import { regexPatterns } from "./modules/regex-patterns.js";
import { getTokens, Token } from "./modules/nlp-patterns.js";

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
      const tokens = await getTokens(text);
      console.log(tokens);

      let textTokensAsSentence = tokens.text.join(" ");

      // Start with the synchronous operations and display the result as fast as possible
      // Makes no sense start with the async requests and handle them when ready

      regexPatterns.forEach(
        (regex) =>
          (textTokensAsSentence = textTokensAsSentence.replaceAll(
            regex.pattern,
            `<span class=${regex.name} title=${regex.description}>$1</span>`
          ))
      );

      console.log(textTokensAsSentence);
    })();
  }
});

//     getTextPosList(text).then((data) => {
//       // Tag any regular expression to the original full sentence
//       text = data.text.join(" ");

//       regexPatterns.forEach(
//         (regex) =>
//           (text = text.replaceAll(
//             regex.pattern,
//             `<span class=${regex.name} title=${regex.description}>$1</span>`
//           ))
//       );

//       // The regEx needs further improvement, add the NLP Patterns and then CLEAN THIS CODE please, modules :)
//       text = text.split(/(\s+|<span.+?<\/span>)/);
//       text = text.filter((str) => str != "" && str != " ");

//       console.log(text, typeof text);

//       // Zip text and POS to visually display them on top of each other
//       const textPos = text.map(function (value, idx) {
//         return [value, data.pos[idx]];
//       });

//       const sentenceDiv = document.createElement("div");
//       sentenceDiv.classList.add(...sentenceDivClasses);

//       textPos.forEach((element) => {
//         let sentenceElementDiv = document.createElement("div");
//         sentenceElementDiv.classList.add(...sentenceElementDivClasses);

//         let textSpan = document.createElement("span");
//         let posSpan = document.createElement("span");
//         posSpan.classList.add(...posClasses);

//         textSpan.innerHTML = element[0];
//         posSpan.innerHTML = element[1];
//         sentenceElementDiv.append(textSpan);
//         sentenceElementDiv.append(posSpan);
//         sentenceDiv.append(sentenceElementDiv);
//       });

//       outputContainer.append(sentenceDiv);
//     });
//   }
// });

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
