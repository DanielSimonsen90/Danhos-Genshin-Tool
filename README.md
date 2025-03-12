# Danho's Genshin Tool
Using data from [Paimon.moe](https://paimon.moe), this tool helps you save the best artifacts for your characters and help you organize your building plan in Genshin Impact.

# Functionality
The core functionality of the Genshin Tool is for you to search up artifact sets with main- and sub-stats while also providing utilities to help you plan out your future character builds. When searching for an artifact, the tool will provide you a list of characters, where the artifact can be useful for. You can also search for characters and see which artifact sets are useful for them, however [Paimon.moe](https://paimon.moe) already provides this functionality and much more (although they're not really updating anymore).

# Developer Notes
The project is built using Electron with a webpack template, using Vite React-ts with SCSS support.

## Creating Electron apps with Vite

### Installation
To create an Electron app with Vite, you can use the following command:
```bash
npm init electron-app@latest . --template=webpack-typescript
npm install --save react react-dom sass sass-loader
npm install --save-dev @types/react @types/react-dom
```
*Note: This adds React and SASS/SCSS to the project*

### File modifications
Once the files have been generated, make sure you modify the following files:
* tsconfig.json
  Add `"jsx": "react-jsx"` to the compilerOptions object.
* webpack.main.config.js 
  Add ".scss" (or ".sass") to the extensions array on line 18.
* webpack.rules.ts
  Add the following rule to the rules array on line 31:
  ```typescript
  {
    test: /\.s[ac]ss$/i,
    use: [
      "style-loader",
      "css-loader",
      "sass-loader",
    ],
  },
  ```
* src/index.html
  Remove the boilerplate inside `<body>` and replace it with div#root
* src/app.tsx
  Create 'app.tsx' and replace the boilerplate with the following:
  ```tsx
  import { createRoot } from 'react-dom/client';
  import App from './components/App'; // By  this point, also make src/components/App.tsx (and index.ts)

  createRoot(document.getElementById('root')!).render(<App />);
  ```
* src/renderer.ts
  Replace the code with
  ```typescript
  import './app'; // This also imports src/components/App.scss for global styles. If you have a global style file elsewhere, make sure to import it here.
  ```

### Running the app
To run the app, you can use the following command:
```bash
npm run start
```
Like any other node project, the program updates and reloads automatically when you save a file.

### Building the app into an executable
To build the app into an executable, you can use the following command:
```bash
npm run make
```
After the script has finished, your executable will be located in `out/make/squirrel.windows/x64/{your-project-name}-{your-version} Setup.exe`.

### Publishing the app to Github
*Make sure that the GITHUB_TOKEN in .env is up to date with a valid publish token (with "Contents" permission)*
Note that Github username & repository name are both controlled through the variables in [@/common/constants/domain.ts](https://github.com/DanielSimonsen90/Genshin-Artifact-Helper/blob/main/src/common/constants/domain.ts)

To publish the app to Github for others to download through releases, you can use the following command:
```bash
npm run publish
```
After the script has finished, the release should be published as a draft, which you can edit [here](https://github.com/DanielSimonsen90/Genshin-Artifact-Helper/releases) to finalize description for official release.
