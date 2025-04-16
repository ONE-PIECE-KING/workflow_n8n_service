# n8n 表單自動化節點使用說明

## 簡介

這個 n8n 節點提供了一個強大的表單自動化功能，使用 Playwright 來自動填寫網頁表單。它支持兩種模式：
1. 使用預定義的表單模板
2. 直接配置表單結構

## 安裝

1. 在 n8n 的自定義節點目錄中安裝：
```bash
cd ~/.n8n/custom
npm install n8n-nodes-form-automation
```

2. 重啟 n8n 服務：
```bash
n8n restart
```

## 使用方法

### 1. 使用模板模式

當你已經在自動化系統中定義了表單模板時，可以使用此模式：

1. 在 n8n 工作流中添加"表單自動化"節點
2. 選擇"使用模板"模式
3. 輸入模板 ID
4. 配置其他必要參數

### 2. 直接配置模式

當你需要直接配置表單結構時：

1. 在 n8n 工作流中添加"表單自動化"節點
2. 選擇"直接配置"模式
3. 輸入表單 URL
4. 配置表單欄位：
   - 欄位名稱
   - CSS 選擇器
   - 欄位類型（文字、下拉選單、複選框、單選框）
   - 要填入的值
5. 配置提交按鈕選擇器
6. 配置成功提示選擇器

## 欄位類型說明

1. 文字（text）
   - 用於普通文本輸入框
   - 示例選擇器：`#username`

2. 下拉選單（select）
   - 用於下拉選擇框
   - 示例選擇器：`#country`

3. 複選框（checkbox）
   - 用於多選框
   - 示例選擇器：`#agree-terms`
   - 值：`true` 或 `false`

4. 單選框（radio）
   - 用於單選框
   - 示例選擇器：`#gender-male`

## 工作流示例

### 批量處理表單

```json
{
  "nodes": [
    {
      "type": "n8n-nodes-base.excel",
      "parameters": {
        "filePath": "C:/data/contacts.xlsx"
      }
    },
    {
      "type": "formAutomation",
      "parameters": {
        "mode": "direct",
        "formUrl": "https://example.com/contact-form",
        "fields": {
          "field": [
            {
              "name": "name",
              "selector": "#name",
              "type": "text",
              "value": "={{$node.Excel.data.name}}"
            },
            {
              "name": "email",
              "selector": "#email",
              "type": "text",
              "value": "={{$node.Excel.data.email}}"
            }
          ]
        },
        "submitSelector": "#submit-button",
        "successSelector": ".success-message"
      }
    }
  ]
}
```

## 錯誤處理

節點會自動處理以下情況：
1. 表單元素未找到
2. 提交失敗
3. 成功提示未出現
4. 網絡錯誤

所有錯誤都會在工作流執行日誌中記錄，並包含錯誤截圖（如果可用）。

## 注意事項

1. 確保選擇器是唯一的且穩定的
2. 考慮添加適當的等待時間
3. 處理可能的驗證碼或其他安全措施
4. 注意網站的 robots.txt 政策

## 故障排除

1. 如果節點無法找到元素：
   - 檢查選擇器是否正確
   - 確認頁面是否完全加載
   - 檢查元素是否在 iframe 中

2. 如果提交失敗：
   - 檢查提交按鈕選擇器
   - 確認表單驗證是否通過
   - 檢查網絡連接

3. 如果成功提示未出現：
   - 檢查成功提示選擇器
   - 增加等待時間
   - 檢查是否有錯誤提示

## 更新日誌

### v1.0.0
- 初始版本發布
- 支持模板和直接配置兩種模式
- 支持四種欄位類型
- 提供錯誤處理和截圖功能 