# Firebase todo app

Example web app using Next.js, React.js, Firebase, and MUI. [Demo](https://next-firebase-todo.hellosoftware.io).

## Major technologies

- [React.js 17](https://reactjs.org/)
- [Next.js 11](https://nextjs.org/)
- [Material-UI 5](https://mui.com/)
- [Firebase 9](https://firebase.google.com/)
- Typescript, ESLint, and Prettier are used to improve the developer experience

## Requires

- [Node.js >= 14.x](https://nodejs.org/en/)
- [NPM 7.x](https://github.blog/2021-02-02-npm-7-is-now-generally-available/)

## Recommended tools

- [Visual Studio Code](https://code.visualstudio.com/)
  - [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (formatting)
  - [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (error checking)
- [NVM](https://github.com/nvm-sh/nvm) (helps to manage multiple node.js versions on your machine)

## Getting Started

1. Clone the repo
2. Navigate to the project directory in your command line
3. Run `npm install`
4. Create a Firebase project using [their guide](https://firebase.google.com/docs/web/setup)
5. Copy your [Firebase config details](https://firebase.google.com/docs/web/setup#config-object) to the `.env.local.example` file
6. Rename `.env.local.example` to `.env.local`
7. Run `npm run dev` to build and run the site locally

## Other Details

This project is meant to help developers get started with Next and Firebase, as well as demonstrate a few React fundamentals.

React context, for example, is used to store the user authentication state.

Contributions welcome :)
