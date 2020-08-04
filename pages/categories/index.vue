<template>
    <section>
        <h1>Categories</h1>
        <div :key="'category_' + i" v-for="(category,i) in categories">
            <nuxt-link
                :to="{ name: 'categories-slug' , params : { slug: category.slug }}">
                <h2>{{ category.name }}</h2>
            </nuxt-link>
        </div>
    </section>
</template>

<script>
import categoryQuery from '@/apollo/queries/category/categories'
import Loop from '@/components/widgets/Loop'

export default {
    name: 'NuxpressoCategories',
    data:()=>({
        articles: []
    }),
    components: { Loop },
    apollo: {
        categories: {
            prefetch: true,
            query: categoryQuery,
            update: data => data.categories
        }        
    }
}
</script>