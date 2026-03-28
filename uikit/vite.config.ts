import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import { visualizer } from "rollup-plugin-visualizer";
import fs from "node:fs";
import dts from "vite-plugin-dts";

function getComponentEntries() {
	const componentsDir = resolve(__dirname, "src/components");
	const entries: Record<string, string> = {};

	if (!fs.existsSync(componentsDir)) {
		return entries;
	}

	const componentDirs = fs
		.readdirSync(componentsDir, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	componentDirs.forEach((componentName) => {
		const componentPath = `src/components/${componentName}/${componentName}.tsx`;

		if (fs.existsSync(resolve(__dirname, componentPath))) {
			entries[componentName] = resolve(__dirname, componentPath);
		}
	});

	return entries;
}

export default defineConfig({
	plugins: [
		react({
			jsxImportSource: "react",
		}),
		visualizer(),

		dts({
			exclude: ["src/main.tsx", "src/dev"],
		}),
	],
	build: {
		lib: {
			entry: {
				index: resolve(__dirname, "src/index.ts"),
				...getComponentEntries(),
			},
			formats: ["es"],
			fileName: (_, entryName) => {
				if (entryName === "index") return "index.js";
				return `components/${entryName}/${entryName}.js`;
			},
		},
		rollupOptions: {
			external: ["react", "react-dom", "react/jsx-runtime"],
			output: {
				assetFileNames: (assetInfo) => {
					if (assetInfo.name && assetInfo.name.endsWith(".css")) {
						const baseName = assetInfo.name.replace(/\.css$/, "");
						return `components/${baseName}/[name][extname]`;
					}
					return `assets/[name][extname]`;
				},
				chunkFileNames: (chunkInfo) => {
					if (chunkInfo.name && chunkInfo.name.match(/.*Icon$/)) {
						return "icons/[name].js";
					}
					return "[name].js";
				},
				preserveModules: false,
				sourcemap: false,
				exports: "named",
				interop: "auto",
			},
			treeshake: {
				moduleSideEffects: false,
				propertyReadSideEffects: false,
				tryCatchDeoptimization: false,
				unknownGlobalSideEffects: false,
			},
		},
		cssCodeSplit: true,
		emptyOutDir: true,
		chunkSizeWarningLimit: 1000,
		target: "es2020",
		minify: true,
		commonjsOptions: {
			include: [/node_modules/],
			strictRequires: true,
		},
	},

	publicDir: false,

	optimizeDeps: {
		include: ["react", "react-dom"],
		exclude: [],
		esbuildOptions: {
			target: "es2020",
			treeShaking: true,
		},
	},
	define: {
		"process.env.NODE_ENV": JSON.stringify("production"),
		"import.meta.vitest": "undefined",
	},
});
