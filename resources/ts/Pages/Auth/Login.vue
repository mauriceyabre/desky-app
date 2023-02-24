<template>
    <form class="form w-100" novalidate="novalidate" autocomplete="off" id="kt_sign_in_form" @submit.prevent="login">
        <div class="text-center mb-11">
            <h1 class="text-dark fw-bolder mb-3">Accedi</h1>
            <div class="text-gray-500 fw-semibold fs-6">con le tue credenziali</div>
        </div>
        <InputText :form="form" name="email" placeholder="Email" v-model="form.email" class="mb-8" errors-hidden />
        <InputPassword :form="form" name="password" placeholder="Password" v-model="form.password" />
        <div class="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
            <div></div>
            <AppLink v-if="canResetPassword" :href="route('login')" class="link-primary">
                Password Dimenticata ?
            </AppLink>
        </div>
        <div class="d-grid mb-10">
            <AppButton type="submit" block :processing="form.processing">
                Accedi
            </AppButton>
        </div>
        <div class="alert alert-danger d-flex align-items-center p-3" v-if="showError">
            <div class="d-flex flex-column">
                <span>{{ form.errors.email }}</span>
            </div>
        </div>
        <div class="separator separator-content my-14">
            <span class="w-125px text-gray-500 fw-semibold fs-7">oppure</span>
        </div>
        <div class="row g-3 mb-9">
            <div class="col-md-12">
                <a href="#" class="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100 disabled">
                    <img alt="Logo" src="/assets/media/svg/brand-logos/google-icon.svg" class="h-15px me-3" />
                    Accedi con Google
                </a>
                <!-- TODO:: Implementare l'accesso con google -->
            </div>
        </div>
        <div class="text-gray-500 text-center fw-semibold fs-6 d-none">Sei sei ancora registrato?
            <a href="#" class="link-primary">Registrati</a><!-- TODO:: Implementare la registrazione -->
        </div>
    </form>
</template>
<script setup lang="ts">
    import AppButton from "@Components/AppButton.vue";
    import { useForm } from "@inertiajs/vue3";
    import { computed } from "vue";
    import InputText from "@Components/Inputs/InputText.vue";
    import InputPassword from "@Components/Inputs/InputPassword.vue";

    const form = useForm({
        email: '',
        password: '',
        remember: true
    })

    const canResetPassword = false;

    const showError = computed(() => form.errors.email);

    const login = () => {
        form.post(route('login'));
    }
</script>
