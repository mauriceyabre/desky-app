declare module '*.vue' {
    import type { defineComponent } from 'vue'
    const component: ReturnType<typeof defineComponent>
    export default component
}

import { Head, Link } from "@inertiajs/vue3";

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        AppLink: typeof Link,
        AppHead: typeof Head
    }
}
