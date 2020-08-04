<template>
    <div class="w-full">
        <widget v-if="$attrs.shortcode.indexOf('widget') > -1" :id="shortcode"/>
        <SimpleMenu :classe="$attrs.classe" v-if="$attrs.shortcode.indexOf('nuxpresso-menu') > -1" :menu="menu"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Widget from '@/components/widgets/Widget'
import SimpleMenu from '@/components/widgets/SimpleMenu'

export default {
    name: 'NuxpressoShortcode',
    components: { Widget , SimpleMenu },
    computed:{
        ...mapState ( ['widgets' , 'menus'] ),
        shortcode(){
            if ( this.$attrs.shortcode.indexOf ( 'nuxpresso-widget' ) > -1 ) {
                let id =  this.$attrs.shortcode.split('[[nuxpresso-widget id=')[1]
                return id.split(']]')[0]
            }
            if ( this.$attrs.shortcode.indexOf ( 'menu' ) > -1 ) {
                let id =  this.$attrs.shortcode.split('[[nuxpresso-menu id=')[1]
                return id.split(']]')[0]
            }
        },
        menu(){
            let menu = this.menus.filter ( m => { return m.id === this.shortcode })
            return menu[0]
        }
    },
    
}
</script>