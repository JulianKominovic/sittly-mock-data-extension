import { type ListItem } from 'sittly-devtools/dist/types'
import { type FakerCategories } from './types'
import { faker } from '@faker-js/faker'
import { sentenceCase } from 'sentence-case'
import { BsClipboard } from 'react-icons/bs'
const { api, hooks } = window.SittlyDevtools
const { clipboard } = api
const { pasteToCurrentWindow, copyToClipboard } = clipboard
const { useServices } = hooks

function onHighlight(
  textToCopy: string,
  setContextMenuOptions: (contextMenuOptions: ListItem[]) => void
) {
  setContextMenuOptions([
    {
      title: 'Copy',
      description: textToCopy + ' to clipboard',
      onClick: () => copyToClipboard(textToCopy),
      icon: <BsClipboard />
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
        onHighlight(faker.airline.airline().name, setContextMenuOptions)
    },
    {
      title: 'Airline IATA code',
      description: 'Generate a random airline IATA code',
      onClick: () => pasteToCurrentWindow(faker.airline.airline().iataCode),
      onHighlight: () =>
        onHighlight(faker.airline.airline().iataCode, setContextMenuOptions)
    },
    {
      title: 'Airplane name',
      description: 'Generate a random airplane name',
      onClick: () => pasteToCurrentWindow(faker.airline.airplane().name),
      onHighlight: () =>
        onHighlight(faker.airline.airplane().name, setContextMenuOptions)
    },
    {
      title: 'Airplane IATA code',
      description: 'Generate a random airplane IATA code',
      onClick: () =>
        pasteToCurrentWindow(faker.airline.airplane().iataTypeCode),
      onHighlight: () =>
        onHighlight(
          faker.airline.airplane().iataTypeCode,
          setContextMenuOptions
        )
    },
    {
      title: 'Airport name',
      description: 'Generate a random airport name',
      onClick: () => pasteToCurrentWindow(faker.airline.airport().name),
      onHighlight: () =>
        onHighlight(faker.airline.airport().name, setContextMenuOptions)
    },
    {
      title: 'Airport IATA code',
      description: 'Generate a random airport IATA code',
      onClick: () => pasteToCurrentWindow(faker.airline.airport().iataCode),
      onHighlight: () =>
        onHighlight(faker.airline.airport().iataCode, setContextMenuOptions)
    },
    {
      title: 'Flight number',
      description: 'Generate a random flight number',
      onClick: () => pasteToCurrentWindow(faker.airline.flightNumber()),
      onHighlight: () =>
        onHighlight(faker.airline.flightNumber(), setContextMenuOptions)
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
  function handleFunctionReturn(
    returnValue: string | number[] | string[]
  ): string {
    if (Array.isArray(returnValue)) {
      return returnValue.join(', ')
    }
    return returnValue
  }
  return colorFunctions.map(([key, value]) => {
    const humanizedKey = sentenceCase(key)
    return {
      title: humanizedKey,
      description: 'Generate a random ' + humanizedKey + ' color',
      onClick: () => pasteToCurrentWindow(handleFunctionReturn(value())),
      onHighlight: () =>
        onHighlight(handleFunctionReturn(value()), setContextMenuOptions)
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
  return []
}
