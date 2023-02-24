<template>
    <TeamMemberLayout :user="user" :is-current="isCurrent">
        <div class="row g-5 g-xxl-10">
            <div class="col-12 col-xxl-7">
                <div class="card">
                    <div class="card-header border-0">
                        <div class="card-title">
                            <h2>Dettagli</h2>
                        </div>
                    </div>
                    <div id="kt_account_settings_profile_details" class="collapse show">
                        <form id="kt_account_profile_details_form" class="form fv-plugins-bootstrap5 fv-plugins-framework" @reset.prevent @submit.prevent="submitDetails">
                            <div class="card-body pt-0">
                                <div class="row mb-6">
                                    <label class="col-lg-3 col-form-label required fw-bold fs-6 text-gray-600">Nome</label>
                                    <div class="col-lg-9">
                                        <div class="row">
                                            <div class="col-lg-6 fv-row fv-plugins-icon-container">
                                                <AppInput :form="form" name="first_name" v-model="form.first_name" />
                                            </div>
                                            <div class="col-lg-6 fv-row fv-plugins-icon-container">
                                                <AppInput :form="form" name="last_name" v-model="form.last_name" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-6">
                                    <label class="col-lg-3 col-form-label fw-bold fs-6 text-gray-600">
                                        <span>Mansione</span>
                                    </label>
                                    <div class="col-lg-9 fv-row">
                                        <AppInput :form="form" name="job" type="text" placeholder="es. 3D Artist" v-model="form.job" />
                                    </div>
                                </div>
                                <div class="row mb-6">
                                    <label class="col-lg-3 col-form-label fw-bold fs-6 text-gray-600">
                                        <span class="required">Paese</span>
                                    </label>
                                    <div class="col-lg-9 fv-row fv-plugins-icon-container">
                                        <InputSelect2 :options="countries" :form="form" name="country_code" id="country_code" placeholder="Seleziona un paese..." v-model="form.country_code"
                                                clearable />
                                    </div>
                                </div>
                                <div class="row mb-6" v-if="form.country_code === 'IT'">
                                    <label class="col-lg-3 col-form-label fw-bold fs-6 text-gray-600">Indirizzo
                                    </label>
                                    <div class="col-lg-9">
                                        <div class="row">
                                            <div class="col-lg-12 fv-row">
                                                <InputText :form="form" name="street" class="mb-3" v-model="form.street" placeholder="Es. Via Mario Rossi, 10" />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-3 fv-row pe-lg-2">
                                                <InputText :form="form" name="postcode" class="mb-3" v-model="form.postcode" placeholder="Cap" />
                                            </div>
                                            <div class="col-lg-6 fv-row px-lg-0">
                                                <InputText :form="form" name="city" class="mb-3" v-model="form.city" placeholder="Comune o Città" />
                                            </div>
                                            <div class="col-lg-3 fv-row ps-lg-2">
                                                <InputText :form="form" name="province" class="mb-3" v-model="form.province" placeholder="Prov." />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-6">
                                    <label class="col-lg-3 col-form-label fw-bold fs-6 text-gray-600">
                                        <span>Telefono</span>
                                    </label>
                                    <div class="col-lg-9 fv-row">
                                        <AppInput :form="form" name="phone" type="tel" placeholder="es. 3201234567" v-model="form.phone" />
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-lg-3 col-form-label fw-bold fs-6 text-gray-600">
                                        <span>Compleanno</span>
                                    </label>
                                    <div class="col-lg-9 fv-row">
                                        <InputDate :form="form" name="birthday" v-model="form.birthday" />
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer d-flex justify-content-end py-6 px-9">
                                <button class="btn btn-light btn-active-light-primary me-2" type="reset" @click.prevent="resetDetails" v-if="form.isDirty">Annulla
                                </button>
                                <button type="submit" class="btn btn-primary" id="kt_account_profile_details_submit" :disabled="form.processing || !form.isDirty">
                                    <span class="indicator-label" v-if="!(form.processing)">Salva
                                    </span>
                                    <span class="indicator-label" v-else>Attendere...
                                        <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                                    </span>
                                </button>
                            </div>
                            <input type="hidden">
                            <div></div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xxl-5">
                <div class="card">
                    <div class="card-header border-0">
                        <div class="card-title">
                            <h2>Account</h2>
                        </div>
                    </div>
                    <div class="card-body pt-0 pb-5">
                        <div class="table-responsive">
                            <table class="table align-middle table-row-dashed gy-5" id="kt_table_users_login_session">
                                <tbody class="fs-6 fw-bold text-gray-600">
                                    <tr>
                                        <td>Email</td>
                                        <td>{{ user.email }}</td>
                                        <td class="text-end">
                                            <button type="button" class="btn btn-icon btn-active-light-primary w-30px h-30px ms-auto" @click="emailModal.open()">
                                                <AppIcon v-html="IconArt005Pencil" size="3" />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Password</td>
                                        <td>********</td>
                                        <td class="text-end">
                                            <button type="button" class="btn btn-icon btn-active-light-primary w-30px h-30px ms-auto" @click="passwordModal.open()">
                                                <AppIcon v-html="IconArt005Pencil" size="3" />
                                            </button>
                                        </td>
                                    </tr>
                                    <!-- TODO:: Aggiungere Funzione Cambio Ruolo -->
                                    <!-- TODO:: Aggiungere Funzione Disattiva Account -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </TeamMemberLayout>
    <teleport to="body">
        <AppModal id="edit_email" title="Modifica indirizzo email di accesso" :modal="emailModal">
            <template #form="props">
                <MemberEditEmailForm :user="user" :form-id="props.formId" />
            </template>
        </AppModal>
        <AppModal id="edit_password" title="Modifica password di accesso" :modal="passwordModal">
            <template #form="props">
                <MemberEditPasswordForm :user="user" :form-id="props.formId" />
            </template>
        </AppModal>
        <!-- TODO:: Aggiungere Funzione Cambio Ruolo -->
    </teleport>
