FROM node:18-slim

WORKDIR /app

# 安裝基本依賴
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製源代碼
COPY . .

# 編譯 TypeScript
RUN npm run build

# 啟動命令
CMD ["npm", "start"] 