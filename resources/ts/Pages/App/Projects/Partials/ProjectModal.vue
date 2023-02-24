<template>
    <AppModal id="project_modal" :title="form.name" :modal="modal" size="large" no-header centered>
        <template #form="modalData">
            <div class="d-flex flex-row">
                <div class="flex-row-fluid px-10 py-12">
                    <div class="" v-if="tab === 'edit'">
                        <form :id="modalData?.formId" autocomplete="off" @reset.prevent @submit.prevent="submit">
                            <InputText label="Nome Progetto" required :form="form" name="name" v-model="form.name" class="mb-6" input-size="large" />
                            <InputSelect class="mb-6" label="Cliente" placeholder="Seleziona Cliente" v-model="form.customer_id" clearable :form="form" :options="customers" name="customer_id" in-modal />
                            <InputSelectMembers class="mb-6" label="Membri Assegnati" placeholder="Seleziona Membro..." v-model="form.members" :form="form" name="select_members" in-modal />
                            <div class="mb-6">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <AppInputLabel>Descrizione</AppInputLabel>
                                        <InputTextArea :form="form" name="description" v-model="form.description" />
                                    </div>
                                </div>
                            </div>
                            <div class="separator separator-content my-10">Date</div>
                            <div class="mb-6">
                                <div class="row">
                                    <div class="col-lg-12 mb-6">
                                        <AppInputLabel>Scadenza</AppInputLabel>
                                        <AppInputDate :form="form" name="deadline" v-model="form.deadline" />
                                    </div>
                                    <div class="col-lg-6">
                                        <AppInputLabel>Data di Inizio</AppInputLabel>
                                        <AppInputDate :form="form" name="started_at" v-model="form.started_at" />
                                    </div>
                                    <div class="col-lg-6">
                                        <AppInputLabel>Data di Consegna</AppInputLabel>
                                        <AppInputDate :form="form" name="delivered_at" v-model="form.delivered_at" />
                                    </div>
                                </div>
                            </div>
                            <div class="separator separator-content my-10">Prezzi</div>
                            <div class="">
                                <div class="row">
                                    <div class="col-lg-4 mb-6 mb-lg-0">
                                        <AppInputLabel>Preventivo</AppInputLabel>
                                        <div class="input-group input-group-solid">
                                            <span class="input-group-text">€</span>
                                            <AppInput :form="form" name="quote" id="form_field_quote" v-model="form.quote" class="money_mask" />
                                        </div>
                                    </div>
                                    <div class="col-lg-4 mb-6 mb-lg-0">
                                        <AppInputLabel>Acconto</AppInputLabel>
                                        <div class="input-group input-group-solid">
                                            <span class="input-group-text">€</span>
                                            <AppInput :form="form" name="deposit" v-model="form.deposit" id="form_field_advance" class="money_mask" />
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <AppInputLabel>Saldo</AppInputLabel>
                                        <div class="input-group input-group-solid">
                                            <span class="input-group-text bg-light-primary">€</span>
                                            <AppInput :form="form" :style="'transparent'" name="price" disabled id="form_field_price" :model-value="form?.quote - form?.deposit" class="bg-light-primary" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="" v-else-if="tab === 'overview'">
                        <div class="d-flex flex-column">
                            <div class="d-flex justify-content-between mb-4">
                                <span class="fs-8 text-gray-400">Creato {{ moment(project?.created_at).fromNow() }} da {{ project?.creator?.name }}</span>
                                <div>
                                    <span class="badge me-auto" :class="`badge-light-${ project?.getPhase.color }`">{{ project?.phaseName }}</span>
                                </div>
                            </div>
                            <div class="">
                                <div class="d-flex align-items-center mb-1">
                                    <a href="#" class="text-gray-800 text-hover-primary fs-1 fw-bold">{{ project?.name.toUpperCase() }}</a>
                                </div>
                                <a class="fw-bold fs-4 text-primary" href="#" v-if="project?.customer">
                                    <i class="bi bi-building me-2" />
                                    <AppLink :href="route('customer.show', { id: project.customer.id })">{{ project.customer.name }}</AppLink>
                                </a>
                                <span class="fs-6 text-danger" href="#" v-else>
                                    <span>Nessun Cliente</span>
                                </span>
                                <div class="d-flex flex-wrap flex-row gap-4 mt-12" v-if="project?.hasDeadline || project?.balance">
                                    <div v-if="project?.hasDeadline" class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4">
                                        <div class="d-flex align-items-center">
                                            <div class="fs-4 fw-bold">{{ moment(project.deadline).format('ddd DD, MMM').capitalize() }}</div>
                                        </div>
                                        <div class="fw-semibold fs-8 text-gray-400">Deadline</div>
                                    </div>
                                    <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4" v-if="project?.balance">
                                        <div class="d-flex align-items-center" :class="{'text-success': (project.deposit)}">
                                            <div class="fs-4 fw-bold">€ {{ project.balance.toCurrency() }}</div>
                                        </div>
                                        <div class="fw-semibold fs-8 text-gray-400" v-if="project.deposit">
                                            Acconto: €{{ project.deposit.toCurrency() }}
                                        </div>
                                        <div class="fw-semibold fs-8 text-gray-400" v-else>
                                            Preventivo
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="" v-if="project?.members.length">
                                <div class="separator my-6"></div>
                                <p class="fs-6 fw-semibold mb-2 text-gray-600 flex-center align-content-center">
                                    <i class="bi bi-people me-2"></i>
                                    Membri Assegnati
                                </p>
                                <div class="d-inline-block cursor-default" v-for="member in project?.members">
                                    <div class="d-flex flex-center bg-light pe-4 rounded-pill me-2 mb-2" data-bs-toggle="tooltip" :title="member.name" :aria-label="member.name">
                                        <div class="symbol symbol-circle symbol-25px me-2">
                                            <div class="symbol-label bg-secondary fs-8">{{ member.initials }}</div>
                                        </div>
                                        <div class="d-flex justify-content-start flex-column flex-center">
                                            <span class="text-whi fs-6">{{ member.first_name }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="" v-if="project?.description">
                                <div class="separator my-6"></div>
                                <p class="fs-6 fw-semibold text-gray-600 mb-2 flex-center align-content-center">
                                    <i class="bi bi-justify-left me-2"></i>
                                    Descrizione
                                </p>
                                <blockquote>
                                    {{ project?.description }}
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-row-auto min-w-200px">
                    <div class="bg-gray-100 pe-6 ps-0 py-6 gap-4 rounded-end h-100 d-flex flex-column">
                        <div class="d-flex flex-column gap-2 flex-column-fluid mb-12">
                            <a class="btn bg-hover-body rounded-start-0" :class="(tab === 'overview') ? 'btn-bg-white' : 'btn-bg-light'" @click.prevent="changeTab('overview')">
                                <i class="bi bi-eye fs-4 me-2" />
                                Dettagli
                            </a>
                            <a class="btn bg-hover-body rounded-start-0" :class="(tab === 'edit') ? 'btn-bg-white' : 'btn-bg-light'" @click.prevent="changeTab('edit')">
                                <i class="b bi-pencil fs-4 me-2" />
                                Modifica
                            </a>
                        </div>
                        <div class="d-flex flex-column gap-2 ps-6 flex-column-auto" v-if="project?.hasDates">
                            <div class="">
                                <span class="fs-6 fw-semibold text-gray-600 flex-center align-content-center">
                                    Timeline
                                </span>
                            </div>
                            <div class="d-flex flex-column gap-2">
                                <div class="px-4 py-1 rounded bg-gray-200" v-if="project?.started_at">
                                    <span class="fs-8 d-block text-gray-400">Iniziato: {{ moment(project?.started_at).fromNow() }}</span>
                                    <span class="fs-7 fw-semibold text-gray-600">{{ moment(project?.started_at).format('L') }}</span>
                                </div>
                                <div class="px-4 py-1 rounded bg-gray-200" v-if="project?.delivered_at">
                                    <span class="fs-8 d-block text-gray-400">Consegnato: {{ moment(project?.delivered_at).fromNow() }}</span>
                                    <span class="fs-7 fw-semibold text-gray-600">{{ moment(project?.delivered_at).format('L') }}</span>
                                </div>
                                <div class="px-4 py-1 rounded bg-gray-200" v-if="project?.completed_at">
                                    <span class="fs-8 d-block text-gray-400">Completato: {{ moment(project?.completed_at).fromNow() }}</span>
                                    <span class="fs-7 fw-semibold text-gray-600">{{ moment(project?.completed_at).format('L') }}</span>
                                </div>
                                <div class="px-4 py-1 rounded bg-gray-200" v-if="project?.deleted_at">
                                    <span class="fs-8 d-block text-gray-400">Archiviato: {{ moment(project?.deleted_at).fromNow() }}</span>
                                    <span class="fs-7 fw-semibold text-gray-600">{{ moment(project?.deleted_at).format('L') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-row gap-2 ps-6 flex-column-auto">
                            <button title="Consegna" class="btn btn-white btn-sm btn-active-success" v-if="project?.phase !== 'delivered'" @click.prevent="deliverProject(store.selected?.id)">
                                <i class="bi bi-check-lg fs-4 me-2" />
                                Consegna
                            </button>
                            <button title="Consegna" class="btn btn-white btn-sm btn-active-success" v-else @click.prevent="completeProject(store.selected?.id)">
                                <i class="bi bi-check-lg fs-4 me-2" />
                                Completa
                            </button>
                            <button title="Archivia" class="btn btn-white btn-sm btn-icon btn-active-warning" @click.prevent="archiveProject(store.selected?.id)">
                                <i class="bi bi-archive fs-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="modal-footer w-100">
                <div class="d-flex flex-center">
                    <div class="text-end">
                        <button type="button" class="btn btn-light me-3" @click.prevent="modal?.close()">
                            Annulla
                        </button>
                        <button @click.prevent="submit" class="btn btn-primary" :disabled="form.processing || !(form.isDirty)">
                            <span class="indicator-label" v-if="!(form.processing)">Salva</span>
                            <span class="indicator-label" v-else>Attendere...
                                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </AppModal>
</template>
<script setup lang="ts">
    import AppModal from "@Components/AppModal.vue";
    import AppInputLabel from "@Components/Inputs/InputLabel.vue";
    import AppInput from "@Components/Inputs/InputText.vue";
    import InputTextArea from "@Components/Inputs/InputTextArea.vue";
    import AppInputDate from "@Components/Inputs/InputDate.vue";
    import { computed, ref } from "vue";
    import { useCustomersStore } from "@Stores/useCustomersStore";
    import InputText from "@Components/Inputs/InputText.vue";
    import InputSelect from "@Components/Inputs/InputSelect.vue";
    import InputSelectMembers from "@Components/Inputs/InputSelectMembers.vue";
    import useProjects from "@Composables/useProjects";

    const tab = ref('overview');

    const customersStore = useCustomersStore();

    const { form, projects, project, store, submit, reset, modal, deliverProject, archiveProject, completeProject } = useProjects();

    const customers = computed(() => { return {} });

    function changeTab(tabName: string) {
        tab.value = tabName;
    }
</script>
