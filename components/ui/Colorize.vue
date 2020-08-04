<template>
    <div>
        <transition name="slidedown">
            
        <div class="w-1/3 flex flex-col fixed bottom-0 h-screen bg-gray-100 border-l right-0 ">
            <div class="ml-2 text-black font-bold">Colorize</div>
            <i class="material-icons absolute top-0 right-0" title="Restore original theme">restore</i>
            <div v-if="customize" class="w-full p-2 flex flex-row flex-wrap text-black">
            
            

            <div class="w-full flex flex-col">
                <div :key="t" :class="'w-fulltext-center text-xs flex flex-row flex-shrink p-2 cursor-pointer '" v-for="(t,i) in keys"> 
                    <div class="w-full flex flex-col" :id="'row_' + t">
                        <div class="w-full flex flex-row items-center">
                            <div class="capitalize w-1/3">{{ t.split('_').join(' ') }}</div>
                            
                            
                            <div :class="$colorClass('bg' , theme[t].color , theme[t].density) +' text-center border-2 h-6 w-6 p-1 rounded mr-2 text-xs ' + border(t)" @click="show=true,select(t)" :title="t + ' color'">
                                <!--<i class="material-icons">format_paint</i>-->
                            </div>
                            <div class="w-32">{{theme[t].color}} {{theme[t].density}}</div>
                            <div class="w-10"><button :class="'text-xs px-1 py-0 ' + hasCSS(theme[t].css)" @click="currentCSS=t">CSS</button></div>
                        </div>
                        <div><input type="text" v-if="currentCSS==t" class="bg-gray-200 mt-1 w-full p-1" v-model="theme[t].css"/></div>
                    </div>
                   
                </div>
                <div>
                    Create new Theme
                    <input type="text" v-model="newThemeName" placeholder="new theme name"/>
                    <button @click="createTheme">Create</button>
                </div>
            </div>

            <div class="absolute top-0 left-0 mx-2 shadow" :style="'margin-top:' + (parseInt(position) + 35) + 'px;'">
                <transition name="fade">
                    <div v-if="show" class="bg-gray-200 p-4 border shadow">
                        <i class="material-icons absolute top-0 right-0" @click="show=!show">close</i>
                        <div class="flex flex-row mb-2">
                            <div class="border border-black w-4 h-4 mr-2 bg-transparent" @click="show=!show,setColor('transparent','')" title="transparent"></div>
                            <div class="border border-black w-4 h-4 mr-2 bg-white" @click="show=!show,setColor('white','')" title="white"></div>
                            <div class="border border-black w-4 h-4 mr-2 bg-black" @click="show=!show,setColor('black','')" title="black"></div>
                        </div>
                        <div v-for="(colore,c) in colors">
                            <div :key="'color_' + c" class="flex flex-row mb-2">
                                <div 
                                    :key="density + '_' + colore + '_' + t" 
                                    v-for="(tone,t) in Object.keys(density)" 
                                    v-if="colore!='transparent' && colore!='white' && colore != 'black'" 
                                    :class="$colorClass('bg' , colore , tone) + ' border border-black w-4 h-4 mr-2'" @click="setColor(colore,tone),show=false">
                                </div>
                            </div>            
                        </div>
                    </div>
                </transition>    
            
            </div>

        </div>
        
        <div v-if="code" class="fixed w-1/4 bg-white text-black p-2 right-0 top-0 overflow-auto z-10">
            
            <textarea class="text-xs h-64 p-1 w-full">
                {{allColors()}}
                <!--{{createCSS()}}-->
            </textarea>
            Copy and paste in <code>./assets/css/base.css</code> 

        </div>

    </div>
    </transition>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'NuxpressoColorize',
    data:()=>({
        customize: true,
        code: false,
        show: false,
        selected: null,
        current: null,
        currentCSS: null,
        color: 'gray',
        tone: '500',
        colors: [ 'transparent' , 'white' , 'black' , 'gray' , 'red', 'orange' , 'yellow' , 'green' , 'teal' , 'blue' , 'indigo' , 'purple' , 'pink' ],
        density: {
            extralight : 100 ,
            verylight : 200 ,
            mediumlight: 300 ,
            light: 400 ,
            normal: 500 ,
            mediumdark: 600 ,
            dark: 700 ,
            verydark: 800 ,
            extradark: 900 
        },
        keys: [ 'primary_color' , 'background_color' , 'header_background' , 'header_color' , 'footer_color' , 'footer_background' , 'heading_color' , 'link_color' , 'menu_color' ],
        current_layout: null,
        colorSetting : '',
        themeColors: {},
        position:0,
        newThemeName: 'New Theme',
        newTheme: null
    }),
    computed:{
        ...mapState ( [ 'nuxpresso' , 'theme' , 'layout' ] ),
        
    },
    watch: {
        colorSetting(v){
            if ( this.current.split('-')[1] === 'background' ){
                this.themeColors[ this.current.split('-')[0] ].background = 'bg-' + v
            } else {
                if ( this.current.split('-')[1] === 'text' ){
                    this.themeColors[ this.current.split('-')[0] ].text = 'text-' + v
                }
                if ( this.current.split('-')[1] === 'hover' ){
                    this.themeColors[ this.current.split('-')[0] ].hover = 'text-' + v
                }
            }
        }
    },
    methods:{
        setColor ( color , tone ){
            
            this.theme[this.current] = {
                color: color,
                density: tone,
                css : this.theme[this.current].css
            }
        },
        hasCSS ( css ){
            return css ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
        },
        createTheme(){
            this.newTheme = this.theme
            this.newTheme.name = this.newThemeName
            delete this.newTheme.id
            delete this.newTheme.created_at
            delete this.newTheme.updated_at
            this.$axios.$post ( 'themes' , this.newTheme ).then ( response => {
                console.log ( response )
            })
        },
        allColors(){
            let els = document.querySelectorAll('.square')
        },
        createCSS(){
            let css =  Object.keys(this.themeColors).map ( key => {
                let namespace = '.nuxpresso-color-' + key
                if ( key === 'menu' ){
                    namespace += ' > span > a'
                }
                if ( key === 'heading' ){
                    namespace = 'h1 , h2 , h3 , h4 , h5 , h6'
                }
                let stringa = namespace +  ' { \n @apply ' + this.themeColors[key].background + ' ' + this.themeColors[key].text + ';\n}' + '\n'
                stringa += namespace + ':hover { \n @apply ' + this.themeColors[key].hover + ';\n}' + '\n'
                return stringa
            })
            return css.join(' ')
        },
        createClass ( colore , tone ){
            tone ?
                this.colorSetting = colore + '-' + parseInt(tone)*100
                :
                    this.colorSetting = colore
        },
        /*
        boxColor(color,tone){
            if ( color === 'transparent' || color === 'white' || color === 'black' ){
                return color
            } else {
                return color + '-' + parseInt(tone)*100            
            }
        },
         colorTone(color){
            if ( color === 'transparent' || color === 'white' || color === 'black' ){
                return ''
            } else {
                return '-' + this.tone
            }
        },
        getTone ( tone ){
            return this.density[tone]
        },
        */
        select(el){
            let row = document.getElementById('row_' + el )
            this.position = row.offsetTop
            this.current = el
        },
        border(el){
            return this.current === el ? 'border-red-500' : ''
        },
        /*
        changeColor(){
            this.current_layout[this.current] = {
                color: this.color,
                density: this.tone
            }
        },

        preview(item){
            if ( this.current ){
                let el = document.getElementById(this.current.split('-')[0])
                let classi = el.classList
                let new_class = classi.value.split(' ').map ( c => {
                    if ( c.indexOf('bg-') < 0 && c.indexOf('text-') < 0){
                        return c
                    }
                })
                new_class.push ( this.themeColors[this.current.split('-')[0]].background  , this.themeColors[this.current.split('-')[0]].text , 'hover:' + this.themeColors[this.current.split('-')[0]].hover ) 
                el.classList = new_class.join(' ')
                this.customize = !this.customize
            }
        }
        */
        //this.layout = this.nuxpresso.json.theme.layout
    },
    mounted(){
        //this.current_layout = this.layout
        /*this.keys.map ( key => {
            let obj = {}
            this.themeColors[key] = {
                background: 'bg-' + this.boxColor ( this.layout[key].color , parseInt(this.getTone( this.layout[key].density ))/100 ) ,
                text: 'text-black',
                hover: 'text-black'
            }
        })
        */
    }

}
</script>