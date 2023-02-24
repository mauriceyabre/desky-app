import { usePage } from "@inertiajs/vue3";
import User from "@Models/User";
import useAuthentication from "@Composables/useAuthentication";

export default function useAuth() {
    const user = new User(usePage().props.auth?.user);

    return { user, ...useAuthentication() }
}
