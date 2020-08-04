<template>
    <div v-if="menu" :class="$attrs.classe">
        <nuxt-link
            :key="'menu_' + item.name" 
            v-if="!item.link_url"
            v-for="(item,i) in items"
            :to="toLink(item)"
            :class="$colorClass('text',theme.menu_color.color,theme.menu_color.density) + ' ' + theme.menu_color.css">
            <span :class="item.class">{{ item.name }}</span>
        </nuxt-link>
        <a :href="item.link_url" v-for="item in items" v-if="item.link_url" :class="$colorClass('text',theme.menu_color.color,theme.menu_color.density) + ' ' + theme.menu_color.css + ' ' + item.class">{{item.name}}</a>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'NuxpressoSimpleMenu',
    computed:{
        ...mapState ( ['menus','theme'] ),
        menu(){
            return this.$attrs.menu[0]
        },
        items(){
            return this.$attrs.menu[0].items ? this.$attrs.menu[0].items : this.$attrs.menu
        },
        
    },
    methods: {
        toLink ( item ){
            return item.article ? '/articles/' + item.article.slug 
                : item.category ? '/categories/' + item.category.slug 
                    : '#'
        },
        classe(item){
            return item.class ? item.class : ''
        }
    }
}
</script>