<template>
    <div v-if="$attrs.articles" class="nuxpresso-loop flex flex-col md:flex-row flex-wrap flex-shrink p-2 md:p-8  ">
        <template v-for="(item,i) in $attrs.articles">
            <div :key="'article_' + i" class="w-full md:w-1/2 xl:w-1/4 p-2 md:p-8" v-if="!item.homepage && !item.list_exclude">
                <nuxt-link
                    :to="'/articles/' + item.slug"
                    :title="item.title"
                    :class="$colorize(theme,'link_fg')">
                    <h2>{{ item.title }}</h2>
                </nuxt-link>
                <n-image :article="item"/>
                <div :class="'text-xs ' + $colorize(theme,'primary_fg')">
                    {{ $moment ( item.updated_at) }} <span v-if="item.user">- {{item.user.firstname}} {{item.user.lastname}}</span>
                </div>
                <i :class="$colorize(theme,'primary_fg')">{{ item.excerpt }}</i>
                <nuxt-link
                    :to="'/articles/' + item.slug"
                    :title="item.title"
                    :class="$colorize(theme,'link_fg')">
                    <div class="nuxpresso-readmore">read more 
                        <nuxpresso-icon icon="chevron_right"/>
                    </div>
                </nuxt-link>
            </div>
        </template>
    </div>
</template>

<script>
import NImage from '@/components/widgets/Image'
import { mapState } from 'vuex'
export default {
    name: 'NuxpressoLoopArticles',
    components: { NImage },
    computed:{
        ...mapState ( ['theme'] ),
        classe(){
            return this.theme.link_fg ? this.$colorClass('text',this.theme.link_fg.color , this.theme.link_fg.density) : ''
        }
        
    }
}
</script>