<template>
    <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px" data-kt-menu="true">
        <div class="menu-item px-3">
            <div class="menu-content d-flex align-items-center px-3">
                <div class="symbol symbol-50px me-5">
                    <div class="symbol-label fs-3 fw-semibold">{{ user.initials }}</div>
                </div>
                <div class="d-flex flex-column">
                    <div class="fw-bold d-flex align-items-center fs-5">{{ user.name }}
                    </div>
                    <span class="fw-semibold text-muted fs-7">{{ user.email }}</span>
                </div>
            </div>
        </div>
        <div class="separator my-2"></div>
        <div class="menu-item px-5">
            <AppLink :href="route('profile.overview')" class="menu-link px-5">
                <i class="bi bi-person fs-4 me-4"></i>
                Profilo
            </AppLink>
        </div>
        <div class="menu-item px-5">
            <AppLink :href="route('profile.timesheet')" class="menu-link px-5">
                <i class="bi bi-calendar-week fs-4 me-4"></i>
                Foglio Presenze
            </AppLink>
        </div>
        <div class="menu-item px-5">
            <AppLink :href="route('profile.projects')" disabled class="menu-link px-5">
                <span class="menu-text">
                    <i class="bi bi-briefcase fs-4 me-4"></i>
                    Progetti
                </span>
            </AppLink>
        </div>
        <div class="separator my-2"></div>
        <div class="menu-item px-5 my-1">
            <AppLink :href="route('profile.settings')" class="menu-link px-5">
                <i class="bi bi-gear fs-4 me-4"></i>
                Impostazioni
            </AppLink>
        </div>
        <div class="menu-item px-5">
            <a role="button" @click.prevent="logout()" class="menu-link px-5 text-danger">
                <i class="bi bi-box-arrow-right fs-4 me-4 text-danger"></i>
                Esci
            </a>
        </div>
    </div>
</template>
<script lang="ts">
    import { computed, defineComponent } from "vue";
    import useAuth from "@Composables/useAuth";
    import { usePage } from "@inertiajs/vue3";
    import User from "@Models/User";

    export default defineComponent({
        name: 'AppMenuUserAccountMenu',
        setup() {
            const { login, logout } = useAuth();

            const user = computed(() => {
                return new User(usePage().props.auth?.user);
            });

            return { login, logout, user }
        }
    })
</script>
