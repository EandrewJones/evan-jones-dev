import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

import {locate} from './presentation/locate'

export default defineConfig({
  name: 'default',
  title: 'Next Level Ops',

  projectId: 'vewn1j5f',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      previewUrl: 'http://localhost:3000',
      locate,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
