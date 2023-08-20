/* eslint-disable */

const { build } = require('esbuild')

build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  minify: false,
  keepNames: true,
  minifyIdentifiers: false,
  minifySyntax: false,
  sourcemap: false,
  outfile: 'dist/compiled.js',
  external: ['react', 'sittly-devtools'],
  write: false,
  format: 'cjs'
})
  .then(({ outputFiles }) => {
    const outputFileText = outputFiles[0].text

    console.log('Build complete!')
    // Must replace sittly-devtools require by window.SittlyDevtools (must share the same instance with the app)
    const replacedSittly = outputFileText.replaceAll(
      '__toESM(require("sittly-devtools"))',
      '{default:window.SittlyDevtools}'
    )

    // Must replace react require by window.React (must share the same instance with the app)
    const replacedReact = replacedSittly.replaceAll(
      '__toESM(require("react"))',
      '{default:window.React}'
    )

    require('fs').writeFileSync('dist/compiled.js', replacedReact)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
