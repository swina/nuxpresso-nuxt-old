<template>
    <div v-if="$route.path!='/'">
        <nuxt-link 
            v-for="(item,i) in breadcrumb"
            :to="item.link"
            :key="'bc_' + i"
            :class="classe">
            {{ item.name }}
        </nuxt-link>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'NuxpressoBreadcrumb',
    computed:{
        ...mapState ( ['theme','layout'] ),
        classe(){
            if ( this.theme.link_fg )
            return this.$colorClass ( 'text' , this.theme.link_fg.color , this.theme.link_fg.density ) + ' ' + this.theme.link_fg.css + ' capitalize'
            return 'capitalize'
        },
        breadcrumb(){
            let bc = this.$route.fullPath.split('/')
            let p = '' , name
            let arr =  bc.map ( m => {
                m ? name = ' - ' : name = 'home '
                p += m + '/' 
                name += m.split('-').join(' ')
                return p.slice(0,-1) ? 
                    { link : p.slice(0,-1) , name : name }
                    :
                    { link : '/' , name : name }
            })
            return arr 
        }
    }
}
</script>