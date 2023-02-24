import { router } from "@inertiajs/core";
import { InertiaForm } from "@inertiajs/vue3";

export default function useAuthentication() {
    function login(form: InertiaForm<any>) {
        form.post(route('login'), {
            onBefore: (e) => {
                // console.log(e);
            }
        })
    }

    function logout() {
        router.post(route('logout'));
    }

    return { login, logout }
}
