import { defineStore } from "pinia";
import { computed, ref } from "vue";

interface State {
    timeLog: {
        modal: {
            isOpen: boolean
        }
    }
}

export const useGlobalStore = defineStore('globalStore', () =>{
    // STATE
    const session = ref({modal: { isOpen: false }})
    const isLoading = ref(false)

    // GETTERS
    const sessionModalIsOpen = computed(() => session.value.modal.isOpen)

    // ACTIONS
    function openSessionModal() {
        if (!sessionModalIsOpen.value)
        session.value.modal.isOpen = true
    }

    function closeSessionModal() {
        if (sessionModalIsOpen.value)
        session.value.modal.isOpen = false
    }

    function startLoading() {
        isLoading.value = true
    }
    function stopLoading() {
        isLoading.value = false
    }

    return {
        sessionModalIsOpen,
        openSessionModal,
        closeSessionModal,
        startLoading,
        stopLoading,
        isLoading: computed(() => isLoading.value)
    }
})
