import axios from 'axios'

export default {
  getLatestVersion: async () => {
    try {
      const { data } = await axios.get(
        `https://ddragon.leagueoflegends.com/api/versions.json`
      )
      return data[0]
    } catch (e) {
      console.log(e)
    }
  },

  getAllData: async version => {
    try {
      const { data } = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
      )
      return data.data
    } catch (e) {
      console.log(e)
    }
  },

  getChampData: async (champName, language) => {
    try {
      const champBiography = await axios.get(
        `https://universe-meeps.leagueoflegends.com/v1/${language.toLowerCase()}/champions/${champName.toLowerCase()}/index.json`
      )
      const champSkins = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/${await getLatestVersion()}/data/${language}/champion/${champName}.json`
      )
      return { champBiography, champSkins }
    } catch (e) {
      console.log(e)
    }
  }
}
