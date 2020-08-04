<template>
    <span>
        <nuxt-link 
            :id="'link_' + $attrs.item.name"
            
            :to="toLink($attrs.item)"
            :class="$attrs.classe + ' mx-2'">
            <span @mouseover="over($event,$attrs.item)">{{ $attrs.item.name }}</span>
        </nuxt-link>
        <!--<a  
            v-if="$attrs.item.link_url"  
            :href="$attrs.item.link_url" 
            :class="$attrs.classe + ' mx-2'">
            <span @mouseover="over($event,$attrs.item)">{{ $attrs.item.name }}</span>
        </a>-->
    </span>
</template>

<script>
export default {
    name: 'NuxpressoMenuLink',
    methods: {
        toLink ( item ){
            return item.article ?
                        '/articles/' + item.article.slug :
                            item.category ? '/categories/' + item.category.slug : 
                                item.link_url ? item.link_url : ''
        },
        over(e,item){
            this.$emit ( 'over' , e , item )
        }
    }
}
</script>