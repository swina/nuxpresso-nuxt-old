<template>
    <section v-if="articles">
        <h1 :class="classe('text','heading_color') + '  ml-2 md:ml-4'">{{category.name}}</h1>
        <!--<h1 class="ml-2 md:ml-4">{{articles[0].categories[0].name}}</h1>--->
        <Loop v-if="articles" :articles="articles"/>
        
    </section>
</template>

<script>
import categoryQuery from '@/apollo/queries/category/categories-slug'
import Loop from '@/components/widgets/Loop'
import { mapState } from 'vuex'

export default {
    name: 'NuxpressoCategories',
    components: { Loop },
    computed: {
        ...mapState ( ['settings','theme','categories'] ),
        category(){
            return this.categories.filter ( category => { return category.slug === this.$route.params.slug } )[0]
        }
    },
    head(){
        if ( this.articles && this.articles.length && this.articles[0].categories[0].SEO ){
            return {
                title: this.articles[0].categories[0].SEO.title || this.settings.site_title,
                meta: [
                    // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                    { hid: 'description', name: 'description', content: this.articles[0].categories[0].SEO.description || this.settings.seo.description || '' }
                ]
            }
        }
    },
    methods:{
        classe(prefix,type ){
            return this.$colorClass ( prefix , this.theme[type].color , this.theme[type].density )
        }
    },
    apollo: {
        articles : {
            prefetch: true,
            query: categoryQuery,
            variables(){
                return { slug : this.$route.params.slug }
            },
            update: data => data.articles
        }        
    }
}
</script>