# react-native-storybook-loader
[![Build Status](https://travis-ci.org/elderfo/react-native-storybook-loader.svg?branch=master)](https://travis-ci.org/elderfo/react-native-storybook-loader)

[![Known Vulnerabilities](https://snyk.io/test/github/elderfo/react-native-storybook-loader/badge.svg)](https://snyk.io/test/github/elderfo/react-native-storybook-loader)


A component for dynamically import stories into [react-native-storybook](https://github.com/storybooks/react-native-storybook).

## Purpose

While using storybook for React Native, I repeatedly found myself manually creating a file with imports for all my stories. so I added an automated way to do it. This will locate files using configuration in the `package.json` file and create a story loader in the project directories. Search folder/patterns and the output file are all configurable.

## Installation

```bash
yarn add react-native-storybook-loader -D
```
Or
```bash
npm install react-native-storybook-loader --save-dev
```

## Quick Start

Create a React Native project using [react-native-cli](https://facebook.github.io/react-native/docs/getting-started.html#the-react-native-cli)
```bash
react-native init AwesomeProject
```

Add react-native-storybook to the project using [`getstorybook`](https://getstorybook.io/docs/react-storybook/basics/quick-start-guide)
```bash
cd AwesomeProject
getstorybook
```

Install react-native-storybook-loader

```bash
yarn install react-native-storybook-loader -D
```

Update `index.android.js` and `index.ios.js` files in the `./storybook` directory to point to the `storyLoader.js`

```javascript
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@kadira/react-native-storybook';
import { loadStories } from './storyLoader';

// import stories
configure(loadStories, module);

const StorybookUI = getStorybookUI({port: 7007, host: 'localhost'});
AppRegistry.registerComponent('ReactNative', () => StorybookUI);
```

Add the `rnstl` cli to the scripts tag of the `package.json`

```json
{
  "scripts": {
    "prestorybook": "node ./node_modules/.bin/rnstl"
  }
}
```

## Configuration
Story loading is controlled by the `react-native-storybook-loader` section of the project's `package.json`. 

### Options

| Setting | Type | Description | Default | 
|---|---|---|---|
| **searchDir** | `string` or `string[]` | The directory or directories, relative to the project root, to search for files in. | Project root |
| **outputFile** | `string` | The output file that will be written. It is relative to the project directory. | `./storybook/storyLoader.js` | 
| **pattern** | `string` | The pattern of files to look at. It can be a specific file, or any valid glob. | `./storybook/stories/index.js` (The default React Native storybook file) | 

#### Example:

```json
{
  "name": "AwesomeProject",
  ...
  "scripts": {
    ...
    "prestorybook": "node ./node_modules/.bin/rnstl"
  },
  "config": {
    "react-native-storybook-loader": {
      "searchDir": ["./src", "./packages"],
      "pattern": "**/*.stories.js",
      "outputFile": "./storybook/storyLoader.js"
    }
  }
}
```

This configuration will search `src` and `packages` directories recursively for files that end with `.stories.js` and write the output to `./storybook/storyLoader.js`

## Support
Please log issues

## Contributing
Coming Soon
