const words = require('./words')
const alphabet = 'abcdefghijklmnopqrstuvwxyz'

exports.hashObj = (words) => {
  console.log('words ======>', words)
  return words.reduce((acc, cur) => {
    console.log('cur ===>', cur)
    if (acc[cur] === undefined) {
      console.log('did i make it ?')
      acc[cur] = 1
      console.log('acc ===>', acc)
    }else {
      acc[cur]++
    }
  }, {})
}

exports.stringDistance = query => {
  console.log('starting... inside stringDistance')
  const dictionary = module.exports.hashObj(words)
  console.log('did i break?')
  console.log('dictionary ====>', dictionary)
  const word = query.toLowerCase().split('')
  const result = []

  // Insert the alphabet to every element
  // today ---> aoday..boday.. etc
  for (let i = 0; i < word.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      const thisWord = word.slice()
      thisWord.splice(i, 0, alphabet[j])
      result.push(thisWord.join(''))
    }
  }
  // Remove char from  every element
  // today ---> oday...tday...toay etc
  for (let i = 0; i < word.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      const thisWord = word.slice()
      thisWord.splice(i, 1)
      // console.log('thisWord', thisWord)
      result.push(thisWord.join(''))
    }
  }

  // // Swap each char from the element to the next index
  // // today ---> otday... tdoay.. toady...
  for (var i = 0; i < word.length; i++) {
    const thisWord = word.slice()
    const [thisChar] = thisWord.splice(i, 1)
    thisWord.splice(i + 1, 0, thisChar)
    result.push(thisWord.join(''))
  }

  // Replace each element with each char from the alphabet
  // today ---> aoday..boday..coday..taday...tbday..
  for (var i = 0; i < word.length; i++) {
    for (var j = 0; j < alphabet.length; j++) {
      const thisWord = word.slice()
      thisWord[i] = alphabet[j]
      result.push(thisWord.join(''))
    }
  }

  return result
}

exports.getWord = (req, res) => {
  try {
    console.log('starting.... inside getWord')
    const queryCondition = req.query.word
    // Not Complete Spell check
    const results = module.exports.stringDistance(queryCondition)

    // const results = words.filter(word => {
    //   return new RegExp(`^${queryCondition}`).test(word)
    // })
    res.json({ data: results })
  } catch (error) {
    res.json({ message: 'error' })
  }
}
