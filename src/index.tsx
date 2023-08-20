import { BsFile } from 'react-icons/bs'
import {
  type ExtensionPages,
  type ExtensionMetadata
} from 'sittly-devtools/dist/types'
import { FAKER_CATEGORIES, getCategoryIcon } from './utils'
import { mapFakerFunctions } from './mappers'

const { components, register } = window.SittlyDevtools
const { Command } = components
const { List } = Command

const pages: ExtensionPages = FAKER_CATEGORIES.map((category) => {
  console.log(category)
  return {
    name: `Fake ${category}`,
    icon: getCategoryIcon(category),
    component: () => {
      return <List id="faker-categories" items={mapFakerFunctions(category)} />
    },
    description: 'Generate fake data for ' + category,
    route: `/${category}`
  }
})
/**
 * Metadata is really important, it's used to display your extension in the app.
 * @see docs.com
 */
const metadata: ExtensionMetadata = {
  name: 'Template',
  description: 'Template extension',
  icon: <BsFile />,
  repoUrl: 'https://github.com/JulianKominovic/sittly-extension-template'
}

register({
  pages,
  metadata
})
