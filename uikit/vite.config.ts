import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import { visualizer } from "rollup-plugin-visualizer";
import fs from "node:fs";
import { libInjectCss } from "vite-plugin-lib-inject-css";

function getComponentEntries() {
	const componentsDir = resolve(__dirname, "src/components");
	const entries: Record<string, string> = {};

	const componentDirs = fs
		.readdirSync(componentsDir, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	componentDirs.forEach((componentName) => {
		const componentPath = resolve(
			__dirname,
			`src/components/${componentName}/${componentName}.tsx`,
		);

		if (fs.existsSync(componentPath)) {
			entries[`components/${componentName}/${componentName}`] =
				componentPath;
		}
	});

	return entries;
}

export default defineConfig({
	plugins: [
		react({
			jsxImportSource: "react",
		}),

		libInjectCss(),

		visualizer(),
	],

	publicDir: false,

	build: {
		emptyOutDir: true,
		target: "es2020",
		minify: true,
		sourcemap: false,
		cssCodeSplit: true,
		chunkSizeWarningLimit: 1000,

		lib: {
			entry: {
				index: resolve(__dirname, "src/index.ts"),
				...getComponentEntries(),
			},
			formats: ["es"],
		},

		rollupOptions: {
			external: [
				"react",
				"react-dom",
				"react/jsx-runtime",
				"clsx",
				"uuid",
			],

			treeshake: {
				moduleSideEffects: false,
				propertyReadSideEffects: false,
				unknownGlobalSideEffects: false,
			},

			output: {
				format: "es",
				exports: "named",

				preserveModules: true,
				preserveModulesRoot: "src",

				entryFileNames: "[name].js",
				chunkFileNames: "[name].js",
				assetFileNames: "[name][extname]",

				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
			},
		},

		commonjsOptions: {
			include: [/node_modules/],
			strictRequires: true,
		},
	},

	optimizeDeps: {
		include: ["react", "react-dom"],
		esbuildOptions: {
			target: "es2020",
			treeShaking: true,
		},
	},
});
