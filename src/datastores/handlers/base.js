import db from '../index'

class Profiles {
  static create(profile) {
    return db.profiles.insertAsync(profile)
  }

  static find() {
    return db.profiles.findAsync({})
  }

  static upsert(profile) {
    return db.profiles.updateAsync({ _id: profile._id }, profile, { upsert: true })
  }

  static delete(id) {
    return db.profiles.removeAsync({ _id: id })
  }

  static persist() {
    return db.profiles.compactDatafileAsync()
  }
}

function compactAllDatastores() {
  return Promise.allSettled([Profiles.persist()])
}

const baseHandlers = {
  profiles: Profiles,

  compactAllDatastores
}

export default baseHandlers
