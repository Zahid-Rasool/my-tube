import { PropType, defineComponent } from 'vue'
import FtTooltip from '../ft-tooltip/ft-tooltip.vue'
//import { mapActions } from 'pinia'
import { isKeyboardEventKeyPrintableChar, isNullOrEmpty } from '../../helper/string'

export default defineComponent({
  name: 'FtInput',
  components: {
    'ft-tooltip': FtTooltip
  },
  props: {
    inputType: {
      type: String,
      required: false,
      default: 'text'
    },
    placeholder: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: ''
    },
    showActionButton: {
      type: Boolean,
      default: true
    },
    forceActionButtonIconName: {
      type: Array as PropType<string[]>,
      default: null
    },
    showClearTextButton: {
      type: Boolean,
      default: false
    },
    showLabel: {
      type: Boolean,
      default: false
    },
    isSearch: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    spellCheck: {
      type: Boolean,
      default: true
    },
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    },
    tooltip: {
      type: String,
      default: ''
    }
  },
  data() {
    let actionIcon = ['fas', 'search']
    if (this.forceActionButtonIconName !== null) {
      actionIcon = this.forceActionButtonIconName
    }
    return {
      id: '',
      inputData: '',
      searchState: {
        showOptions: false,
        selectedOption: -1,
        isPointerInList: false,
        keyboardSelectedOptionIndex: -1
      },
      visibleDataList: this.dataList,
      clearTextButtonExisting: false,
      clearTextButtonVisible: false,
      actionButtonIconName: actionIcon
    }
  },
  computed: {
    barColor() {
      return true //this.$store.getters.getBarColor
    },
    forceTextColor() {
      return this.isSearch && this.barColor
    },
    idDataList() {
      return `${this.id}_datalist`
    },
    inputDataPresent() {
      return this.inputData.length > 0
    },
    inputDataDisplayed() {
      if (!this.isSearch) {
        return this.inputData
      }

      const selectedOptionValue = this.searchStateKeyboardSelectedOptionValue
      if (selectedOptionValue != null && selectedOptionValue !== '') {
        return selectedOptionValue
      }

      return this.inputData
    },
    searchStateKeyboardSelectedOptionValue() {
      if (this.searchState.keyboardSelectedOptionIndex === -1) {
        return null
      }

      return this.visibleDataList[this.searchState.keyboardSelectedOptionIndex]
    }
  },
  watch: {
    dataList(val, oldval) {
      if (val != oldval) {
        this.updateVisibleDataList()
      }
    },
    inputData(val, oldval) {
      if (val != oldval) {
        this.updateVisibleDataList()
      }
    },
    value(val, oldval) {
      if (val != oldval) {
        this.inputData = val
      }
    }
  },
  mounted() {
    this.id = this._uid
    this.inputData = this.value
    this.updateVisibleDataList()
  },
  methods: {
    handleClick(e) {
      if (!this.inputDataPresent) {
        return
      }

      this.searchState.showOptions = false
      this.searchState.selectedOption = -1
      this.searchState.keyboardSelectedOptionIndex = -1
      this.$emit('input', this.inputData)
      this.$emit('click', this.inputData, { event: e })
    },

    handleInput(val) {
      this.inputData = val

      if (
        this.isSearch &&
        this.searchState.selectedOption !== -1 &&
        this.inputData === this.visibleDataList[this.searchState.selectedOption]
      ) {
        return
      }
      this.handleActionChange()
      this.$emit('input', val)
    },

    handleClearTextClick() {
      if (!this.inputDataPresent) {
        return
      }
      this.inputData = ''
      this.handleActionChange()
      this.updateVisibleDataList()

      this.$refs.input.value = ''

      this.$refs.input.focus()

      this.$emit('clear')
    },

    handleActionChange() {
      if (!this.showActionButton) {
        return
      }
      if (!this.inputDataPresent && this.forceActionButtonIconName === null) {
        this.actionButtonIconName = ['fas', 'search']
        return
      }
      /*    try {
        this.getYoutubeUrlInfo(this.inputData).then((result) => {
          let isYoutubeLink = false

          switch (result.urlType) {
            case 'video':
            case 'playlist':
            case 'search':
            case 'cahnnel':
            case 'hashtag':
              isYoutubeLink = true
              break
            case 'invalid_url':
            default:
              break
          }
          if (this.forceActionButtonIconName === null) {
            if (isYoutubeLink) {
              this.actionButtonIconName = ['fas', 'arrow-right']
            } else {
              this.actionButtonIconName = ['fas', 'search']
            }
          }
        })
      } catch (ex) {
        if (this.forceActionButtonIconName === null) {
          this.actionButtonIconName = ['fas', 'search']
        }
        throw ex
      } */
    },

    handleOptionClick(index) {
      this.searchState.showOptions = false
      this.inputData = this.visibleDataList[index]
      this.$emit('input', this.inputData)
      this.handleClick()
    },
    /**
     * @param {keyboardEvent} event
     */
    handleKeyDown(event) {
      if (event.key === 'Enter') {
        if (this.searchState.selectedOption !== -1) {
          this.searchState.showOptions = false
          event.preventDefault()
          this.inputData = this.visibleDataList[this.searchState.selectedOption]
        }
        this.handleClick(event)
        return
      }
      if (this.visibleDataList.length === 0) {
        return
      }

      this.searchState.showOptions = true
      const isArrow = event.key === 'ArrowDown' || event.key === 'ArrowUp'
      if (!isArrow) {
        const selectedOptionValue = this.searchStateKeyboardSelectedOptionValue

        if (!isNullOrEmpty(selectedOptionValue) && isKeyboardEventKeyPrintableChar(event.key)) {
          event.preventDefault()
          this.handleInput(`${selectedOptionValue}${event.key}`)
          return
        }
        return
      }

      event.preventDefault()
      if (event.key === 'ArrowDown') {
        this.searchState.selectedOptionValue++
      } else if (event.key === 'ArrowUP') {
        this.searchState.selectedOptionValue--
      }

      if (this.searchState.selectedOption < -1) {
        this.searchState.selectedOption = this.visibleDataList.length - 1
      } else if (this.searchState.selectedOption > this.visibleDataList.length - 1) {
        this.searchState.selectedOption = -1
      }

      this.searchState.keyboardSelectedOptionIndex = this.searchState.selectedOption
    },

    handleInputBlur() {
      if (!this.searchState.isPointerInList) {
        this.searchState.showOptions = false
      }
    },

    handleFocus() {
      this.searchState.showOptions = true
    },

    updateVisibleDataList() {
      if (this.dataList.length === 0) {
        return
      }

      this.searchState.selectedOption = -1
      this.searchState.keyboardSelectedOptionIndex = -1
      if (this.inputData === '') {
        this.visibleDataList = this.dataList
        return
      }

      const lowerCaseInputData = this.inputData.toLowerCase()

      this.visibleDataList = this.dataList.filter((x) => {
        return x.toLowerCase().indexOf(lowerCaseInputData) !== -1
      })
    },

    updatInputData(text) {
      this.inputData = text
    },

    focus() {
      this.$refs.input.focus()
    },

    blur() {
      this.$refs.input.blur()
    }

    //...mapActions(['getYoutubeUrlInfo'])
  }
})
