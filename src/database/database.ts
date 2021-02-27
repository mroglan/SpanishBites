import {MongoClient} from 'mongodb'


// const client = new MongoClient(`mongodb+srv://Manuel:${process.env.DATABASE_PASS}@cluster0.5eaee.mongodb.net/spanishBites`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     maxIdleTimeMS: 10000, 
//     serverSelectionTimeoutMS: 10000, 
//     socketTimeoutMS: 20000
// })

// export default async function database() {
//     if(!client.isConnected()) await client.connect()
//     const db = client.db('spanishBites')
//     return db
// }

const globalCopy:any = global
let cached = globalCopy.mongo

if(!cached) {
    cached = globalCopy.mongo = {conn: null, promise: null}
}

export default async function database() {
    if (cached.conn) {
        // console.log('using cached db')
      	return cached.conn.db
    }
  
    if (!cached.promise) {
      	const opts = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			maxIdleTimeMS: 10000, 
			serverSelectionTimeoutMS: 10000, 
			socketTimeoutMS: 20000
      	}
  
      	cached.promise = MongoClient.connect(`mongodb+srv://Manuel:${process.env.DATABASE_PASS}@cluster0.5eaee.mongodb.net/spanishBites`, opts).then((client) => {
        	return {
        	  client,
        	  db: client.db('spanishBites'),
       		}
      	})
    }
    cached.conn = await cached.promise
    // console.log('not using cached db')
    return cached.conn.db
  }
