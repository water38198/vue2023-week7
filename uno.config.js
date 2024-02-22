import { defineConfig, presetIcons, presetUno } from 'unocss'
import presetAttributify from '@unocss/preset-attributify'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'
export default defineConfig({
    // ...UnoCSS options
    presets: [
        presetIcons({
            extraProperties: {
                'display': 'inline-block',
                'vertical-align': 'middle'
            }
        }),
        presetUno(),
        presetAttributify()
    ],
    transformers: [
        transformerVariantGroup(),
        transformerDirectives(),
    ],
})