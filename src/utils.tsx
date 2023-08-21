import {
  Bs2Circle,
  BsAirplane,
  BsCalendar,
  BsCarFront,
  BsCoin,
  BsCurrencyDollar,
  BsEyeglasses,
  BsGeo,
  BsGit,
  BsImage,
  BsMortarboard,
  BsMusicNote,
  BsPalette,
  BsParagraph,
  BsPc,
  BsPerson,
  BsPhone,
  BsShop,
  BsType,
  BsTypeH3,
  BsWifi
} from 'react-icons/bs'
import type { FakerCategories } from './types'

export function firstLetterUppercase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function getCategoryIcon(category: FakerCategories): React.ReactNode {
  if (category === 'airline') return <BsAirplane />
  if (category === 'color') return <BsPalette />
  if (category === 'commerce') return <BsCoin />
  if (category === 'company') return <BsShop />
  if (category === 'date') return <BsCalendar />
  if (category === 'finance') return <BsCurrencyDollar />
  if (category === 'git') return <BsGit />
  if (category === 'hacker') return <BsEyeglasses />
  if (category === 'image') return <BsImage />
  if (category === 'internet') return <BsWifi />
  if (category === 'location') return <BsGeo />
  if (category === 'lorem') return <BsParagraph />
  if (category === 'music') return <BsMusicNote />
  if (category === 'number') return <Bs2Circle />
  if (category === 'person') return <BsPerson />
  if (category === 'phone') return <BsPhone />
  if (category === 'science') return <BsMortarboard />
  if (category === 'string') return <BsType />
  if (category === 'system') return <BsPc />
  if (category === 'vehicle') return <BsCarFront />
  if (category === 'word') return <BsTypeH3 />
}

export function anyToString(
  anyObject: any,
  objectsOutput: 'JSON' | 'HUMAN' = 'HUMAN'
): string {
  if (Array.isArray(anyObject)) {
    return anyObject.join(', ')
  }
  if (typeof anyObject === 'object') {
    if (objectsOutput === 'JSON') return anyObject
    return Object.values(anyObject).join(', ')
  }
  return String(anyObject)
}

export const FAKER_CATEGORIES: FakerCategories[] = [
  'airline',
  'color',
  // 'commerce',
  // 'company',
  // 'date',
  'finance',
  // 'git',
  // 'hacker',
  // 'image',
  'internet',
  // 'location',
  'lorem'
  // 'music',
  // 'person',
  // 'number',
  // 'phone',
  // 'science',
  // 'string',
  // 'system',
  // 'vehicle',
  // 'word'
]
