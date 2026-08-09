function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function clearForm() {
  document.querySelector('.name').value = '';
  document.querySelector('.text').value = '';
}

function renderList() {
  const list = document.querySelector('.list');
  const msgs = JSON.parse(localStorage.getItem('msg_board_data') || '[]');

  if (msgs.length === 0) {
    list.innerHTML = '<div class="empty-tip">还没有留言，快来抢沙发吧~</div>';
    return;
  }

  list.innerHTML = msgs.slice().reverse().map(m => {
    return `
      <div class="item" data-id="${m.id}">
        <div class="top">
          <div>
            <img src="img/bg2.png" alt="">
            <div>${escapeHtml(m.name)}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span>${m.time}</span>
            <button class="delete-btn" onclick="deleteMsg(${m.id})">删除</button>
          </div>
        </div>
        <div class="btm">${escapeHtml(m.content)}</div>
      </div>`;
  }).join('');
}

function saveMsg(name, content, time) {
  const msgs = JSON.parse(localStorage.getItem('msg_board_data') || '[]');
  msgs.push({ id: Date.now(), name, content, time });
  localStorage.setItem('msg_board_data', JSON.stringify(msgs));
  renderList();
}

function deleteMsg(id) {
  const card = document.querySelector('.item[data-id="' + id + '"]');
  if (card) {
    card.style.opacity = '0';
    card.style.transform = 'translateX(30px)';
    setTimeout(() => {
      let msgs = JSON.parse(localStorage.getItem('msg_board_data') || '[]');
      msgs = msgs.filter(m => m.id !== id);
      localStorage.setItem('msg_board_data', JSON.stringify(msgs));
      renderList();
    }, 300);
  }
}

// 绑定事件
document.querySelector('.OK').onclick = function() {
  const name = document.querySelector('.name').value.trim();
  const text = document.querySelector('.text').value.trim();
  const now = new Date().toLocaleString('zh-CN');

  if (name === '' || text === '') {
    alert('输入框不能为空！');
    return;
  }

  saveMsg(name, text, now);
  clearForm();
};

document.querySelector('.clear').onclick = clearForm;

// Ctrl+Enter 快捷提交
document.querySelector('.text').addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key === 'Enter') {
    document.querySelector('.OK').click();
  }
});

renderList();