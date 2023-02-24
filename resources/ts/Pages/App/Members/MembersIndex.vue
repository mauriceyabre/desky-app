<template>
    <div class="row">
        <div class="col-md-2">
            <div class="row g-3 g-lg-6">
                <div class="col-12">
                    <AppLink :href="route('members.index')" preserve-state preserve-scroll>
                        <div class="card">
                            <div class="card-body p-4 d-flex flex-center justify-content-start">
                                <i :class="`bi bi-people fs-2x p-4 ${!isArchived ? 'bg-light-primary text-primary' : 'bg-light'} rounded`" />
                                <div class="ms-4">
                                    <span class="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">{{ counts.active }}</span>
                                    <span class="text-gray-500 fw-semibold fs-6">Attivi</span>
                                </div>
                            </div>
                        </div>
                    </AppLink>
                </div>
                <div class="col-12" v-if="!!counts.archived">
                    <AppLink :href="route('members.archived')" preserve-state preserve-scroll>
                        <div class="card">
                            <div class="card-body p-4 d-flex flex-center justify-content-start">
                                <i :class="`bi bi-archive fs-2x p-4 ${isArchived ? 'bg-light-warning text-warning' : 'bg-light'} rounded`" />
                                <div class="ms-4">
                                    <span class="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">{{ counts.archived }}</span>
                                    <span class="text-gray-500 fw-semibold fs-6">Archiviati</span>
                                </div>
                            </div>
                        </div>
                    </AppLink>
                </div>
            </div>
        </div>
        <div class="col-md-10">
            <div class="card">
                <div class="card-header align-items-center py-5 gap-2 gap-md-5">
                    <div class="d-flex flex-wrap gap-2"></div>
                    <div class="d-flex align-items-center flex-wrap gap-2">
                        <div class="d-flex justify-content-end" data-kt-user-table-toolbar="base" v-if="!isArchived">
                            <button class="btn btn-primary btn-sm" @click.prevent="isCreateModalOpen = true">
                                <i class="bi bi-plus-lg fs-4" />
                                Nuovo
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body py-4 table-responsive">
                    <MembersTableIndex :members="members" v-if="!isArchived"/>
                    <MembersTableArchived :members="members" v-if="isArchived" />
                </div>
            </div>
        </div>
    </div>
    <teleport to="body">
        <MemberModalCreate v-if="isCreateModalOpen" @modal_closed="reset" />
    </teleport>
</template>
<script setup lang="ts">
    import { computed, ref } from "vue";
    import User from "@Models/User";
    import MembersTableIndex from "@Pages/App/Members/Partials/MembersTableIndex.vue";
    import MembersTableArchived from "@Pages/App/Members/Partials/MembersTableArchived.vue";
    import { usePage } from "@inertiajs/vue3";
    import MemberModalCreate from "@Pages/App/Members/Partials/MemberModalCreate.vue";

    interface Props {
        members: Object,
        counts: {
            active: Number,
            archived: Number
        }
    }
    const props = defineProps<Props>()

    const members = computed(() => Object.values(props.members).map(member => new User(member)))
    const isArchived = computed(() => usePage().url.endsWith('archived'))

    const isCreateModalOpen = ref(false)

    function reset() {
        isCreateModalOpen.value = false
    }

</script>
