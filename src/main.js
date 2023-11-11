import { createApp } from 'vue'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAngleDown,
  faArrowLeft,
  faArrowRight,
  faArrowDown,
  faBars,
  faBookmark,
  faCheck,
  faChevronRight,
  faCircleUser,
  faClone,
  faComment,
  faCommentDots,
  faCopy,
  faDownload,
  faEllipsisH,
  faEllipsisV,
  faEnvelope,
  faExchangeAlt,
  faExclamationCircle,
  faExternalLinkAlt,
  faEye,
  faEyeSlash,
  faFileDownload,
  faFileVideo,
  faFilter,
  faFire,
  faGlobe,
  faHashtag,
  faHeart,
  faHistory,
  faInfoCircle,
  faLanguage,
  faList,
  faNewspaper,
  faPause,
  faPlay,
  faQuestionCircle,
  faRandom,
  faRetweet,
  faRss,
  faSatelliteDish,
  faSearch,
  faShareAlt,
  faSlidersH,
  faSortDown,
  faStar,
  faStepBackward,
  faStepForward,
  faSync,
  faThumbsDown,
  faThumbsUp,
  faThumbTack,
  faTimes,
  faTimesCircle,
  faUsers
} from '@fortawesome/free-solid-svg-icons'
import { faBitcoin, faGithub, faMastodon, faMonero } from '@fortawesome/free-brands-svg-icons'

library.add(
  faAngleDown,
  faArrowLeft,
  faArrowRight,
  faArrowDown,
  faBars,
  faBookmark,
  faCheck,
  faChevronRight,
  faCircleUser,
  faClone,
  faComment,
  faCommentDots,
  faCopy,
  faDownload,
  faEllipsisH,
  faEllipsisV,
  faEnvelope,
  faExchangeAlt,
  faExclamationCircle,
  faExternalLinkAlt,
  faEye,
  faEyeSlash,
  faFileDownload,
  faFileVideo,
  faFilter,
  faFire,
  faGlobe,
  faHashtag,
  faHeart,
  faHistory,
  faInfoCircle,
  faLanguage,
  faList,
  faNewspaper,
  faPause,
  faPlay,
  faQuestionCircle,
  faRandom,
  faRetweet,
  faRss,
  faSatelliteDish,
  faSearch,
  faShareAlt,
  faSlidersH,
  faSortDown,
  faStar,
  faStepBackward,
  faStepForward,
  faSync,
  faThumbsDown,
  faThumbsUp,
  faThumbTack,
  faTimes,
  faTimesCircle,
  faUsers,
  faBitcoin,
  faGithub,
  faMastodon,
  faMonero
)
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
