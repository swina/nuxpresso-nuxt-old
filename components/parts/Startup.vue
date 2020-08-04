<template>
   <div class="w-full md:w-1/2 lg:w-2/5 m-auto p-2">
       <h1>Welcome to Nuxpresso</h1>
       <nuxpresso-login/>
   </div>
</template>

<script>

export default {
    name: 'NuxpressoStartup',
    data:()=>({
        show: false,
        menu: []
    }),


}
</script>