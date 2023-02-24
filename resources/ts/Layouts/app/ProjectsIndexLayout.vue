<template>
    <div class="d-flex flex-column gap-4 gap-md-6 h-100">
        <!--        <div class="card card-flush">
                    <div class="card-body d-flex flex-row">
                        <div class="d-flex col flex-md-column gap-2 p-0">
                            <AppButtonIcon v-if="route().current('projects.index')" class="btn-lg btn-light cursor-default" tooltip="Assegnati a me" dismiss="click">
                                <span></span>
                            </AppButtonIcon>
                            <AppButtonIcon v-else class="btn-lg btn-light" tooltip="Indietro" dismiss="click" :href="route('projects.index')" link>
                                <i class="bi bi-arrow-left fs-3"></i>
                            </AppButtonIcon>
                        </div>
                        <teleport to="projects_sub_menu">
                            <div class="d-flex flex-end flex-md-center gap-4 p-0">
                                <AppButtonIcon class="btn-lg btn-light" :class="{'active btn-active-primary': route().current('projects.completed')}" tooltip="Completati" dismiss="click" link
                                        :href="route('projects.completed')">
                                    <i class="bi bi-check-lg fs-3"></i>
                                </AppButtonIcon>
                                <AppButtonIcon class="btn-lg btn-light" :class="{'active btn-active-primary': route().current('projects.archived')}" tooltip="Archiviati" dismiss="click" link :href="route('projects.archived')">
                                    <i class="bi bi-archive fs-3"></i>
                                </AppButtonIcon>
                            </div>
                        </teleport>
                    </div>
                </div>-->
        <slot />
        <teleport to="body">
            <ProjectModal @closeModal="setSelectedProject(null)" v-if="projectsStore.selected" size="large" id="project" />
        </teleport>
    </div>
</template>
<script lang="ts">
    import { defineComponent, nextTick } from "vue";
    // import AppButtonIcon from "@Components/buttons/AppButtonIcon.vue";
    import ProjectModal from "@Pages/App/Projects/Partials/ProjectModal.vue";
    import { useProjectsStore } from "@Stores/useProjectsStore";
    import Project from "@Models/Project";
    import useProjects from "@Composables/useProjects";

    export default defineComponent({
        name: 'ProjectsIndexLayout',
        components: { ProjectModal },
        data() {
            return {
                projectsStore: useProjectsStore(),
                useProjects: useProjects()
            }
        },
        methods: {
            setSelectedProject(element: Project | null) {
                this.projectsStore.selected = element
                if (element) {
                    nextTick(() => {
                        this.useProjects.modal?.open()
                    })
                }
            }
        }
    })
</script>
