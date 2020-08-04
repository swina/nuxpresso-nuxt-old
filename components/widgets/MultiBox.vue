<template>
    <div class="flex flex-col md:flex-row justify-around flex-wrap">

        <div v-if="$attrs.component.vertical" :key="'multibox_' + i" :class="$attrs.widget.class + ' nuxpresso-multi-box-wrapper ' + classe" v-for="(feature,i) in items">
            <div class="nuxpresso-multi-box flex-1">
                <div :class="'flex flex-col w-full h-full nuxpresso-multi-box-content ' + $attrs.component.class">
                    <img v-if="feature.image" :src="feature.image.url" class="nuxpresso-box-image"/>
                    <i slot="line_1" v-if="feature.material_icon" style="font-size:3rem;" class="nuxpresso-box-icon material-icons">{{feature.material_icon}}</i>
                    <h3 class="nuxpresso-box-title m-0" slot="line_2">{{feature.title}}</h3>

                    <h3 class="nuxpresso-box-price" slot="line_3" v-if="feature.price">
                        <span v-if="feature.sale" class="line-through text-xs">{{feature.price}}</span>
                        <span v-else>{{feature.price}}</span>
                        <span v-if="feature.sale" class="nuxpresso-box-sale">{{features.sale}}</span>
                    </h3>
                    
                    <p class="nuxpresso-box-subtitle" slot="line_3">{{feature.subtitle}}</p>
                    
                    <p :key="'line_' + l" class="nuxpresso-box-multiline" slot="line_4" v-for="(line,l) in multiline(feature.description)">{{line}}</p>

                    <div v-if="feature.button"  class="nuxpresso-box-button" slot="line_5">
                        <nuxt-link 
                            :to="feature.link">
                            <button>{{ feature.button }}</button>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>


        <div v-if="!$attrs.component.vertical" :key="'multibox_' + i" :class="$attrs.widget.class + ' nuxpresso-multi-box-wrapper ' + classe" v-for="(feature,i) in items">
            <div :class="'flex-1 flex flex-col md:flex-row w-full ' + $attrs.component.class + reverse + ' nuxpresso-multi-box'">
                <div class="w-auto max-w-1/2 p-2  nuxpresso-multi-box-image">
                    <img v-if="feature.image" :src="feature.image.url" class="nuxpresso-box-image"/>
                    <i slot="line_1" v-if="feature.material_icon" style="font-size:3rem;" class="nuxpresso-box-icon material-icons">{{feature.material_icon}}</i>
                </div>
                <div class="w-auto p-2 nuxpresso-multi-box-text">
                    <h3 class="nuxpresso-box-title m-0" slot="line_2">{{feature.title}}</h3>

                    <h3 class="nuxpresso-box-price" slot="line_3" v-if="feature.price">
                        <span v-if="feature.sale" class="line-through text-xs">{{feature.price}}</span>
                        <span v-else>{{feature.price}}</span>
                        <span v-if="feature.sale" class="nuxpresso-box-sale">{{features.sale}}</span>
                    </h3>
                    
                    <p class="nuxpresso-box-subtitle" slot="line_3">{{feature.subtitle}}</p>
                    
                    <p :key="'line_' + l" class="nuxpresso-box-multiline" slot="line_4" v-for="(line,l) in multiline(feature.description)">{{line}}</p>

                    <div v-if="feature.button"  class="nuxpresso-box-button" slot="line_5">
                        <nuxt-link 
                            :to="feature.link">
                            <button>{{ feature.button }}</button>
                        </nuxt-link>
                    </div>
                </div>
            </div>    
        </div>
    </div>
</template>

<script>
import Box from '@/components/ui/InfoBox'
import { mapState } from 'vuex'
export default {
    name: 'NuxpressoMultiBoxWidget',
    components: { Box },
    computed:{
        ...mapState ( ['theme'] ),
        items(){
            return this.$attrs.component.items
        },
        classe(){
            let columns = this.$attrs.component.max_columns ?  'md:w-1/' + this.$attrs.component.max_columns : 'md:w-1/2'
            let cl = 'w-full ' + columns 
            cl += this.$attrs.component.vertical ? ' flex flex-col ' : ' flex flex-row'
            
            return cl
        },
        reverse(){
            return this.$attrs.component.text_position ? 
                this.$attrs.component.text_position === 'right' ? '' : ' flex-row-reverse'
                    : ''
        }
    },
    methods:{
        multiline(text){
            if ( text){
                return text.split('\n')
            }
            return ''
        }
    }
}
</script>