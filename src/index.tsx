import { BsFile } from 'react-icons/bs'
import {
  type ExtensionItems,
  type ExtensionMetadata
} from 'sittly-devtools/dist/types'
const { register, api } = window.SittlyDevtools
const { notifications } = api
const { sendNotification } = notifications
const items: ExtensionItems = () => [
  {
    title: 'Template item',
    description: 'Template item from template extension',
    icon: <BsFile />,
    onClick() {
      sendNotification({
        title: 'Template notification',
        body: 'Template notification from template extension',
        icon: 'face-smile'
      })
    }
  }
]
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
  items,
  metadata
})
