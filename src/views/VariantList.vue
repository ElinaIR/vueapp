<template>
    <Navbar></Navbar>
    <div class="container-sm">
        <strong><h1 class="text-center mt-5 gradient_text text-uppercase"> Варианты </h1></strong>
        <div class="w-75 mx-auto my-5 d-flex justify-content-around flex-wrap" >
            <div v-for="variant in APIData" :key="variant.id">
                <div class="d-flex flex-column m-2">
                    <router-link :to = "{ name: 'ege-task1', params: { exam: this.$route.params.exam, id: variant.id } }" exact class="btn format_btn"> {{ variant.name }} </router-link>
                    <router-link :to = "{ name: 'edit-variant', params: { exam: this.$route.params.exam, id: variant.id } }" exact v-if="(accessToken != null) && (user.userprofile.role == 1) && (variant.creator.id == user.id)" class="link-dark"><small> Редактировать </small></router-link>
                </div>
            </div>
        </div>
        <div class="text-center">
            <router-link :to = "{ name: 'add-variant', params: { exam: this.$route.params.exam } }" exact v-if="(accessToken != null) && (user.userprofile.role == 1)" class="btn btn-outline-warning"> Добавить вариант </router-link>
        </div>

        <button class="btn btn-outline-dark my-4" @click="downloadAll()">Скачать все варианты</button>
    </div>

</template>

<script>
    import { API } from '../axios-api'
    import { mapState } from 'vuex'
    import Navbar from '../components/Navbar.vue'
    import JSZip from 'jszip'
    import JSZipUtils from 'jszip-utils'
    import saveAs from 'save-as'

    export default {
        name: 'VariantList',
        components: {
            Navbar
        },
        data() {
            return {
                APIData: []
            }
        },
        computed: mapState(['accessToken', 'user']),
        created() {
            API.get(`/${this.$route.params.exam}/variants`).then(response => {
                console.log(response.data)
                this.APIData = response.data
            }).catch(err => {
                console.log(err)
            })
        },
        methods: {
            downloadAll() {
                var zip = new JSZip()
                var zipFilename = ''
                if (this.$route.params.exam == 'ege') {
                    zipFilename = 'ЕГЭ.zip'
                }
                else if (this.$route.params.exam == 'oge') {
                    zipFilename = 'ОГЭ.zip'
                }
                else if (this.$route.params.exam == 'vpr') {
                    zipFilename = 'ВПР.zip'
                }
                let variants = this.APIData
                variants.forEach(v => {
                    if (v.pdf) {
                        var filename = `${v.name}.pdf`
                        var url = v.pdf
                        console.log(url)

                        try {
                            let file = JSZipUtils.getBinaryContent(url)
                            zip.file(filename, file, {binary: true})
                        } catch (err) {
                            console.log(err)
                        }
                    }
                })

                try {
                    zip.generateAsync({ type: 'blob' }).then(content => {
                        saveAs(content, zipFilename)
                    })
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }
</script>

<style scoped>
    .format_btn {
        background: #FFB904;
    }
    .format_btn:hover {
        background: linear-gradient(to bottom right, #FFB904, #F2DB9F, #FFB904);
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    }
    .gradient_text {
        background-image: linear-gradient(#006CB5, transparent);
        background-size: 100%;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent; 
        -moz-text-fill-color: transparent;
    }
</style>