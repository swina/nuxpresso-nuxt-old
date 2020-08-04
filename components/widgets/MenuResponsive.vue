<template>
    <div>
        <span class="lg:hidden absolute top-0 right-0 mr-2 m-2 cursor-pointer" v-if="menu.mobile" @click="mobile=!mobile">
            <nuxpresso-icon :class="classe" icon="menu"/>
            <!--<i :class="'material-icons ' + classe + ' border-0'">menu</i>-->
        </span>

        <div :class="orientation">
            <MenuLink v-for="(item,i) in menu.items" :item="item" :key="'menu_' + i" :classe="classe" @over="submenu"/>
        </div>
        
        <transition name="slidedown" v-if="mobile">
            <div class="flex flex-col mt-4 text-center" @click="mobile=!mobile">
                <nuxt-link
                    v-for="(item,i) in menu.items"
                    :key="'mmenu_' + i"
                    :to="linkTo(item)"
                    :class="classe">
                {{ item.name }}
                </nuxt-link>
                <a  
                    v-if="item.link_url" 
                    v-for="(item,n) in menu.items" 
                    :key="'mmenulink_' + n" 
                    :href="item.link_url" 
                    :class="classe">
                {{ item.name }}
                </a>
            </div>
        </transition>
        <transition name="fade">
            <MenuDropDown v-if="dropdown" :dropdown="dropdown" @leave="dropdown=null"/>
        </transition>
    </div>
</template>

<script>
import MenuLink from '@/components/widgets/MenuLink'
import MenuDropDown from '@/components/widgets/MenuDropDown'
import { mapState } from 'vuex'

export default {
    name: 'NuxpMenuResponsive',
    data:()=>({
        mobile: false,
        dropdown: null, 
        dropdownName : '',
        dropdownItems : null,
        coords: []
    }),
    components : {
        MenuLink, MenuDropDown
    },
    computed:{
        ...mapState ( ['menus','theme'] ),
        classe(){
            console.log ( this.menu.text_color , this.menu.css )
            let hasClass = this.menu.text_color ? this.$colorClass ( 'text' , this.menu.text_color.color , this.menu.text_color.density ) : ''
            hasClass += this.menu.css ? ' ' + this.menu.css : ' '
            return hasClass ? hasClass :
            this.$colorClass('text' , this.theme.menu_fg.color , this.theme.menu_fg.density)
        },
        orientation(){
            let classe 
                let mobile = this.menu.mobile ? 'hidden lg:flex' : 'flex' 
                classe = this.menu.orientation === 'horizontal' ? 
                    mobile + ' flex-row justify-around' : 'flex flex-col'
                //classe = this.$attrs.orientation === 'vertical' ?
                //    mobile + ' flex-col' : 'flex flex-col lg:flex-row'
            return classe
        },
        menu(){
            return this.menus.filter ( m => parseInt(m.id) === parseInt(this.$attrs.id) )[0]
        }
    },
    methods:{
        linkTo ( item ){
            return item.article ?
                        '/articles/' + item.article.slug :
                            item.category ? '/categories/' + item.category.slug :
                                item.link_url ? item.link_url : false
        },
        submenu ( event , item ) {
            this.dropdown = null
                    if ( item.submenu && !this.dropdown ){
                        let smenu =  this.menus.filter ( m => { return m.id === item.submenu.id })
                        this.dropdown = {
                            menu: smenu[0],
                            active: true,
                            name: item.name,
                            items: item.submenu.items,
                            coords: [ document.getElementById ( 'link_' + item.name ).offsetLeft  , event.clientY]
                        }
                    }
        },
    }
}
</script>