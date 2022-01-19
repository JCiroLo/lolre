export const languages = [
  { code: 'en_US', name: 'English (US)' },
  { code: 'en_GB', name: 'English (UK)' },
  { code: 'es_MX', name: 'Spanish (Mexico)' },
  { code: 'es_ES', name: 'Spanish (Spain)' },
  { code: 'fr_FR', name: 'French' },
  { code: 'ko_KR', name: 'Korean' },
  { code: 'ja_JP', name: 'Japanese' }
]

const en_US = {
  navbar: {
    home: 'HOME',
    about: 'ABOUT'
  },
  home: {
    search_text: 'SEARCH FOR A CHAMPION',
    search_button: 'SEARCH',
    version: 'VERSION GAME'
  },
  about: {
    about_me: 'ABOUT ME'
  },
  champion: {
    see_bio: 'SEE BIOGRAPHY',
    see_abil: 'SEE ABILITIES',
    abilities: 'ABILITIES'
  }
}

const en_GB = {
  navbar: {
    home: 'HOME',
    about: 'ABOUT'
  },
  home: {
    search_text: 'SEARCH FOR A CHAMPION',
    search_button: 'SEARCH',
    version: 'VERSION GAME'
  },
  about: {
    about_me: 'ABOUT ME'
  },
  champion: {
    see_bio: 'SEE BIOGRAPHY',
    see_abil: 'SEE ABILITIES',
    abilities: 'ABILITIES'
  }
}

const es_MX = {
  navbar: {
    home: 'INICIO',
    about: 'ACERCA DE'
  },
  home: {
    search_text: 'BUSCA UN CAMPEÓN',
    search_button: 'BUSCAR',
    version: 'VERSIÓN DEL JUEGO'
  },
  about: {
    about_me: 'SOBRE MI'
  },
  champion: {
    see_bio: 'VER BIOGRAFÍA',
    see_abil: 'VER HABILIDADES',
    abilities: 'HABILIDADES'
  }
}

const es_ES = {
  navbar: {
    home: 'INICIO',
    about: 'ACERCA DE'
  },
  home: {
    search_text: 'BUSCA UN CAMPEÓN',
    search_button: 'BUSCAR',
    version: 'VERSIÓN DEL JUEGO'
  },
  about: {
    about_me: 'SOBRE MI'
  },
  champion: {
    see_bio: 'VER BIOGRAFÍA',
    see_abil: 'VER HABILIDADES',
    abilities: 'HABILIDADES'
  }
}

const fr_FR = {
  navbar: {
    home: 'MAISON',
    about: 'À PROPOS DE'
  },
  home: {
    search_text: 'RECHERCHE UN CHAMPION',
    search_button: 'RECHERCHER',
    version: 'JEU DE VERSION'
  },
  about: {
    about_me: 'SUR MOI'
  },
  champion: {
    see_bio: 'VOIR LA BIOGRAPHIE',
    see_abil: 'VOIR LES CAPACITÉS',
    abilities: 'APTITUDES'
  }
}

const ko_KR = {
  navbar: {
    home: '집',
    about: '약'
  },
  home: {
    search_text: '챔피언 검색',
    search_button: '검색',
    version: '버전 게임'
  },
  about: {
    about_me: '나에 대해서'
  },
  champion: {
    see_bio: '약력보기',
    see_abil: '능력보기',
    abilities: '능력'
  }
}

const ja_JP = {
  navbar: {
    home: 'ホーム',
    about: '約'
  },
  home: {
    search_text: 'チャンピオンを探す',
    search_button: '探す',
    version: 'バージョンゲーム'
  },
  about: {
    about_me: '私について'
  },
  champion: {
    see_bio: '略歴を見る',
    see_abil: 'アビリティを見る',
    abilities: '能力'
  }
}

export const Translator = language => {
  switch (language) {
    case 'en_US':
      return en_US
    case 'en_GB':
      return en_GB
    case 'es_MX':
      return es_MX
    case 'es_ES':
      return es_ES
    case 'fr_FR':
      return fr_FR
    case 'ko_KR':
      return ko_KR
    case 'ja_JP':
      return ja_JP
  }
}
