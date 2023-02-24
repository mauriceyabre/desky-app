<template>
    <AppModal id="user_create" title="Crea Nuovo Membro" :modal="modal" centered>
        <template #form="modalData">
            <div class="px-10 py-12">
                <form :id="modalData?.formId" autocomplete="off" @reset.prevent @submit.prevent="submit">
                    <div class="mb-6">
                        <InputCustomSelect label="Ruolo" required :options="roleOptions" :form="form" name="role" v-model="form.role_key" />
                    </div>
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
                        <InputPassword required label="Nuova Password" :form="form" name="password" v-model="form.password" />
                    </div>
                    <div class="mb-6">
                        <InputPassword required label="Ripeti Password" :form="form" name="password_confirmation" v-model="form.password_confirmation" />
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
    import { computed, onMounted, ref } from "vue";
    import InputText from "@Components/Inputs/InputText.vue";
    import InputEmail from "@Components/Inputs/InputEmail.vue";
    import InputCustomSelect from "@Components/Inputs/InputCustomSelect.vue";
    import InputPassword from "@Components/Inputs/InputPassword.vue";

    const emits = defineEmits(['modal_closed'])

    const modal = useModal('user_create_modal')
    const roles = ref<Role[]>([]);
    const roleOptions = computed(() => roles.value)

    const form = useForm({
        role_key: 'designer',

        first_name: '',
        last_name: '',
        email: '',

        password: '',
        password_confirmation: '',

        country_code: 'IT',
    })

    const reset = () => {
        form.reset()
        if (form.hasErrors) form.clearErrors()
    }

    const submit = () => {
        form.post(route('user.store'), {
            onSuccess: () => {
                modal.close();
            },
            preserveScroll: true,
            preserveState: true,
            replace: true
        })
    }

    onMounted(async () => {
        await axios.get(route('roles.get-all')).then(res => {
            roles.value = res.data
        }).finally(() => {
            console.log(roleOptions.value)
        })

        modal.open();
        modal.onClosed(() => {
            form.reset()
            emits('modal_closed');
        })
    })
</script>
