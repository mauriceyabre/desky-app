import './bootstrap';
import '@Helpers/PrototypeExtensions'

import { createApp, h } from 'vue';
import { createInertiaApp, Head, Link } from '@inertiajs/vue3';
import { createPinia } from "pinia";
import VueApexCharts from "vue3-apexcharts";
import flatpickr from "flatpickr";
import { Italian } from "flatpickr/dist/l10n/it";
import Toast, { PluginOptions, POSITION } from "vue-toastification"
import "vue-toastification/dist/index.css"
// import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';

import App from './App.vue';

flatpickr.localize(Italian)

moment.locale('it')
moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss'

const pinia = createPinia()

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

const toastOptions: PluginOptions = {
    position: POSITION.TOP_CENTER,
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: false,
    icon: true,
    rtl: false,
    transition: "Vue-Toastification__fade",
    maxToasts: 5,
    newestOnTop: true
}

async function resolvePageComponent(name: string, pages: Record<string, any>) {
    const path = Object.keys(pages)
        .sort((a, b) => a.length - b.length)
        .find((path) => path.endsWith(`${ name.replaceAll('.', '/') }.vue`))

    if (!path) {
        throw new Error(`Page not found: ${ name }`)
    }

    return typeof pages[path] === 'function'
        ? await pages[path]()
        : pages[path]
}

createInertiaApp({
    title: (title) => `${ title } - ${ appName }`,
    resolve: (name) => {
        const page = resolvePageComponent(name, import.meta.glob('./Pages/**/*.vue'));
        page.then((module: any) => {
            module.default.layout = module.default.layout || App
        });
        return page as Promise<any>;
    },
    setup({ el, App, props, plugin }): any {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            // .use(ZiggyVue, Ziggy)
            .use(pinia)
            .use(VueApexCharts)
            .use(Toast, toastOptions)
            .mixin({ methods: { route, moment } })
            .component('AppLink', Link)
            .component('AppHead', Head)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
        showSpinner: true
    },
});
