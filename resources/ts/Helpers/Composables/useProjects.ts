import { useProjectsStore } from "@Stores/useProjectsStore";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import Project from "@Models/Project";
import { useForm } from "@inertiajs/vue3";
import { SBModal, useModal } from "@Composables/useModal";
import { useCustomersStore } from "@Stores/useCustomersStore";
import { router } from "@inertiajs/core";
import { useMembersStore } from "@Stores/useMembersStore";
import axios from "axios";

export default function useProjects(projectsObject?: Object, boards?: any, modalObject?: SBModal) {
    const projects = ref<Project[]>([]);
    const store = useProjectsStore();
    const membersStore = useMembersStore();
    const touchedFields = ref(new Set());
    const members = ref<SelectOption[]>([]);
    const modal = ref<SBModal>();
    const project = computed<Project|null>(() => {
        return store.selected;
    })

    const customersStore = useCustomersStore();

    if (projectsObject && Object.keys(projectsObject).length) {
        projects.value = Object.values(projectsObject).map(project => new Project(project)) as Project[];
        store.all = projects.value;
    } else {
        projects.value = store.all as Project[];
    }

    const form = useForm({
        name: store.selected?.name,
        customer_id: store.selected?.customer_id,
        members: store.selected?.members?.map(member => member.id as number) ?? [],
        description: store.selected?.description,
        deadline: store.selected?.deadline,
        started_at: store.selected?.started_at,
        delivered_at: store.selected?.delivered_at,
        quote: store.selected?.quote,
        deposit: store.selected?.deposit
    })

    watch(() => form.data(), (newData, oldData) => {
        let changeFields = Object.keys(newData).filter(field => newData[field] !== oldData[field]);
        touchedFields.value = new Set([...changeFields, ...touchedFields.value]);
    })

    const getArchivedProjects = async () => {
        store.archived = await axios.get(route('projects.fetch', { list: 'archived' }))
            .then(res => Object.values(res.data)
                .map(project => new Project(project))
                .sort((a, b) => moment(b.deleted_at).valueOf() - moment(a.deleted_at).valueOf()));
    }

    const submit = () => {
        if (store.selected && store.selected.id) {
            form.transform((d) => {
                let customer_fields;

                const filtered = Object.fromEntries(Object.entries(d).filter(([key]) =>
                    Array.from(touchedFields.value).includes(key)));

                if ('customer_id' in filtered) {
                    customer_fields = {
                        customer_id: (filtered.customer_id && parseInt(filtered.customer_id.toString()) > 0) ?
                            filtered.customer_id : 0,
                        new_customer: (d.customer_id && typeof d.customer_id !== 'number') ? JSON.parse(d.customer_id).value : null,
                    }
                }

                return {
                    ...filtered,
                    ...customer_fields,
                    name: d.name
                }
            }).put( route('project.update', { id: store.selected.id } ), {
                preserveScroll: true,
                preserveState: true,
                only: ['projects'],
                async onSuccess() {
                    if (modal) {
                        store.refreshSelected();
                        modal.value?.close()
                    }
                    await customersStore.setCustomers();
                }
            });
        } else {
            alert('No Project Selected')
        }
    }


    // METHODS
    const deliverProject = (id) => {
        router.put(route('project.deliver', { id }), {}, {
            only: ['projects'],
            preserveScroll: true,
            preserveState: true,
            replace: true,
            onSuccess() {
                if (modal.value) {
                    store.refreshSelected();
                }
            }
        })
    }

    const archiveProject = (id) => {
        Desky.warningDialog({ text: 'Vuoi Archiviare questo progetto?', title: 'Archivia', confirmButtonText: 'Archivia' }, () => {
            router.delete(route('project.archive', { id }), {
                preserveScroll: true,
                preserveState: true,
                replace: true,
                onSuccess: () => {
                    if (modal.value) {
                        modal.value.close()
                    }
                }
            })
        })
    }

    const completeProject = (id) => {
        Desky.successDialog({text: 'Vuoi completare il progetto?', confirmButtonText: 'Si, Completa'}, () => {
            router.put(route('project.complete', { id }), {}, {
                preserveScroll: true,
                preserveState: true,
                replace: true,
                onSuccess() {
                    if (modal.value) {
                        modal.value.close()
                    }
                }
            })
        })
    }

    const restoreProject = (id) => {
        Desky.warningDialog({ text: 'Vuoi ripristinare questo progetto?', title: 'Ripristina', confirmButtonText: 'Ripristina' }, () => {
            router.put(route('project.restore', { id }), {},{
                preserveScroll: true,
                preserveState: true,
                replace: true,
                onSuccess: () => {
                    if (modal.value) {
                        modal.value?.close()
                    }
                    nextTick(() => {
                        getArchivedProjects();
                    })
                }
            })
        })
    }

    const destroyProject = (id) => {
        Desky.dangerDialog({text: 'Vuoi Eliminare questo progetto?', title: 'Elimina', confirmButtonText: 'Elimina'}, () => {
            router.delete(route('project.destroy', { id }), {
                preserveScroll: true,
                preserveState: true,
                replace: true,
                onSuccess: () => {
                    if (modal.value) {
                        modal.value?.close()
                    }
                    getArchivedProjects();
                }
            })
        })
    }

    const reset = () => {
        form.reset()
        if (form.hasErrors) form.clearErrors()
    }

    const fetch = (list: string = 'archived') => {
        return router.get(route('project.archive'), {list});
    }

    onMounted( async () => {

        if (modalObject) {
            modal.value = modalObject as SBModal;
        } else {
            const element = document.querySelector('.modal');
            if (element) modal.value = useModal(element.id) as SBModal;
        }

        if (modal) {
            modal.value?.onOpened(() => {
                document.getElementById('inputName')?.focus();
            })
        }

        modal.value?.onClosed(() => {
            store.selected = null;
            form.reset();
        })

        members.value = membersStore.all.map(member => {
            return { value: member.id, title: member.name } as SelectOption
        });

    })

    return { projects, project, store, form, reset, submit, modal, deliverProject, destroyProject, archiveProject, completeProject, fetch, restoreProject, getArchivedProjects }
}
