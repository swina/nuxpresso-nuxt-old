<template>
    <div>
        <div v-for="(field,i) in $attrs.template">

            {{ field }}

            <h1 v-if="field==='title'" class="text-2xl md:text-3xl lg:text-5xl font-bold nuxpresso-article-title">{{$attrs.article.title}}</h1>
            
            <n-image v-if="!$attrs.article.homepage && field==='image'" :article="$attrs.article"/>

            <Tags
                v-if="field === 'categories'" 
                :items="$attrs.article.categories" 
                title="Categories" 
                path="/categories/" 
                taxonomy="slug" 
                display="name"/>

            <Tags 
                v-if="$attrs.article.tags && field === 'tags'" 
                :items="$attrs.article.tags.split('\n')" 
                title="Tags" 
                path="tag/" 
                taxonomy="" 
                display=""/>

            <Tags 
                v-if="$attrs.related && $attrs.related.length && field==='related'" 
                :items="$attrs.related" 
                title="Related" 
                path="/articles/" 
                taxonomy="slug" 
                display="title"/>

        </div>
    </div>
</template>
<script>

import Widget from '@/components/widgets/Widget'
import NImage from '@/components/widgets/Image'
import Tags from '@/components/widgets/Tags'

export default {
    name: 'NuxpressoPageTemplate',
    components: {
        Widget , NImage, Tags
    }


}
</script>