<template>
    <section :class="classe + ' nuxpresso-section'">
        <Breadcrumb class="text-xs p-2"/>
        <nuxt/>
    </section>
</template>

<script>
import Breadcrumb from '@/components/widgets/Breadcrumb'
import { mapState } from 'vuex'
export default {
    name: 'NuxpressoSection',
    data:()=>({
        //theme: null,
        //sidebar: false
    }),
    components: { Breadcrumb  },
    computed: {
        ...mapState ( ['theme'] ),
        classe(){
            let classe = this.theme.main_bg ? this.$colorClass( 'bg' , this.theme.main_bg.color , this.theme.main_bg.density ) + ' ' + this.theme.main_bg.css : ''
            classe += this.theme.main_fg ?   + ' ' + this.$colorClass ( 'text' , this.theme.primary_fg.color , this.theme.primary_fg.density ) + ' ' + this.theme.primary_fg.css : ''
            return classe
            //let classe = this.layout.background.css ? this.layout.background.css + ' ' : 'bg-white '
            //classe += this.layout.primary.css ? this.layout.primary.css : ' text-black'
            //return classe
        },
        breadcrumb (){
            return this.$route.path != '/' ? this.$route.fullPath.split('/').join(' - ').toUpperCase() : ''
        },


        wrapperClass(){
            let position = ''
            this.theme.sidebar ? this.theme.sidebar.type === 'left' ? position = 'flex-row-reverse ' : '' : ''
            return this.$route.path != '/' ? 
                this.theme.sidebar ? 
                    position + 'w-full flex flex-row flex-grow flex-wrap' 
                        : '' 
                            : ''
        },
        sectionClass(){
            return this.$route.path != '/' ? this.theme.sidebar ? 'flex flex-col w-full md:w-3/4' : '' : ''
        }
    },
    /*
    mounted(){
        this.sidebar = this.$store.state.theme.sidebar
        this.theme = this.$store.state.theme.main
    }
    */
}
</script>