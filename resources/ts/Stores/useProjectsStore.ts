import { defineStore } from "pinia";
import Project from "@Models/Project";
import { reactive } from "vue";

interface State {
    all: Project[],
    selected: Project | null,
    archived: Project[],
    phases: {id: string, title: string}[],
    filter: {
        group: string,
        year: number | null,
        month: number | null
    }
}

interface PhaseColumn {
    id: string,
    title: string,
    projects: Project[],
    count: number,
    quote_sum: number,
    color?: string
}

const activePhases = ['ongoing', 'review', 'approved', 'delivered'];

function filterByPhase(group: Project[], phases: string[]) {
    return group.filter(project => phases.includes(project.phase) && !project.isCompleted);
}

function sortByDeadline(projects: Project[]) {
    return projects.sort(function (a, b) {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline!).valueOf() - new Date(b.deadline!).valueOf()
    })
}

export const useProjectsStore = defineStore({
    id: 'projectsStore',
    state: (): State => {
        return {
            all: [],
            selected: null,
            archived: [],
            phases: [],
            filter: {
                group: 'active',
                year: null,
                month: null
            }
        }
    },
    getters: {
        yearsFiltered() {
            let filtered: Project[] = this.all;
            if (this.filter.year) {
                filtered = filtered.filter(project => moment.min(moment(project.created_at), moment(project.started_at)).year() == this.filter.year)
            }
            if (this.filter.month) {
                filtered = filtered.filter(project => moment.min(moment(project.created_at), moment(project.started_at)).month() == this.filter.month)
            }
            return filtered;
        },
        groupFiltered(state) {
            let filtered: Project[];
            switch (state.filter.group) {
                case 'active':
                    filtered = sortByDeadline(filterByPhase(state.all, activePhases));
                    break;
                case 'new':
                    filtered = sortByDeadline(filterByPhase(state.all, ['new']));
                    break;
                case 'completed':
                    filtered = state.all.filter(project => project.isCompleted).sort((a, b) => new Date(b.completed_at!).valueOf() - new Date(a.completed_at!).valueOf());
                    break;
                case 'expiring':
                    filtered = sortByDeadline(filterByPhase(state.all, activePhases).filter(project => project.hasDeadline));
                    break;
                case 'notExpiring':
                    filtered = sortByDeadline(filterByPhase(state.all, activePhases).filter(project => !project.hasDeadline));
                    break;
                default:
                    filtered = state.all;
            }
            return filtered;
        },
        counts() {
            const total = this.yearsFiltered.length;
            // @ts-ignore
            const deals = this.yearsFiltered.filter((project) => project.phase == 'deal').length;
            // @ts-ignore
            const news = this.yearsFiltered.filter((project) => project.phase == 'new').length;
            // @ts-ignore
            const ongoing = this.yearsFiltered.filter((project) => ['ongoing', 'review', 'approved', 'delivered'].includes(project.phase) && !project.isCompleted).length;
            // @ts-ignore
            const completed = this.yearsFiltered.filter((project) => project.isCompleted).length;
            const active = news + ongoing;
            return {
                'total': total,
                'deals': deals,
                'new': news,
                'ongoing': ongoing,
                'completed': completed,
                'active': active
            }
        },
        active() {
            // return this.filterByGroup();
        },
        new(state) {
            return sortByDeadline(filterByPhase(state.all, ['new']));
        },
        completed(state) {
            return state.all.filter(project => project.isCompleted).sort((a, b) => new Date(b.completed_at!).valueOf() - new Date(a.completed_at!).valueOf());
        },
        expiring(state) {
            return sortByDeadline(filterByPhase(state.all, activePhases).filter(project => project.hasDeadline));
        },
        notExpiring(state) {
            return sortByDeadline(filterByPhase(state.all, activePhases).filter(project => !project.hasDeadline));
        },
        years(state) {
            return [...new Set(state.all.map(item => {
                return moment.min(moment(item.created_at), moment(item.started_at)).year()
            }))].filter(x => !Number.isNaN(x)).sort((a, b) => b - a);
        },
        filtered() {
            let filtered: Project[] = this.groupFiltered;
            if (this.filter.year) {
                filtered = filtered.filter(project => moment.min(moment(project.created_at), moment(project.started_at)).year() == this.filter.year)
            }
            if (this.filter.month) {
                filtered = filtered.filter(project => moment.min(moment(project.created_at), moment(project.started_at)).month() == this.filter.month)
            }
            return filtered;
        },
        kanbanized(state) {
            if (state.phases.length || (state.all && state.all.length)) {
                return state.phases.map((column: any) => {
                    const id = column.id;
                    const title = column.title;
                    const columProjects = reactive(state.all.filter((project) => {
                        return project.phase === id
                    }));
                    const count = columProjects.length;
                    const quoteSum: number = columProjects.reduce((a, b) => {
                        return (b.balance) ? a + b.balance : a;
                    }, 0);
                    const color = Project.$PHASES.find(phase => phase.id == id)?.color;
                    return { id, title, projects: columProjects, count, quote_sum: quoteSum, color } as PhaseColumn
                });
            }
            return [];
        }
    },
    actions: {
        refreshSelected() {
            if (this.selected) {
                this.selected = this.all.find(project => project.id == this.selected!.id)!
            }
        },
        setAll(projectsObject: Object) {
            this.all = Object.values(projectsObject).map(project => new Project(project));
        }
    }
})

export { PhaseColumn }
