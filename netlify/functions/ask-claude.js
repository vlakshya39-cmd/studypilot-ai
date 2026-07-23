// StudyPilot AI — netlify/functions/ask-claude.js
//
// PLACEHOLDER — intentionally not implemented yet.
// Real logic (calling the Claude API securely, reading ANTHROPIC_API_KEY from
// an environment variable) is scheduled for Day 6 per the Implementation Blueprint.
//
// This stub exists today only so the folder structure matches PROJECT-STRUCTURE.md
// and so Netlify's local dev server (`netlify dev`) has a valid function to detect.

exports.handler = async function (event) {
  return {
    statusCode: 501,
    body: JSON.stringify({
      error: "Not implemented yet — AI integration arrives on Day 6.",
    }),
  };
};
