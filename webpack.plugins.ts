import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const assets = ['assets'];
const copyPlugins = new CopyWebpackPlugin({
  patterns: assets.map((asset) => ({
    from: path.resolve(__dirname, 'src', asset),
    to: path.resolve(__dirname, '.webpack/renderer', asset)
  }))
});

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
    typescript: {
      configFile: path.resolve(__dirname, 'tsconfig.json'),
    }
  }),
  copyPlugins
] as any[];
