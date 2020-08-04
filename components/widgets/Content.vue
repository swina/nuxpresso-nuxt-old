<template>
    <!--<div :class="'article ' + $store.state.theme.main.content[0][0].css">-->
        
        
        <div :class="pageTemplate.class + ' flex flex-col md:flex-row pb-16 nuxpresso-template-' + $slugify(pageTemplate.name)">

            <div :key="'template_col_' + i" v-for="(col,i) in columns" v-if="pageTemplate[col] && pageTemplate[col].length" :class="'w-full ' + columnClass(pageTemplate[classes[i]])">
                <template v-for="(field,i) in pageTemplate[col]">

                    <n-image :key="'field_' + i" v-if="!$attrs.article.homepage && field.name==='image'" :class="field.class + ' nuxpresso-article-image'" :article="$attrs.article"/>

                    <h1 :key="'field_' + i" v-if="field.name==='title'" :class="classe('text','heading_color') + ' ' + field.class + ' nuxpresso-article-title'">
                        {{$attrs.article.title}}
                    </h1>
                    
                    <div :key="'field_' + i"  v-if="!$attrs.article.homepage && field.name==='author'" :class="classe('text','primary_color') + ' ' + field.class + ' nuxpresso-article-author'">

                        <v-gravatar :class="'rounded-full ' + field.class" v-if="$attrs.article.user" :size="parseInt(30)" :email="$attrs.article.user.email"/>
                        <span v-if="$attrs.article.user && $attrs.article.user.firstname">
                            {{$attrs.article.user.firstname}} {{$attrs.article.user.lastname}}
                        </span> 
                    
                    </div>

                    <div :key="'field_' + i" v-if="field.name==='date'" :class="classe('text','primary_color') + ' ' + field.class + ' nuxpresso-article-date'"> 
                        {{ $moment ( $attrs.article.updated_at )}}
                    </div>

                    <Tags
                        v-if="field.name==='categories' && $attrs.article.categories"
                        :key="'field_' + i"  
                        :items="$attrs.article.categories" 
                        title="Categories" 
                        path="/categories/" 
                        taxonomy="slug" 
                        display="name"
                        :class="classe('text','primary_color') + ' ' + field.class + ' nuxpresso-article-categories'"/>
                    
                    <Tags 
                        :key="'field_' + i" 
                        v-if="$attrs.article.tags && field.name==='tags'" 
                        :items="$attrs.article.tags.split('\n')" 
                        title="Tags" 
                        path="tag/" 
                        taxonomy="" 
                        display=""
                        :class="classe('text','primary_color') + ' ' + field.class + ' nuxpresso-article-tags'"/>

                    <Tags 
                        :key="'field_' + i" 
                        v-if="$attrs.related && $attrs.related.length && field.name==='related'" 
                        :items="$attrs.related" 
                        title="Related" 
                        path="/articles/" 
                        taxonomy="slug" 
                        display="title"
                        :class="classe('text','primary_color') + ' ' + field.class + ' nuxpresso-article-related'"/>
                    
                    

                    <div 
                        :key="'field_' + i" 
                        v-if="!contentWidgets && field.name==='content'" 
                        v-html="$md.render($attrs.article.content)" 
                        :class="classe('text','primary_color') + ' ' + field.class + ' nuxpresso-article-content'">
                    </div>

                    <div 
                        :key="'field_' + i" 
                        v-if="field.name==='excerpt' && $attrs.article.excerpt"
                        v-html="$md.render($attrs.article.excerpt)"
                        :class="classe('text','primary_color') + ' ' + field.class +  ' nuxpresso-article-content'">
                    </div>

                    <div 
                        :key="'field_' + i"  
                        v-if="contentWidgets && field.name==='content'">
                        <template v-for="(splitted,r) in contentWidgets">
                            <div :key="'splitted_' + r" v-if="splitted.length===1" :class="classe('text','primary_color') + ' ' + field.class + ' nuxpresso-article-content'" v-html="$md.render(splitted[0])"></div>
                            <div :key="'splitted_' + r" v-if="splitted.length > 1">
                                <Widget :id="splitted[0]"/>
                                <div :class="classe('text','primary_color') + ' ' + field.class + ' nuxpresso-article-content'" v-html="$md.render(splitted[1])"></div>
                            </div>
                        </template>
                    </div>

                    <Shortcode :key="'shortcode_' + i" v-if="field.shortcode" :shortcode="field.shortcode" :classe="field.class"/>
                    
                    <widget v-if="field.widget" :key="'field_' + i" :nuxwidget="field.widget.id" :id="field.widget.id"/>

                    <NuxpressoMenu :key="'field_' + i" v-if="field.menu" :id="field.menu.id"/> 

                    <div :key="'field_' + i" v-if="field.textbox" :class="field.class">
                        <div v-html="field.textbox.split('\n').join('<br/>')"></div>
                    </div>
                    
                </template>
            </div>
        </div>

    <!--</div>-->
