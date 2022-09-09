FROM node:16-alpine
RUN mkdir /app
WORKDIR /app
COPY yarn.lock /app/
COPY dist/apps/backend/package.json /app/
RUN yarn install
COPY /dist/apps/backend /app
CMD [ "node", "main.js" ]
