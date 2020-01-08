# prettier-please [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A CLI tool to setup Prettier and pre-commit hooks. Heavily inspired by [Create React App](https://github.com/facebook/create-react-app).

Feedback is welcome. 🙏

# Setup

Execute in the root directory of your project:

```bash
npx prettier-please
```

This will install the dependencies [Prettier](https://github.com/prettier/prettier), [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged) inside your project. It will further setup a pre-commit hook to automatically format your files before committing them. No more discussions on code style during code reviews. 😉

# How to remove

First uninstall the dependencies:

```bash
npm uninstall prettier husky lint-staged
```

Then remove the properties `husky` and `lint-staged` from your project's `package.json`:

```diff
{
- "husky": {
-   "hooks": {
-     "pre-commit": "lint-staged"
-   }
- },
- "lint-staged": {
-   "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
-     "prettier --write",
-     "git add"
-   ]
- }
}
```

> Hint: You can always return to beautifully formatted code by executing `npx prettier-please` again. 🤫

# FAQ

## My code is not formatted automatically. Why is that?

_prettier-please_ makes some assumptions about where your source code is located and which files to format (namely `"src/**/*.{js,jsx,ts,tsx,json,css,scss,md}"`). To fix this, please adapt the path defined in the `lint-staged` property inside your project's `package.json` to your needs.

Example:

```diff
{
  "lint-staged": {
-   "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
+   "code/**/*.{php,html,yml}": [
      "prettier --write",
      "git add"
    ]
  }
}
```

## Why would I use pre-commit hooks when I have Prettier enabled in my editor?

Good question! While using Prettier inside your editor might be sufficient when developing on your own, it probably won't be when working in a team. Other developers on your team might not have configured their editors to format code automatically. Using Prettier in combination with pre-commit hooks ensures that your code is always formatted correctly.

## Is this for JavaScript projects only? Can I use Prettier to format my PHP code?

Nope! (Although you'll need a `package.json`). Prettier can be configured to work with languages different than JavaScript. For more info, visit the official [Prettier documentation](https://prettier.io/).
