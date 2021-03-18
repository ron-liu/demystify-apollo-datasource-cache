## Why

In apollo server, there exists rest datasource and dataloader. And it is always confusing which we should use.

## What inside this repo

In this repo, though some simple examples, we aim to make these things very clear.

There are 4 progressing branches:

- `1-use-fetch`: Very first approach, no cache at all
- `2-use-datasource`: Started to use datasouruce, we can see it achieved the cache per request
- `3-use-cache-control`: Added cache-control in the rest api response, and see the datasource started to respect it and take advantage it
- `4-use-data-loader`: Added dataloader, so now it take starting to batch the request

## How to simulate the tests

- Start the app: `npm run dev`

- Switch to different branches (It is not necessary to restart the app every time switching the branches)

  - `git checkout 1-use-fetch`

  - `git checkout 2-use-datasource`

  - `git checkout 3-use-cache-control`

  - `git checkout 4-use-data-loader`

  Also use the following query to test

  ```graphql
  {
    pets(query: "o") {
      name
      species
    }
  }
  ```

  And please pay attention to the console log, as each rest api hitting will be printed in the screen.

  ## Sum up

| Feature               | Apollo Rest Data Source                      | Dataloader |
| --------------------- | -------------------------------------------- | ---------- |
| Cache per request     | ✅                                           | ✅         |
| Cache across requests | ✅ by respecting `cache-control` or explicit | 𐄂          |
| Batching per request  | 𐄂                                            | ✅         |
