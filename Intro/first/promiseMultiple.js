const example1 = new Promise((resolve, reject)=> {
    resolve('Example 1')
})

const example2 = new Promise ((resolve, reject) => {
    resolve('Example 2')
})

const example3 = new Promise ((resolve, reject)=> {
    resolve('Example 3')
})

//all together in an array
Promise.all([
    example1, example2, example3
]).then((message)=> {
    console.log(message)
})