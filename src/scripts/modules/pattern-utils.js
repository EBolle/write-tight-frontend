"use strict;";

const sentenceElementDivClasses = ["flex", "flex-col", "space-y-1"];
const posClasses = ["text-base", "text-orange-500"];

const getAllPatterns = async function (text) {
  try {
    const response = await fetch(`http://localhost:8000/patterns/all/${text}`);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(
        `Something went wrong fetching data from patterns/all: ${error}`
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const renderTokens = function (tokenPlaceholder) {
  let sentenceElementDiv = document.createElement("div");
  sentenceElementDiv.classList.add(...sentenceElementDivClasses);

  let textSpan = document.createElement("span");
  let posSpan = document.createElement("span");
  posSpan.classList.add(...posClasses);

  textSpan.innerHTML = tokenPlaceholder[0];
  textSpan.title = tokenPlaceholder[3];
  posSpan.innerHTML = tokenPlaceholder[1];

  sentenceElementDiv.append(textSpan);
  sentenceElementDiv.append(posSpan);

  return sentenceElementDiv;
};

export { getAllPatterns, renderTokens };
