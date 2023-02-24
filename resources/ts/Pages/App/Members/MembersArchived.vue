<template>
    <div class="card">
        <div class="card-header align-items-center py-5 gap-2 gap-md-5">
            <div class="d-flex flex-wrap gap-2">
                <AppLink :href="route('members.index')" class="btn btn-sm btn-icon btn-light btn-active-light-primary" data-bs-toggle="tooltip" data-bs-dismiss="click" data-bs-placement="top"
                        data-bs-original-title="Indietro">
                    <span class="svg-icon svg-icon-2">
                        <i class="bi bi-arrow-left fs-4" />
                    </span>
                </AppLink>
            </div>
            <div class="d-flex align-items-center flex-wrap gap-2">

            </div>
        </div>
        <div class="card-body py-4 table-responsive">
            <table id="members_table" class="table align-middle table-row-bordered fs-6 no-footer">
                <thead>
                    <tr class="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                        <th class="min-w-25px">ID</th>
                        <th class="w-100 min-w-300px">Membro</th>
                        <th class="min-w-200px">Ruolo/Mansione</th>
                        <th class="min-w-125px">Archiviato</th>
                        <th class="text-end min-w-100px"></th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 fw-bold">
                    <tr v-for="(member, key) in members" :key="key">
                        <td>#{{ member.id.toString().padStart(2, '0') }}</td>
                        <td class="align-items-center">
                            <div class="d-flex">
                                <div class="symbol symbol-50px overflow-hidden me-3">
                                    <AppLink :href="($page.props.auth.user.id !== member.id) ? route('member.overview', {id: member.id}) : route('profile.overview')" class="text-gray-800 text-hover-primary mb-1">
                                        <div class="symbol-label fs-3 bg-light-warning text-warning">{{ member.initials }}</div>
                                    </AppLink>
                                </div>
                                <div class="d-flex flex-column">
                                    <AppLink :href="($page.props.auth.user.id !== member.id) ? route('member.overview', {id: member.id}) : route('profile.overview')" class="text-gray-800 text-hover-primary mb-1">{{ member.name }}
                                    </AppLink>
                                    <span>{{ member.email }}</span>
                                </div>
                            </div>
                        </td>
                        <td>{{ member.jobTitle.capitalizeFirst() }}</td>
                        <td>
                            <span data-bs-toggle="tooltip" :title="moment(member.deleted_at).format('dddd, DD MMM YYYY').capitalize()">
                                {{ moment(member.deleted_at).fromNow() }}
                            </span>
                        </td>
                        <td class="text-end">
                            <button v-if="!member.is_admin" class="btn btn-light btn-active-light-primary btn-sm btn-icon" data-bs-dismiss="click" data-bs-toggle="tooltip" title="Ripristina"
                                    @click="restore(member.id)">
                                <span class="bi bi-arrow-counterclockwise fs-4" />
                            </button>
                            <button class="btn btn-light btn-active-light-danger btn-icon btn-sm ms-2" data-bs-dismiss="click" data-bs-toggle="tooltip" title="Elimina"
                                    @click="destroy(member.id)">
                                <span class="bi bi-x-lg fs-4"></span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { computed, ref } from "vue"
    import { router } from "@inertiajs/core"
    import SBCore from "@Helpers/SBCore"
    import User from "@Models/User"

    interface Props {
        members: Object
    }
    const props = defineProps<Props>()

    const isCreateModalOpen = ref(false)
    const isEditModalOpen = ref(false)
    const selectedMemberId = ref<number | null>(null)

    const members = computed(() => Object.values(props.members).map(member => new User(member)))

    function reset() {
        selectedMemberId.value = null
        isCreateModalOpen.value = false
        isEditModalOpen.value = false
    }

    function restore(id: number) {
        Desky.confirmDialog({ text: 'Vuoi Ripristinare questo utente?', title: 'Ripristina', confirmButtonText: 'Ripristina' }, () => {
            router.put(route('user.restore', { id }), {
                preserveState: true,
                preserveScroll: true,
                replace: true
            })
        })
    }

    function destroy(id: number) {
        Desky.dangerDialog({ text: 'Vuoi Eliminare definitivamente questo utente?\nUn utente eliminato non potrà più essere ripristinato.', title: 'Elimina Definitivamente', confirmButtonText: 'Elimina' }, () => {
            router.delete(route('user.destroy', { id }), {
                preserveState: true,
                preserveScroll: true,
                replace: true
            })
        })
    }
</script>
