<template>
    <table id="members_table" class="table align-middle table-row-bordered fs-6 no-footer">
        <thead>
            <tr class="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                <th class="min-w-25px">ID</th>
                <th class="w-100 min-w-300px">Membro</th>
                <th class="text-nowrap">Ruolo/Mansione</th>
                <th class="text-center px-0">Stato</th>
                <th class="text-nowrap">Ultimo Accesso</th>
                <th class="text-end min-w-100px" v-if="$page.props.auth.user.is_admin"></th>
            </tr>
        </thead>
        <tbody class="text-gray-600 fw-bold">
            <tr v-for="(member, key) in members" :key="key">
                <td>#{{ member.id.toString().padStart(2, '0') }}</td>
                <td class="align-items-center">
                    <div class="d-flex">
                        <div class="symbol symbol-50px overflow-hidden me-3">
                            <AppLink :href="($page.props.auth.user.id !== member.id) ? route('member.overview', {id: member.id}) : route('profile.overview')" class="text-gray-800 text-hover-primary mb-1">
                                <div class="symbol-label fs-3 bg-light-primary text-primary">{{ member.initials }}</div>
                            </AppLink>
                        </div>
                        <div class="d-flex flex-column">
                            <AppLink :href="($page.props.auth.user.id !== member.id) ? route('member.overview', {id: member.id}) : route('profile.overview')" class="text-gray-800 text-hover-primary mb-1">{{ member.name }}
                            </AppLink>
                            <span>{{ member.email }}</span>
                        </div>
                    </div>
                </td>
                <td class="text-nowrap">{{ member.jobTitle.capitalizeFirst() }}</td>
                <td class="text-center">
                    <span :class="member.hasActiveSession ? 'badge-light-success' : 'badge-light-danger'" class="badge fs-7 px-4 py-3">
                        {{ member.hasActiveSession ? 'Online' : 'Offline' }}
                    </span>
                </td>
                <td class="text-nowrap">{{ moment(member.last_login).fromNow() }}</td>
                <td class="text-end" v-if="$page.props.auth.user.is_admin">
                    <button v-if="!member.is_admin" class="btn btn-light btn-active-light-warning btn-sm btn-icon" data-bs-dismiss="click" data-bs-toggle="tooltip" title="Archivia"
                            @click="archive(member.id)">
                        <span class="bi bi-archive-fill fs-4" />
                    </button>
                    <button class="btn btn-light btn-active-light-primary btn-sm btn-icon ms-2" data-bs-dismiss="click" data-bs-toggle="tooltip" title="Modifica"
                            @click="openEditModalForm(member.id)">
                        <span class="bi bi-pencil-fill fs-4"></span>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    <teleport to="body">
        <MemberModalEditDetails v-if="isEditModalOpen" :selected_member="selectedMember" @modal_closed="reset" />
    </teleport>
</template>
<script setup lang="ts">
    import User from "@Models/User";
    import SBCore from "@Helpers/SBCore";
    import { router } from "@inertiajs/core";
    import { computed, nextTick, ref } from "vue";
    import MemberModalEditDetails from "@Pages/App/Members/Partials/MemberModalEditDetails.vue";

    interface Props {
        members: User[]
    }
    const props = defineProps<Props>()

    console.log()

    const isEditModalOpen = ref(false)
    const selectedMemberId = ref<number | null>(null);

    const members = computed(() => props.members)
    const selectedMember = computed<User | null>(() => members.value.find(user => user.id === selectedMemberId.value) ?? null)

    function openEditModalForm(memberId: number) {
        selectedMemberId.value = memberId
        nextTick(() => {
            isEditModalOpen.value = true
        })
    }

    function reset() {
        selectedMemberId.value = null
        isEditModalOpen.value = false
    }

    function archive(id: string | number) {
        Desky.warningDialog({ text: 'Vuoi Archiviare questo membro?', title: 'Archivia' }, () => {
            router.put(route('user.archive', { id }), {
                preserveState: true,
                preserveScroll: true,
                replace: true
            })
        })
    }

</script>
