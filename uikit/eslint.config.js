import { browserRuntime, nodeRuntime, reactStrict, vitestRuntime } from "@dubium/eslint-config"
import eslintConfigPrettier from "eslint-config-prettier"
import { defineConfig } from "eslint/config"

const browserFiles = ["src/**/*.{js,mjs,jsx,ts,tsx,mts}"]

const nodeConfigFiles = [
	"eslint.config.{js,mjs,cjs,ts,mts,cts}",
	"vite.config.{js,mjs,cjs,ts,mts,cts}",
	"vitest.config.{js,mjs,cjs,ts,mts,cts}",
	"scripts/**/*.{js,mjs,cjs,ts,mts,cts}",
]

const configFiles = [
	"eslint.config.{js,mjs,cjs,ts,mts,cts}",
	"vite.config.{js,mjs,cjs,ts,mts,cts}",
	"vitest.config.{js,mjs,cjs,ts,mts,cts}",
	"src/types/global.d.ts",
]

const scopedNodeRuntime = nodeRuntime.map((config) => {
	if (config.name === "@dubium/eslint-config/node/commonjs") {
		return config
	}

	return {
		...config,
		files: nodeConfigFiles,
	}
})

export default defineConfig([
	...reactStrict,

	...browserRuntime.map((config) => ({
		...config,
		files: browserFiles,
	})),

	...scopedNodeRuntime,

	...vitestRuntime,

	{
		files: configFiles,
		rules: {
			"no-restricted-exports": "off",
		},
	},

	// Должен быть последним, если проект форматируется через Prettier.
	eslintConfigPrettier,
])
