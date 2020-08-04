<template>
    <div :class="display">
        <div v-for="(item,i) in $attrs.social" :key="'social_' + i">
            <a :href="item.url" :class="'capitalize flex flex-row nuxpresso-social mb-1 mr-2 '"><span v-html="item.icon.svg" style="width:24px;height:24px;" class="nuxpresso-social-icon"></span><span v-if="$attrs.titles">{{ item.name }}</span></a>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'NuxpressoSocial',
    computed: {
        ...mapState ( ['theme'] ),
        classe(){
            return this.$colorClass ( 'text' , this.theme.menu_color.color , this.theme.menu_color.density )
        },
        display(){
            return this.$attrs.orientation ? 'flex flex-col' : 'flex flex-row'
        },
        svgBackground(){
            return this.$colorClass ( 'bg' , this.theme.footer_background.color , this.theme.footer_background.density )
        }
    },
    
}
</script>