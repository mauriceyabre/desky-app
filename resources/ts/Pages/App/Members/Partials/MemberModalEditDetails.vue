<template>
    <AppModal id="user_edit" :title="formName" :modal="modal" centered>
        <template #form="modalData">
            <div class="px-10 py-12">
                <form :id="modalData?.formId" autocomplete="off" @reset.prevent @submit.prevent="submit">
                    <div class="mb-6">
                        <div class="row">
                            <div class="col-lg-6">
                                <InputText :form="form" name="first_name" label="Nome" required v-model="form.first_name" placeholder="Mario" />
                            </div>
                            <div class="col-lg-6">
                                <InputText :form="form" name="last_name" label="Cognome" required v-model="form.last_name" placeholder="Rossi" />
                            </div>
                        </div>
                    </div>
                    <div class="mb-6">
                        <InputText :form="form" name="job" label="Mansione" v-model="form.job" placeholder="3D Artist" />
                    </div>
                    <div class="mb-6">
                        <InputSelect2 label="Paese" :options="countries" :form="form" name="address.country_code" id="country_code" placeholder="Seleziona un paese..." v-model="form.address.country_code"
                            clearable />
                    </div>
                    <div class="mb-6" v-if="form.address.country_code === 'IT'">
                        <InputLabel>Indirizzo</InputLabel>
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
                    <div class="mb-6">
                        <InputText :form="form" name="phone" type="tel" placeholder="es. 3201234567" v-model="form.phone" />
                    </div>
                    <div class="">
                        <InputDate :form="form" name="birthday" v-model="form.birthday"/>
                    </div>
                    <div class="text-center pt-15">
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
    import { computed, onMounted } from "vue";
    import User from "@Models/User";
    import Country from "@Models/Country";
    import InputSelect2 from "@Components/Inputs/InputSelect2.vue";
    import InputText from "@Components/Inputs/InputText.vue";
    import InputDate from "@Components/Inputs/InputDate.vue";
    import cloneDeep from "lodash/cloneDeep";
    import InputLabel from "@Components/Inputs/InputLabel.vue";

    interface Props {
        selected_member: User
    }
    const props = defineProps<Props>()
    const emits = defineEmits(['modal_closed'])

    const modal = useModal('user_edit_modal');
    const countries = Country.getAllForSelect()

    const user = computed(() => props.selected_member)
    const formName = computed<string>(() => {
        if (user.value && Object.keys(user.value!).length) {
            return (form.first_name + ' ' + form.last_name) as string
        } else {
            return 'Nuovo Membro';
        }
    })

    const form = useForm({
        role_key: user.value.role?.key,
        first_name: user.value.first_name,
        last_name: user.value.last_name,
        email: user.value.email,
        job: user.value.job,

        address: {
            country_code: user.value.address?.country_code,
            street: user.value.address?.street,
            province: user.value.address?.province,
            postcode: user.value.address?.postcode,
            city: user.value.address?.city,
        },

        phone: user.value.phone,
        birthday: user.value.birthday
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
                    toEditAddress['id'] = user.value.address?.addressable_id ?? null
                }

                return {
                    ...toEditDetails,
                    address: !!Object.keys(toEditAddress).length ? toEditAddress : undefined
                }
            })
            .put(route('user.update', user.value.id), {
            replace: true,
            preserveScroll: true,
            preserveState: true
        })
    }

    onMounted(() => {
        modal.open();
        modal.onClosed(() => {
            reset()
            emits('modal_closed');
        })
    })
</script>
