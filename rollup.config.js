import esbuild from 'rollup-plugin-esbuild'
import filesize from 'rollup-plugin-filesize';

export default [
  {
    input: 'lib/index.ts',
    output: [
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        exports: 'auto',
        compact: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm', // the preferred format
        exports: 'auto',
        name: 'greensms',
        compact: true,
      },
    ],
    external: ['axios', 'humps', 'qs', 'yup'],
    plugins: [
      esbuild(),
      filesize(),
    ],
  },
];
