<template>
    <form @submit.prevent="onSubmit">
        <div v-for="(field,f) in $attrs.widget.field" class="flex flex-col mb-2 w-full text-left" :key="'field_' + f">
            <label v-if="field.type!='submit'" class="text-xs">{{ field.label }} <span v-if="field.required">*</span></label>
            <input class="" v-if="fieldType(field.type)" :type="fieldType(field.type)" :name="field.name" :id="field.name">
            <textarea v-if="field.type === 'textarea'"></textarea>
            <div  v-if="field.type==='submit'">
                <button type="submit">{{ field.label }}</button>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    name: 'NuxpressoForm',
    async mounted() {
        await this.$recaptcha.init()
    },
    methods:{
        fieldType ( type ){
            return type === 'text' 
                    || type === 'email'
                        || type === 'password' 
                            || type === 'checkbox' 
                                || type === 'number' ? type : false
                
        },
        async onSubmit() {
            try {
                const token = await this.$recaptcha.execute('login')
            } catch (error) {
                console.log('Login error:', error)
            }
        },
    },

}
</script>