</template>
<script setup lang="ts">
    import CountryModel from "@Models/Country";
    import { useForm } from "@inertiajs/vue3";
    import User from "@Models/User";
    import InputSelect2 from "@Components/Inputs/InputSelect2.vue";
    import { useToast } from 'vue-toastification';
    import AppModal from "@Components/AppModal.vue";
    import MemberEditEmailForm from "@Components/Inputss/MemberEditEmailForm.vue";
    import MemberEditPasswordForm from "@Components/Inputss/MemberEditPasswordForm.vue";
    import AppInput from "@Components/Inputs/InputText.vue";
    import { useModal } from "@Composables/useModal";
    import { IconArt005Pencil } from "@Helpers/duotoneIcons";
    import AppIcon from "@Components/AppIcon.vue";
    import InputDate from "@Components/Inputs/InputDate.vue";
    import InputText from "@Components/Inputs/InputText.vue";
    import TeamMemberLayout from "@Layouts/app/TeamMemberLayout.vue";
    import { computed, ref, watch } from "vue";

    interface Props {
        member: Object,
        is_current: Boolean
    }

    const props = defineProps<Props>();

    const user = computed(() => {
        return new User(props.member);
    })

    const isCurrent = computed(() => props.is_current);

    const emailModal = useModal('edit_email_modal')
    const passwordModal = useModal('edit_password_modal')

    const countries = CountryModel.getAllForSelect()
    const toast = useToast()

    const touchedFields = ref(new Set())

    const form = useForm('form', {
        first_name: user.value.first_name,
        last_name: user.value.last_name,

        job: user.value.job,
        country_code: user.value.address?.country_code,
        street: user.value.address?.street,
        postcode: user.value.address?.postcode,
        city: user.value.address?.city,
        province: user.value.address?.province,
        birthday: user.value.birthday,
        phone: user.value.phone,
    })

    watch(() => form.data(), (newData, oldData) => {
        let changeFields = Object.keys(newData).filter(field => newData[field] !== oldData[field]);
        touchedFields.value = new Set([...changeFields, ...touchedFields.value]);
        console.log(touchedFields.value)
    })

    const submitDetails = () => {
        form
            .transform((data) => {
                const filtered = Object.fromEntries(Object.entries(data).filter(([key]) =>
                    Array.from(touchedFields.value).includes(key)));
                return {
                    ...filtered
                }
            })
            .put(route('team.member.update', user.value.id), {
                preserveScroll: true,
                preserveState: true,
                onSuccess() {
                    touchedFields.value = new Set();
                }
            })
    }

    const resetDetails = () => {
        form.reset();
        form.clearErrors();
    }
</script>
