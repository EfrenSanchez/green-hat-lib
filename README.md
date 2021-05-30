# \<green-hat-lib>
A web components UI library.

## Installation
`npm install green-hat-lib`

## Usage
You can require the whole library:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/green-hat-lib@0.4.4/dist/base.b2bb851a.min.css">

<script src="https://cdn.jsdelivr.net/npm/green-hat-lib@0.4.4/dist/greenhat.d52d4386.min.js"></script>
```

And use in the DOM like this:

`<gh-button></gh-button>`

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo [http://localhost:1234](http://localhost:1234) 
```bash
npm start
```

## Contributing
- Clone
- `npm i`
- `npm run build` to get the build
- `npm run start` to run a development environment
