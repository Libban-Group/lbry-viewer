# LBRY Viewer

A simple LBRY Viewer made with Bun.
View content on the LBRY protocol.

## Prerequisites
Requirements for running this
* [Bun](https://bun.sh/)
* [LBRY-SDK](https://github.com/lbryio/lbry-sdk)

## Installation
```sh
git clone https://github.com/Pigges/lbry-viewer.git
cd lbry-viewer
bun install
cp .env.defaults .env
```

> Make sure to edit the .env file for your needs.

## Block lists
These are .json files containing an array that should be located in a directory called data.
* ./data/blockedChannels.json
* ./data/blockedClaims.json
* ./data/blockedTags.json

## Run
```sh
bun start
```

## Development
```sh
bun run dev
```

## License
Distributed under the MIT license. See ``LICENSE`` for more information.

https://github.com/Pigges/lbry-viewer