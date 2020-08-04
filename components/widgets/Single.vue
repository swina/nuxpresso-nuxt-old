<template>
    <article v-if="article" class="relative items-center">

        <div class="nuxpresso-slider" v-if="slider">
            <Slider v-if="slider" :slider="slider" :options="slider.image"/>
        </div>
       
        <Content :article="article" :related="children"/>
        
        <template v-for="wdg in article.widgets">
            <Widget :key="wdg.id" :id="wdg.id"/>
        </template>

        
    </article>
        
</template>

<script>
import articlesParentQuery from '@/apollo/queries/article/articles-parent'
import widgetQueries from '@/apollo/queries/widget/widget'
import Slider from '@/components/widgets/Slider'
import Widget from '@/components/widgets/Widget'
import Content from '@/components/widgets/Content'

export default {
    name: 'NuxpressoSingleArticle',
    data: ()=>({
        article: null,
        slider: null
    }),
    components: {
        Slider , Widget, Content
    },
    mounted(){
        this.article = this.$attrs.article
        if ( this.article.component ){
            this.article.component.map ( component => {
                if ( component.__typename === 'ComponentWidgetsSlider' ){
                    this.slider = component
                }
                
            })
        }
        if ( this.article.widgets ){
            this.article.widgets.sort ( (a,b) =>  a.order < b.order ? -1 : 1 )   
        }
    },
    apollo: {
        children: {
            prefetch: true ,
            query: articlesParentQuery,
            variables(){
                return { master : this.$route.params.slug }
            },
            update: data => data.articles
        }
    }
}
</script>