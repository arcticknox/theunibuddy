FROM node:18.12.1-slim
ENV NODE_ENV=production
EXPOSE 8080
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json package-lock*.json ./
RUN npm ci && npm cache clean --force
COPY --chown=node:node . .
CMD ["node", "-r", "dotenv/config", "server.js"]