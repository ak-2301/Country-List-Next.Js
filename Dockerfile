FROM node:16-alpine
WORKDIR /app

COPY . /app

RUN npm install 

EXPOSE 9999

ENV PORT 9999

CMD npm run dev 