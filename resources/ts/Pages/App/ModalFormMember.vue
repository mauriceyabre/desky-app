<template>
    <AppModal id="member" :title="formName" :modal="modal">
        <template #form="modalData">
            <div class="px-10 py-12">
                <form :id="modalData.formId" autocomplete="off" @reset.prevent @submit.prevent="submit">
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
                        <InputEmail :form="form" name="email" label="Email" required v-model="form.email" placeholder="esempio@email.com" />
                    </div>
                    <div class="mb-6">
                        <InputText :form="form" name="job" label="Mansione" v-model="form.job" placeholder="3D Artist" />
                    </div>
                    <div class="mb-6">
                        <AppInputLabel required>Paese</AppInputLabel>
                        <InputSelect2 :data-dropdown-parent="'#' + modalData.modalId" clearable data-hide-search="true" :options="countries" :form="form" name="country_code"
                                id="country_code" placeholder="Seleziona un paese..." v-model="form.country_code" />
                    </div>
                    <div class="mb-6" v-if="form.country_code === 'IT'">
                        <AppInputLabel>Indirizzo</AppInputLabel>
                        <div class="row mb-2">
                            <div class="col-lg-12 fv-row">
                                <AppInput :form="form" name="address.street" v-model="form.address.street" placeholder="Via Donatori di Sangue, 2" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-3 fv-row pe-lg-2">
                                <AppInput :form="form" name="address.postcode" type="number" v-model="form.address.postcode" placeholder="46043" />
                            </div>
                            <div class="col-lg-6 fv-row px-lg-0">
                                <AppInput :form="form" name="address.city" v-model="form.address.city" placeholder="Castiglione delle Stiviere" />
                            </div>
                            <div class="col-lg-3 fv-row ps-lg-2">
                                <AppInput :form="form" name="address.province" max="2" min="2" v-model="form.address.province" placeholder="MN" />
                            </div>
                        </div>
                        <div :class="form.errors?.address ? 'is-invalid' : ''" v-if="form.errors?.address"></div>
                        <div :class="form.errors?.address ? 'invalid-feedback' : ''" v-if="form.errors?.address">{{form.errors?.address}}</div>
                    </div>
                    <div class="mb-6">
                        <AppInputLabel>Telefono</AppInputLabel>
                        <AppInput :form="form" name="phone" type="tel" placeholder="3201234567" v-model="form.phone" />
                    </div>
                    <div class="">
                        <AppInputLabel>Compleanno</AppInputLabel>
                        <InputDate :form="form" name="birthday" v-model="form.birthday"/>
                    </div>
                    <AppInput :form="form" name="id" type="hidden" v-model="form.id" />
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
    import AppInput from "@Components/Inputs/InputText.vue";
    import { useForm } from "@inertiajs/vue3";
    import { SBModal, useModal } from "@Composables/useModal";
    import { computed, onMounted } from "vue";
    import User from "@Models/User";
    import Country from "@Models/Country";
    import InputSelect2 from "@Components/Inputs/InputSelect2.vue";
    import { useMembersStore } from "@Helpers/Stores/useMembersStore";
    import InputText from "@Components/Inputs/InputText.vue";
    import InputEmail from "@Components/Inputs/InputEmail.vue";
    import InputDate from "@Components/Inputs/InputDate.vue";

    const membersStore = useMembersStore();

    membersStore.modal.element = useModal('member_modal');

    const modal = computed<SBModal|null>(() => {
        return membersStore.modal.element;
    });

    const user = computed<User | null>(() => membersStore.selected)
    const countries = Country.getAllForSelect()

    const formName = computed<string>(() => {
        if (user.value && Object.keys(user.value!).length) {
            return (form.first_name + ' ' + form.last_name) as string
        } else {
            return 'Nuovo Membro';
        }
    })

    const form = useForm({
        id: user.value?.id,
        first_name: user.value?.first_name,
        last_name: user.value?.last_name,
        email: user.value?.email,
        job: user.value?.job,
        country_code: user.value?.address?.country_code,
        birthday: user.value?.birthday,
        phone: user.value?.phone,
        address: {
            street: user.value?.address?.street,
            province: user.value?.address?.province,
            postcode: user.value?.address?.postcode,
            city: user.value?.address?.city
        }
    })

    const reset = () => {
        form.reset()
        if (form.hasErrors) form.clearErrors()
    }

    const submit = () => {
        if (!user.value) {
            form.post(route('user.store'), {
                onSuccess: () => {
                    modal.value?.close();
                },
                preserveScroll: true,
                preserveState: true,
                replace: true
            })
        } else if (user.value && !!user.value.id) {
            form.put(route('user.update', form.id), {
                onSuccess: () => {
                    membersStore.refreshSelected();
                },
                replace: true,
                preserveScroll: true,
                preserveState: true
            })
        }
    }

    onMounted(() => {
        modal.value?.open();

        modal.value?.onClosed(() => {
            reset();
            membersStore.selected = null;
            membersStore.modal.isOpen = false;
        })
    })
</script>
