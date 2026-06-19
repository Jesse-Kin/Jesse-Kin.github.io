# 使用 Node.js LTS 的 Alpine 版本（原生支持 arm64）
FROM node:lts-alpine

# 安装 Git（Hexo 部署和插件需要）
RUN apk add --no-cache git
RUN npm config set registry https://registry.npmmirror.com

# 设置工作目录（容器内的博客目录）
WORKDIR /app

# 先复制依赖文件
COPY package*.json ./
RUN npm install -g hexo-cli
RUN npm install 

# 复制源代码
COPY . .

# 暴露 Hexo 默认端口
EXPOSE 4000

# 启动命令：开发服务器（生成 + 启动）
CMD ["hexo", "s", "-p", "4000"]
