FROM nginx:latest

# COPY
COPY dist/index.html /usr/share/nginx/html
COPY dist/vite.svg /usr/share/nginx/html
COPY dist/assets /usr/share/nginx/html/assets


# Expose port
EXPOSE 80