</template>

<script>
import Widget from '@/components/widgets/Widget'
import NImage from '@/components/widgets/Image'
import Tags from '@/components/widgets/Tags'
import PTemplate from '@/components/widgets/Template'
import Shortcode from '@/components/widgets/Shortcode'
import VGravatar from 'vue-gravatar'
import NuxpressoMenu from '@/components/widgets/MenuResponsive'

import { mapState } from 'vuex'

export default {
    name: 'NuxpressoArticleContent',
    data:()=>({
        content: null,
        contentWidgets: null,
        pageTemplate: { fields : [
            { name: 'title' , class: '' } , 
            { name: 'author', class: '' } , 
            { name: 'date' , class: '' } , 
            { name: 'categories' , class: '' }, 
            { name: 'tags' , class: '' },
            { name: 'related' , class: '' },
            { name: 'image' , class: '' } , 
            { name: 'content', class: ''} 
        ]},
        columns : [ 'fields' , 'fields_col_2' , 'fields_col_3' ] ,
        classes : [ 'col_1_class' , 'col_2_class', 'col_3_class'],
    }),
    components: {
        Widget, NImage , Tags , VGravatar, PTemplate , Shortcode, NuxpressoMenu
    },
    computed: {
        ...mapState ( ['theme','template','menus'] ),
        
        tags(){
            return this.$attrs.article.tags.split('\n')
        },

        nuxpresso_boxed(){
            return this.pageTemplate.fields_col_2 && this.pageTemplate.fields_col_2.length ? '' : '  '
        },
        calc_columns(){
            let columns = 0
            this.pageTemplate.fields ? columns++ : null
            this.pageTemplate.fields_col_2 && this.pageTemplate.fields_col_2.length ? columns++ : null
            this.pageTemplate.fields_col_3 && this.pageTemplate.fields_col_3.length ? columns++ : null
            return columns
        }
    },
    head(){
        let page = this.$attrs.article
        if ( page.seo.length )
        return {
            title: page.seo[0].title || this.$store.state.settings.site_name + ' ' + this.$store.state.settings.site_title,
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                { hid: 'description', name: 'description', content: page.seo[0].description || this.$store.state.settings.seo.description || '' }
            ]
        }
        return {
            title: this.$store.state.settings.site_name + ' ' + this.$store.state.settings.site_title,
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                { hid: 'description', name: 'description', content: this.$store.state.settings.seo.description || '' }
            ]
        }

    
    },
    methods:{
        classe(prefix,type ){
            let classe = this.$colorClass ( prefix , this.theme[type].color , this.theme[type].density )
            let css = this.theme[type].css ? ' ' + this.theme[type].css : ''
            return classe + css
        },
        columnClass(classe){          
            return classe ? classe : 'md:w-1/' + this.calc_columns
        },
        menu(id){
            let menu = this.menus.filter ( m => { return m.id === id })
            return menu
        }
    },
    mounted(){
        if ( this.$attrs.article.template ){
            //has a template 
            let template = this.template.templates.filter ( tmp => {
                return tmp.id === this.$attrs.article.template.id
            })
            this.pageTemplate = template[0]
            this.$store.dispatch ( 'current_template' , this.pageTemplate )
        } else {
            //use default template
            let template = this.template.templates.filter ( tmp => {
                return tmp.default
            })
            this.pageTemplate = template[0]
            this.$store.dispatch ( 'current_template' , this.pageTemplate )
        }

        this.content = this.$attrs.article.content
        this.content = this.content.replace('[[nuxpresso-separator]]',"___")
        let split_content =  this.content.split ( '[[nuxpresso-widget id=' ) 
        
        this.contentWidgets = split_content.map ( c => {
            return c.split(']]')
        })

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

    }
}
</script>
