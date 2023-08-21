import { BsFile } from 'react-icons/bs'
import {
  type ExtensionPages,
  type ExtensionMetadata
} from 'sittly-devtools/dist/types'
import { FAKER_CATEGORIES, getCategoryIcon } from './utils'
import { RenderImageGenerator, RenderList } from './components'

const { register } = window.SittlyDevtools

const pages: ExtensionPages = FAKER_CATEGORIES.map((category) => {
  return {
    name: `Fake ${category}`,
    icon: getCategoryIcon(category),
    component: () => {
      if (category === 'image') return <RenderImageGenerator />
      return <RenderList category={category} />
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
  name: 'Fake data generator',
  description: 'Generate fake data using Faker.js',
  icon: <img src="" />,
  repoUrl: 'https://github.com/JulianKominovic/sittly-mock-data-extension'
}

register({
  pages,
  metadata
})
