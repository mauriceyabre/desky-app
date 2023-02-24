<template>
    <div class="card">
        <div class="card-header border-0 pt-6">
            <div class="card-title"></div>
            <div class="card-toolbar">
                <div class="d-flex justify-content-end" data-kt-user-table-toolbar="base">
                    <button type="button" class="btn btn-primary" @click.prevent="openMemberEditModaL(null)">
                        Aggiungi Membro
                        <span class="svg-icon svg-icon-2">
                            <i class="bi bi-plus-lg fs-4" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <div class="card-body py-4">
            <div class="table-responsive">
                <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer" id="members_table">
                    <thead>
                        <tr class="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                            <th class="min-w-50px">ID</th>
                            <th class="w-100 min-w-300px">Utente</th>
                            <th class="min-w-125px">Ruolo</th>
                            <th class="min-w-125px">Telefono</th>
                            <th class="min-w-150px text-center px-0">Prog. Assegnati</th>
                            <th class="min-w-125px text-center px-0">Stato</th>
                            <th class="min-w-150px">Ultimo Accesso</th>
                            <th class="text-end min-w-80px"></th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-600 fw-bold">
                        <tr v-for="(member, key) in members" :key="key">
                            <td>#{{ member.id }}</td>
                            <td class="d-flex align-items-center">
                                <div class="symbol symbol-50px overflow-hidden me-3">
                                    <AppLink :href="route('team.member.overview', {id: member.id})" class="text-gray-800 text-hover-primary mb-1">
                                        <div class="symbol-label fs-3 bg-light-primary text-primary">{{ member.initials }}</div>
                                    </AppLink>
                                </div>
                                <div class="d-flex flex-column">
                                    <AppLink :href="route('team.member.overview', {id: member.id})" class="text-gray-800 text-hover-primary mb-1">{{ member.name }}</AppLink>
                                    <span>{{ member.email }}</span>
                                </div>
                            </td>
                            <td>{{ member.jobTitle.capitalizeFirst() }}</td>
                            <td>{{ member?.phone }}</td>
                            <td class="text-center">
                                <span class="badge fs-7 px-4 py-3 badge-light-success" v-if="member.hasOngoingProjects">
                                    {{ member.ongoing_projects_count }} in corso
                                </span>
                                <span class="badge fs-7 px-4 py-3 badge-light" v-else>
                                    Inattivo
                                </span>
                            </td>
                            <td class="text-center">
                                <span class="badge fs-7 px-4 py-3" :class="member.has_started_session ? 'badge-light-success' : 'badge-light-danger'">
                                    {{ member.sessions_status }}
                                </span>
                            </td>
                            <td class="">
                                <span class="badge fs-7 px-4 py-3 badge-light" v-if="member.last_login">
                                    {{ moment(member.last_login).fromNow() }}
                                </span>
                                <span class="badge fs-7 px-4 py-3 badge-light text-center" v-else>
                                    --
                                </span>
                            </td>
                            <td class="text-end">
                                <button class="btn btn-light btn-active-light-primary h-30px w-30px btn-icon" data-bs-toggle="tooltip" data-bs-dismiss="click" title="Modifica" @click="openMemberEditModaL(member.id)">
                                    <span class="bi bi-pencil-fill"></span>
                                </button>
                                <button class="btn btn-light btn-active-light-warning h-30px w-30px btn-icon ms-2" data-bs-toggle="tooltip" data-bs-dismiss="click" @click="archive(member.id)" title="Archivia">
                                    <span class="bi bi-archive-fill" />
                                </button><!-- TODO:: Mostra pulsanti in base al ruolo dell'utente -->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <teleport to="body">
        <ModalFormMember v-if="membersStore.modal.isOpen" />
        <AppModal id="archived" :modal="archivedModal" size="large" title="Utenti Archiviati">
            <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer" id="kt_table_members">
                <thead>
                    <tr class="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                        <th class="min-w-75px">ID</th>
                        <th class="min-w-125px">Utente</th>
                        <th class="min-w-125px text-end">Data</th>
                        <th class="text-end"></th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 fw-bold">
                    <tr v-for="(member, key) in archivedMembers" :key="key">
                        <td>#{{ member.id }}</td>
                        <td class="d-flex align-items-center">
                            <div class="symbol symbol-50px overflow-hidden me-3">
                                <span class="symbol-label fs-3 bg-light-warning text-warning">{{ member.initials }}
                                </span>
                            </div>
                            <div class="d-flex flex-column">
                                <span class="text-gray-800 text-hover-warning mb-1">{{ member.name }}</span>
                                <span>{{ member.email }}</span>
                            </div>
                        </td>
                        <td class="text-end">
                            {{ (member.deleted_at) ? (moment(member.deleted_at).locale('it').fromNow()) : '-' }}
                        </td>
                        <td class="text-end">
                            <button class="btn btn-light btn-active-light-primary h-30px w-30px btn-icon" data-bs-toggle="tooltip" title="Ripristina" @click.prevent="restoreMember(member.id)">
                                <i class="bi bi-arrow-counterclockwise fs-4" />
                            </button><!-- TODO:: Mostra pulsanti in base al ruolo dell'utente -->
                        </td>
                    </tr>
                </tbody>
            </table>
        </AppModal>
    </teleport>
</template>
<script setup lang="ts">
    import { computed, nextTick, onUnmounted, ref, watchEffect } from "vue";
    import { SBModal, useModal } from "@Composables/useModal";
    import AppModal from "@Components/AppModal.vue";
    import useMembers from "@Composables/useMembers";
    import ModalFormMember from "@Pages/App/ModalFormMember.vue";
    import { useMembersStore } from "@Helpers/Stores/useMembersStore";
    import { router } from "@inertiajs/core";
    import SBCore from "@Helpers/SBCore";
    import User from "@Models/User";

    // PROPS
    interface Props {
        members: Object
    }
    const props = defineProps<Props>()

    const members = computed(() => Object.values(props.members).map(member => new User(member)))

    // MODALS
    const modal: SBModal = useModal('member_modal');
    const archivedModal: SBModal = useModal('archived_modal');

    const { setSelectedMember } = useMembers();

    // STORES
    const membersStore = useMembersStore();

    watchEffect(() => {
        nextTick(() => {
            membersStore.all = members.value;
        })
    })

    const archivedMembers = ref();

    function archive(id: string|number) {
        Desky.warningDialog({text: 'Vuoi Archiviare questo membro?', title: 'Archivia'}, () => {
            router.delete(route('team.member.destroy', { member: id }), {
                preserveState: true,
                preserveScroll: true,
                replace: true
            })
        })
    }

    const openMemberEditModaL = (id: string|number) => {
        setSelectedMember(id);
        membersStore.modal.isOpen = true;
    }

    onUnmounted(() => {
        membersStore.$reset();
    })

</script>
