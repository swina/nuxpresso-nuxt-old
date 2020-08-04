<template>
  <div>
    <div v-if="theme" :class="'relative min-h-screen '">
      
      <Header/>
      <Section id="section"/>
      
      <Footer/>
      
      <ScrollTop/>
      
      <!--
      
      <component :is="devtools" :component="devtools"/>
      -->
    </div>
    <Startup v-if="startup"/>
  </div>
</template>

<script>
import Header from '@/components/parts/Header'
import Section from '@/components/parts/Section'
import Footer from '@/components/parts/Footer'
import ScrollTop from '@/components/ui/ScrollTop'
import { mapState } from 'vuex'
import DevTools from '@/components/ui/DevTools'
import Startup from '@/components/parts/Startup'

export default {
  middleware: 'load-initial-data',
  name: 'NuxpressoLayout',
  data:()=>({
    devtools: null,
    startup: null
  }),
  computed:{
    ...mapState ( [ 'settings','menus','widgets','categories','theme']),
    
  },
  components: {
      Header, Section , Footer , ScrollTop , DevTools , Startup
  },
  mounted(){
    const isDev = process.env.NODE_ENV !== 'production'
    //if ( isDev ){
    //  this.devtools = () =>  import(/* webpackChunkName: 'nuxpresso_' */ '~/components/ui/DevTools') 
    //}
    console.log ( this.theme )
    if ( typeof this.theme === 'undefined'  || !this.settings  ){
      if ( isDev ){
        this.startup = true
      }
    }
    
  }
 
}

</script>
