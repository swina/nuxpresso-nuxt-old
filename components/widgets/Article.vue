<template>
    <div v-if="$attrs.content">
        <div
            v-if="!hasWidget" 
            v-html="$md.render($attrs.content)" 
            >
        </div>
        <div v-else>
            <template v-for="(splitted,r) in contentWidgets">
                <div :key="'splitted_' + r" v-if="splitted.length===1" v-html="$md.render(splitted[0])"></div>
                <div :key="'splitted_' + r" v-if="splitted.length > 1">
                    <nuxpresso-widget :id="splitted[0]"/>
                    <div v-html="$md.render(splitted[1])"></div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import NuxpressoWidget from '@/components/widgets/Widget'
export default {
    name: 'NuxpArticle',
    data:()=>({
        hasWidget: false,
        content: null,
        contentWidget: null
    }),
    components: { NuxpressoWidget },
    mounted(){
        this.content = this.$attrs.content
        let content = this.$attrs.content
        let split_content =  content.split ( '[[nuxpresso-widget id=' ) 
        this.hasWidgets = split_content.length > 1 ? true : false

        this.contentWidgets = split_content.map ( c => {
            return c.split(']]')
        })

        if ( content.indexOf('[[nuxpresso-widget') > -1 ){
            content = content.split('[[nuxpresso-widget id=')
            let obj = {
                start : content[0],
                widget : content[1].split(']]')[0],
                end : content[1].split(']]')[1]
            }
            content = obj
            this.content = obj
            this.hasWidget = true
        }
    }
}
</script>