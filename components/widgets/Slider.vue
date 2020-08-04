<template>
    <div v-if="height" id="nxslider" class="h-screen md:h-auto w-full flex items-center bg-center bg-no-repeat bg-cover ani nuxpresso-slider" :style="'min-height:' + height +  currentImg">
      <div v-if="$attrs.slider && $attrs.slider.title" style="top:50%;left:50%;transform:translate(-50%,-50%)" class="w-4/5 md:w-3/4 lg:w-4/5 nuxpresso-slider-overlay p-2 md:p-10">
        <h2 class="md:text-4xl">{{$attrs.slider.title}}</h2>
        <h3>{{$attrs.slider.subtitle}}</h3>
        <p v-if="$attrs.slider.content">{{$attrs.slider.content}}</p>
        <div class="mt-4" v-if="$attrs.slider.button" v-for="button in $attrs.slider.button" :key="'button_' + button.text">
            <a href="articles/get-started"><button>{{button.text}}</button></a>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: "Slider",
  data:()=>({
      images: [],
      timer: null,
      currentIndex: 0,
      height: '35rem'
  }),

  mounted() {
    this.reSize()
    let vm = this
    window.addEventListener('resize', function() {
      vm.reSize()
    })
  },



  methods: {
    reSize(){
      this.images = this.$attrs.options.map( img => { return img.url } )
      this.startSlide();
      let w = document.getElementById('nxslider')
      this.height =  w ? ((w.clientWidth)*9/16) + 'px;' : '35rem;'
    },
    startSlide: function() {
      this.timer = setInterval(this.next, 4000);
    },

    next: function() {
        this.currentIndex += 1;
    },
    prev: function() {
      this.currentIndex -= 1;
    }
  },

  computed: {
   
    currentImg: function() {
        if ( this.images[Math.abs(this.currentIndex) % this.images.length] ){
            return 'opacity:0;background-image:url(' + this.images[Math.abs(this.currentIndex) % this.images.length] + ') ;opacity:1;'
        }
    }
  }
};
</script>

<style scoped>
.ani {
    transition: 1s all linear;
}
</style>