<template>
    <div>
        <here-map 
            :address="$attrs.address">
        </here-map>
    </div>
</template>

<script>
import HereMap from '@bit/swina.vue-components.global.vue-here-map/HereMaps.vue'
export default {
    name: 'NuxpressoMap',
    components: { HereMap }
}
</script>