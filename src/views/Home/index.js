import { defineComponent } from 'vue'
import { mapState, mapGetters, mapMutations } from 'vuex'
import { Translator } from '@/utils/Translator'

export default defineComponent({
  name: 'Home',
  data () {
    return {
      champName: '',
      arrayChamps: []
    }
  },
  computed: {
    ...mapState(['champs', 'version']),
    ...mapGetters(['getSuggestions', 'getLanguage']),
    translator () {
      return Translator(this.getLanguage)
    },
    suggestions () {
      return this.getSuggestions(this.champName) || []
    }
  },
  methods: {
    ...mapMutations(['setSearchChamp']),
    async searchChamp () {
      const champNameFormated = this.champName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
      this.$router.push(`/${this.getLanguage}/champion/${champNameFormated}`)
    },
    goToLore (champ) {
      this.$router.push(`/${this.getLanguage}/champion/${champ.id}`)
    },
    navigateInput (eInner, champ) {
      try {
        const keyValue = eInner.which
        const tabIndex = Number(eInner.target.attributes['tabindex'].nodeValue)

        if (keyValue == 40) {
          const newTabIndex = tabIndex + 1
          document.getElementById(`nav${newTabIndex}`).focus()
        } else if (keyValue == 38) {
          const newTabIndex = tabIndex - 1
          document.getElementById(`nav${newTabIndex}`).focus()
        } else if (keyValue == 13) {
          this.goToLore(champ)
        }
      } catch (e) {}
    }
  },
  beforeCreate () {
    this.$route.params.language === '' && this.$router.push(`/en_US`)
  },
  beforeMount () {
    document.title = 'Lolre'
  }
})
