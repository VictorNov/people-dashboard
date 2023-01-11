import {
    createVuetify
} from 'vuetify';
import * as components
    from 'vuetify/components';
import * as directives
    from 'vuetify/directives';

const myCustomLightTheme = {
    dark: false,
    colors: {
        background: '#f6f6f6',
        surface: '#f6f6f6',
    }
};

export default defineNuxtPlugin(
    nuxtApp => {
        const vuetify = createVuetify(
            {
                components,
                directives,
                theme: {
                    defaultTheme: 'myCustomLightTheme',
                    themes: {
                        myCustomLightTheme,
                    }
                }
            });

        nuxtApp.vueApp.use(
            vuetify);
    });