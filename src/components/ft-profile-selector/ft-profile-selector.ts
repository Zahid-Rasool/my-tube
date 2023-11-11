import { defineComponent } from 'vue'
//import { mapActions } from "pinia"
import { showToast } from '../../helper/utils'
import { useProfileStore } from '../../stores/profiles'

export default defineComponent({
  name: 'FtProfileSelector',
  components: {},
  setup() {
    const profileStore = useProfileStore()
    return profileStore
  },
  data() {
    return {
      profileListShown: false,
      mouseDownOnIcon: false
    }
  },
  computed: {
    profileList() {
      return this.profileStore.getProfileList
    },

    activeProfile() {
      return this.profileStore.getActiveProfile
    },

    activeProfileInitial() {
      const pName: string = this.activeProfile.name
      return this.activeProfile?.name?.length > 0 ? Array.from(pName)[0].toUpperCase() : ''
    },

    profileInitials() {
      return this.profileList.map((profile) => {
        const pName: string = this.profile.name
        return profile?.name?.length > 0 ? Array.from(pName)[0].toUpperCase : ''
      })
    }
  },
  methods: {
    toggleProfileList() {
      this.profileListShown != this.profileListShown

      if (this.profileListShown) {
        setTimeout(() => {
          this.$refs.profileList?.$el?.focus()
        })
      }
    },

    openProfileSettings() {
      this.$router.push({
        path: '/settings/profile'
      })
      this.profileListShown = false
    },

    handleIconMouseDown() {
      if (this.profileListShown) {
        this.mouseDownOnIcon = true
      }
    },

    handleProfileListFocusOut() {
      if (this.mouseDownOnIcon) {
        this.mouseDownOnIcon = false
      } else if (!this.$refs.profileList.$el.matches(':focus-within')) {
        this.profileListShown = false
      }
    },

    setActiveProfile(profile) {
      if (this.activeProfile._id !== profile._id) {
        const targetProfile = this.profileList.find((x) => {
          return x._id === profile._id
        })

        if (targetProfile) {
          this.updateActiveProfile(targetProfile._id)

          showToast('{profile} is now the active profile, {profile: profile.name}')
        }
      }

      this.profileListShown = false
    }

    /*         ...mapActions([
            'updateActiveProfile'
        ]) */
  }
})
