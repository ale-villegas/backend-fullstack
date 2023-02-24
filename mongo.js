const mongoose = require("mongoose")


// password por la terminal



const url = process.env.MONGODB_URI

mongoose.connect(url).then(res => {
    console.log("Se conecto la base de datos")
}).catch( error => {
    console.log(error.message)
})

/*

person.save()
.then(result => {
    console.log(result)
    mongoose.connection.close()
})
.catch(error => {
    console.log(error)
}) 


Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
}) 
*/