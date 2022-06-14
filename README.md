<p align="center"><img src="/.github/socialcard.png" alt="Social card of Flair"></p>

# Flair
> AdonisJS authentication scaffolding

[![npm-image]][npm-url] [![license-image]][license-url] [![typescript-image]][typescript-url]

Flair provides a way to quickly add authentication to your AdonisJS application using TailwindCSS and Alpine.js.

## Prerequisites
While doing its thing, Flair is going to create and overwrite some files. Hence, Flair is meant to be used on a fresh AdonisJS application. In addition to that, your application should already have the following packages installed and configred:

* Encore (can be easily done at the point of creating the application)
* Lucid
* Auth
* Shield

## Setup

First, install Flair with your preffered package manager:

```bash
npm install @mezielabs/flair

# or
yarn add @mezielabs/flair

# or
pnpm add @mezielabs/flair
```

Next, configure the package using the `configure` command:

```bash
node ace configure @mezielabs/flair
```

This will scaffold and create the necessary files.

Finally, make sure to add the following middlewares inside the `start/kernel.ts` file:

```ts
Server.middleware.registerNamed({
  '...',
  guest: () => import('App/Middleware/Guest'),
  confirmPassword: () => import('App/Middleware/ConfirmPassword'),
})
```

## Learn AdonisJS

Want to learn how to build projects like this with AdonisJS? Check out [Adonis Mastery](https://adonismastery.com), where you get to learn AdonisJS through practical screencasts.

[npm-image]: https://img.shields.io/npm/v/flair.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/flair "npm"

[license-image]: https://img.shields.io/npm/l/flair?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"
