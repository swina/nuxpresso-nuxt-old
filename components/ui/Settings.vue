<template>
    <div class="overflow-auto">
        <h5>Settings</h5>
        <div v-for="(field,i) in mysettings">
            {{ field }} : {{ settings[field] }}
        </div>
        <!--
        <div v-for="(field,f) in Object.keys(fields)" class="flex flex-col mb-2 w-full text-left" :key="'field_' + f">
            <label v-if="fields[field].type!='submit'" class="text-xs">{{ fields[field].label }} <span v-if="fields[field].required">*</span></label>
            <input class="" v-if="fieldType(fields[field].type)" :type="fieldType(fields[field].type)" v-model="settings[field]">
            <textarea v-if="fields[field].type === 'textarea'" v-model="settings[field]"></textarea>
            <div  v-if="fields[field].type==='submit'">
                <button type="submit">{{ fields[field].label }}</button>
            </div>
        </div>
        -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'NuxpressoSettings',
    data:()=>({
        fields: {
            site_name : {
                label: 'Name',
                type: 'text',
                required: true
            },
            site_title : {
                label: 'Headline',
                type: 'text',
                required: true
            },
            footer: {
                label: 'Credits',
                type: 'textarea',
                required: false
            },
            layout : {
                key: 'id',
                label: 'Theme',
                type: 'text',
                required: false
            },

        }
    }),
    computed: {
        ...mapState ( ['settings','themes'] ),
        mysettings(){
            return Object.keys(this.settings)
        }
    },
    methods: {
         fieldType ( type ){
            return type === 'text' 
                    || type === 'email'
                        || type === 'password' 
                            || type === 'checkbox' 
                                || type === 'number' ? type : false
                
        },
        fieldModel ( field ){
            if ( this.fields[field].key ){
                return this.settings[field][this.fields[field].key]
            } else {
                return this.settings[field]
            }
        }
    }
}
</script>