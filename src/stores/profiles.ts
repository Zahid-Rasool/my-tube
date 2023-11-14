import { defineStore } from 'pinia'
import { MAIN_PROFILE_ID } from '../constants'
import { getRandomColor } from '../helper/color'
import { calculateColorLuminance } from '../helper/color'
import { deepCopy } from '../helper/utils'
import { DBProfileHandlers } from '../datastores/handlers'

export const useProfileStore = defineStore('profiles', {
  state() {
    return {
      profileList: [
        {
          _id: MAIN_PROFILE_ID,
          name: 'All Channels',
          bgColor: '#000',
          textColor: '#fff',
          subscriptions: []
        }
      ],
      activeProfile: MAIN_PROFILE_ID
    }
  },

  getters: {
    getProfileList(state) {
      return state.profileList
    },

    getActiveProfile(state) {
      const activeProfileId = state.activeProfile
      return state.profileList.find((profile) => {
        return profile._id === activeProfileId
      })
    },

    profilebyId(state) {
      ;(id) => {
        const profile = state.profileList.find((p) => p._id === id)
        return profile
      }
    }
  },

  actions: {
    async grabAllProfiles({ rootState }, defaultName = null) {
      let profiles
      try {
        profiles = await DBProfileHandlers.find()
      } catch (errMessage) {
        console.error(errMessage)
        return
      }

      if (!Array.isArray(profiles)) return

      if (profiles.length === 0) {
        const randomColor = getRandomColor()
        const textColor = calculateColorLuminance(randomColor)
        const defaultProfile = {
          _id: MAIN_PROFILE_ID,
          name: defaultName,
          bgColor: randomColor,
          textColor: textColor,
          subscriptions: []
        }

        try {
          await DBProfileHandlers.create(defaultProfile)
          this.setProfileList([defaultProfile])
        } catch (errMessage) {
          console.error(errMessage)
        }
        return
      }

      profiles = profiles.sort(profileSort)

      if (this.state.profileList.length < profiles.length) {
        const profile = profiles.find((profile) => {
          return profile._id === rootState.settings.defaultProfile
        })

        if (profile) {
          this.setActiveProfile(profile._id)
        }
      }

      this.setProfileList(profiles)
    },

    async updateSubscriptionsDetails(
      { getters, dispatch },
      { channelThumbnailUrl, channelName, channelId }
    ) {
      const thumbnail = channelThumbnailUrl?.replace(/=s\d*/, '=s176') ?? null
      const profileList = getters.getProfileList
      for (const profile of profileList) {
        const currentProfileCopy = deepCopy(profile)
        const channel =
          currentProfileCopy.subscriptions.find((channel) => {
            return channel.id === channelId
          }) ?? null
        if (channel === null) {
          continue
        }
        let updated = false
        if (channel.name !== channelName && channelName != null) {
          channel.name = channelName
          updated = true
        }
        if (channel.thumbnail !== thumbnail && thumbnail != null) {
          channel.thumbnail = thumbnail
          updated = true
        }
        if (updated) {
          await dispatch('updateProfile', currentProfileCopy)
        } else {
          break
        }
      }
    },

    async createProfile({ commit }, profile) {
      try {
        const newProfile = await DBProfileHandlers.create(profile)
        commit('addProfileToList', newProfile)
      } catch (errMessage) {
        console.error(errMessage)
      }
    },

    async updateProfile({ commit }, profile) {
      try {
        await DBProfileHandlers.upsert(profile)
        commit('upsertProfileToList', profile)
      } catch (errMessage) {
        console.error(errMessage)
      }
    },

    async removeProfile({ commit }, profileId) {
      try {
        await DBProfileHandlers.delete(profileId)
        commit('removeProfileFromList', profileId)
      } catch (errMessage) {
        console.error(errMessage)
      }
    },

    updateActiveProfile({ commit }, id) {
      commit('setActiveProfile', id)
    },

    setProfileList(state, profileList) {
      state.profileList = profileList
    },

    setActiveProfile(state, activeProfile) {
      state.activeProfile = activeProfile
    },

    addProfileToList(state, profile) {
      state.profileList.push(profile)
      state.profileList.sort(profileSort)
    },

    upsertProfileToList(state, updatedProfile) {
      const i = state.profileList.findIndex((p) => {
        return p._id === updatedProfile._id
      })

      if (i === -1) {
        state.profileList.push(updatedProfile)
      } else {
        state.profileList.splice(i, 1, updatedProfile)
      }

      state.profileList.sort(profileSort)
    },

    removeProfileFromList(state, profileId) {
      const i = state.profileList.findIndex((profile) => {
        return profile._id === profileId
      })

      state.profileList.splice(i, 1)
    }
  }
})

function profileSort(a, b) {
  if (a._id === MAIN_PROFILE_ID) return -1
  if (b._id === MAIN_PROFILE_ID) return 1
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}
