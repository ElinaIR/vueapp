<template lang="">
    <Navbar></Navbar>
    <div v-if="this.$route.params.exam == 'ege'">
        <editEGEVariant></editEGEVariant>
    </div>
    <div v-else-if="this.$route.params.exam == 'oge'">
        <editOGEVariant></editOGEVariant>
    </div>
    <div v-else-if="this.$route.params.exam == 'vpr'">
        <editVPRVariant></editVPRVariant>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import editEGEVariant from '../views/editEGEVariant.vue'
import editOGEVariant from '../views/editOGEVariant.vue'
import editVPRVariant from '../views/editVPRVariant.vue'
export default {
    name: 'editVariant',
    components: {
        Navbar, editEGEVariant, editOGEVariant, editVPRVariant
    },
}
</script>
<style lang="">
    
</style>