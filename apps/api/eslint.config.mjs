import { nestConfig } from "@traxity/eslint-config/nest"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import("eslint").Linter.Config} */
export default [
  ...nestConfig,
  {
    languageOptions: {
      parserOptions: {
        project: resolve(__dirname, "./tsconfig.json"),
        tsconfigRootDir: __dirname,
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: resolve(__dirname, "./tsconfig.json"),
        },
      },
    },
  },
]
