import React, {useRef, useState} from 'react'

const alpUpper = new Array( 26 ).fill( 1 ).map( ( _, i ) => String.fromCharCode( 65 + i ) )

const alpLower = new Array( 26 ).fill( 1 ).map( ( _, i ) => String.fromCharCode( 97 + i ) )

const alpNumber = Array.from('1234567890')

const alpSymbol = Array.from(`!@#$%^&*()_-+={[]}:;'"<,>.?/|`)

const char = [...alpUpper, ...alpLower, ...alpNumber, ...alpSymbol]

const emoUpper = Array.from("🤣😌😛😕😢🥵🤗🤥😯😪🤧😷😮😦😶🤔🥶😭🙁🤩😝😍🤤😃🤕🥴")

const emoLower = Array.from("🥰😜🥳😤😠😣😏🤪😘😊😁😆😇😗🤨😒😖😡😨😲🤐🤑🤢🤮😴😵")

const emoNumber= Array.from("🐶🐱🐭🐹🐰🦊🐻🐼🐨🐯")

const emoSymbol = Array.from("🍏🍎🍐🍊🍋🍌🍉🍇🍓🍈🍒🍑🥭🍍🥥🥝🍅🍆🥑🥦🥬🥒🌶🧄🧅🥔🍠🥐🥯")

const emoSpace = Array.from("🤬🤫😀")
  
const emoji = [...emoUpper, ...emoLower, ...emoNumber, ...emoSymbol]
  
const TYPES = Object.freeze({
  transform: {
    emoji: 'emoji',
    char: 'char'
  }
})

const App = () => {
  const outputRef = useRef(null)
  const [textInput, setTextInput] = useState('')
  const [passkey, setPasskey] = useState('')
  const [textOutput, setTextOutput] = useState('')
  const [activeTextArea, setActiveTextArea] = useState(TYPES.transform.char)
		
  const transform = (type) => { 
    if (type === TYPES.transform.emoji) generateText()
    else if (type === TYPES.transform.char) generateTextmoji()
  }

  const generateTextmoji = () => {
    let key = (passkey % (char.length + 1)) ?? 0
    const text = textInput.split('')
    const charArray = char.slice()
    const newChar = [...charArray.splice(key), ...charArray.splice(0, key)]
    let arr = []
    text.forEach(e => {
      const randomSpace = emoSpace[Math.floor(Math.random() * (emoSpace.length - 1))]
      let i
      i = newChar.findIndex(ce => ce === e)
      if (e === ' ') i = randomSpace
      else if (i < 0) i = e
      else i = emoji[i]
      arr.push(i)
    })
    setTextOutput(arr.join('')) 
  }

  const generateText = () => {
    let key = (passkey % (char.length + 1)) ?? 0
    const text = [...textInput]
    const charArray = char.slice()
    const newChar = [...charArray.splice(key), ...charArray.splice(0, key)]

    let arr = []
    text.forEach(e => {
      let i
      i = emoji.findIndex(ce => ce === e)
      if (emoSpace.includes(e)) i = ' '
      else if (i < 0) i = e
      else i = newChar[i]
      arr.push(i)
    })
    setTextOutput(arr.join(''))
  }

  const onChangePasskey = (e) => {
    let key = e.target.value

    if (!isNaN(key)) {
      return setPasskey(key)
    }

    alert('Passkey should be a number')
    return setPasskey('')
  }
  

  return (
    <div className='flex flex-col md:min-h-screen md:min-w-full bg-gradient-to-r from-blue-500 to-purple-500 p-10'>
      <label className='self-center font-sans font-light text-2xl md:text-4xl text-gray-300'>😀 T E X T M O J I 🤬</label>
      <div className='flex flex-1 flex-col md:flex-row justify-center items-center md:items-center md:justify-between mx-20 md:mx-64 mt-20 '>
        <input
          value={passkey}
          onChange={onChangePasskey}
          className='h-10 p-2 bg-white border rounded-md text-gray-600'
          placeholder='Passkey'
        />
        <button
        onClick={() => {
          setTextInput('')
          setTextOutput('')
          setActiveTextArea(activeTextArea !== TYPES.transform.char ? TYPES.transform.char : TYPES.transform.emoji)
        }}
        className='flex-1 md:grow mt-5 md:mt-0 md:ml-72 font-sans font-semibold bg-teansparent border text-sm text-white p-2 rounded h-10'
        >{activeTextArea === TYPES.transform.char ? 'TEXT' : 'EMOJI'} to {activeTextArea !== TYPES.transform.char ? 'TEXT' : 'EMOJI'}</button>
      </div>
      <textarea
        onChange={e => {
          setTextInput(e.target.value)
          setTextOutput('')
        }}
        value={textInput}
        placeholder={activeTextArea === TYPES.transform.char ? 'Your text message' : 'Your emoji message'}
        autoCorrect='none'
        autoComplete='none'
        className='flex text-white justify-center h-72 mt-5 mx-1 md:mx-64 p-5 bg-transparent border rounded-md'
      />
      <button
        onClick={() => transform(activeTextArea === TYPES.transform.char ? TYPES.transform.char : TYPES.transform.emoji)}
        className='mt-10 font-sans font-semibold bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-40 self-center'
        >{activeTextArea === TYPES.transform.char ? 'Encrypt' : 'Decrypt'}</button>
      <button 
        className='mt-10 md:mt-5 self-end mx-1 md:mx-64 font-sans font-semibold bg-white hover:bg-gray-200 text-gray-700 border p-1 md:py-2 md:px-4 rounded w-20'
        onClick={ () => {
          const outputText = outputRef?.current?.value;
          navigator?.clipboard?.writeText(outputText)
        }
      }>Copy!</button>
      <textarea
        ref={outputRef}
        value={textOutput}
        disabled={true}
        className='flex justify-center h-72 mx-0 md:mx-64 p-5 rounded-md md:mt-2 mt-1'
      />
      <label className='mt-10 text-white font-mono underline text-sm font-light self-center'>madbow | © 2022</label>
    </div>
  )
}

export default App