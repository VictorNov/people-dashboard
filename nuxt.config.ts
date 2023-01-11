export default defineNuxtConfig({
    css: [
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.min.css',
    ],
    build: {
        transpile: ['vuetify'],
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },
    modules: [
        '@nuxt/image-edge',
    ],
    runtimeConfig: {
        apiKey: '',
        authDomain: '',
        projectId: '',
        backendApi: '',
    },
    ssr: false,
})
