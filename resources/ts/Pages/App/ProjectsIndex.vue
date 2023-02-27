<template>
    <ProjectsIndexLayout>
        <div class="card card-flush w-100 h-100">
            <div class="card-body h-100">
                <div class="position-relative h-100" id="projects" style="user-select: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none;">
                    <div class="before-shadow" />
                    <div id="board" scroll-region class="scroll-x scrollable-area h-100">
                        <div class="position-absolute h-100 d-flex flex-nowrap top-0 start-0 bottom-0">
                            <div class="d-flex flex-column mx-3 h-100 w-300px columns list-wrapper pb-4" v-for="(phase, index) in lists" :key="phase.title" ref="columnRefs" :id="phase.id">
                                <div class="card kanban-board-header d-flex flex-column-auto px-3 py-2 fw-bold text-gray-500 mb-2" :class="`bg-${phase.color}`" id="kanban_header">
                                    <div class="d-flex justify-content-between">
                                        <span :class="`kanban-board-title fs-6 text-white`">
                                            {{phase.title}}
                                            <span class="badge badge-pill ms-2" :class="`badge-${phase.color}`">
                                                {{phase.count}}
                                            </span>
                                        </span>
                                        <span class="kanban-board-counts">
                                            <span class="badge ms-2" :class="`badge-${phase.color}`">
                                                € {{phase.quote_sum.toLocaleString()}}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div class="d-flex flex-column-fluid position-relative">
                                    <div class="card kanban-board-body d-flex shadow-none top-0 bottom-0 start-0 end-0 position-absolute p-3 bg-gray-200">
                                        <div class="scroll-y list-content w-100 h-100" :id="'list_' + phase.id + '_scroll_box'">
                                            <Draggable v-model="phase.projects" ghost-class="ghost-card" group="projects" @add="update(phase.id, $event)" @update="update(phase.id, $event)" v-bind="dragOptions"
                                                    item-key="id" class="h-100 d-flex flex-column flex-nowrap draggable-wrapper w-100" ref="draggable" style="box-sizing: border-box !important;">
                                                <template #item="{ element, index }" :key="index">
                                                    <ProjectKanbanCard :item="element" :index="index" :key="'card_'+index" :id="`projectId_${element.id}`" class="item-card cursor-pointer"
                                                            @complete="completeProject" @click="setSelectedProject(element)" style="box-sizing: border-box" @deliver="deliverProject"
                                                            @archive="archiveProject" @destroy="destroyProject" />
                                                </template>
                                            </Draggable>
                                        </div>
                                    </div>
                                </div>
                                <div id="kanban_footer" class="d-flex flex-column-auto h-auto w-100">
                                    <div class="kanban-board-footer mt-5 w-100" ref="addButtonRefs" :key="'footer_'+phase.id" :id="'footer_'+phase.id" v-if="['deal'].includes(phase.id)"
                                            @click="footerClickHandler($event, phase.id, index)">
                                        <form v-if="quickAddIndex === (index + 1)" @submit.prevent="quickAddProject(phase.id, phase.count)">
                                            <input type="text" class="form-control w-100" placeholder="Digita e premi [INVIO]" name="name" @blur="quickAddIndex = null" v-model="quickAddForm.name" />
                                        </form>
                                        <div v-else class="d-flex flex-center btn btn-primary w-100" data-kt-drawer-show="true" data-kt-drawer-target="#drawer">
                                            <i class="bi bi-plus fs-4 me-2" />
                                            Nuova Opportunità
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="after-shadow" />
                </div>
            </div>
        </div>
    </ProjectsIndexLayout>
