<template>
    <AppHead :title="usePage().props.page?.title" />
    <component :is="layout">
        <slot />
    </component>
    <SessionModal v-if="global.sessionModalIsOpen" />
</template>
<script setup lang="ts">
    import { usePage } from "@inertiajs/vue3";
    import { computed, onMounted, onUpdated, watch } from "vue";
    import { useToast } from "vue-toastification";
    import AppLayout from "@Layouts/AppLayout.vue";
    import AuthLayout from "@Layouts/AuthLayout.vue"
    import { router } from "@inertiajs/core";
    import SessionModal from "@Components/Modals/SessionModal.vue";
    import { useGlobalStore } from "@Stores/useGlobalStore";

    const global = useGlobalStore()
    const toaster = useToast();

    const toast = computed(() => {
        return usePage().props.toast as { type: string, message: string }
    })

    const layout = computed<string>(() => {
        return !!usePage().props.auth?.user ? AppLayout : AuthLayout;
    })

    watch(toast, (toast) => {
        if (!toast) return;
        switch (toast.type) {
            case 'success' :
                toaster.success(toast.message)
                break;
            case 'danger' :
                toaster.error(toast.message)
                break;
            case 'warning' :
                toaster.warning(toast.message)
                break;
            default :
                toaster.info(toast.message)
        }
    })

    // STOP NAVIGATION IF TARGET IS THE SAME PAGE
    router.on('before', (e: CustomEvent) => {
        console.log(e)

        const method = e.detail.visit.method;

        if (method === 'get') {
            const hasOnly = !!e.detail.visit.only?.length;
            const current = document.location.href;
            const target = e.detail.visit.url.href;

            if (current === target && !hasOnly) {
                return false;
            }

            if (!e.detail.visit.preserveState) {
                global.startLoading()
            }
        }
    })

    router.on('navigate', () => {
        const modalElement = document.querySelector('.modal-backdrop')
        if (!!modalElement) {
            modalElement.remove()
        }
        if (global.isLoading) {
            global.stopLoading()
        }
    })

    router.on('finish', () => {

    })

    onUpdated(() => {
      KTComponents.init();
    })

    onMounted(() => {
        KTComponents.init();
    })
</script>
<style>
	body,
	body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown):not(.modal-open),
	body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown):not(.modal-open):not(.sweetalert2-nopadding) {
		overflow-y: scroll !important;
		}

	body.modal-open {
		padding-right: 0 !important;
		}

	.tagify .tagify__input {
		min-width: 0 !important;
		}

	.tagify__tag > div::before {
		box-shadow: none !important;
		}

	.tagify {
		--tag-bg: var(--kt-gray-200) !important;
		}

	.tagify .tagify__tag {
		background-color: var(--kt-gray-200) !important;
		}

	.tagify__tag__removeBtn:hover + div::before {
		transition: none !important;
		box-shadow: none !important;
		}

	body.swal2-height-auto {
		height: 100% !important;
		}
</style>
