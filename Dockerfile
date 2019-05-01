FROM node:10

WORKDIR /app/src/

COPY . .

RUN npm install
RUN npm run build:docker


FROM nginx:alpine

COPY --from=0 /app/src/dist/* /usr/share/nginx/html/
