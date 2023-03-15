import { getChampData } from '@/utils/Actions.js'
import { mapGetters, mapMutations, mapState } from 'vuex'
import ScrollProgress from '@/components/ScrollProgress'
import Tooltip from '@/components/Tooltip'

import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore, { Pagination } from 'swiper/core'

import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.min.css'

SwiperCore.use([Pagination])

export default {
  name: 'Champion',
  components: {
    ScrollProgress,
    Tooltip,
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      champData: {},
      scrolling: false,
      skins: [],
      selectedSkin: 0,
      scrollPercentage: 0,
      currentSplashart: {},
      currentSpellVideo: 'P',
      aspectRatioVideo: false
    }
  },
  computed: {
    ...mapState(['loading']),
    ...mapGetters(['getHideNavbar']),
    loadedData () {
      return Object.keys(this.champData).length > 0
    },
    error () {
      return false
    },
    lore () {
      return this.champData.champion?.biography.full
    }
  },
  methods: {
    ...mapMutations(['setLoading', 'setHideNavbar']),
    ...mapGetters(['getVersion']),
    goTo (refName) {
      const element = this.$refs[refName]
      const top = element.offsetTop
      window.scrollTo(0, top - 50)
    },
    show () {
      console.log(this.champData)
    },
    handleSliderChange (e) {
      this.currentSplashart = this.skins[e.activeIndex]
    },
    handleSliderClick (e) {
      e.slideTo(e.clickedIndex)
    },
    playSpellVideo (key) {
      this.$refs.spellVideos.src = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0${this.champData.key}/ability_0${this.champData.key}_${key}1.webm`
      this.$refs.spellVideos.play()
    }
  },
  async beforeMount () {
    const { champSkins, champBiography } = await getChampData(
      this.$route.params.champName,
      this.$route.params.language
    )
    this.champData = {
      ...champBiography.data,
      ...champSkins.data.data[this.$route.params.champName]
    }

    document.title = `${this.champData.name} - Lolre`

    this.skins = champSkins.data.data[this.$route.params.champName].skins

    this.currentSplashart = this.skins[0]

    window.addEventListener('scroll', e => {
      this.scrollPercentage =
        e.target.scrollingElement.scrollTop /
        (document.documentElement.scrollHeight - window.innerHeight)

      e.target.scrollingElement.scrollTop /
        (document.documentElement.scrollHeight - window.innerHeight) >
      0.01
        ? (this.scrolling = true)
        : (this.scrolling = false)
    })

    window.addEventListener('keyup', ({ key }) => {
      if (key === 'Q' || key === 'q') {
        this.playSpellVideo('Q')
      } else if (key === 'W' || key === 'w') {
        this.playSpellVideo('W')
      } else if (key === 'E' || key === 'e') {
        this.playSpellVideo('E')
      } else if (key === 'R' || key === 'r') {
        this.playSpellVideo('R')
      } else if (key === 'P' || key === 'p') {
        this.playSpellVideo('P')
      } else if (key === 'M' || key === 'm') {
        console.log(this.champData.champion.video)
      }
    })
  },
  mounted () {
    const self = this
    setTimeout(() => {
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting === true) {
            self.setHideNavbar(true)
            console.log('Hide')
          } else {
            self.setHideNavbar(false)
          }
        },
        {
          rootMargin: '-50%'
        }
      )
      observer.observe(this.$refs.refSpells)
    }, 2000)
  },
  watch: {
    async $route (to, from) {
      if (to.name === 'Champion') {
        const { champSkins, champBiography } = await getChampData(
          this.$route.params.champName,
          to.params.language
        )
        this.champData = {
          ...champBiography.data,
          ...champSkins.data.data[this.$route.params.champName]
        }
        this.skins = champSkins.data.data[this.$route.params.champName].skins
      }
    }
  }
}
