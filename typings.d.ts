// eslint-disable-next-line no-restricted-imports
import type sittlyDevtools from 'sittly-devtools'
declare global {
  interface Window {
    SittlyDevtools: typeof sittlyDevtools
  }
}

export {}
