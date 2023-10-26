FROM oven/bun:1.0.7

# Create app directory
WORKDIR /app

COPY package.json ./
COPY bun.lockb ./
COPY .env ./.env

RUN bun install

COPY . .

EXPOSE 3000
CMD [ "bun", "start" ]