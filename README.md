<p align="center">
  <a href="https://www.shelley.earth">
    <img width="250px" src="">
  </a>
</p>

<h1 align="center">S H E L L E Y</h1>
<div align="center">

[![Known Vulnerabilities](https://snyk.io/test/github/action-is-hope/shelley/badge.svg)](https://snyk.io/test/github/action-is-hope/shelley)
[![Build Status](https://github.com/action-is-hope/shelley/actions/workflows/main.yml/badge.svg)](https://github.com/action-is-hope/shelley)
[![codecov](https://codecov.io/gh/action-is-hope/shelley/branch/main/graph/badge.svg?token=xxxx)](https://codecov.io/gh/action-is-hope/shelley)
[![Contributions Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

</div>

## Overview

Shelley is an unstyled first UI library, meaning that it ships with a very minimal set of styles giving you complete control of your styling strategy.

That doesn't mean we don't have a base theme for you to start with, it just means that you have complete control over your styles and how they are put together. If you are a fan of CSS and like/need to control the CSS used in your project then Shelley might be for you. if this idea repulses you then maybe go for something like Material UI which actually does have an unstyled option these days. Adobe Spectrum looks good too.

## Docs

To read the documentation, please visit our [Documentation](DOCUMENTATION.md)

## Contributing

[Contributing](CONTRIBUTING.md)

## Development

The following scripts are available:

`npm start` - Starts Storybook for component development.

`npm run clean` - Delete the `dist` folder. Uses [rimraf](https://github.com/isaacs/rimraf).

`npm run typecheck` - Verify syntactic/semantic correctness. Uses [typescript](https://github.com/microsoft/TypeScript).

`npm run lint` - Verify best practices and find common issues. Uses [eslint](https://github.com/eslint/eslint).

`npm test` - Execute `typecheck`, `lint`, `unit-test` and `cypress` scripts.

`npm run build` - Builds the package ready for npm into `dist`. The contents of this folder can then be deployed to npm.

`npm run build-storybook` - Builds the static Storybook site into `static-storybook` ready for deployment to Netifly on merge into `main`.
