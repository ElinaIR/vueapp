<template lang="">
    <Navbar></Navbar>
    <div v-if="this.$route.params.exam == 'ege'">
        <addEGEVariant></addEGEVariant>
    </div>
    <div v-else-if="this.$route.params.exam == 'oge'">
        <addOGEVariant></addOGEVariant>
    </div>
    <div v-else-if="this.$route.params.exam == 'vpr'">
        <addVPRVariant></addVPRVariant>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import addEGEVariant from '../views/addEGEVariant.vue'
import addOGEVariant from '../views/addOGEVariant.vue'
import addVPRVariant from '../views/addVPRVariant.vue'
export default {
    name: 'addVariant',
    components: {
        Navbar, addEGEVariant, addOGEVariant, addVPRVariant
    },
}
</script>
<style lang="">
    
</style>