<template>
    <div class="kanban-item mb-2" tabindex="0" @mouseover="showToolbox(true)" @mouseleave="showToolbox(false)">
        <div class="card overflow-hidden kanban-item-card position-relative shadow-none" :class="{'opacity-50 bg-gray-200': isSelected }">
            <div class="card-toolbar tools-button-box position-absolute z-index-1" style="right: 2px; top: 2px;">
                <button v-show="isToolboxVisible" type="button" class="btn h-auto w-auto me-1 mt-1 btn-icon btn-color-gray-400 btn-active-color-primary justify-content-end" tabindex="-1" @click.stop="revealMenu" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                    <span class="svg-icon svg-icon-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="4" fill="currentColor"></rect>
                            <rect x="11" y="11" width="2.6" height="2.6" rx="1.3" fill="currentColor"></rect>
                            <rect x="15" y="11" width="2.6" height="2.6" rx="1.3" fill="currentColor"></rect>
                            <rect x="7" y="11" width="2.6" height="2.6" rx="1.3" fill="currentColor"></rect>
                        </svg>
                    </span>
                </button>
                <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-3" data-kt-menu="true" ref="menu" @click.stop>
                    <div class="menu-item px-3" v-if="item.phase === 'delivered'" @click.stop="$emit('complete', item.id)">
                        <span class="menu-link px-3 text-success"><i class="bi bi-check-lg fs-4 text-success me-2" />Completa</span>
                    </div>
                    <div class="menu-item px-3" v-else @click.stop="$emit('deliver', item.id)">
                        <span class="menu-link px-3">
                            <i class="bi bi-check-lg fs-4 me-2" />
                            Consegna
                        </span>
                    </div>
                    <div class="menu-item px-3" @click.stop="$emit('archive', item.id)">
                        <span class="menu-link px-3">
                            <i class="bi bi-archive fs-4 me-2" />Archivia</span>
                    </div>
                </div>
            </div>
            <div class="card-body px-3 py-2 position-relative" :class="{'border-4 border-start border-primary': item.membersIdArray.includes($page.props.auth.user.id)}">
                <div class="kanban-item-body">
                    <p class="mb-0 fw-bolder fs-6">{{ item.name.toUpperCase() }}
                        <span class="text-muted d-block fw-semibold fs-7" v-if="item.customer">
                            {{ item.customer.name.toLowerCase().capitalizeFirst() }}
                        </span>
                    </p>
                </div>
                <div class="kanban-item-footer mt-1 d-flex flex-row" v-if="item.members?.length || item.balance || item.description || item.deadline">
                    <div class="members d-flex flex-row-auto">
                        <div v-if="item.members?.length">
                            <div data-bs-toggle="tooltip" data-bs-delay-show="500" :title="member.name" class="symbol symbol-circle symbol-20px me-1" v-for="member in item.members">
                                <div class="symbol-label fs-8 text-primary">{{member.initials}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col d-flex flex-row-fluid flex-end gap-1">
                        <div v-if="item.description" data-bs-toggle="tooltip" data-bs-delay-show="500" :title="item.description">
                            <i class="bi bi-justify-left" />
                        </div>
                        <span class="badge" :class="(item.isOverdue) ? 'badge-light-danger text-danger' : ((Math.abs(item.daysToDeadline) < 7) ? 'badge-light-warning' : 'badge-light')" v-if="item.deadline" data-bs-toggle="tooltip" data-bs-delay-show="500"
                                :title="item.toDeadlineFormattedText">
                            {{ (moment(item.deadline).format('DD MMM')).toUpperCase() }}
                        </span>
                        <span class="badge badge-light" v-if="item.balance">€ {{ item.balance.toCurrency() }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import Project from "@Models/Project";
    import { defineComponent } from "vue";
    import { useProjectsStore } from "@Stores/useProjectsStore";
    import { usePage } from "@inertiajs/vue3";

    export default defineComponent({
        name: 'ProjectKanbanCard',
        data() {
            return {
                isToolboxVisible: false,
                projectsStore: useProjectsStore()
            }
        },
        computed: {
            isSelected() {
                if (this.projectsStore.selected) {
                    return this.projectsStore.selected.id === this.item!.id;
                }
                return false;
            }
        },
        props: {
            item: Project,
            index: Number
        },
        emits: ['deliver', 'archive', 'destroy', 'complete'],
        methods: {
            usePage,
            revealMenu() {
                KTMenu.getInstance(this.$refs.menu)?.show()
            },
            showToolbox(show: boolean = true) {
                if (show) {
                    this.isToolboxVisible = true;
                } else {
                    this.isToolboxVisible = false;
                    KTMenu.getInstance(this.$refs.menu)?.hide()
                }
            }
        }
    })
</script>
<style>
 .kanban-board-body {
     --kt-scrollbar-width: 0 !important;
 }
</style>
