<template lang="">
    <div>
        
    </div>
</template>
<script>
export default {
    name: 'Logout',
    created() {
        this.$store.dispatch('userLogout').then(() => {
            this.$router.push({ name: 'home' })
        })
    }
}
</script>
<style lang="">
    
</style>