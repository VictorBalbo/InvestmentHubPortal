import reactRefresh from '@vitejs/plugin-react-refresh';
import viteESLint from '@ehutch79/vite-eslint';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [reactRefresh(), viteESLint({ include: ['src/**/*.tsx', 'src/**/*.ts'] })],
	server: {
		port: 5000,
	},
});
