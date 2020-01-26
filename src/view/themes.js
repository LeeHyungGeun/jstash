import { extend, isArr } from '../util'

const keyMap = [
  'background',
  'foreground',
  'selectForeground',
  'accent',
  'highlight',
  'border',
  'primary',
  'contrast',
  'varColor',
  'stringColor',
  'keywordColor',
  'numberColor',
  'operatorColor',
  'linkColor',
  'textColor',
  'tagNameColor',
  'functionColor',
  'attributeNameColor',
  'commentColor'
]

const keyMapLen = keyMap.length

function arrToMap(arr) {
  const ret = {}

  for (let i = 0; i < keyMapLen; i++) {
    ret[keyMap[i]] = arr[i]
  }

  return ret
}

function createLightTheme(theme) {
  if (isArr(theme)) {
    theme = arrToMap(theme);
  }
  // if (!theme.darkerBackground) theme.darkerBackground = theme.contrast
  return extend(
    {
      consoleWarnBackground: '#fffbe5',
      consoleWarnForeground: '#5c5c00',
      consoleWarnBorder: '#fff5c2',
      consoleErrorBackground: '#fff0f0',
      consoleErrorForeground: '#f00',
      consoleErrorBorder: '#ffd6d6',
      light: '#fff',
      dark: '#eee'
    },
    theme
  )
}

export default {
  Light: createLightTheme({
    darkerBackground: '#f3f3f3',
    background: '#fff',
    foreground: '#333',
    selectForeground: '#333',
    accent: '#1a73e8',
    highlight: '#eaeaea',
    border: '#ccc',
    primary: '#333',
    contrast: '#f2f7fd',
    varColor: '#c80000',
    stringColor: '#1a1aa6',
    keywordColor: '#881280',
    numberColor: '#1c00cf',
    operatorColor: '#808080',
    linkColor: '#1155cc',
    textColor: '#8097bd',
    tagNameColor: '#881280',
    functionColor: '#222',
    attributeNameColor: '#994500',
    commentColor: '#236e25',
    cssProperty: '#c80000'
  }),
}