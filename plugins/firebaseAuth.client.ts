import {initializeApp} from "firebase/app";
import {
    getAuth,
} from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {

    const runtimeConfig = useRuntimeConfig();

    const firebaseConfig = {
        apiKey: runtimeConfig.public.apiKey,
    };

    const app = initializeApp(firebaseConfig);

    initUser();

    const auth = getAuth();

    nuxtApp.vueApp.provide('auth', auth);
    nuxtApp.provide('auth', auth);
});
