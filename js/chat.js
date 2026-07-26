// StudyPilot AI — chat.js
// Renders the Chat screen: message list, input, and send handling.
// Conversation history is kept in memory for the session (not persisted
// to localStorage in v1.0 — acceptable per PRD, a nice-to-have not a must-have).

const ChatScreen = (function () {
  let messages = []; // { role: 'user' | 'ai', text: string }

  function render() {
    const root = document.getElementById('chat-root');
    if (!root) return;
    root.innerHTML = `
      <div id="chat-messages" style="display:flex; flex-direction:column; gap:var(--space-3); margin-bottom:var(--space-5); max-height:50vh; overflow-y:auto;">
        ${messages.length === 0 ? emptyStateHtml() : messages.map(messageBubbleHtml).join('')}
      </div>
      <form id="chat-form" style="display:flex; gap:var(--space-2);">
        <input type="text" id="chat-input" placeholder="Ask what to study today, or how to re-plan a goal..."
          style="flex:1; padding:var(--space-2) var(--space-3); border-radius:var(--radius); border:1px solid var(--border); background:var(--bg-surface); color:var(--text-primary); font-family:var(--font-body); font-size:14px;" />
        <button type="submit" class="button button--primary" id="chat-send-btn">Send</button>
      </form>
    `;
    attachEvents(root);
    scrollToBottom();
  }

  function emptyStateHtml() {
    return `
      <div class="empty-state">
        <p>Ask me what to study today, or how to re-plan a goal.</p>
      </div>
    `;
  }

  function messageBubbleHtml(msg) {
    const isUser = msg.role === 'user';
    const displayText = isUser ? msg.text : msg.text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
    return `
      <div style="display:flex; ${isUser ? 'justify-content:flex-end;' : 'justify-content:flex-start;'}">
        <div class="card" style="max-width:75%; background:${isUser ? 'var(--teal-deep)' : 'var(--card)'};">
          ${escapeHtml(displayText)}
        </div>
      </div>
    `;
  }

  function attachEvents(root) {
    const form = root.querySelector('#chat-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = root.querySelector('#chat-input');
      const text = input.value.trim();
      if (!text) return;

      messages.push({ role: 'user', text });
      input.value = '';
      const sendBtn = root.querySelector('#chat-send-btn');
      sendBtn.disabled = true;
      sendBtn.textContent = 'Thinking...';
      render(); // show user message immediately, and disable state persists via re-render below

      try {
        const reply = await window.getChatResponse(text);
        messages.push({ role: 'ai', text: reply });
      } catch (err) {
        messages.push({ role: 'ai', text: "Sorry, I couldn't reach the AI service just now. You can still manage your goals and tasks manually — try again in a moment." });
      }
      render();
    });
  }

  function scrollToBottom() {
    const box = document.getElementById('chat-messages');
    if (box) box.scrollTop = box.scrollHeight;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  return { render };
})();

window.ChatScreen = ChatScreen;
