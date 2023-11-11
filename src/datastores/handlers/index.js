import require from '@seald-io/nedb'
let handlers = require('./web').default

const DBProfileHandlers = handlers.profiles

export { DBProfileHandlers }
