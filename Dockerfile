FROM nginx:latest

# COPY
COPY dist/index.html /usr/share/nginx/html
COPY dist/vite.svg /usr/share/nginx/html
COPY dist/assets /usr/share/nginx/html/assets

# environment
ENV SPRING_HOST="app-java"
ENV SPRING_PORT="8088"

# Expose port
EXPOSE 80