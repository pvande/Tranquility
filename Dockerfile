FROM mhart/alpine-node:8.1.3
WORKDIR /app
EXPOSE 80

# Install dependencies from NPM
COPY ["package.json", "package-lock.json", "/app/"]
RUN npm install

# Copy application code
COPY ["components", "dashboards", "docker", "static", "server", "client", "/app/"]
ENV NODE_ENV=production
ENTRYPOINT /app/docker/start
