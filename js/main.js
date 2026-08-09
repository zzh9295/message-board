
// 工具函数
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function clearForm() {
  document.querySelector('.name').value = '';
  document.querySelector('.text').value = '';
  document.querySelector('.name').focus();
}

// 核心业务函数

// 渲染留言列表
async function renderList() {
  const list = document.querySelector('.list');
  
  // 从 Supabase 查询所有留言，按 id 降序 (最新的在前)
  const { data: msgs, error } = await db
    .from('messages')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error('数据加载失败:', error);
    list.innerHTML = `<div class="empty-tip">⚠️ 加载留言失败，请检查网络或配置。</div>`;
    return;
  }

  if (!msgs || msgs.length === 0) {
    list.innerHTML = '<div class="empty-tip">✨ 还没有留言，快来抢沙发吧~</div>';
    return;
  }

  list.innerHTML = msgs.map(m => {
    return `
      <div class="item" data-id="${m.id}">
        <div class="top">
          <div>
            <img src="img/bg2.png" alt="">
            <div>${escapeHtml(m.name)}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span>${escapeHtml(m.time)}</span>
            <button class="delete-btn" data-id="${m.id}">删除</button>
          </div>
        </div>
        <div class="btm">${escapeHtml(m.content)}</div>
      </div>`;
  }).join('');

  // 为所有删除按钮绑定事件 (替换 onclick 属性)
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const id = Number(this.dataset.id);
      deleteMsg(id);
    });
  });
}

// 保存留言
async function saveMsg(name, content) {
  const now = new Date().toLocaleString('zh-CN', { hour12: false });
  const { error } = await db
    .from('messages')
    .insert([{ name, content, time: now }]);

  if (error) {
    console.error('发布失败:', error);
    alert('留言发布失败，请稍后再试。');
    return false;
  }
  return true;
}

// 删除留言
async function deleteMsg(id) {
  const card = document.querySelector(`.item[data-id="${id}"]`);
  if (card) {
    card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    card.style.opacity = '0';
    card.style.transform = 'translateX(30px)';
  }

  const { error } = await db
    .from('messages')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('删除失败:', error);
    alert('删除留言失败，请稍后再试。');
    renderList(); // 删除失败时刷新列表以恢复状态
    return;
  }

  // 删除成功后移除 DOM 元素
  if (card) {
    setTimeout(() => {
      card.remove();
      // 如果列表为空，重新渲染以显示空状态
      if (document.querySelectorAll('.item').length === 0) {
        renderList();
      }
    }, 300);
  } else {
    renderList();
  }
}

// 绑定事件

// 发布按钮
document.querySelector('.OK').onclick = async function() {
  const name = document.querySelector('.name').value.trim();
  const text = document.querySelector('.text').value.trim();

  if (name === '' || text === '') {
    alert('输入框不能为空！');
    return;
  }

  const success = await saveMsg(name, text);
  if (success) {
    clearForm();
    await renderList();
    // 滚动到留言板顶部，方便看到最新消息
    document.querySelector('.list').scrollTop = 0;
  }
};

// 清空按钮
document.querySelector('.clear').onclick = clearForm;

// Ctrl+Enter 快捷提交
document.querySelector('.text').addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key === 'Enter') {
    e.preventDefault();
    document.querySelector('.OK').click();
  }
});

// Enter 在昵称输入框跳转至内容框
document.querySelector('.name').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.querySelector('.text').focus();
  }
});

// 页面加载时渲染留言列表
renderList();