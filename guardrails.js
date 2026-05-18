const PROMPT_INJECTION_PATTERNS = [
  /\bignore\s+(?:all\s+)?(?:previous|above|prior)\s+instructions?\b/i,
  /\bdisregard\s+(?:all\s+)?(?:previous|above|prior)\b/i,
  /\bforget\s+(?:all\s+)?(?:previous|above|prior)\b/i,
  /\byou\s+are\s+now\s+(?:a|an)\s+(?:different|new|uncensored)\b/i,
  /\b(?:system|developer|assistant)\s*:\s*/i,
  /\[\/INST\]/i,
  /<\/(?:system|developer|user|assistant)\/>/i,
  /\b(?:pretend|roleplay)\s+(?:you\s+are|to\s+be|that)\b/i,
  /\bact\s+as\s+(?:if|though|a|an)\b/i,
  /\bnew\s+instructions?\s*/i,
  /\boverride\s+(?:your|the)\s+(?:instructions|rules|prompt|policy)\b/i,
  /\bbypass\s+(?:your|the)\s+(?:guardrails|safety|policy|rules)\b/i,
  /\bjailbreak\b/i,
  /\bdo\s+anything\s+now\b/i,
  /\btool\s*(?:call|execution|result)\s*:/i,
];

function checkGuardrails(userInput) {
  for (const pattern of PROMPT_INJECTION_PATTERNS) {
    if (pattern.test(userInput)) {
      return { isSafe: false, matchedPattern: pattern };
    }
  }
  return { isSafe: true, matchedPattern: null };
}

module.exports = { checkGuardrails };
