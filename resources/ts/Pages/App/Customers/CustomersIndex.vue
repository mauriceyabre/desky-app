<template>
    <div class="row">
        <div class="col-12">
            <div class="card card-flush">
                <div class="card-header pt-9">
                    <div class="d-flex flex-wrap">
                        <div class="d-flex align-items-center position-relative">
                            <span class="svg-icon svg-icon-3 position-absolute ms-5">
                                <i class="bi bi-search fs-4" />
                            </span>
                            <input type="text" data-kt-customer-table-filter="search" v-model="filter.search" class="form-control form-control-solid ps-12" placeholder="Cerca Clienti">
                        </div>
                    </div>
                    <div class="d-flex align-items-center flex-wrap">
                        <div class="d-flex justify-content-end" data-kt-user-table-toolbar="base">
                            <button class="btn btn-primary">
                                <i class="bi bi-plus-lg fs-4" />
                                Nuovo Cliente
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body table-responsive">
                    <table class="table table-sm table-row-bordered align-middle" :class="{'opacity-50': store.isLoading}">
                        <thead>
                            <tr class="text-start text-muted fw-bolder fs-7 text-uppercase">
                                <th>ID</th>
                                <th>CLIENTE</th>
                                <th class="text-center">Tipo</th>
                                <th class="text-center">Telefono</th>
                                <th class="text-center">P.IVA/CF</th>
                                <th class="text-center">Progetti/Attivi</th>
                                <th class="text-center">Creazione</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-600 fw-bold">
                            <tr v-for="(customer, key) in customers" :key="key">
                                <td>#{{ customer.id.toString().padStart(2, '0') }}</td>
                                <td class="align-items-center">
                                    <div class="d-flex">
                                        <div class="symbol symbol-50px overflow-hidden me-3">
                                            <AppLink :href="route('customer.show', {id: customer.id})" class="text-gray-800 text-hover-primary mb-1">
                                                <div class="symbol-label fs-3 bg-light-primary text-primary">{{ customer.initials }}</div>
                                            </AppLink>
                                        </div>
                                        <div class="d-flex flex-column justify-content-center text-nowrap">
                                            <AppLink :href="route('customer.show', {id: customer.id})" class="text-gray-800 text-hover-primary w-300px text-truncate">{{ customer.name }}</AppLink>
                                            <a v-if="customer.email" class="text-muted" :href="`mailto:${customer.email}`">{{ customer.email }}</a>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-nowrap text-center">{{ customer.type?.capitalize() }}</td>
                                <td class="text-nowrap text-center">{{ customer.phone ?? '-' }}</td>
                                <td class="text-nowrap text-center">{{ (customer.vat_number ?? customer.tax_code) ?? '-' }}</td>
                                <td class="text-nowrap text-center">
                                    <span :class="!!customer.active_projects_count ? 'badge-light-success' : 'badge-light'" class="badge fs-7 px-4 py-3">
                                        {{ customer.active_projects_count }} / {{ customer.projects_count }}
                                    </span>
                                </td>
                                <td class="text-nowrap text-center">{{ moment(customer.created_at).fromNow() }}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="row">
                        <div class="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start">
                            <div class="dataTables_info" aria-live="polite">{{ pagination?.from }} - {{ pagination?.to }} di {{ pagination?.total }}</div>
                        </div>
                        <div class="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
                            <div class="dataTables_paginate">
                                <ul class="pagination">
                                    <li class="paginate_button page-item previous" :class="{'disabled': !pagination?.prev_page_url }">
                                        <button tabindex="0" class="page-link" @click.prevent="goTo(pagination?.prev_page_url)">
                                            <i class="previous"></i>
                                        </button>
                                    </li>
                                    <li class="paginate_button page-item" :class="{'active': page.active}" v-for="(page, index) in pagination?.links.slice(1, pagination?.links.length-1)" :key="index">
                                        <button data-dt-idx="1" tabindex="0" class="page-link" @click.prevent="goTo(page.url)">{{ page.label }}</button>
                                    </li>
                                    <li class="paginate_button page-item next" :class="{'disabled': !pagination?.next_page_url }">
                                        <button tabindex="0" class="page-link" @click.prevent="goTo(pagination?.next_page_url)">
                                            <i class="next"></i>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { nextTick, onMounted, onUnmounted, reactive, watch } from "vue";
    import debounce from "lodash/debounce";
    import { useCustomersStore } from "@Stores/useCustomersStore";
    import { storeToRefs } from "pinia";

    const query = new URLSearchParams(window.location.search)
    const filter = reactive({ search: query.get('search') ?? undefined, page: new URLSearchParams(window.location.search).get('page') ?? undefined });

    const store = useCustomersStore()

    watch(filter, debounce(async (value) => {
        const filter = !!value?.page ? { search: value.search, page: 1 } : value
        await store.fetch(filter);

        await pushUrl()
    }, 500))

    const { customers, pagination } = storeToRefs(store)

    async function goTo(url: string) {
        store.isLoading = true
        await axios.get(url).then(res => {
            store.set(res.data)
        }).finally(() => {
            store.isLoading = false
        })

        await pushUrl()
    }

    async function pushUrl() {
        await nextTick(() => {
            if (store.isPaginated) {
                const searchParams = new URLSearchParams(window.location.search);
                searchParams.set('page', store.pagination!.current_page.toString());

                const newUrl = window.location.pathname + '?' + searchParams.toString();
                window.history.pushState(null, '', newUrl);
            }
        })
    }

    onMounted(async () => {
        await store.fetch(filter)
    })

    onUnmounted(() => {
        store.reset()
    })
</script>
