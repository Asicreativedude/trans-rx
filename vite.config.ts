import { loadEnv, defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		build: {
			rollupOptions: {
				input: {
					form: 'src/form.ts',
					search: 'src/search.ts',

					// Add more entry points as needed
				},
				output: {
					entryFileNames: '[name].js', // Use [name] placeholder for the same name as input
				},
			},
		},
		define: {
			'process.env.USERNAME': JSON.stringify(env.USERNAME),
			'process.env.PASSWORD': JSON.stringify(env.PASSWORD),
		},
	};
});
