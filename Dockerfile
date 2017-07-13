FROM mhart/alpine-node:8.1.3
WORKDIR /app
EXPOSE 80

# Install server dependencies
RUN npm install --no-shrinkwrap \
                body-parser@1.17.2 \
                express@4.15.3 \
                polliwog@0.2.0 \
                redux@3.7.1 \
                socket.io@2.0.3

# Install client dependencies
RUN npm install --no-shrinkwrap \
                babel-core@6.25.0 \
                babel-loader@7.1.1 \
                babel-plugin-transform-runtime@6.23.0 \
                babel-preset-modern-browsers@9.0.2 \
                babel-preset-react@6.24.1 \
                babel-runtime@6.23.0 \
                chunk-manifest-webpack-plugin@1.1.0 \
                css-loader@0.28.4 \
                html-webpack-plugin@2.29.0 \
                react@15.6.1 \
                react-dom@15.6.1 \
                style-loader@0.18.2 \
                webpack@3.0.0 \
                webpack-glob-entries@1.0.1

# Copy application code
COPY config /user
COPY dashboards /user/dashboards
COPY docker /app/docker
COPY client /app/client
COPY server /app/server
COPY static /app/static

ENV NODE_ENV=production
ENTRYPOINT /app/docker/start
