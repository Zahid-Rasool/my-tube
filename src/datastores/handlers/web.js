import baseHandlers from './base'

class Profiles {
  static create(profile) {
    return baseHandlers.profiles.create(profile)
  }

  static find() {
    return baseHandlers.profiles.find()
  }

  static upsert(profile) {
    return baseHandlers.profiles.upsert(profile)
  }

  static delete(id) {
    return baseHandlers.profiles.delete(id)
  }

  static persist() {
    return baseHandlers.profiles.persist()
  }
}

const handlers = {
  profiles: Profiles
}

export default handlers
