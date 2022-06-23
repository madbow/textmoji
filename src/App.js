import React, {useEffect, useState} from 'react'

const alpUpper = new Array( 26 ).fill( 1 ).map( ( _, i ) => String.fromCharCode( 65 + i ) )

const alpLower = new Array( 26 ).fill( 1 ).map( ( _, i ) => String.fromCharCode( 97 + i ) )

const char = [...alpUpper, ...alpLower]

const emoUpper = Array.from("🤣😌😛😕😢🥵🤗🤥😯😪🤧😷😮😦😶🤔🥶😭🙁🤩😝😍🤤😃😷🤕")

const emoLower = Array.from("🥰😜🥳😤😠😣😏🤪😘😊😁😆😇😗🤨😒😖😡😨😲🤐🤑🤢🤮😴🤤")

const emoSpace = Array.from("😵🤬🤫😀")
  
const emoji = [...emoUpper, ...emoLower]
  
const TYPES = Object.freeze({
  transform: {
    emoji: 'emoji',
    char: 'char'
  }
})

const App = () => {
  const [textInput, setTextInput] = useState('')
  const [passkey, setPasskey] = useState('')
  const [emojiInput, setEmojiInput] = useState('')
  const [activeTextArea, setActiveTextArea] = useState(TYPES.transform.char)
		
  const transform = (type) => { 
    if (type === TYPES.transform.emoji) generateText()
    else if (type === TYPES.transform.char) generateTextmoji()
  }



  const generateTextmoji = () => {
    let key = (passkey % (26 * 2)) ?? 0
    const text = textInput.split('')
    const charArray = char.slice()
    const newChar = [...charArray.splice(key), ...charArray.splice(0, key)]
    const emojiArray = emoji.slice()
    const newEmoji = [...emojiArray.splice(key), ...emojiArray.splice(0, key)]
    let arr = []
    text.forEach(e => {
      const randomSpace = emoSpace[Math.floor(Math.random() * (emoSpace.length - 1))]
      let i
      i = newChar.findIndex(ce => ce === e)
      if (e === ' ') i = randomSpace
      else if (i < 0) i = e
      else i = newEmoji[i]
      arr.push(i)
    })
    setEmojiInput(arr.join('')) 
  }

  const generateText = () => {
    let key = (passkey % (26 * 2)) ?? 0
    const text = [...emojiInput]
    const emojiArray = emoji.slice()
    const newEmoji = [...emojiArray.splice(key), ...emojiArray.splice(0, key)]
    const charArray = char.slice()
    const newChar = [...charArray.splice(key), ...charArray.splice(0, key)]

    let arr = []
    text.forEach(e => {
      let i
      i = newEmoji.findIndex(ce => ce === e)
      if (emoSpace.includes(e)) i = ' '
      else if (i < 0) i = e
      else i = newChar[i]
      arr.push(i)
    })
    setTextInput(arr.join(''))
  }

  const changeActiveArea = () => {
    // setEmojiInput('')
    // setTextInput('')
    activeTextArea === TYPES.transform.char ? setActiveTextArea(TYPES.transform.emoji) : setActiveTextArea(TYPES.transform.char)
  }

  const onChangePasskey = (e) => {
    let key = e.target.value

    if (!isNaN(key)) {
      return setPasskey(key)
    }

    alert('Passkey should be a number')
    return setPasskey('')
  }

  useEffect(() => {
    transform(activeTextArea)
  }, [textInput, emojiInput, activeTextArea, passkey])
  

  return (
    <div className="flex justify-center pt-20">
    <div className="mb-3 xl:w-96 ">
      <label for="exampleFormControlTextarea1" className="form-label inline-block mb-2 text-gray-700">Text</label>
      <textarea
        onChange={e => setTextInput(e.target.value)}
        value={textInput}
        disabled={!!(activeTextArea !== TYPES.transform.char)}
        className={`
          ${activeTextArea !== TYPES.transform.char ? 'bg-gray-200 ' : ''}
          form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        `}
        id="exampleFormControlTextarea1"
        rows="3"
        placeholder="Your message"
      ></textarea>
    </div>
    <div className='w-40 flex justify-center flex-col items-center ml-10'>
      <button className='mb-5 border border-gray-200 rounded-lg bg-white h-10 w-10 self-center text-gray-700' onClick={changeActiveArea}>{activeTextArea === TYPES.transform.emoji ? '<' : '>'}</button>
      <input value={passkey} inputMode='numeric' onChange={onChangePasskey} className='w-40 p-2 border text-gray-700' placeholder='Passcode' />
    </div>
    <div className="mb-3 xl:w-96 ml-10">
      <label for="exampleFormControlTextarea1" className="form-label inline-block mb-2 text-gray-700">Emoji</label>
      <textarea
        onChange={e => setEmojiInput(e.target.value)}
        disabled={!!(activeTextArea !== TYPES.transform.emoji)}
        value={emojiInput}
        className={`
        ${activeTextArea !== TYPES.transform.emoji ? 'bg-gray-200 ' : ''}
          form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-500 focus:outline-none
        `}
        id="exampleFormControlTextarea1"
        rows="3"
        placeholder="Your emoji message"
      ></textarea>
    </div>
  </div>
  )
}

export default App