<template>
    <div v-if="widget" data-widget="widget" :id="widget.id" :class="'nuxpresso-widget-' + widget.id + ' ' + widget.class" :style="calcFull(widget.id)">

        <!-- display widget title if enabled -->        
        <h3 class="nuxpresso-widget-title" v-if="widget && widget.title">{{ widget.title }}</h3>
        
        <!-- widget component wrapper -->
        <div v-if="widget" :class="'nuxpresso-widget-wrapper ' + wrapper">

            <!-- loop thru widget components -->
            <div v-for="(comp,i) in widget.component" :data-component="comp.__component" :key="'component_' + i" :class="widgetClass(comp.__component)">
                
                <!-- features (to maintain compatibility with old component) -->
                <div :class="'flex flex-col md:flex-row nuxpresso-widget-' + $slugify(widget.name) + '-component'" v-if="comp['__component']==='widgets.features'">
                    <img v-if="comp.image" :src="comp.image.url" />
                    <i v-if="comp.material_icon" style="font-size:3rem;" class="material-icons">{{comp.material_icon}}</i>
                    <h5>{{comp.title}}</h5>
                    {{comp.subtitle}}
                    <a v-if="comp.link_url && comp.button" :href="comp.link_url"><button>{{comp.button_text}}</button></a>
                </div>
                
                <!-- cta -->
                <div :id="'nuxpresso-widget-' + widget.id" 
                    :class="'nuxpresso-widget nuxpresso-widget-cta nuxpresso-widget-' + $slugify(widget.name) + ' ' + $colorClass('bg',comp.background.color,comp.background.density) + ' ' + widget.component_class" 
                    v-if="comp['__component'] === 'widgets.cta'">
                    <h5>{{comp.title}}</h5>
                    {{ comp.subtitle }}
                     <a v-if="comp.link_url && comp.button" :href="comp.link_url"><button>{{comp.button_text}}</button></a>
                </div>

                <!-- advanced-features -->
                <div :id="'nuxpresso-widget-' + widget.id" :class="'nuxpresso-widget nuxpresso-widget-' + $slugify(widget.name)" :style="calcFull(widget.id)" v-if="comp['__component']==='widgets.advanced-features'">
                    <div class="nuxpresso-flex-row">
                        
                            <box v-for="(feature,f) in comp.features_item" :key="feature.title" class="nuxpresso-advanced-fatures nuxpresso-col " :classe="widget.component_class + ' nuxpresso-widget-' + $slugify(widget.name) + '-component'">

                                <img v-if="feature.image" :src="feature.image.url" class="nuxpresso-box-image" slot="line_1" />
                                <i slot="line_1" v-if="feature.material_icon" style="font-size:3rem;" class="nuxpresso-box-icon material-icons">{{feature.material_icon}}</i>
                                
                                <h5 class="nuxpresso-box-title" slot="line_2">{{feature.title}}</h5>
                                <h3 class="nuxpresso-box-price" slot="line_3" v-if="feature.price">
                                    <span v-if="feature.sale" class="line-through text-xs">{{feature.price}}</span>
                                    <span v-else>{{feature.price}}</span>
                                    <span v-if="feature.sale" class="nuxpresso-box-sale">{{features.sale}}</span>
                                </h3>
                                
                                <p class="nuxpresso-box-subtitle" slot="line_3">{{feature.subtitle}}</p>
                                
                                <p class="nuxpresso-box-multiline" slot="line_4" :key="'descr_' + comp.id + '_' + l" v-for="(line,l) in multiline(feature.description)">{{line}}</p>

                                <div v-if="feature.button"  class="nuxpresso-box-button" slot="line_5">
                                    <nuxt-link 
                                        :to="feature.link"
                                        :key="'button_' + $slugify(feature.name)">
                                        <button>{{ feature.button }}</button>
                                    </nuxt-link>
                                </div>
                            </box>
                            
                    </div>    
                </div>
                
               
                <!--- multibox --->
                <nuxpresso-multi-box  v-if="comp['__component']==='widgets.multi-box'" :widget="widget" :component="comp"/>

                <!-- logo -->
                <div v-if="comp['__component']==='widgets.logo'">
                    <NuxpressoLogo :options="comp" :classe="widget.component_class"/>
                </div>

                <!-- map -->
                <div v-if="comp['__component']==='widgets.map'">
                    <NuxpressoMap :address="comp.address"/>
                </div>

                <!-- button -->
                <a v-if="comp['__component']==='widgets.button'" :href="comp.link_url">
                    <button :class="'nuxpresso-widget nuxpress-button-' + $slugify(widget.name)">{{comp.text}}</button>
                </a>
                <!-- slider -->
                <Slider v-if="comp['__component']==='widgets.slider'" :slider="comp" :options="comp.image"/>

                <!-- form -->
                <NuxpressoForm  :widget="comp" :class="widget.class" v-if="comp['__component'].indexOf('forms.form') > -1"/>

                <!-- articles loop -->
                <div v-if="comp['__component']==='widgets.articles-list'" :load="lastArticles(comp)">
                    <Loop v-if="articles" :articles="articles" />
                </div>

                <!-- articles selection -->
                <div v-if="comp['__component']==='widgets.articles-selection'">
                    <Loop v-if="comp.Article" :articles="setArticlesSelection" />
                </div>

                <!-- slider-pro -->
                <div v-if="comp['__component']==='widgets.slider-pro'">
                    <NuxpressoSliderPro :name="widget.name" :slider="comp" :slides="comp.slides"/>
                </div>

                <!-- social -->
                <div v-if="comp['__component']==='widgets.social-share'">
                    <NuxpressoSocial :social="comp.social_share" :orientation="comp.vertical" :titles="comp.display_name"/>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import Slider from '@/components/widgets/Slider'
