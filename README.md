# 若安zzh 留言板

一个基于 Supabase 的在线留言板，支持多人实时留言、删除，部署于 GitHub Pages。

[在线预览](https://zzh9295.github.io/message-board/)

![效果图](img/bg3.png)

## 功能

- 发布留言（昵称 + 内容）
- 删除留言（带淡出动画）
- 数据云端存储（Supabase PostgreSQL）
- 响应式布局，支持移动端
- Ctrl + Enter 快捷提交

## 技术栈

- HTML / CSS / JavaScript
- [Supabase](https://supabase.com) — 后端数据库
- GitHub Pages — 静态托管 也可以托管到别处，这里不作教程

## 项目结构

```
├── index.html       # 主页面
├── css/
│   └ ── style.css    # 样式
├── js/
│   ├── config.js    # Supabase 配置（需填写自己的密钥）
│   └── main.js      # 业务逻辑
└── img/
    ├── bg1.png      # 背景图
    ├── bg2.png      # 默认头像
    └── bg3.png      # 效果图
```

## 部署步骤

1. 在 [Supabase](https://supabase.com) 创建项目，执行建表 SQL：

```sql
// 创建留言表
CREATE TABLE messages (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  time TEXT NOT NULL
);

// 启用行级安全策略
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

// 允许所有人查询、插入、删除留言
CREATE POLICY "允许所有人读取" ON messages FOR SELECT USING (true);
CREATE POLICY "允许所有人写入" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "允许所有人删除" ON messages FOR DELETE USING (true);
```

2. 将 `js/config.js` 中的 `SUPABASE_URL` 和 `SUPABASE_ANON_KEY` 替换为你的项目密钥。

3. 将项目推送到 GitHub 仓库，在 Settings → Pages 中启用 GitHub Pages。

4. 一个属于你自己的在线留言板就完成啦。

## 许可

MIT