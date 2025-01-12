---
layout: home
hero:
  name: rsdown
  text: High-performance Code Transformer
  tagline: Transform const and let declarations to var in JavaScript/TypeScript
  actions:
    - theme: brand
      text: Get Started
      link: /#installation
    - theme: alt
      text: GitHub
      link: https://github.com/sunny-117/rsdown

features:
  - icon: 🚀
    title: High Performance
    details: Built with Rust and SWC for maximum performance
  - icon: 🔄
    title: Easy to Use
    details: Simple API to transform const and let declarations to var
  - icon: 📦
    title: TypeScript Support
    details: Works with TypeScript out of the box
---

# rsdown

A high-performance JavaScript/TypeScript code transformer powered by Rust and SWC.

## Installation

```bash
npm install rsdown
# or
pnpm add rsdown
# or
yarn add rsdown
```

## Usage

```js
import { transformToVar } from 'rsdown'

const code = `
const x = 1;
let y = 2;
`

const result = transformToVar(code)
console.log(result)
// Output:
// var x = 1;
// var y = 2;
```
