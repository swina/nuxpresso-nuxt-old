<template>
    <!--<Single :article="articles" v-if="articles"/>-->
    <!--<div>{{articles}}</div>-->
    <nuxpresso-template :article="articles"/>
</template>

<script>
import articleQuery from '@/apollo/queries/article/articles-slug'
import Single from '@/components/widgets/Single'
import NuxpressoTemplate from '@/components/parts/Template'
export default {
    name: 'NuxpressoArticleSlug',
    components: {
        Single,NuxpressoTemplate
    },
    apollo: {
        articles: {
            prefetch: true,
            query: articleQuery,
            variables(){
                return { slug : this.$route.params.slug }
            },
            update: data => data.articles[0]
        }
    }
}
</script>