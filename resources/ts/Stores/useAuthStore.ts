import { defineStore } from "pinia";
import { computed, ref } from "vue";
import User from "@Models/User";

interface State {

}

export const useAuthStore = defineStore('authStore', () =>{
    const user = ref<User|null>(null)
    const latestAttendance = computed(() => user.value?.latest_attendance)

    async function fetch() {
        console.log('Fetched')
        return await axios.get(route('api.fetch.auth.user')).then((res) => res.data.user)
    }

    function set(attrs: object) {
        user.value = new User(attrs)
    }

    async function load() {
        set(await fetch())
    }

    return {
        user: computed(() => user.value),
        load,
        set,
        fetch
    }
})
