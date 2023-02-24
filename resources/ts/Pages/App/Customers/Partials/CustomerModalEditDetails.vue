<template>
    <AppModal id="customer_edit" no-header :title="'Modifica Cliente'" :modal="modal" centered>
        <template #form="modalData">
            <div class="card">
                <div class="card-header position-relative min-h-50px p-0 border-bottom-2">
                    <ul class="nav nav-pills nav-pills-custom d-flex position-relative w-100" role="tablist">
                        <li class="nav-item mx-0 p-0 w-50" role="presentation">
                            <a class="nav-link btn btn-color-muted border-0 h-100 px-0 active" data-bs-toggle="tab" href="#customer_details">
                                <span class="nav-text fw-bold fs-4 mb-3">Dettagli</span>
                                <span class="bullet-custom position-absolute z-index-2 w-100 h-2px top-100 bottom-n100 bg-primary rounded"></span>
                            </a>
                        </li>
                        <li class="nav-item mx-0 p-0 w-50" role="presentation">
                            <a class="nav-link btn btn-color-muted border-0 h-100 px-0" data-bs-toggle="tab" href="#customer_fatturazione">
                                <span class="nav-text fw-bold fs-4 mb-3">Fatturazione</span>
                                <span class="bullet-custom position-absolute z-index-2 w-100 h-2px top-100 bottom-n100 bg-primary rounded"></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="p-10">
                <form :id="modalData?.formId" autocomplete="off" @reset.prevent @submit.prevent="submit">
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane show active" id="customer_details" role="tabpanel">
                            <InputText class="mb-6" :form="form" name="name" label="Nome o Ragione Sociale" required v-model="form.name" placeholder="es. ABC Srl" />
                            <div class="row mb-6">
                                <div class="col-md-6">
                                    <InputSelect :options="categoryOptions" :form="form" name="category" label="Settore" v-model="form.category" placeholder="Seleziona..." />
                                </div>
                                <div class="col-md-6">
                                    <InputSelect :options="typeOptions" :form="form" name="type" label="Tipo" v-model="form.type" placeholder="Seleziona..." />
                                </div>
                            </div>
                            <InputEmail class="mb-6" :form="form" name="email" v-model="form.email" label="Indirizzo Email" />
                            <InputTel class="mb-6" :form="form" name="phone" v-model="form.phone" label="Telefono" />
                            <InputUrl class="mb-6" :form="form" name="website" v-model="form.website" label="Sito Web" />
                        </div>
                        <div class="tab-pane" id="customer_fatturazione" role="tabpanel">
                            <InputText class="mb-6" :form="form" name="name" label="Nome o Ragione Sociale" required v-model="form.name" placeholder="es. ABC Srl" />
                            <InputText :form="form" name="vat_number" v-model="form.vat_number" label="Partita IVA" class="mb-6" />
                            <InputText :form="form" name="tax_code" v-model="form.tax_code" label="Codice Fiscale" class="mb-6" />
                            <div class="row mb-6">
                                <div class="col-4">
                                    <div class="my-1 pb-1">
                                        <InputSwitchButton :form="form" name="e_invoice" v-model="form.e_invoice" label="Fatt. Elettronica" />
                                    </div>
                                </div>
                                <div class="col-8">
                                    <InputText :form="form" v-if="form.e_invoice" :disabled="!form.e_invoice" name="sdi_code" v-model="form.sdi_code" label="Codice SDI" />
                                </div>
                            </div>
                            <InputEmail class="mb-6" :form="form" name="pec" v-model="form.pec" label="PEC" />
                            <div class="mb-6">
                                <InputSelect2 label="Paese" hide-search :form="form" :options="countries" name="address.country_code" v-model="form.address.country_code" in-modal />
                            </div>
                            <div class="mb-6">
                                <AppInputLabel>Indirizzo</AppInputLabel>
                                <div class="row">
                                    <div class="col-lg-12 fv-row">
                                        <InputText :form="form" name="address.street" class="mb-3" v-model="form.address.street" placeholder="Es. Via Mario Rossi, 10" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-3 fv-row pe-lg-2">
                                        <InputText :form="form" name="address.postcode" class="mb-3" v-model="form.address.postcode" placeholder="Cap" />
                                    </div>
                                    <div class="col-lg-6 fv-row px-lg-0">
                                        <InputText :form="form" name="address.city" class="mb-3" v-model="form.address.city" placeholder="Comune o Città" />
                                    </div>
                                    <div class="col-lg-3 fv-row ps-lg-2">
                                        <InputText :form="form" name="address.province" class="mb-3" v-model="form.address.province" placeholder="Prov." />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center pt-10">
                        <button type="button" class="btn btn-light me-3" @click.prevent="modal?.close()">
                            Annulla
                        </button>
                        <button type="submit" class="btn btn-primary" :disabled="form.processing || !(form.isDirty)">
                            <span class="indicator-label" v-if="!(form.processing)">Salva</span>
                            <span class="indicator-label" v-else>Attendere...
                                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </template>
    </AppModal>
