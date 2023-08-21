import { type FormEvent, useState } from 'react'
import { mapFakerFunctions } from './mappers'
import { type FakerCategories } from './types'
import { faker } from '@faker-js/faker'
import { BsBoxArrowUpLeft, BsClipboard, BsDownload } from 'react-icons/bs'

const { components, api, hooks } = window.SittlyDevtools
const { Command, Fieldset, Input, Button } = components
const { List } = Command
const { useServices } = hooks
const { clipboard, files } = api
const { saveImage } = files
const { copyToClipboard, pasteToCurrentWindow } = clipboard

export function RenderList({ category }: { category: FakerCategories }) {
  return <List id="faker-categories" items={mapFakerFunctions(category)} />
}
export function RenderImageGenerator() {
  const [image, setImage] = useState<{
    url: string
    state: 'LOADING' | 'FINISH'
  }>({
    url: '',
    state: 'FINISH'
  })
  const setContextMenuOptions = useServices(
    (state) => state.setContextMenuOptions
  )
  return (
    <form
      style={{
        padding: '12px',
        overflow: 'auto'
      }}
      onSubmit={(e: FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const topic = formData.get('topic')
        const url = faker.image.urlLoremFlickr({
          category: topic as string
        })
        setImage({
          state: 'LOADING',
          url
        })
        setContextMenuOptions([
          {
            title: 'Copy image URL',
            description: 'to the clipboard',
            onClick: () => {
              copyToClipboard(url)
            },
            icon: <BsClipboard />
          },
          {
            title: 'Paste image URL',
            description: 'to current window',
            onClick: () => {
              pasteToCurrentWindow(url)
            },
            icon: <BsBoxArrowUpLeft />
          },
          {
            title: 'Save image',
            description: 'to disk ',
            onClick: () => {
              saveImage(url)
            },
            icon: <BsDownload />
          }
        ])
      }}
    >
      <hgroup
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <Input
          name="topic"
          type="text"
          style={{
            flexGrow: 1
          }}
        >
          <Fieldset.Label
            style={{
              whiteSpace: 'nowrap'
            }}
          >
            Search a topic
          </Fieldset.Label>
        </Input>
        <Button
          style={{
            height: '34px'
          }}
        >
          Generate
        </Button>
      </hgroup>
      <img
        src={image.url}
        alt="Generated image"
        onLoad={() => setImage({ ...image, state: 'FINISH' })}
        style={{
          borderRadius: '8px',
          marginBlockStart: '12px'
        }}
      />
    </form>
  )
}
