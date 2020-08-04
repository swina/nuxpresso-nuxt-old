<template>
    <section>
        <nuxpresso-loop v-if="articles" :articles="articles"/>
        <div class="m-auto w-full text-center">
            <i @click="prev" v-if="start > 0" class="material-icons mr-2 text-3xl cursor-pointer">chevron_left</i>
            <i @click="next" class="material-icons text-3xl cursor-pointer">chevron_right</i>
        </div>
    </section>
</template>

<script>
import articlesPaginationQueries from '@/apollo/queries/article/articles-pagination'
import NuxpressoLoop from '@/components/widgets/Loop'
import { mapState } from 'vuex'
export default {
    name: 'NuxpressoArticles',
    components: { NuxpressoLoop },
    data:()=>({
        start: 0
    }),
    computed:{
        ...mapState ( ['settings'] )
    },
    apollo: {
        articles: {
            prefetch: true,
            query: articlesPaginationQueries,
            variables(){
                return {
                    limit: this.settings.articles_limit,
                    start: this.start
                }
            },
            update: data => data.articles 
        }        
    },
    methods:{
        next(){
            this.start = this.start + this.settings.articles_limit
        },
        prev(){
            this.start = this.start - this.settings.articles_limit
        }
    }
}
</script>