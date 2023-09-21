const text = 'value1, value2, value3, value4'


const newText = text.split(',').map(value => value.trim())

console.log(newText)