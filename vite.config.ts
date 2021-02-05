import reactRefresh from '@vitejs/plugin-react-refresh'
import viteESLint from '@ehutch79/vite-eslint'
import { defineConfig } from 'vite'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [reactRefresh(), viteESLint({ include: ['src/**/*.tsx', 'src/**/*.ts'] })],
	server: {
		port: 5000,
	},
	alias: {
		'@': path.resolve(__dirname, './src'),
	},
})
