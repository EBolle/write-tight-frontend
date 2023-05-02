"use strict";

const regexPatterns = [
  {
    name: "ambiguous-pronouns",
    pattern: /\b(it|that|there|these|those|this)\b/gi,
    description: "'Avoid vague pronouns, be specific.'",
  },
  {
    name: "ambiguous-openings",
    pattern: /\b(There|It)\b\s{1}\b(am|are|is|was|were|been|being)\b/gi,
    description: "'Avoid vague openings, be specific.'",
  },
  {
    name: "subjunctive-mood",
    pattern: /\b(would|should|could)\b/gi,
    description: "'Would, should, and could sound weak, write strong.'",
  },
  {
    name: "personal-pronouns",
    pattern: /\b(i|me|mine|my|myself|personally)\b/gi,
    description:
      "'Personal pronouns sound subjective and emotional, which weakens your text.'",
  },
];

export { regexPatterns };
