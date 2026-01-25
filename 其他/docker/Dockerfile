FROM nginx

# 类似 cd , 进入到容器内的指定目录
WORKDIR /app

COPY index.html /usr/share/nginx/html

# 执行命令
# RUN npm install

# CMD 容器启动时执行的命令(一个文件只能有一个 CMD 指令)
# CMD ["python", "main.py"]

EXPOSE 8080