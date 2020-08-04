<template>
    <div>
        <div class="hidden lg:block absolute top-0 left-0 p-1 text-white cursor-pointer" v-if="!show" @click="show=!show"><i class="material-icons rounded-full text-white bg-black">build</i></div>
        <div v-else class="fixed top-0 left-0 w-full h-8 flex flex-row bg-gray-700 text-gray-300 items-center text-xs font-weight-lighter cursor-pointer">

            <i class="material-icons" @click="show=!show">chevron_left</i>
            <span class="font-bold mr-1" @click="show=!show">nuxpresso DevTools </span> | 
            <div class="nxp-info" @click="getInfo('settings'),setup=!setup"><i class="material-icons">settings</i></div> | 
            <div class="nxp-info">Theme: 
                <select v-model="selectedTheme.id" class="text-black p-0" @change="loadTheme">
                    <option v-for="(item,n) in themes" :key="'theme_' + n" :value="item.id" :selected="parseInt(item.id)==parseInt(settings.current_theme.theme.id)">{{item.name}}</option>
                </select>
            </div> | 
            <div class="nxp-info flex items-center" @click="colorize=!colorize">Colorize <i class="material-icons">colorize</i></div> | 
            <div class="nxp-info" @click="getInfo('template'),detail=!detail">Template: <span v-if="$store.getters.template">{{$store.getters.template.name}}</span></div>
            <div class="nxp-info" @click="getInfo('widgets'),detail=!detail">Widgets: <span>{{widgets.length}}</span></div>
            <div class="nxp-info" @click="getInfo('menus'),detail=!detail">Menu: <span>{{menus.length}}</span></div>
            <div class="nxp-info" @click="getMeta(),detail=!detail"> | <span>SEO</span> </div>
            <div class="nxp-info" @click="getNuxpressoCSS(),detail=!detail"> | <span>CSS</span> </div>
            <transition name="fade">
                <div v-if="detail" class="overflow-auto fixed border-l-2 h-screen top-0 mt-8 right-0 w-1/4 bg-white text-black flex flex-col p-4">
                    <div class="capitalize text-2xl">{{title}} <i class="material-icons absolute top-0 right-0" @click="detail=!detail">highlight_off</i></div>
                    <textarea  v-if="!selectTheme && infoDetail" class="h-screen w-full bg-gray-200 text-xs">{{infoDetail}}</textarea>
                    <div v-if="nuxpressoClasses" v-for="nxpclass in nuxpressoClasses">
                        <div @click="mark(nxpclass)">{{ nxpclass }}</div>
                    </div>
                    <div v-if="nuxpressoClassList" class="border mt-2 bg-gray-100">
                        Classes<br/>
                        <div v-html="nuxpressoClassList"></div>
                    </div>
                    <div v-if="selectTheme">
                        <select v-model="selectedTheme">
                            <option v-for="(item,n) in themes" :key="'theme_' + n" :value="item.id" :selected="parseInt(item.id)==parseInt(settings.layout.id)">{{item.name}}</option>
                        </select><button @click="loadTheme">Preview</button>
                    </div>
                </div> 
            </transition>
            <transition name="fade">
                <Colorize v-if="colorize"/>
                 <div v-if="setup" class="fixed border-l-2 h-screen top-0 mt-8 right-0 w-full bg-white text-black flex flex-col p-4">
                    <Settings/>
                 </div>
            </transition>
        </div>
    </div>
</template>

<script>
import Colorize from '@/components/ui/Colorize'
import Settings from '@/components/ui/Settings'

import { mapState } from 'vuex'
export default {
    name: 'NuxpressoDevTools',
    data:()=>({
        show: false,
        detail: false,
        setup: false,
        infoDetail: null,
        colorize: false,
        selectTheme: null ,
        title: '',
        nuxpressoClasses: null,
        nuxpressoClassList: ''
    }),
    components:{
        Colorize , Settings
    },
    computed: {
        ...mapState ( ['settings','current_template','widgets','menus','theme','themes','layout'] ),
        selectedTheme(){
            return {
                id: this.settings.current_theme.theme.id
            }
        },
       
    },
    methods:{
        getInfo(what){
            this.infoDetail = ''
            this.title = what
            
            if ( what === 'template' )
                this.infoDetail = this.current_template

            if ( what === 'settings' && this.settings )
                this.infoDetail = this.settings

            if ( what === 'widgets' )
                this.infoDetail = this.widgets

            if ( what === 'menus' )
                this.infoDetail = this.menus

        },
        isCurrentTheme(id){
            return this.settings.layout.id === id ? 'selected' : ''
        },
        getMeta() {
            this.title = 'SEO'
            let title = [...document.getElementsByTagName('title')][0].outerHTML
            let metas = [...document.getElementsByTagName('meta')]
            let arr = metas.map ( meta => {
                return meta.outerHTML
            })
            let heading = [...document.getElementsByTagName('h1')]
            let links = [...document.getElementsByTagName('link')]
            this.infoDetail = 'Title: \n' + title + '\n\nMeta:\n' + arr.join('\n') + '\n\nH1\n' + heading.map ( h => { return h.outerHTML } ).join('\n') + '\n\nLinks:\n' + links.map ( h => { if ( h.rel != 'preload' ){ return h.outerHTML } } ).join('\n') 
        },
         getNuxpressoCSS(){
            this.title = 'Nuxpresso Classes'
            this.infoDetail = ''
            let els = document.querySelectorAll('div[class*="nuxpresso-"]')
            let classes = [ ...els ].map ( el => {
                return [ ...el.classList ].filter ( cl => {
                    return cl.indexOf('nuxpresso') > -1 
                })

            })

            let uniq = [ new Set( classes.join(',').split(',') )]
            this.nuxpressoClasses = [...uniq[0]]  
        },
        mark(classe){
            this.nuxpressoClassList = ''
            let selected = [ ...document.querySelectorAll('.npx-current') ]
            if ( selected ){
                selected.forEach ( el => {
                    el.classList = [ ...el.classList].join(' ').replace('npx-current border-2 border-red-500','')
                })
            }
            let els = [ ...document.querySelectorAll('.' + classe ) ]
            els.forEach ( el => {
                this.nuxpressoClassList += [ ...el.classList].join('<br/>')
                el.classList = el.classList + ' npx-current border-2 border-red-500'
            })
        },
        spread(arr){
            let sp =  arr.map ( a => { 
                let o = { ...a }
                let obj = Object.keys(o).map ( key => { 
                    return key + ':<strong>' + o[key] + '</strong>'
                })
                //console.log ( obj.join('<br/>') )
                return obj.join('<br/>')
            } )
        },
        restoreTheme(){
            this.$store.dispatch ( 'reloadTheme' , this.settings.theme  )
        },
        loadTheme(){
            let settings = this.settings
            settings.current_theme.theme.id = this.selectedTheme.id
            //settings.layout.id = this.selectedTheme
            this.$store.dispatch ( 'changeTheme' , this.selectedTheme.id )
            this.$store.dispatch ( 'changeSettings' , settings )
            this.show = false
        }
    }
}
</script>

<style scoped>
    .nxp-info {
        margin: 0 .4rem 0 .4rem;
    }
    .nxp-info > span {
        font-weight: 700; 
        color: #46cccc;
    }
    .npx-selected {
        border:2px solid red;
    }
</style>