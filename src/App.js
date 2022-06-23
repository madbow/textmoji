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
  const [textOutput, setTextOutput] = useState('')
  const [activeTextArea, setActiveTextArea] = useState(TYPES.transform.char)
		
  const transform = (type) => { 
  console.log("🚀 ~ file: App.js ~ line 31 ~ transform ~ type", type)
    if (type === TYPES.transform.emoji) generateText()
    else if (type === TYPES.transform.char) generateTextmoji()
  }



  const generateTextmoji = () => {
    let key = (passkey % (26 * 2)) ?? 0
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
    let key = (passkey % (26 * 2)) ?? 0
    const text = [...textInput]
    const emojiArray = emoji.slice()
    const newEmoji = [...emojiArray.splice(key), ...emojiArray.splice(0, key)]
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
    <div className='flex flex-col min-h-screen min-w-full bg-gradient-to-r from-blue-500 to-purple-500 pt-10'>
      <label className='self-center font-sans font-light text-4xl text-gray-300'>T E X T M O J I</label>
      <div className='flex flex-1 flex-row items-center justify-between mx-64 mt-10 '>
        <input
          onChange={onChangePasskey}
          className='flex h-10 p-2 bg-white border rounded-md text-gray-600'
          placeholder='Passkey'
        />
        <button
        onClick={() => {
          setTextInput('')
          setTextOutput('')
          setActiveTextArea(activeTextArea !== TYPES.transform.char ? TYPES.transform.char : TYPES.transform.emoji)
        }}
        className='grow ml-60 font-sans font-semibold bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-40'
        >{activeTextArea} to {activeTextArea !== TYPES.transform.char ? TYPES.transform.char : TYPES.transform.emoji}</button>
      </div>
      <textarea
        onChange={e => {
          setTextInput(e.target.value)
          setTextOutput('')
        }}
        value={textInput}
        
        autoCorrect='none'
        autoComplete='none'
        className='flex justify-center h-72 mt-5 mx-64 p-5 bg-transparent border rounded-md'
      />
      <button
        onClick={() => transform(activeTextArea === TYPES.transform.char ? TYPES.transform.char : TYPES.transform.emoji)}
        className='mt-10 font-sans font-semibold bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-40 self-center'
        >{activeTextArea === TYPES.transform.char ? 'Encrypt' : 'Decrypt'}</button>
      <textarea
        value={textOutput}
        disabled={true}
        className='flex justify-center h-72 mt-10 mx-64 p-5 rounded-md'
      />
    </div>
  )
}

export default App

//   <div className="flex justify-center pt-10 flex-col">
  //   <h1 className=' self-center text-fuchsia-500 text-3xl py-10'>Welcome To TextMoji</h1>
  //   <div className='flex justify-center'>
  //   <div className="mb-3 xl:w-96 ">
  //     <label for="exampleFormControlTextarea1" className="form-label inline-block mb-2 text-gray-700">Text</label>
  //     <textarea
  //       onFocus={() => setActiveTextArea(TYPES.transform.char)}
  //       onChange={e => setTextInput(e.target.value)}
  //       value={textInput}
  //       className={`
  //       form-control
  //       block
  //       w-full
  //       px-3
  //       py-1.5
  //       text-base
  //       font-normal
  //       text-gray-700
  //       bg-white bg-clip-padding
  //       border border-solid border-gray-300
  //       rounded
  //       transition
  //       ease-in-out
  //       m-0
  //       focus:text-gray-700 focus:bg-white focus:border-blue-500 focus:outline-none
  //     `}        
  //       id="exampleFormControlTextarea1"
  //       rows="3"
  //       placeholder="Your message"
  //     ></textarea>
  //   </div>
  //   <div className='w-40 flex justify-center flex-col items-center ml-10'>
  //     <input value={passkey} inputMode='numeric' onChange={onChangePasskey} className='w-40 p-2 border text-gray-700' placeholder='Passcode' />
  //   </div>
  //   <div className="mb-3 xl:w-96 ml-10">
  //     <label for="exampleFormControlTextarea1" className="form-label inline-block mb-2 text-gray-700">Emoji</label>
  //     <textarea
  //       onFocus={() => setActiveTextArea(TYPES.transform.emoji)}
  //       onChange={e => setTextOutput(e.target.value)}
  //       value={textOutput}
  //       className={`
  //         form-control
  //         block
  //         w-full
  //         px-3
  //         py-1.5
  //         text-base
  //         font-normal
  //         text-gray-700
  //         bg-white bg-clip-padding
  //         border border-solid border-gray-300
  //         rounded
  //         transition
  //         ease-in-out
  //         m-0
  //         focus:text-gray-700 focus:bg-white focus:border-blue-500 focus:outline-none
  //       `
  //     }
  //       id="exampleFormControlTextarea1"
  //       rows="3"
  //       placeholder="Your emoji message"
  //     ></textarea>
  //     </div>
  //   </div>
  // </div>