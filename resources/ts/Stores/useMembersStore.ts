import { defineStore } from "pinia";
import User from "@Models/User";
import { SBModal } from "@Composables/useModal";

interface State {
    all: User[],
    selected: User|null,
    modal: {
        element: SBModal|null,
        isOpen: boolean
    }
}

export const useMembersStore = defineStore({
    id: 'membersStore',
    state: (): State => {
        return {
            all: [] as User[],
            selected: null,
            modal: {
                element: null,
                isOpen: false
            }
        }
    },
    getters: {
        selectOptions(): {value: number, title: string }[] {
            return this.all.map(user => {
                return {
                    value: user.id,
                    title: user.name
                }
            }).sort((a, b) => a.title.localeCompare(b.title))
        },
        inactiveMembers(): User[] {
            return this.all.filter(member => !member.hasOngoingProjects);
        }
    },
    actions: {
        reset() {
            this.$reset()
        },
        set(members: Object) {
            if (Object.keys(members).length) {
                this.all = Object.values(members).map(member => new User(member));
                return true;
            }
            return false;
        },
        refreshSelected(): void {
            if (this.selected && typeof this.all.length) {
                this.selected = this.all.find(user => user.id === this.selected!.id) ?? this.selected;
            }
        }
    }
})
