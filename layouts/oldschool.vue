<template>
  <div>
    <div v-if="theme" class="relative min-h-screen">
        <div class="flex flex-col lg:flex-row">
            <Header class="w-full lg:w-1/4" flex="flex-col"/>
            <div class="flex flex-col lg:w-3/4">
                <Section id="section"/>
                <Footer/>
            </div>
        </div>
        <ScrollTop/>
        <component :is="devtools" :component="devtools"/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/parts/Header'
import Section from '@/components/parts/Section'
import Footer from '@/components/parts/Footer'
import ScrollTop from '@/components/ui/ScrollTop'
import { mapState } from 'vuex'
import DevTools from '@/components/ui/DevTools'

export default {
  middleware: 'load-initial-data',
  name: 'NuxpressoLayout',
  data:()=>({
    devtools: null
  }),
  computed:{
    ...mapState ( [ 'settings','menus','widgets','categories','theme']),
  },
  components: {
      Header, Section , Footer , ScrollTop , DevTools
  },
  mounted(){
    const isDev = process.env.NODE_ENV !== 'production'
    if ( isDev ){
      this.devtools = () =>  import(/* webpackChunkName: 'nuxpresso_' */ '~/components/ui/DevTools') 
    }
  }
 
}

</script>
