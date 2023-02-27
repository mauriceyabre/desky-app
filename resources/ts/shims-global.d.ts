import { AxiosInstance } from "axios";
import { Moment } from "moment";
import Lodash from 'lodash';
import { Dropdown } from "bootstrap/js/dist/dropdown.d.ts";
import { Modal } from "bootstrap/js/dist/modal.d.ts";
import ziggyRouteFunction from "@types/ziggy-js";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js/types/src/core/pusher.d.ts';
import Swal2 from "sweetalert2";
import AppCoreHelper from "@Helpers/AppCore";
export { Select2 } from "select2"

declare global {
    interface Window {
        _: Lodash,
        axios: AxiosInstance,
        Echo: Echo,
        Pusher: Pusher,
        Desky: AppCoreHelper
    }

    const _: Lodash
    const Desky: AppCoreHelper

    const axios: AxiosInstance
    const KTApp
    const KTMenu: {
        getInstance(element: unknown): {
            show: () => void
            hide: () => void
        } | undefined
    }
    const KTComponents: {
        init()
    }

    const Swal: typeof Swal2
    const route: typeof ziggyRouteFunction
    const moment: Moment

    namespace bootstrap {
        const Modal: Modal
        const Dropdown: Dropdown
    }

    export namespace inertia {

        export interface Auth {
            user?: {[key:string]: any}
        }

        export type ErrorBags = undefined | { [key: string]: string[] }

        export type Errors = undefined | string[]
    }
}
