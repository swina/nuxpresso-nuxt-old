<template>
    <form class="flex flex-col"> 
        <div class="m-auto text-2xl bg-black text-white w-full text-center">Login</div>
        <label>Email</label>
        <input type="email" class="username" v-model="user"/>
        <label>Password</label>
        <input type="password" class="password" v-model="password"/>
    </form>
</template>

<script>
export default {
    name: 'NuxpLogin',
    data:()=>({
        user: '',
        password: ''
    })
}
</script>