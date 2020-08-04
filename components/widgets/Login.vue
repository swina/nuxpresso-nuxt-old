<template>
    <div v-if="viewForm">
        <form @submit.prevent="onSubmit" v-if="!authenticated"
        style="top:50%;left:50%;transform:translate(-50%,-50%)" 
        class="fixed w-full md:w-1/3 bg-white h-auto z-10 p-0 p-2 flex flex-col text-left shadow rounded-lg border-black">
            <div class="bg-blue-500 text-white text-center text-xl rounded-tl-lg rounded-tr-lg -m-2 p-4">Login</div>
            <label class="text-xs mt-6">User<span>*</span></label>
            <input class="" type="text" v-model="form.identifier">
            <label class="text-xs">Password<span>*</span></label>
            <input class="" type="passowrd" v-model="form.password">
            <div class="mt-4 text-center">
                
                <button type="submit" v-if="enabled">Login</button>
            </div>
            <nuxt-link
                to="/">
                <i class="material-icons absolute top-0 right-0">highlight_off</i>
            </nuxt-link>
        </form>
        <div v-else  style="top:50%;left:50%;transform:translate(-50%,-50%)" 
        class="fixed w-full md:w-1/3 bg-white h-auto z-10 p-0 p-2 flex flex-col text-left shadow rounded-lg border-black">
            <h2>You are authenticated</h2>
            <button @click="$router.push('/')">Home</button>
        </div>
        <div class="fixed top-0 left-0 h-screen w-full bg-black bg-opacity-75 z-1"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'NuxpressoLogin',
    data:()=>( {
        form: {
            identifier: '',
            password:''
        },
        viewForm: true,
        enabled: true,
        response: '',
        responseClass: 'text-green-400'
    }),
    computed:{
        ...mapState ( ['authenticated'] )
    },
    methods:{
        async onSubmit() {
            try {
                const token = await this.$recaptcha.execute('login')
                await this.submitForm()
            } catch (error) {
                console.log('Login error:', error)
            }
        },
        submitForm(){
            let vm = this
            this.$axios.$post(
                'auth/local', {
                identifier: vm.form.identifier,
                password: vm.form.password,
            })
            .then(response => {
                // Handle success.
                console.log ( response )
                let authenticated = {
                    user : response.user,
                    jwt : response.jwt
                }
                vm.$store.dispatch ( 'authenticatedUser' , authenticated )
                window.sessionStorage.setItem ( 'nuxpresso-jwt' , JSON.stringify(response.jwt) )
                window.sessionStorage.setItem ( 'nuxpresso-user' , JSON.stringify(response.user) )
                vm.viewForm = false
                vm.enabled = true
                vm.responseClass = 'text-green-500'
                vm.response = 'Welcome ! You are authenticated'
            })
            .catch(error => {
                console.log ( error )
                vm.response = 'Login error. Please retry later'
                vm.responseClass = 'text-red-500'
                
            });
            vm.enabled = true
        }
    },
    mounted(){
        const isDev = process.env.NODE_ENV !== 'production'
        console.log ( process.env  )
        if ( process.env.DEV_USER && process.env.DEV_PWD && isDev ){
            this.form.identifier = process.env.DEV_USER
            this.form.password = process.env.DEV_PWD
            this.submitForm()
        } 
    }

}
</script>