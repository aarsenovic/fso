const mongoose = require('mongoose')

const password = encodeURIComponent(process.argv[2])

const url = `mongodb+srv://acawarrior_db_user:${password}@cluster0.fryo5ti.mongodb.net/?appName=Cluster0`


mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })


const personSchema = new mongoose.Schema ({
  name: String,
  number: String,
})


const Person = mongoose.model('Person', personSchema)


if(process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(
        `${person.name} ${person.number}`
      )
    })
    mongoose.connection.close()
  })
}



if (process.argv.length === 5) {
  const person = new Person ({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(() => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}






