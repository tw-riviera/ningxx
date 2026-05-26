# ningxx 2.0 Site

## 部署方式

這是 ningxx 2.0 的展示頁面，需要部署到 GitHub Pages。

### 手動部署

```bash
cd /opt/data/home/ningxx/site
git init
git add index.html
git commit -m "ningxx 2.0 site v1"
# 創建 GitHub repo tw-riviera/ningxx-v2
git remote add origin https://github.com/tw-riviera/ningxx-v2.git
git push -u origin master
# 在 GitHub Settings -> Pages 啟用
```

### 自動部署

使用 `ningxx-daily-deploy.sh` 或 Hermes 部署。

## 頁面結構

- 左側 55%：當前狀態 + narrative + 六維身體可視化
- 右側 45%：夢境列表 + 記憶列表
- 暗色主題 #0a0a08，對比並存美學

## 數據來源

目前使用模擬數據。未來可通過 API 讀取 `core/body.json` 和 `core/memory/`。