import NuxpressoForm from '@/components/widgets/Form'
import Loop from '@/components/widgets/Loop'
import Box from '@/components/ui/InfoBox'
import NImage from '@/components/widgets/Image'
import NuxpressoMap from '@/components/widgets/Map'
import NuxpressoSliderPro from '@/components/widgets/SliderPro'
import NuxpressoLogo from '@/components/widgets/Logo'
import NuxpressoSocial from '@/components/widgets/SocialShare'
import NuxpressoMultiBox from '@/components/widgets/MultiBox'

import { mapState } from 'vuex'

export default {
    name: 'NuxpressoWidget',
    data:()=>({
        wrapper: '' ,
        articles: null
    }),
    computed:{
        ...mapState ( ['widgets'] ),
        fullwidth(){
            return this.widget.fullwidth ? '' : ' nuxpresso-boxed'
        },
        setArticlesSelection(){
            return this.widget.component[0].Article.map ( article => { return article.article } )
        },
        widget(){
            return this.widgets.filter ( w => { return w.id === parseInt(this.$attrs.id) })[0]
        }

    },
    components: { Slider , NuxpressoForm , Loop , Box , NImage , NuxpressoMap , NuxpressoSliderPro , NuxpressoLogo , NuxpressoSocial , NuxpressoMultiBox },    
    methods:{
        calcFull(id){
            if ( this.widget.fullwidth ){
                let el = document.querySelector ( '.nuxpresso-widget-' + id )
                if ( el ){
                    return 'margin-left:-' + el.offsetLeft + 'px;margin-right:-' + el.offsetLeft + 'px;'
                    //return 'margin-left:0;margin-right:-' + el.offsetLeft + 'px;'
                }
            }
            return ''

        },
        widgetClass(component){
            this.wrapper = 'nuxpresso-component-' + component.split('.')[1] + '-wrapper'
            return 'nuxpresso-component-' + component.split('.')[1]
        },
        lastArticles(component){
            if ( !this.articles ){
                let vm = this
                let sort = component.last ? 'DESC' : 'ASC'
                let limit = component.limit 
                this.$axios.$get ( 'articles?_sort=updated_at:' + sort + '&_limit=' + limit).then ( data => {
                    return data
                }).then ( data => {
                    vm.articles = data
                })
            }
        },
        multiline(text){
            if ( text){
                return text.split('\n')
            }
            return ''
        }
    },
}
</script>