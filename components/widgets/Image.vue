<template>
    <img v-if="image" :src="image" :alt="alt" :title="alt"/>
</template>

<script>
export default {
    name: 'NuxpressoImage',
    data:()=>({
        alt: ''
    }),
    computed:{
        image(){
            if ( this.$attrs.options ){
                return this.$attrs.options.url
            } else {
                return this.$attrs.article.image ? this.$attrs.article.image.url :
                this.$attrs.article.random_image ? 
                    'https://source.unsplash.com/random/800x400?'+ this.$attrs.article.title : false
            }
        },
    },
    mounted(){
        
        if ( this.$attrs.article ){
            this.alt = this.$attrs.article.title 
            this.$attrs.article.image_title ?  
                    this.alt = this.$attrs.article.image_title :  
                        this.alt = this.$attrs.article.title 
        }
    }
}
</script>