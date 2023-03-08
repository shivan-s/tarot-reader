FROM node:19-slim as build

RUN npm update -g npm && \
  apt-get update && \
  rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production

WORKDIR /code

COPY package*.json /code/

RUN npm install
COPY . /code/
RUN npm run build

FROM node:19-slim

WORKDIR /code

COPY --from=build /code /code/

ENV HOST=0.0.0.0

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0" ]
