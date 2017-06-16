FROM node:8.1.2

RUN ["mkdir", "/app"]
VOLUME ["/app"]

ENTRYPOINT ["node", "/app/index.js"]
EXPOSE 3000
