<template>
    <ProjectsIndexLayout>
        <div class="card w-100 flex-grow-0 align-self-start">
            <div class="card-body">
                <div class="dataTables_wrapper dt-bootstrap4 no-footer table-sm">
                    <div class="table-responsive">
                        <table class="table text-gray-600 align-middle fw-semibold table-row-dashed fs-6 gy-4 dataTable no-footer" id="kt_table_projects">
                            <thead>
                                <tr class="text-start text-muted fs-7 text-uppercase gs-0">
                                    <th>ID</th>
                                    <th class="col w-100 min-w-400px">Progetto</th>
                                    <th class="col min-w-150px text-center px-0">Fase</th>
                                    <th class="col min-w-150px text-center px-0">Data</th>
                                    <th class="col min-w-200px"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(project, index) in projects" :key="index">
                                    <td>#{{ project.id }}</td>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="d-flex flex-column">
                                                <AppLink href="#" class="text-gray-800 text-hover-primary mb-1 fw-bold">{{ project.name }}</AppLink>
                                                <span v-if="project.customer">{{ project.customer?.name ?? 'nessun utente' }}</span>
                                                <span class="fst-italic fw-normal text-gray-400" v-else>- Nessun cliente assegnato</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-center">
                                        <span class="badge fs-7 px-4 py-3" :class="`badge-light-${project.getPhase.color}`">
                                            {{ project?.phaseName }}
                                        </span>
                                    </td>
                                    <td class="text-center">{{ moment(project?.deleted_at).fromNow() }}</td>
                                    <td class="text-end">
                                        <div class="d-flex flex-shrink-0 flex-end">
                                            <button class="btn btn-light btn-active-light-primary btn-sm" title="Ripristina" @click.prevent="restore(project.id)">
                                                <i class="bi bi-recycle me-1"></i>
                                                Ripristina
                                            </button>
                                            <button class="btn btn-light btn-active-light-danger btn-sm btn-icon ms-2" @click.prevent="destroy(project.id)" title="Elimina">
                                                <i class="bi bi-x-lg" />
                                            </button><!-- TODO:: Mostra pulsanti in base al ruolo dell'utente -->
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start">
                            <div class="dataTables_info" aria-live="polite">{{ pagination?.from }} - {{ pagination?.to }} di {{ pagination?.total }} progetti</div>
                        </div>
                        <div class="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
                            <div class="dataTables_paginate">
                                <ul class="pagination">
                                    <li class="paginate_button page-item previous" :class="{'disabled': !pagination?.prev_page_url }">
                                        <AppLink :href="pagination?.prev_page_url" tabindex="0" class="page-link" :only="['projects']" preserve-scroll>
                                            <i class="previous"></i>
                                        </AppLink>
                                    </li>
                                    <li class="paginate_button page-item" :class="{'active': page.active}" v-for="(page, index) in pagination?.links.slice(1, pagination?.links.length-1)" :key="index">
                                        <AppLink :href="page?.url" data-dt-idx="1" tabindex="0" class="page-link" preserve-scroll>{{ page.label }}</AppLink>
                                    </li>
                                    <li class="paginate_button page-item next" :class="{'disabled': !pagination?.next_page_url }">
                                        <AppLink :href="pagination?.next_page_url" tabindex="0" class="page-link" :only="['projects']" preserve-scroll>
                                            <i class="next"></i>
                                        </AppLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ProjectsIndexLayout>
</template>
<script setup lang="ts">
    import { computed } from "vue";
    import { router } from "@inertiajs/core";
    import SBCore from "@Helpers/SBCore";
    import Project from "@Models/Project";
    import ProjectsIndexLayout from "@Layouts/app/ProjectsIndexLayout.vue";

    interface Props {
        projects: Paginated;
    }

    const props = defineProps<Props>();

    const pagination = computed(() => props.projects);
    const projects = computed(() => pagination.value.data.map(project => new Project(project)));

    const restore = async (id: number|string) => {
        await Desky.confirmDialog({title: 'Ripristina', text: 'Vuoi ripristinare questo progetto?', confirmButtonText: 'Ripristina'}, () => {
            router.put(route('project.restore', id), {}, {
                preserveState: true,
                preserveScroll: true,
                only: ['projects', 'toast']
            })
        })
    }

    const destroy = async (id: number|string) => {
        await Desky.dangerDialog({ title: 'Elimina', text: 'Vuoi eliminare questo progetto? Questa operazione non è revocabile.', confirmButtonText: 'Elimina' }, () => {
            router.delete(route('project.destroy', id), {
                preserveState: true,
                preserveScroll: true,
                only: ['projects', 'toast']
            })
        })
    }

</script>
