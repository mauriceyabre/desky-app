import type { Page } from '@inertiajs/core'

declare module '@inertiajs/core' {
    interface PageProps extends Page<PageProps> {
        page?: {
            title?: string
            isFluid?: boolean
        }
        errors: inertia.Errors,
        errorBags: inertia.ErrorBags,
        auth: inertia.Auth,
        toast: { type: string, message: string },
        title?: string,
        layout?: string
    }
}

declare module '@inertiajs/vue3' {
    export function usePage<T>(): Page<T>
}
