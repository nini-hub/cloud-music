<template>
  <div class="recommend">
    <div class="recommend-warpper">
      <ScrollView>
        <div>
          <Banner :banners="banners"></Banner>
          <Personalized :personalized="personalized" :title="'推荐歌单'" @select="fatherSelectItem" :type="'personalized'"></Personalized>
          <Personalized :personalized="newAlbum" :title="'最新专辑'" @select="fatherSelectItem" :type="'newAlbum'"></Personalized>
          <Songlist :songs="songs"></Songlist>
        </div>
      </ScrollView>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getBanner, getPersonalized, getNewAlbum, getNewSong } from '../api/index'
import Banner from '../components/Recommend/Banner'
import Personalized from '../components/Recommend/Personalized'
import Songlist from '../components/Recommend/Songlist'
import ScrollView from '../components/ScrollView'
import MetaInfo from '../../vue-meta-info'
export default {
  name: 'Recommend',
  MetaInfo: MetaInfo.recommend,
  components: {
    Banner,
    Personalized,
    Songlist,
    ScrollView
  },
  data () {
    return {
      banners: [],
      personalized: [],
      newAlbum: [],
      songs: []
    }
  },
  methods: {
    fatherSelectItem (id, type) {
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      })
    }
  },
  created () {
    getBanner().then((data) => {
      this.banners = data.banners
    }).catch(function (error) {
      console.log(error)
    })

    getPersonalized().then((data) => {
      this.personalized = data.result
    }).catch(function (error) {
      console.log(error)
    })

    getNewAlbum().then((data) => {
      this.newAlbum = data.albums.splice(0, 6)
    }).catch(function (error) {
      console.log(error)
    })

    getNewSong().then((data) => {
      const list = []
      data.result.forEach((value) => {
        const obj = {}
        obj.id = value.id
        obj.name = value.name
        obj.picUrl = value.song.album.picUrl
        let singer = ''
        for (let i = 0; i < value.song.artists.length; i++) {
          if (i === 0) {
            singer = value.song.artists[i].name
          } else {
            singer += '-' + value.song.artists[i].name
          }
        }
        obj.singer = singer
        list.push(obj)
      })
      this.songs = list
    }).catch(function (error) {
      console.log(error)
    })
  }
}
</script>

<style lang="scss" scoped>
.recommend{
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  /*overflow: hidden;*/
  .recommend-warpper{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}

.v-enter{
  transform: translateX(100%);
}
.v-enter-to{
  transform: translateX(0%);
}
.v-enter-active{
  transition: transform 1s;
}
.v-leave{
  transform: translateX(0%);
}
.v-leave-to{
  transform: translateX(100%);
}
.v-leave-active{
  transition: transform 1s;
}
</style>
