<template>
  <h1 v-if="error">Champ does'nt exist</h1>
  <div class="champ-info" :class="{ scrolling }" v-else-if="loadedData">
    <ScrollProgress
      :progress="scrollPercentage"
      :show="scrolling && !getHideNavbar"
    />
    <div
      class="champ-splashart"
      :class="{
        animated:
          champData.champion.video !== null &&
          currentSplashart.name === 'default'
      }"
    >
      <video
        :src="`${champData.champion.video.uri}`"
        autoplay
        loop
        v-if="champData.champion.video !== null"
      />
      <img
        :style="{
          background: `url(${`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${$route.params.champName}_${currentSplashart.num}.jpg`})`,
          backgroundAttachment: 'scroll',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center top'
        }"
      />
    </div>
    <div class="champ-summary">
      <h1 class="font-lol">
        {{
          currentSplashart.name === 'default'
            ? champData.name
            : currentSplashart.name
        }}
      </h1>
      <p class="font-lol">{{ champData.title }}</p>
      <small class="font-lol" @click="goTo('refBiography')">
        SEE BIOGRAPHY
      </small>
      <small class="font-lol" @click="goTo('refSpells')">
        SEE ABILITIES
      </small>
    </div>
    <div class="my-swiper-slider">
      <swiper
        :slidesPerView="7"
        :centeredSlides="true"
        class="my-swiper-slider"
        @slideChange="handleSliderChange"
        @click="handleSliderClick"
      >
        <swiper-slide
          v-for="(skin, idx) in skins"
          :key="idx"
          :class="{ selected: skin === skin[idx] }"
        >
          <img
            :src="
              `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${$route.params.champName}_${skin.num}.jpg`
            "
            alt=""
          />
        </swiper-slide>
      </swiper>
    </div>
    <div class="champ-lore">
      <h2 class="font-lol" ref="refBiography">
        {{ champData.name }}
      </h2>
      <div v-html="lore" class="font-lol"></div>
    </div>
    <div class="champ-abilities-summary" ref="refSpells">
      <h2 class="font-lol">ABILITIES</h2>
      <div
        class="champ-video-description"
      >
        <button
          class="champ-video-aspect-ratio"
          @click="
            () => {
              aspectRatioVideo = !aspectRatioVideo
            }
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M0 1v17h24v-17h-24zm22 15h-20v-13h20v13zm-6.599 4l2.599 3h-12l2.599-3h6.802z"
            />
          </svg>
        </button>
        <video
          :src="
            `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/0${champData.key}/ability_0${champData.key}_P1.webm`
          "
          ref="spellVideos"
          :style="{ objectFit: aspectRatioVideo ? 'cover' : 'contain' }"
        />
        <div class="champ-hud">
          <div class="champ-icon">
            <img
              :src="
                `https://ddragon.leagueoflegends.com/cdn/${getVersion()}/img/champion/${
                  $route.params.champName
                }.png`
              "
              alt=""
            />
            <div class="level">18</div>
          </div>
          <div class="champ-deck">
            <div class="abilities">
              <div class="passive" @click="() => playSpellVideo('P')">
                <img
                  :src="
                    `https://ddragon.leagueoflegends.com/cdn/${getVersion()}/img/passive/${
                      champData.passive.image.full
                    }`
                  "
                  alt=""
                />
                <Tooltip
                  key_keyboard="Pasiva"
                  :thumb="
                    `https://ddragon.leagueoflegends.com/cdn/${getVersion()}/img/passive/${
                      champData.passive.image.full
                    }`
                  "
                  :title="champData.spells[0].name"
                  :description="champData.spells[0].description"
                  :metadata="[]"
                />
              </div>
              <div
                class="ability"
                v-for="(key, idx) in ['Q', 'W', 'E', 'R']"
                :key="idx"
                @click="() => playSpellVideo(key)"
              >
                <img
                  :src="
                    `http://ddragon.leagueoflegends.com/cdn/${getVersion()}/img/spell/${
                      champData.spells[idx].image.full
                    }`
                  "
                  alt=""
                />
                <span class="font-lol">{{ key }}</span>
                <Tooltip
                  :key_keyboard="key"
                  :thumb="
                    `https://ddragon.leagueoflegends.com/cdn/${getVersion()}/img/spell/${
                      champData.spells[idx].image.full
                    }`
                  "
                  :title="champData.spells[idx].name"
                  :description="champData.spells[idx].description"
                  :metadata="[
                    {
                      title: 'Enfriamiento',
                      values: champData.spells[idx].cooldown
                    },
                    { title: 'Costo', values: champData.spells[idx].cost },
                    { title: 'Rango', values: champData.spells[idx].range }
                  ]"
                />
              </div>
              <div class="summoner" @click="$refs.spellVideos.play()">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 22v-20l18 10-18 10z" />
                </svg>
                <span>D</span>
              </div>
              <div class="summoner" @click="$refs.spellVideos.pause()">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z" />
                </svg>
                <span>F</span>
              </div>
            </div>
            <div class="game-stats">
              <div class="life font-lol">999 / 999</div>
              <div class="mana font-lol">99 / 99</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Champion from './Champion'
export default Champion
</script>

<style lang="scss" src="./Champion.scss" scoped></style>
