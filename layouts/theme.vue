<template>
  <div id="background" :class="'relative min-h-screen ' + theme.colors.main">
    <Header id="header"/>
    <nuxt/><!--<Section />-->
    <div class="p-8">
      <h1 id="heading">Heading</h1>
      <p id="primary">This is a paragraph. You can assign a color to it.</p>
      <nuxt-link id="link" to="/">This is a link</nuxt-link>
    </div>
    <Footer id="footer"/>
    <ScrollTop/>
  </div>
</template>

<script>
import Header from '@/components/parts/Header'
import Section from '@/components/parts/Section'
import Footer from '@/components/parts/Footer'
import ScrollTop from '@/components/ui/ScrollTop'
import { mapState } from 'vuex'

export default {
  middleware: 'load-initial-data',
  name: 'NuxpressoLayout',
  data:()=>({
      currentTheme : null
  }),
  computed:{
    ...mapState ( [ 'settings','theme','menus','widgets','categories','nuxpresso','theme_preview']),
  },
  watch:{
      theme_preview(v){
          v ? this.currentTheme = v : this.theme
      }
  },
  components: {
      Header, Section , Footer , ScrollTop 
  },

  mounted(){
      this.currentTheme = this.theme
  }
  
}

</script>
