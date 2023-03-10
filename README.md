# Tarot Reader

This is a fun little Tarot card reader that utilises OpenAI language model to try and make sense of question asked to the cards drawn.

## How to use project

0. Requirements:

   - Node
   - Docker / Docker compose (optional) - can run natively using Node.
   - Make (optional) - for running commands.

1. Git clone the project.

2. Set up .env file and OpenAI keys.

```shell
cp .env.example .env
```

3. Run the project

```shell
# with docker
make run

# OR

# natively with Node
npm run dev --
```

## Credits

- Tarot cards are from here: <https://www.kaggle.com/datasets/lsind18/tarot-json>
- TimeEnjoyed's stream: <https://www.twitch.tv/timeenjoyed>
