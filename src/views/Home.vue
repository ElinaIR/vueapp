<template>
    <div class="vh-100 d-flex flex-column justify-content-center back_img">
    <div class="fixed-top"><Navbar></Navbar></div>
    <div class="container">
        <div class="">
            <strong><h1 class="text-center gradient_text text-uppercase"> Онлайн тренажер </h1></strong>
            <h4 class="text-center mt-5 text-uppercase text-danger"> Формат экзамена </h4>
            <div class="w-50 mx-auto my-5 d-flex justify-content-around">
                <router-link :to = "{ name: 'exam', params: { exam: 'vpr' } }" exact class="btn format_btn"> ВПР </router-link>
                <router-link :to = "{ name: 'exam', params: { exam: 'oge' } }" exact class="btn format_btn"> ОГЭ </router-link>
                <router-link :to = "{ name: 'exam', params: { exam: 'ege' } }" exact class="btn format_btn"> ЕГЭ </router-link>
            </div>
        </div>
    </div>
    </div>

</template>

<script>
    import Navbar from '../components/Navbar.vue'
    export default {
        name: 'Home',
        components: {
            Navbar,
        },
    }
</script>

<style scoped>
    .back_img {
        background-image: url('../assets/back_img.png');
        margin: 0;
        background-repeat: no-repeat;
        background-size: auto, cover;
        background-attachment: fixed;
        background-position: bottom;
    }
    .format_btn {
        width: 100px;
        background: #FFB904;
    }
    .format_btn:hover {
        /* opacity: 1; */
        background: linear-gradient(to bottom right, #FFB904, #F2DB9F, #FFB904);
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    }
    .gradient_text {
        /* background-color: #f3ec78; */
        background-image: linear-gradient(#006CB5, transparent);
        background-size: 100%;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent; 
        -moz-text-fill-color: transparent;
    }
</style>