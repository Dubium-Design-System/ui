import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "node:path";
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

function fixBuiltCssModules() {
	return {
		name: "fix-built-css-modules",
		apply: "build",
		closeBundle() {
			const distDir = path.resolve(__dirname, "dist");

			function walk(dir: string) {
				const entries = fs.readdirSync(dir, { withFileTypes: true });

				for (const entry of entries) {
					const fullPath = path.join(dir, entry.name);

					if (entry.isDirectory()) {
						walk(fullPath);
						continue;
					}

					if (entry.isFile() && entry.name.endsWith(".module.css")) {
						const newPath = fullPath.replace(
							/\.module\.css$/,
							".css",
						);
						fs.renameSync(fullPath, newPath);
						continue;
					}
				}
			}

			walk(distDir);

			function patchJsImports(dir: string) {
				const entries = fs.readdirSync(dir, { withFileTypes: true });

				for (const entry of entries) {
					const fullPath = path.join(dir, entry.name);

					if (entry.isDirectory()) {
						patchJsImports(fullPath);
						continue;
					}

					if (entry.isFile() && entry.name.endsWith(".js")) {
						const content = fs.readFileSync(fullPath, "utf-8");
						const patched = content
							.replace(
								/from\s+['"](.+?)\.module\.css['"]/g,
								(_, p1) => `from "${p1}.css"`,
							)
							.replace(
								/import\s+['"](.+?)\.module\.css['"]/g,
								(_, p1) => `import "${p1}.css"`,
							);

						if (patched !== content) {
							fs.writeFileSync(fullPath, patched, "utf-8");
						}
					}
				}
			}

			patchJsImports(distDir);
		},
	};
}

export default defineConfig({
	plugins: [
		react({
			jsxImportSource: "react",
		}),

		libInjectCss(),

		fixBuiltCssModules(),

		visualizer(),
	],

	publicDir: false,

	build: {
		emptyOutDir: true,
		target: "es2020",
		minify: true,
		sourcemap: false,
		cssCodeSplit: false,

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
				moduleSideEffects: (id) => {
					if (id.endsWith(".css")) return true;

					return false;
				},
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
