FROM node:latest AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:latest AS runner
WORKDIR /app
COPY --from=builder /app/.output ./.output
EXPOSE 80
CMD ["node", ".output/server/index.mjs"]