</template>
<script setup lang="ts">
    import AppModal from "@Components/AppModal.vue";
    import { useForm } from "@inertiajs/vue3";
    import { useModal } from "@Composables/useModal";
    import { computed, onMounted, ref } from "vue";
    import Country from "@Models/Country";
    import InputSelect2 from "@Components/Inputs/InputSelect2.vue";
    import InputText from "@Components/Inputs/InputText.vue";
    import cloneDeep from "lodash/cloneDeep";
    import Customer from "@Models/Customer";
    import InputSelect from "@Components/Inputs/InputSelect.vue";
    import InputTel from "@Components/Inputs/InputTel.vue";
    import InputEmail from "@Components/Inputs/InputEmail.vue";
    import InputUrl from "@Components/Inputs/InputUrl.vue";
    import InputSwitchButton from "@Components/Inputs/InputSwitchButton.vue";

    interface Props {
        customer: Customer
    }
    const props = defineProps<Props>()
    const emits = defineEmits(['modal_closed'])

    const modal = useModal('customer_edit_modal');
    const countries = Country.getAllForSelect()

    const customer = computed(() => props.customer)

    const typeOptions = ref<SelectOption[]>([])
    const categoryOptions = ref<SelectOption[]>([])

    const form = useForm({
        name: customer.value.name,

        type: customer.value.type,
        category: customer.value.category,

        email: customer.value.email,
        pec: customer.value.pec,
        phone: customer.value.phone,

        vat_number: customer.value.vat_number,
        tax_code: customer.value.tax_code,
        e_invoice: !!customer.value.e_invoice,
        sdi_code: customer.value.sdi_code,

        address: {
            country_code: customer.value.address?.country_code,
            street: customer.value.address?.street,
            province: customer.value.address?.province,
            postcode: customer.value.address?.postcode,
            city: customer.value.address?.city,
        },

        default_vat_id: customer.value.default_vat_id,

        website: customer.value.website
    })

    let initialValues = cloneDeep(form.data());

    const reset = () => {
        form.reset()
        if (form.hasErrors) form.clearErrors()
    }

    const submit = () => {
        form.transform((data) => {
                let toEditDetails = {}
                let toEditAddress = {}

                Object.keys(data).forEach(key => {
                    if (key !== 'address') {
                        if (data[key] !== initialValues[key]) {
                            toEditDetails[key] = data[key]
                        }
                    } else {
                        Object.keys(data['address']).forEach(addKey => {
                            if (data['address'][addKey] !== initialValues['address'][addKey]) {
                                toEditAddress[addKey] = data['address'][addKey];
                            }
                        })
                    }
                })

                if (!!Object.keys(toEditAddress).length) {
                    toEditAddress['id'] = customer.value.address?.id ?? null
                }

                return {
                    ...toEditDetails,
                    address: !!Object.keys(toEditAddress).length ? toEditAddress : undefined
                }
            })
            .put(route('customer.update', customer.value.id), {
            replace: true,
            preserveScroll: true,
            preserveState: true
        })
    }

    onMounted(async() => {
        await axios.get(route('customers.fetch.types')).then((res) => {
            Object.entries(res.data as string[]).forEach((element) => {
                typeOptions.value.push({
                    value: element[0] as string,
                    title: element[1].replace('_', ' ').toLowerCase().capitalize() as string
                })
            })
        })

        await axios.get(route('customers.fetch.categories')).then((res) => {
            Object.entries(res.data as string[]).forEach((element) => {
                categoryOptions.value.push({
                    value: element[0] as string,
                    title: element[1].replace('_', ' ').toLowerCase().capitalize() as string
                })
            })
        })

        modal.open();
        modal.onClosed(() => {
            reset()
            emits('modal_closed');
        })
    })
</script>
