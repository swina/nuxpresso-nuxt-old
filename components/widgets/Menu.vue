<template>
    <div>
        
        <!--<span class="lg:hidden absolute top-0 right-0 mr-2 m-2" @click="desktop=!desktop"><i :class="'material-icons ' + classe">menu</i></span>-->
        <transition name="slidedown">

        <div class="hidden lg:block flex flex-col lg:flex-row">
            
            <nuxt-link 
                :key="'menu_' + i"
                v-if="getLinkTo(item)"
                v-for="(item,i) in menu"
                :to="getLinkTo(item)"
                :class="$colorClass('text',theme.menu_color.color,theme.menu_color.density) + ' ' + theme.menu_color.css">
                <span class="mx-1" @mouseover="item.megamenu ? megamenu(item.megamenu.items,item.name,$event) : megamenuShow=false">{{ item.name }}</span>
            </nuxt-link>
            
        </div>
        </transition>
        <transition name="slidedown">

        <div v-if="!desktop" :class="'p-2 relative  w-full z-10 text-center'" @click="desktop=!desktop">
            <div class="flex flex-col text-center w-full nuxpresso-menu-mobile">
                <nuxt-link
                    v-if="item.article"
                    v-for="(item,i) in menu"
                    :key="'mmenu_' + i"
                    :title="item.name.toUpperCase()" 
                    :to="{ name: 'articles-slug' , params: { slug:  item.article.slug }}"
                    :class="itemClasse">{{ item.name }}
                </nuxt-link>
                <nuxt-link
                    v-if="item.category"
                    v-for="(item,i) in menu"
                    :key="'menu_' + i"
                    :title="item.name.toUpperCase()" 
                    :to="{ name: 'categories-slug' , params: { slug:  item.category.slug }}"
                    :class="itemClasse">{{ item.name }}
                </nuxt-link>
            </div>
        </div>
        </transition>
        <transition name="fade">
            <MegaMenu v-if="megamenuShow" :coords="coords" :name="megamenuName" :items="megamenuItems" @leave="megamenuShow=false"/>
        </transition>


    </div>
</template>

<script>
import MegaMenu from '@/components/widgets/MegaMenu'
import { mapState } from 'vuex'

export default {
    name: 'NuxpressoLink',
    data:()=>({
        desktop: true,
        menu: null,
        megamenuShow: null,
        megamenuItems: null,
        megamenuName: '',
        coords: []
    }),
    components: { MegaMenu },
    computed:{
        ...mapState ( [ 'menus' , 'layout' , 'theme' ] ),
        classe(){
            return this.layout.menu.css ? this.layout.menu.css : 'text-' + this.layout.link.color
        },
        itemClasse(){
            let classe = this.layout.menu.css ? this.layout.menu.css : 'text-' + this.layout.menu.color
            //console.log ( classe + ' p-2 w-full text-sm uppercase border-transparent border-b-2 nav-primary-item')
            return classe + ' p-2 w-full capitalize border-transparent border-b-2 nav-primary-item ' 
        }
    },
    methods:{
        getLinkTo(item){
            return item.article ?
                        '/articles/' + item.article.slug :
                            item.category ? '/categories/' + item.category.slug :
                                item.link_url ? item.link_url : false
        },
        megamenu(items,name,event){
            if ( !this.megamenuShow && this.megamenuName != 'name' ){
                this.coords = [ event.clientX , event.clientY]
                this.megamenuName = name
                this.megamenuItems = items
                this.megamenuShow = true
            }
        },
        loadMenu(){
            let _menu = this.menus.filter ( menu => {
            //let _menu = this.$store.state.menus.filter ( menu => {
                return menu.type === this.$attrs.type
            })
            this.menu = _menu[0].items
        }
    },
    mounted(){
        this.loadMenu()
    }

}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>