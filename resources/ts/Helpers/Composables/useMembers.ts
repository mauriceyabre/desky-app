import { useMembersStore } from "@Stores/useMembersStore";
import { computed } from "vue";
import User from "@Models/User";

export default function useMembers() {

    const membersStore = useMembersStore();
    const selectedMember = computed<User|null>(() => membersStore.selected);

    const members = computed<User[]>(() => {
        return membersStore.all;
    })

    function setSelectedMember(id: number|string) {
        if (id) {
            membersStore.selected = membersStore.all.find(member => member.id == id) ?? null;
            return selectedMember.value;
        }
        return null;
    }

    return { membersStore, selectedMember, setSelectedMember, members }
}
