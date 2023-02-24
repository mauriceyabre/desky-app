import { defineStore } from "pinia";
import Customer from "@Models/Customer";
import { computed, ref } from "vue";

export const useCustomersStore = defineStore('customersStore', () => {
    const customersData = ref<any>({})
    const isLoading = ref(false)

    const isPaginated = computed(() => Object.keys(customersData.value).includes('current_page'))
    const hasCustomers = computed(() => isPaginated ? !!Object.keys(customersData.value.data).length : !!Object.keys(customersData.value).length)
    const customers = computed(() => {
        const data = isPaginated.value ? customersData.value.data : customersData.value
        return hasCustomers ? Object.values(data).map(customer => new Customer(customer)) : []
    })
    const pagination = computed(() => isPaginated.value ? customersData.value as Pagination : null)

    function reset() {
        customersData.value = {}
    }

    async function fetch (filter?: {search?: string, page?: string}) {
        isLoading.value = true
        axios.get(route('api.v1.customers.index', filter)).then((res) => {
            customersData.value = res.data
        }).finally(() => {
            isLoading.value = false
        })
    }

    function set(data: any) {
        isLoading.value = true
        customersData.value = data
        isLoading.value = false
    }

    return {
        isPaginated,
        hasCustomers,
        customers,
        reset,
        fetch,
        set,
        pagination,
        isLoading
    }
})
