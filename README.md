# GitHub Actions Practice

[![CI][CI-image]][CI-url]
[![node version][node-image]][node-url]

[CI-image]: https://github.com/snapre/github-actions-practice/actions/workflows/ci.yml/badge.svg
[CI-url]: https://github.com/snapre/github-actions-practice/actions/workflows/ci.yml
[node-image]: https://img.shields.io/badge/node.js-%3E=_12-green.svg?logo=node.js
[node-url]: http://nodejs.org

## Introduction

Practice GitHub Actions & How to write a good actions `.yml` file.

## Good Actions configuration file
Node.js project continuous integration:
```yml
name: CI

on:
  # allows to manually run the job at any time.
  workflow_dispatch:
  
  push:
    branches:
      - '**'
    # should excluding some file and dir, because the actions caused by these files are unnecessary.
    paths-ignore:
      - '**.md'
      - 'docs/**'

jobs:
  Runner:
    timeout-minutes: 10
    runs-on: ${{ matrix.os }}
    strategy:
      fail-fast: false
      matrix:
        os: [ ubuntu-latest, macOs-latest ]
        node-version: [ 12, 14, 16 ]
    steps:
      - name: Checkout Git Source
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install dependencies
        run: |
          npm i npm@6 -g
          npm i

      - name: Continuous integration
        run: npm run ci

      - name: Code coverage
        uses: codecov/codecov-action@v3.0.0
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
```
Document build:
```yml
name: Docs Build

on:
  # allows to manually run the job at any time.
  workflow_dispatch:
  
  push:
    branches:
      - main
    # only execute when docs/** was modified.
    paths:
      - 'docs/**'

jobs:
  docs-build:
    timeout-minutes: 10
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Git Source
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm install ${docs build tool} -D

      - name: Build docs
        run: npm run docs:build

      - name: Deploy to GitHub Pages
        if: success()
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs
```
WIP ...

<!-- GITCONTRIBUTOR_START -->

## Contributors

|[<img src="https://avatars.githubusercontent.com/u/52845048?v=4" width="100px;"/><br/><sub><b>snapre</b></sub>](https://github.com/snapre)<br/>|
| :---: |


This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto updated at `Fri Apr 29 2022 13:06:32 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->