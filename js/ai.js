// StudyPilot AI — ai.js
// Client-side helpers for talking to our serverless AI proxy function.
// Never calls the AI provider directly — always goes through
// /.netlify/functions/ask-ai, which keeps the real API key server-side.

async function askAI(prompt) {
  try {
    const response = await fetch('/.netlify/functions/ask-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Request failed with status ${response.status}`);
    }

    return data.text;
  } catch (err) {
    console.error('askAI failed:', err);
    throw err;
  }
}

// ---------- Feature 1: AI Plan Customization ----------
// Takes a goal's raw task titles and asks the AI to schedule them across
// upcoming days. Returns { success, error? }. On success, task dates are
// already applied to the store.

async function organizeGoalWithAI(goal) {
  const todoTasks = goal.tasks.filter((t) => t.status === 'todo');
  if (todoTasks.length === 0) {
    return { success: false, error: 'No pending tasks to organize.' };
  }

  const todayStr = window.Store.todayDateString();
  const taskList = todoTasks.map((t) => `- id: ${t.id} | title: "${t.title}"`).join('\n');

  const prompt = `You are a study planning assistant. Today's date is ${todayStr}.
Here is a list of study tasks for the goal "${goal.title}":
${taskList}

Assign each task a scheduledDate (format YYYY-MM-DD), starting from today, spreading them
across realistic days with no more than 2-3 tasks on any single day. Do not invent new tasks,
only use the ids given. Respond with ONLY valid JSON in this exact shape, and nothing else,
no markdown formatting, no code fences, no explanation:
{"schedule":[{"taskId":"...","scheduledDate":"YYYY-MM-DD"}]}`;

  try {
    const raw = await askAI(prompt);
    const jsonMatch = raw.match(/\{[\s\S]*\}/); // defensive extraction in case of stray text
    if (!jsonMatch) throw new Error('AI response did not contain valid JSON.');
    const parsed = JSON.parse(jsonMatch[0]);
    if (!Array.isArray(parsed.schedule)) throw new Error('Unexpected AI response shape.');

    let appliedCount = 0;
    parsed.schedule.forEach((item) => {
      if (item.taskId && /^\d{4}-\d{2}-\d{2}$/.test(item.scheduledDate)) {
        const result = window.Store.editTask(item.taskId, { scheduledDate: item.scheduledDate });
        if (result) appliedCount++;
      }
    });

    if (appliedCount === 0) {
      return { success: false, error: 'AI response could not be applied to any tasks.' };
    }
    return { success: true };
  } catch (err) {
    console.error('organizeGoalWithAI failed:', err);
    return { success: false, error: err.message || 'Something went wrong asking AI to organize this goal.' };
  }
}

// ---------- Feature 2: Chat Guidance ----------
// Builds a context-aware prompt (today's tasks, goals, streak) so answers
// are grounded in the student's real data, not generic advice.

async function getChatResponse(userMessage) {
  const todayTasks = window.Store.getTodayTasks();
  const goals = window.Store.getGoals();
  const streak = window.Store.getCurrentStreak();

  const todaySummary =
    todayTasks.length > 0
      ? todayTasks.map((t) => `- "${t.title}" (goal: ${t.goalTitle})`).join('\n')
      : '(nothing scheduled for today)';

  const goalsSummary =
    goals.length > 0
      ? goals.map((g) => {
          const total = g.tasks.length;
          const done = g.tasks.filter((t) => t.status === 'done').length;
          return `- "${g.title}": ${done}/${total} tasks done`;
        }).join('\n')
      : '(no goals created yet)';

  const prompt = `You are StudyPilot AI, a friendly, encouraging study assistant embedded in a
student's personal study app. Here is the student's real current data:

Today's prioritized tasks:
${todaySummary}

All goals and progress:
${goalsSummary}

Current streak: ${streak} day(s)

The student says: "${userMessage}"

Reply directly and helpfully, grounded in the data above. Keep your answer to 2-4 sentences
unless the student explicitly asks for more detail. Do not use markdown formatting such as
asterisks or headers — plain text only. Do not repeat the raw data verbatim back
at them; use it naturally in your answer.`;

  return askAI(prompt);
}

window.askAI = askAI;
window.organizeGoalWithAI = organizeGoalWithAI;
window.getChatResponse = getChatResponse;
