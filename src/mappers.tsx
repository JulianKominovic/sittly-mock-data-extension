import { type ListItem } from 'sittly-devtools/dist/types'
import { type FakerCategories } from './types'
import { faker } from '@faker-js/faker'
import { sentenceCase } from 'sentence-case'
import { BsClipboard, BsListCheck, BsListUl } from 'react-icons/bs'
import { anyToString } from './utils'
const { api, hooks } = window.SittlyDevtools
const { clipboard } = api
const { pasteToCurrentWindow, copyToClipboard } = clipboard
const { useServices } = hooks

function onHighlight(
  generatorFunction: () => any,
  setContextMenuOptions: (contextMenuOptions: ListItem[]) => void
) {
  const textToCopy = anyToString(generatorFunction())
  const bulkTextToCopy = JSON.stringify(
    Array.from({ length: 50 }).map(() =>
      anyToString(generatorFunction(), 'JSON')
    )
  )
  setContextMenuOptions([
    {
      title: 'Copy',
      description: textToCopy + ' to clipboard',
      onClick: () => copyToClipboard(textToCopy),
      icon: <BsClipboard />
    },
    {
      title: 'Bulk paste',
      description: 'Paste 50 random values to clipboard',
      onClick: () => pasteToCurrentWindow(bulkTextToCopy),
      icon: <BsListUl />
    },
    {
      title: 'Bulk copy',
      description: 'Copy 50 random values to clipboard',
      onClick: () => copyToClipboard(bulkTextToCopy),
      icon: <BsListCheck />
    }
  ])
}

function mapFakerAirlineFunctions(): ListItem[] {
  const setContextMenuOptions = useServices(
    (state) => state.setContextMenuOptions
  )
  return [
    {
      title: 'Airline name',
      description: 'Generate a random airline name',
      onClick: () => pasteToCurrentWindow(faker.airline.airline().name),
      onHighlight: () =>
        onHighlight(() => faker.airline.airline().name, setContextMenuOptions)
    },
    {
      title: 'Airline IATA code',
      description: 'Generate a random airline IATA code',
      onClick: () => pasteToCurrentWindow(faker.airline.airline().iataCode),
      onHighlight: () =>
        onHighlight(
          () => faker.airline.airline().iataCode,
          setContextMenuOptions
        )
    },
    {
      title: 'Airplane name',
      description: 'Generate a random airplane name',
      onClick: () => pasteToCurrentWindow(faker.airline.airplane().name),
      onHighlight: () =>
        onHighlight(() => faker.airline.airplane().name, setContextMenuOptions)
    },
    {
      title: 'Airplane IATA code',
      description: 'Generate a random airplane IATA code',
      onClick: () =>
        pasteToCurrentWindow(faker.airline.airplane().iataTypeCode),
      onHighlight: () =>
        onHighlight(
          () => faker.airline.airplane().iataTypeCode,
          setContextMenuOptions
        )
    },
    {
      title: 'Airport name',
      description: 'Generate a random airport name',
      onClick: () => pasteToCurrentWindow(faker.airline.airport().name),
      onHighlight: () =>
        onHighlight(() => faker.airline.airport().name, setContextMenuOptions)
    },
    {
      title: 'Airport IATA code',
      description: 'Generate a random airport IATA code',
      onClick: () => pasteToCurrentWindow(faker.airline.airport().iataCode),
      onHighlight: () =>
        onHighlight(
          () => faker.airline.airport().iataCode,
          setContextMenuOptions
        )
    },
    {
      title: 'Flight number',
      description: 'Generate a random flight number',
      onClick: () => pasteToCurrentWindow(faker.airline.flightNumber()),
      onHighlight: () =>
        onHighlight(() => faker.airline.flightNumber(), setContextMenuOptions)
    }
  ]
}

function mapFakerColorFunctions(): ListItem[] {
  const setContextMenuOptions = useServices(
    (state) => state.setContextMenuOptions
  )
  const colorFunctions = Object.entries(faker.color).filter(
    ([key]) => key !== 'faker'
  )

  return colorFunctions.map(([key, value]) => {
    const humanizedKey = sentenceCase(key)
    return {
      title: humanizedKey,
      description: 'Generate a random ' + humanizedKey + ' color',
      onClick: () => pasteToCurrentWindow(anyToString(value())),
      onHighlight: () => onHighlight(value, setContextMenuOptions)
    }
  })
}

function mapFakerLoremFunctions(): ListItem[] {
  const setContextMenuOptions = useServices(
    (state) => state.setContextMenuOptions
  )
  const loremParagraphs: ListItem[] = Array.from({
    length: 50
  })
    .map((_, index) => {
      if ((index + 1) % 5 !== 0) return null
      return {
        title: index + 1 + ' lorem paragraphs',
        description: `Generate ${index + 1} random lorem paragraphs`,
        onClick: () => pasteToCurrentWindow(faker.lorem.paragraphs(index + 1)),
        onHighlight: () =>
          onHighlight(
            () => faker.lorem.paragraphs(index + 1),
            setContextMenuOptions
          )
      }
    })
    .filter(Boolean) as ListItem[]

  return [...loremParagraphs]
}

function mapFakerInternetFunctions(): ListItem[] {
  const setContextMenuOptions = useServices(
    (state) => state.setContextMenuOptions
  )
  const internetFunctions = Object.entries(faker.internet).filter(
    ([key]) => key !== 'faker'
  )

  return internetFunctions.map(([key, value]) => {
    const humanizedKey = sentenceCase(key)
    return {
      title: humanizedKey,
      description: 'Generate a random ' + humanizedKey,
      onClick: () => pasteToCurrentWindow(anyToString(value())),
      onHighlight: () => onHighlight(value, setContextMenuOptions)
    }
  })
}

function mapFakerFinanceFunctions(): ListItem[] {
  const setContextMenuOptions = useServices(
    (state) => state.setContextMenuOptions
  )
  const financeFunctions = Object.entries(faker.finance).filter(
    ([key]) => key !== 'faker'
  )

  return financeFunctions.map(([key, value]) => {
    const humanizedKey = sentenceCase(key)
    return {
      title: humanizedKey,
      description: 'Generate a random ' + humanizedKey,
      onClick: () => pasteToCurrentWindow(anyToString(value())),
      onHighlight: () => onHighlight(value, setContextMenuOptions)
    }
  })
}

export const mapFakerFunctions = (fakerCategory: FakerCategories) => {
  if (fakerCategory === 'airline') {
    return mapFakerAirlineFunctions()
  }
  if (fakerCategory === 'color') {
    return mapFakerColorFunctions()
  }
  if (fakerCategory === 'lorem') {
    return mapFakerLoremFunctions()
  }
  if (fakerCategory === 'internet') {
    return mapFakerInternetFunctions()
  }
  if (fakerCategory === 'finance') {
    return mapFakerFinanceFunctions()
  }
  return []
}
