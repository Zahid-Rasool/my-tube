import Datastore from '@seald-io/nedb'

let dbPath = (dbName) => `${dbName}.db`
const db = {}

db.profiles = new Datastore({ fileName: dbPath('profiles'), autoload: true })

export default db
