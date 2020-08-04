<template>
    <article v-if="$attrs.article">
        <div :class="$attrs.article.template.class + ' flex flex-col md:flex-row pb-16 nuxpresso-template-' + $slugify($attrs.article.template.name)">
            <div :key="'template_col_' + i" v-for="(col,i) in columns" v-if="$attrs.article.template[col] && $attrs.article.template[col].length" :class="'w-full'">
                <template v-for="(field,i) in $attrs.article.template[col]">
                    

                    <nuxpresso-image :key="'field_' + i" v-if="field.name==='image'" :class="field.class + ' nuxpresso-article-image'" :article="$attrs.article"/>


                    <h1 :key="'field_' + i" v-if="field.name==='title'" :class="classe('text','heading_fg') + ' ' + field.class + ' nuxpresso-article-title'">
                        {{$attrs.article.title}}
                    </h1>

                    <nuxpresso-article :key="'field_' + i" v-if="field.name==='content'"  :content="$attrs.article.content" :class="classe('text','primary_fg') + ' ' + field.class + ' nuxpresso-article-content'"/>
                    
                    <!--
                    <div 
                        :key="'field_' + i" 
                        v-if="field.name==='content'" 
                        v-html="$md.render($attrs.article.content)" 
                        :class="classe('text','primary_fg') + ' ' + field.class + ' nuxpresso-article-content'">
                    </div>
                    -->

                    <nuxpresso-widget v-if="field.widget" :key="'field_' + i" :nuxwidget="field.widget.id" :id="field.widget.id"/>

                </template>
            </div>
        </div>
    </article>
</template>

<script>
import NuxpressoWidget from '@/components/widgets/Widget'
import NuxpressoImage from '@/components/widgets/Image'
import NuxpressoArticle from '@/components/widgets/Article'
import { mapState } from 'vuex'
export default {
    name: 'NuxpressoPageTemplate',
    components: {
        NuxpressoWidget , NuxpressoImage, NuxpressoArticle
    },
    data:()=>({
        content: null,
        contentWidgets: false
    }),
    computed:{
        ...mapState ( ['theme','templates']),
        currentTemplate(){
            //if (!this.$attrs.article.template.fields ){
            //    let t  = this.templates.map ( mytemplate => { 
            //        return parseInt(mytemplate.id) === parseInt(this.$attrs.article.template.id) ? mytemplate : null 
            //    })
            //    return t[0]
            //} else {
            return this.$attrs.article.template
            //}
        },
        columns(){
            return [ 'fields' , 'fields_col_2' , 'fields_col_3' ] 
        },
    },
    methods:{
        classe(type,element){
            let cl = this.theme[element] ? this.$colorClass(type,this.theme[element].color , this.theme[element].density ) : ''
            return cl
        }
    },
    mounted(){

        /*
        this.content = this.$attrs.article.content
        this.content = this.content.replace('[[nuxpresso-separator]]',"___")
        let split_content =  this.content.split ( '[[nuxpresso-widget id=' ) 
        this.contentWidgets = split_content.length > 1 ? true : false

        if ( this.content.indexOf('[[nuxpresso-widget') > -1 ){
            let content = this.content.split('[[nuxpresso-widget id=')
            let obj = {
                
                start : content[0],
                widget : content[1].split(']]')[0],
                end : content[1].split(']]')[1]
            }
            this.content = obj
            this.hasWidget = true
        }
        */
    }
    
}
</script>