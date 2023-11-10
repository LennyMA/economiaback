import mongoose from 'mongoose'
import config from './config'


(async () => {
  try {
    const db = await mongoose.connect(config.mongodbURL).then(db => console.log("BD conectada a:", db.connection.name)).catch(err => console.log(err))
  } catch (error) {
    console.log(error)
  }

})()