</template>
<script setup lang="ts">
    import Draggable from 'vuedraggable'
    import ProjectKanbanCard from "@Pages/App/Projects/Partials/ProjectKanbanCard.vue";
    import { nextTick, onMounted, onUnmounted, ref, watch, watchEffect, } from "vue";
    import Project from "@Models/Project";
    import { router } from "@inertiajs/core";
    import { useForm, usePage } from "@inertiajs/vue3";
    import { useModal } from "@Composables/useModal";
    import useKanban from "@Composables/useKanban";
    import { PhaseColumn, useProjectsStore } from "@Stores/useProjectsStore";
    import { split } from "lodash";
    import useProjects from "@Composables/useProjects";
    import { useCustomersStore } from "@Stores/useCustomersStore";
    import { useMembersStore } from "@Stores/useMembersStore";
    import ProjectsIndexLayout from "@Layouts/app/ProjectsIndexLayout.vue";

    const { archiveProject, deliverProject, destroyProject, completeProject, fetch, getArchivedProjects } = useProjects();

    interface Props {
        projects: Object,
        phases: Object,
        members: Object
    }

    const props = defineProps<Props>();
    const showDrawer = ref<boolean>(false);

    watch(showDrawer, (value) => {
        if (value) {
            getArchivedProjects();
        } else {
            projectsStore.archived = []
        }
    })

    const projectsStore = useProjectsStore();
    const customersStore = useCustomersStore();
    const membersStore = useMembersStore();
    const customers = ''

    watchEffect(() => {
        nextTick(() => {
            membersStore.set(props.members);
        })
    })

    projectsStore.phases = Object.entries(props.phases).map((phase) => {
        return { id: phase[0], title: phase[1].title }
    }).filter(phase => phase.id !== 'completed');

    const lists = ref<PhaseColumn[]>([]);

    watchEffect(async () => {
        projectsStore.all = Object.values(props.projects).map(project => new Project(project)).sort((a, b) => a.index - b.index);
        lists.value = projectsStore.kanbanized;
    })

    const projectModal = useModal('project_modal');

    const setSelectedProject = (element: Project | null) => {
        projectsStore.selected = element
        if (element) {
            nextTick(() => {
                projectModal.open()
            })
        }
    }

    const addButtonRefs = ref<HTMLElement[]>([]);
    const quickAddIndex = ref<number | null>(null);
    const quickAddForm = useForm({
        name: ''
    });

    const quickAddProject = (phase: string, index: number) => {
        if (!quickAddForm.isDirty) return;
        quickAddForm
            .transform((data) => ({
                ...data,
                phase: phase,
                index: index + 1
            }))
            .post(route('project.quick-store'), {
                onSuccess: () => {
                    quickAddForm.reset()
                },
                preserveScroll: true,
                preserveState: true
            })
    }

    function footerClickHandler(e: Event, phase: string, index: number) {
        quickAddIndex.value = index + 1;
        let el = addButtonRefs.value[index];
        nextTick(() => el.querySelector('input')!.focus())
    }

    useKanban('board');

    const dragOptions = {
        group: {
            name: 'projects_kanban'
        },
        animation: 200,
        disabled: false,
        ghostClass: "ghost",
        dragClass: "drag",
        fallbackTolerance: 5,
        fallbackClass: 'cursor-grabbing',
        chosenClass: "chosen",
        emptyInsertThreshold: 20,
        scrollSensitivity: 100,
        forceFallback: true
    }

    const updateIndexes = (
        fromItems: { id: any, index: any }[] | any,
        toItems: { id: any, index: any }[] | any,
        itemId: string | number = 0,
        fromPhaseId: string | number | null,
        toPhaseId: string | number | null
    ) => {
        router.post(route('projects.update-indexes'), { fromItems, toItems, itemId, fromPhaseId, toPhaseId }, {
            preserveState: true,
            preserveScroll: true
        })
    }

    const update = (phaseId: string, event: CustomDraggable) => {

        let toPhaseId = (event.to.closest('.list-wrapper')?.id) ?? null;
        let fromPhaseId = (event.from.closest('.list-wrapper')?.id) ?? null;
        if (toPhaseId == fromPhaseId) {
            toPhaseId = null
            fromPhaseId = null
        }

        const toPhase = lists.value?.find((obj): Boolean => obj.id === phaseId) as PhaseColumn;
        const fromPhase = lists.value?.find((obj): Boolean => obj.id === fromPhaseId) as PhaseColumn

        function mappedProjects(phase: PhaseColumn): { id: any, index: number }[] {
            return phase.projects.map((project, index) => {
                return { id: project.id, index: index }
            })
        }

        const eventName = event.type;

        let toItems: { id: number, index: number }[] = [];
        let fromItems: { id: number, index: number }[] = [];

        if (eventName === 'update') {
            const newIndex = event.newIndex;
            const oldIndex = event.oldIndex;
            toItems = mappedProjects(toPhase).filter((project) => {
                const min = (oldIndex < newIndex) ? oldIndex : newIndex;
                const max = (oldIndex > newIndex) ? oldIndex : newIndex;
                return ((project.index >= min && project.index <= max));
            })
        }

        if (eventName === 'add') {
            fromItems = mappedProjects(fromPhase)
            toItems = mappedProjects(toPhase)
        }

        const itemId = split(event.item.id, '_').pop();

        updateIndexes(fromItems, toItems, itemId, fromPhaseId, toPhaseId);
    }

    window.Echo.private('projects').listen('.project.updated', (e: any) => {
        console.log(e.user_id && (e.user_id !== usePage().props.auth.user?.id));
        if (e.user_id && e.user_id !== usePage().props.auth.user?.id) {
            router.reload({ only: ['projects'], preserveScroll: true, replace: true });
        }
    })

    onMounted(async () => {

        projectModal.onClosed(() => {
            setSelectedProject(null)
        })

        // await customersStore.setCustomers();

        const boardEl = document.getElementById('board') as HTMLElement;
        const scrollEl = boardEl.firstElementChild as HTMLElement;

        const beforeShadow = document.querySelector('.before-shadow') as HTMLElement;
        const afterShadow = document.querySelector('.after-shadow') as HTMLElement;

        const boardOffsets = ref()
        const scrollOffsets = ref()

        const currentScrollX = ref();
        const maxScroll = ref();

        const canScrollLeft = ref();
        const canScrollRight = ref();

        boardEl.onscroll = function () {
            boardOffsets.value = boardEl.getBoundingClientRect();
            scrollOffsets.value = scrollEl.getBoundingClientRect();

            maxScroll.value = scrollOffsets.value.width - boardOffsets.value.width;

            currentScrollX.value = boardOffsets.value.left - scrollOffsets.value.left;

            canScrollLeft.value = currentScrollX.value > 0;
            canScrollRight.value = (currentScrollX.value + 1) < maxScroll.value;

            afterShadow.style.display = (canScrollLeft.value) ? 'block' : 'none';
            beforeShadow.style.display = (canScrollRight.value) ? 'block' : 'none';
        }

    })

    onUnmounted(() => {
        customersStore.$dispose();
        projectsStore.$dispose();
        membersStore.$dispose();
        window.Echo.private('projects').stopListening('.project.updated');
    })
</script>
<style scoped>
    .kanban-board-body > div, .kanban-board-body > div::-webkit-scrollbar {
	    -ms-overflow-style: none !important;
	    scrollbar-width: none !important;
        }

    .kanban-board-body > div::-webkit-scrollbar {
        width: 0 !important;
        }
	.before-shadow {
		display: none;
		box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1) inset;
		height: 100%;
		right: 0;
		position: absolute;
		top: 0;
		width: 20px;
		z-index: 9;
		}

	.after-shadow {
		display: none;
		box-shadow: 5px 0 5px -5px rgba(0, 0, 0, 0.1) inset;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		width: 20px;
		}

	.kanban-item:last-child {
		margin-bottom: 0 !important;
		}

	.draggable-wrapper > .card:last-child {
		margin-bottom: 0 !important;
		}

	.list-wrapper:first-child {
		margin-left: 0 !important;
		}

	.list-wrapper:last-child {
		margin-right: 0 !important;
		}

	.ghost {
		opacity: .1;
		transform: none !important;
		box-sizing: border-box !important;
		}

	.chosen, .drag {
		}

	.cursor-grab {
		cursor: grab !important;
		}

	.cursor-grabbing {
		cursor: grabbing !important;
		}
</style>
