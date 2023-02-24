<template>
    <div class="d-flex flex-column flex-lg-row">
        <div class="flex-column flex-lg-row-auto w-lg-250px w-xl-350px mb-10">
            <div class="card mb-5 mb-xl-8">
                <div class="card-body">
                    <div class="d-flex flex-center flex-column py-5">
                        <div class="symbol symbol-100px mb-7">
                            <AppSymbol size="25">
                                <span class="fs-3x fw-normal">
                                    {{ user.initials }}
                                </span>
                            </AppSymbol>
                            <div class="position-absolute translate-middle bottom-0 start-100 mb-6 rounded-circle border border-4 border-body h-20px w-20px" :class="user.hasActiveSession ? 'bg-success' : 'bg-danger'"></div>
                        </div>
                        <span class="fs-3 text-gray-800 fw-bolder">{{ user.name }}</span>
                        <div class="mb-9">
                            <span class="fs-5 fw-semibold text-muted text-hover-primary mb-6">{{ user.email }}</span>
                        </div>
                    </div>
                    <div class="d-flex flex-stack fs-4 py-3">
                        <span class="fw-bolder">Dettagli</span>
                        <div class="badge badge-light-primary d-inline">{{ user.jobTitle.capitalize() }}</div>
                    </div>
                    <div class="separator"></div>
                    <div id="kt_user_view_details">
                        <div class="pb-5 fs-6">
                            <div>
                                <div class="fw-bold mt-5">Matricola</div>
                                <div class="text-gray-600">ID{{ user.formattedId }}</div>
                            </div>
                            <div>
                                <div class="fw-bold mt-5">Email</div>
                                <div class="text-gray-600">
                                    <a :href="`mailto:${user.email}`" class="text-gray-600 text-hover-primary">{{ user.email }}</a>
                                </div>
                            </div>
                            <div v-if="user.phone">
                                <div class="fw-bold mt-5">Telefono</div>
                                <div class="text-gray-600">
                                    <a href="#" class="text-gray-600 text-hover-primary">{{ user.phone }}</a>
                                </div>
                            </div>
                            <div v-if="user.hasAddress">
                                <div class="fw-bold mt-5">Indirizzo</div>
                                <div class="text-gray-600" v-html="user.plainAddress"></div>
                            </div>
                            <div v-if="user.country_code">
                                <div class="fw-bold mt-5">Paese</div>
                                <div class="text-gray-600">{{ user.countryName }}</div>
                            </div>
                            <div v-if="user.birthday">
                                <div class="fw-bold mt-5">Compleanno</div>
                                <div class="text-gray-600">
                                    {{ moment(user.birthday).locale('it').format('DD MMM YYYY').capitalize() }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-5 mb-xl-8" v-if="user.description">
                <div class="card-header border-0">
                    <div class="card-title">
                        <h3 class="fw-bolder m-0">Descrizione</h3>
                    </div>
                </div>
                <div class="card-body pt-2">
                    {{ user.description }}
                </div>
            </div>
        </div>
        <div class="flex-lg-row-fluid ms-lg-15">
            <ul class="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-bold mb-8">
                <li class="nav-item" v-for="tab in tabs" :key="tab.key">
                    <AppLink role="link" class="nav-link text-active-primary pb-4" :href="tab.route" replace
                            :class="{'active': activePage.endsWith(tab.key)}" preserve-state preserve-scroll>
                        {{ tab.title }}
                    </AppLink>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <slot />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import User from "@Models/User";
    import { computed, onBeforeUnmount } from "vue";
    import MemberShowOverview from '@Pages/App/TeamMemberOverview.vue';
    import MemberShowSettings from '@Pages/App/TeamMemberSettings.vue';
    import MemberShowTimesheet from '@Pages/App/TeamMemberTimesheet.vue'
    import { useProjectsStore } from "@Helpers/Stores/useProjectsStore";
    import { usePage } from "@inertiajs/vue3";
    import AppSymbol from "@Components/AppSymbol.vue";

    interface Props {
        user: User,
        isCurrent: boolean
    }

    const props = defineProps<Props>();

    const user = computed(() => props.user);
    const userId = user.value.id ?? 0
    const activePage = computed(() => usePage().url)

    const tabs = [
        {
            key: 'overview',
            title: 'Panoramica',
            component: MemberShowOverview,
            route: (props.isCurrent) ? route('profile.overview') : route('team.member.overview', { member: userId })
        },
        // {
        //     key: 'projects',
        //     title: 'Progetti',
        //     component: MemberShowProjects,
        //     route: (props.isCurrent) ? route('profile.projects') :route('team.member.projects', { member: userId.value })
        // },
        {
            key: 'timesheet',
            title: 'Foglio Presenze',
            component: MemberShowTimesheet,
            route: (props.isCurrent) ? route('profile.timesheet') : route('team.member.timesheet', { member: userId })
        },
        {
            key: 'settings',
            title: 'Impostazioni',
            component: MemberShowSettings,
            route: (props.isCurrent) ? route('profile.settings') : route('team.member.settings', { member: userId })
        }
    ]

    onBeforeUnmount(() => {
        useProjectsStore().$reset();
    })

</script>
