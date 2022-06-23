import React, {useState} from 'react'

const alpUpper = new Array( 26 ).fill( 1 ).map( ( _, i ) => String.fromCharCode( 65 + i ) )

const alpLower = new Array( 26 ).fill( 1 ).map( ( _, i ) => String.fromCharCode( 97 + i ) )

const char = [...alpUpper, ...alpLower]

const emoUpper = Array.from("😀🤣😌😛😕😢🥵🤗🤥😯😪🤧😷😮😦😶🤔🥶😭🙁🤩😝😍🤤😃😷🤕")

const emoLower = Array.from("😄🥰😜🥳😤😠😣😏🤪😘😊😁😆😇😗🤨😒😖😡😨😲🤐🤑🤢🤮😴🤤")

const emoSpace = Array.from("😵🤬🤫")
  
const emoji = [...emoUpper, ...emoLower]
  
const TYPES = Object.freeze({
  transform: {
    toEmoji: 'emoji',
    toChar: 'char'
  }
})

const App = () => {
  const [textInput, setTextInput] = useState('')
  const [passkey, setPasskey] = useState(0)
  const [output, setOutput] = useState('')
		
  const transform = (type) => { 
    if (type === TYPES.transform.toEmoji) generateTextmoji()
    else if (type === TYPES.transform.toChar) generateText()
  }

  const generateTextmoji = () => {
    const key = passkey % (26 * 2)
    const text = textInput.split('')
    let arr = []
    text.forEach(e => {
      const randomSpace = emoSpace[Math.floor(Math.random() * (emoSpace.length - 1))]
      let i
      i = char.findIndex(ce => ce === e)
      if (e === ' ') i = randomSpace
      else if (i < 0) i = e
      else i = emoji[i]
      arr.push(i)
    })

    setOutput(arr)
  }

  const generateText = async () => {
    const key = passkey % (26 * 2)
    const text = [...textInput]
    let arr = []
    text.forEach(e => {
      let i
      i = emoji.findIndex(ce => ce === e)
      if (emoSpace.includes(e)) i = ' '
      else if (i < 0) i = e
      else i = char[i]
      arr.push(i)
    })

    setOutput(arr)
  }
console.log(Math.floor(Math.random() * 2))
  return (
    <div>
      <div>text input: {textInput}</div>
      <input onChange={e => setTextInput(e.target.value)}/>
      <button onClick={() => transform(TYPES.transform.toEmoji)}>to Emoji</button>
      <button onClick={() => transform(TYPES.transform.toChar)}>to Char</button>
      <div>output: {output}</div>
      <div>math random: {}</div>
    </div>
  )
}

export default App