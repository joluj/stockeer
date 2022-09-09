FROM nginx:latest
RUN useradd -ms /bin/bash www
COPY /devops/nginx-conf /etc/nginx
COPY /dist/apps/app /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]
