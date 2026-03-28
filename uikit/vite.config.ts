import { defineConfig } from "vite";

// Используем SWC-компилятор для React (быстрее Babel)
import react from "@vitejs/plugin-react-swc";

// Для работы с путями
import { resolve } from "node:path";

import { visualizer } from "rollup-plugin-visualizer";

import dts from "vite-plugin-dts";

import fs from "node:fs";

// Функция для автоматического сбора entry points
function getComponentEntries() {
	const componentsDir = resolve(__dirname, "src/components");
	const entries: Record<string, string> = {};

	// Читаем директорию компонентов
	const componentDirs = fs
		.readdirSync(componentsDir, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	// Для каждого компонента создаем entry point
	componentDirs.forEach((componentName) => {
		const componentPath = `src/components/${componentName}/${componentName}.tsx`;
		// Проверяем существование файла компонента
		if (fs.existsSync(resolve(__dirname, componentPath))) {
			entries[`components/${componentName}/${componentName}`] = resolve(
				__dirname,
				componentPath,
			);
		}
	});

	return entries;
}

export default defineConfig({
	plugins: [
		react({
			// Указываем, что используем стандартный React JSX
			jsxImportSource: "react",
		}),

		visualizer(),

		dts({
			exclude: ["src/main.tsx", "src/dev"],
		}),
	],
	build: {
		lib: {
			// Настройки сборки библиотеки
			entry: {
				// Главный входной файл
				index: resolve(__dirname, "src/index.ts"),
				// Автоматически добавляем entry points для всех компонентов
				...getComponentEntries(),
			},

			// Собираем только в ES-формате
			formats: ["es"],
			fileName: (_, name) => `${name}.js`,
		},
		rollupOptions: {
			// Внешние зависимости
			external: ["react", "react-dom", "react/jsx-runtime"],
			output: {
				assetFileNames: () => {
					return "components/[name]/[name][extname]";
				},
				// Именование чанков
				chunkFileNames: (chunkInfo) => {
					// Проверяем, является ли чанк иконкой
					if (chunkInfo.name.match(/.*Icon$/)) {
						// Сохраняем иконки в подкаталог icons
						return "icons/[name].js";
					}
					// Для остальных чанков используем стандартное именование
					return "[name].js";
				},
			},
		},
		// чтобы обычные (не-модульные) стили выносились отдельно
		cssCodeSplit: true,
	},
});
