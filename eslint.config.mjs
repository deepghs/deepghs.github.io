// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here.
  [
    {
      rules: {
        // Your custom rules here.
        '@typescript-eslint/no-explicit-any': ['off'],
        'vue/html-self-closing': ['off'],
        'vue/max-attributes-per-line': ['off']
      }
    }
  ]
)
