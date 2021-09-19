import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const packages = require('./package.json')

const ENV = process.env.NODE_ENV

export default {
  input: 'src/main.js',
  external: [], // 告诉rollup，不打包**将其视为外部依赖
  output: {
    file: `dist/js/${packages.name}.min.js`,
    format: 'umd',
    name: 'bundle-name',
    globals: {
      // 这跟external 是配套使用的
    }
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**']
    }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV)
    }),
	livereload(),
    serve({
      open: true,
      port: 8080,
      contentBase: ['dist', 'demo'],
    })
  ]
}
