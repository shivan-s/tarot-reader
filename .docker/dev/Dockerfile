FROM node:19-slim

RUN npm update -g npm && \
  apt-get update && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /code

COPY package*.json .

RUN npm install --include=dev

CMD ["npm", "run", "dev", "--", "--host"]
