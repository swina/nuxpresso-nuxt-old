<template>
    <div class="w-full absolute top-0 left-0 px-24 z-20">
        <div class="bg-white p-0 flex flex-col absolute shadow-lg w-full md:w-1/4" v-if="show" @click="show=!show,$emit('leave')" :style="position()" @mouseleave="$emit('leave')">
            
            <div class="text-xl border-b mb-2" v-if="!$attrs.coords">{{$attrs.name}}</div>

            <nuxt-link 
                
                :key="'menu_' + i"
                v-if="toLink(item)"
                v-for="(item,i) in $attrs.items"
                :to="toLink(item)"
                :class="$colorClass('text',theme.primary_color.color,theme.primary_color.density) + ' px-4 py-2 hover:bg-gray-400'">
                {{ item.name }}
            </nuxt-link>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'NuxpressoMegamenu',
    data:()=>({
        show: true
    }),
    computed: {
        ...mapState ( ['theme'] ),
    },
    methods:{
        position(){
            if ( this.$attrs.coords ){
                return 'transform: translateX(-50%);left:' + (parseInt(this.$attrs.coords[0])) + 'px;top:' + (parseInt(this.$attrs.coords[1]) + 15) + 'px;'
            }
            let el = [ ...document.getElementsByTagName('section') ]
            return 'top:' + ( el[0].offsetTop - 20 )+ 'px;'
        },
        toLink ( item ){
            return item.article ? '/articles/' + item.article.slug 
                : item.category ? '/categories/' + item.category.slug 
                    : '#'
        }
    }
}
</script>