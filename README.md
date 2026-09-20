# Iskï Commission Layout

這是一份純靜態 HTML/CSS/JS 多頁委託網站視覺稿。

## 網站頁面

- `index.html`：主頁，聚焦代表作品與開始委託
- `works.html`：可分類的完整作品集
- `commissions.html`：方案比較、詳細價格與其他服務
- `process.html`：委託流程、工期、付款與交付
- `rules.html`：完整委託規範
- `start.html`：產生委託摘要並連接 Email／Discord

## 開啟方式

直接雙擊 `index.html` 即可預覽；若瀏覽器限制本機 JavaScript，可在此資料夾執行：

```powershell
python -m http.server 8080
```

然後開啟 `http://127.0.0.1:8080/`。

## Google Sites 限制

Google Sites 無法直接匯入並套用整份自訂 HTML/CSS 當作網站主題。可採用以下任一方式：

1. 將此網站部署到 GitHub Pages、Cloudflare Pages 或 Netlify，再於 Google Sites 使用「嵌入網址」。
2. 將這份版型當作視覺規格，使用 Google Sites 的區塊重新排版。
3. 直接以獨立網址取代 Google Sites，可完整保留響應式版面、動畫與互動。

## 上線前要替換的內容

- 首頁委託檔期與預估排程
- 精選作品與圖片替代文字
- Google Form 委託表連結（若有）
- 商業委託、NSFW 與完整規範內容
- 各方案最終價格和工期

版型內的作品區目前使用自製 SVG 佔位圖。Google Sites 會阻擋外站直接引用部分作品圖片，因此正式上線前，請把原始作品圖放進 `assets/`，並保留目前的檔名覆蓋 `art-hero.svg`、`art-chibi.svg` 與 `art-01.svg` 至 `art-04.svg`，或修改 `index.html` 中的圖片路徑。
