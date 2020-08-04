<template>
<div>
    <div v-if="$attrs.slides && slide && height" id="nxslider" :class="'h-screen relative md:h-auto w-full flex items-center bg-center bg-no-repeat bg-cover slide-in nuxpresso-slider ani ' + currentBackground" :style="'min-height:' + height +  currentImg">
        <div style="top:50%;left:50%;transform:translate(-50%,-50%)" :class="'w-4/5 md:m-0 md:w-3/4 lg:w-4/5 absolute p-2 md:p-10 ' + boxCss">
            <div :class="'w-full flex flex-col-reverse md:flex-row flex-shrink flex-wrap ' + justify">
                <div>
                    <h2 :class="classe('text','heading_fg') + ' ' + sliderClass('title')">{{slide.title}}</h2>
                    <h3 :class="classe('text','heading_fg') + ' ' + sliderClass('subtitle')">{{slide.subtitle}}</h3>
                    <p v-if="slide.description" :class="classe('text','primary_fg') + ' ' + sliderClass('description')">{{slide.description}}</p>
                    <div class="mt-4" v-if="slide.button">
                        <nuxt-link
                            :to="slide.button_link">
                        <button :class="sliderClass('button')">{{slide.button}}</button>
                        </nuxt-link>
                    </div>
                </div>
                
                <div v-if="slide.image_for_description" :class="'flex items-center justify-center ' + sliderClass('image-wrapper')">
                    <img :src="slide.image_for_description.url" :class="sliderClass('image')"/>
                </div>
            </div>
            
        </div>
        <div style="top:50%;transform:translateY(-50%)" class="p-2 absolute">
            <i class="material-icons text-5xl text-white cursor-pointer" @click="prev">
                <span  v-if="$attrs.slider.navigator_icon">{{$attrs.slider.navigator_icon.split(',')[0]}}</span>
                <span v-else>chevron_left</span>
                </i>
        </div>
        <div style="top:50%;right:0;transform:translateY(-50%)" class="p-2 absolute">
            <i class="material-icons text-5xl text-white cursor-pointer" @click="next">
                <span v-if="$attrs.slider.navigator_icon">{{$attrs.slider.navigator_icon.split(',')[1]}}</span>
                <span v-else>chevron_right</span>
            </i>
        </div>
        <div v-if="$attrs.slider.miniature" class="hidden md:flex flex-row absolute m-auto text-center items-center justify-center w-full bottom-0">
            <div v-for="(img ,n) in $attrs.slides">
                <div :key="'miniature_' + n" v-if="!img.image" class="h-12 w-16 bg-black text-xs"  @click="goto(n)">SLIDE {{n}}</div> 
                <img :key="'miniature_' + n" v-if="img.image" :src="img.image.url" class="h-12 w-16"  @click="goto(n)"/>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: "Slider",
    data:()=>({
        images: [],
        timer: null,
        index:0,
        currentIndex: 0,
        height: '35rem',
        slide: null,
    }),

    mounted() {
        this.slide = this.$attrs.slides[0]
        //this.images = this.$attrs.slides.map( slide => { return slide.image.url } )
        //this.startSlide()
        this.reSize()
        let vm = this
        window.addEventListener('resize', function() {
        vm.reSize()
        })
    },



    methods: {
        reSize(){
        this.$attrs.slider.autoplay ? this.startSlide() : null
        let w = document.getElementById('nxslider')
        this.height =  w ? ((w.clientWidth)*9/16) + 'px;' : '35rem;'
        },
        startSlide: function() {
        this.timer = setInterval(this.next, parseInt(this.$attrs.slider.delay)*1000);
        },
        classe(type,element){
            let cl = this.theme[element] ? this.$colorClass(type,this.theme[element].color , this.theme[element].density ) : ''
            return cl
            
        },
        sliderClass(what){
            return 'nuxpresso-slider-pro-' + what + ' nuxpresso-widget-' + this.$slugify(this.$attrs.name) + '-' + what
        },
        next: function() {
            this.currentIndex += 1;
            this.index = Math.abs(this.currentIndex) % this.$attrs.slides.length
            this.slide = this.$attrs.slides[this.index]
        },
        prev: function() {
        this.currentIndex -= 1;
        this.index = Math.abs(this.currentIndex) % this.$attrs.slides.length
        this.slide = this.$attrs.slides[this.index]
        },
        goto(n){
            this.currentIndex = n
            this.index = n
            this.slide = this.$attrs.slides[n]
        }
    },
    destroyed(){
        clearInterval(this.timer)
    },
    computed: {
         ...mapState ( ['theme'] ),
        justify(){
            return this.slide.image_for_description ? 'justify-around' : ''
        },
        currentImg: function() {
            return  this.slide.image ? 'opacity:0;background-image:url(' + this.slide.image.url + ') ;opacity:1;' : ''
        },
        currentBackground(){
            return this.slide.background_color ? this.$colorClass ( 'bg' , this.slide.background_color , this.slide.background_tone ) : 'bg-black'
        },
        boxCss(){
            return this.slide.box_css ? this.slide.box_css : 'bg-black bg-opacity-75 rounded-lg shadow'
        }
    }
};
</script>

<style scoped>
.ani {
    cursor:pointer;
    transition: width 1s ease-in;
}
</style>