<template>
    <nuxpresso-switch style="transform:scale(.6)" label="Dark mode" @click="darkmode"/>
</template>
<script>
import NuxpressoSwitch from '@/components/ui/Switch'
import { mapState } from 'vuex'
export default {
    name: 'NuxpressoDarkMode',
    components: { NuxpressoSwitch },
    computed: {
        ...mapState ( ['settings','theme','layout'] )
    },
    methods: {
        darkmode(v){
            let theme = this.theme
            let settings = this.settings.darkmode_settings
            if ( v ){
                
                theme.header_bg = settings.header_bg ? settings.header_bg : theme.header_bg
                theme.primary_fg = settings.primary_fg ? settings.primary_fg : theme.primary_fg
                theme.main_bg = settings.main_bg ? settings.main_bg : theme.main_bg
                theme.link_fg = settings.link_fg ? settings.link_fg : theme.link
                theme.menu_fg = settings.menu_fg ? settings.menu_fg : theme.menu_fg
                theme.footer_fg = settings.footer_fg ? settings.footer_fg : theme.footer_fg
                theme.footer_bg = settings.footer_bg ? settings.footer_bg : theme.footer_bg
                //console.log ( theme )
                
                this.$store.dispatch ( 'darkTheme' , theme )
            } else {
                //this.$store.dispatch ( 'loadLayout' )
                this.$store.dispatch ( 'reloadTheme' , this.settings.current_theme.id  )
            }
        }
    }
}
</script>