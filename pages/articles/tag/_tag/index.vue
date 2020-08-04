<template>
    <section>
        <Loop v-if="articles" :articles="articles"/>
    </section>
</template>

<script>
import articlesTagQuery from '@/apollo/queries/article/articles-tag'
import Loop from '@/components/widgets/Loop'
export default {
    name: 'NuxpressoArticlesTags',
    components: { Loop },
    apollo: {
        articles : {
            prefetch: true,
            query: articlesTagQuery,
            variables(){
                return { tag : this.$route.params.tag }
            }
        }
    }
}
</script>