let p = new Promise((resolve, reject) =>{
        let a = 1+2
        if(a == 2){
            resolve('Success')
        }
        else{
            reject('Failed')
        }
})

//then is called if it is Resolve is called
p.then((message) =>{
    console.log('This is in the Then: ' + message)
})
//catch is called if the Reject is called
.catch((message) =>{
    console.log('This is in the Catch: ' + message)
})