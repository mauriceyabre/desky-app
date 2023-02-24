import { SweetAlertOptions } from "sweetalert2";
import { nextTick } from "vue";

interface AppCoreHelper {
    test(): void
    init: () => void,
    dangerDialog: (options: SweetAlertOptions, callback: () => void) => Promise<void>,
    dialog: (options: SweetAlertOptions, callback: () => void) => Promise<void>,
    confirmDialog: (options: SweetAlertOptions, callback: () => void) => Promise<void>,
    warningDialog: (options: SweetAlertOptions, callback: () => void) => Promise<void>,
    successDialog: (options: SweetAlertOptions, callback: () => void) => Promise<void>
}

export default function AppCoreHelper(): AppCoreHelper {
    function test() {
        console.log('TESTED')
    }

    function dialog(options: SweetAlertOptions, callback: () => void): Promise<void> {
        return Swal.fire({
            title: options.title ?? 'Attenzione'.toUpperCase(),
            text: options.text?.capitalizeFirst() ?? '',
            icon: 'info',
            showCancelButton: options.showCancelButton ?? true,
            showConfirmButton: options.showConfirmButton ?? true,
            confirmButtonText: options.confirmButtonText ?? 'Conferma',
            buttonsStyling: options.buttonsStyling ?? false,
            customClass: options.customClass ?? {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-secondary'
            }
        }).then((e) => {
            if (e.isConfirmed) {
                callback();
            }
        })
    }

    function confirmDialog(options: SweetAlertOptions , callback: () => void): Promise<void> {
        return Swal.fire({
            title: options.title?.toString().toUpperCase() ?? 'Attenzione'.toUpperCase(),
            text: options.text?.toString().capitalizeFirst() ?? '',
            icon: 'info',
            iconColor: 'var(--kt-primary)',
            showCancelButton: options.showCancelButton ?? true,
            showConfirmButton: options.showConfirmButton ?? true,
            confirmButtonText: options.confirmButtonText ?? 'Conferma',
            buttonsStyling: options.buttonsStyling ?? false,
            customClass: options.customClass ?? {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-secondary'
            }
        }).then((e) => {
            if (e.isConfirmed) {
                callback();
            }
        })
    }

    function warningDialog(options: SweetAlertOptions, callback: () => void): Promise<void> {
        return Swal.fire({
            title: options.title?.toString().toUpperCase() ?? 'Attenzione'.toUpperCase(),
            text: options.text?.toString().capitalizeFirst() ?? '',
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: options.confirmButtonText ?? 'Conferma',
            cancelButtonText: 'Annulla',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-warning',
                cancelButton: 'btn btn-secondary'
            }
        }).then((e) => {
            if (e.isConfirmed) {
                callback();
            }
        })
    }

    function successDialog(options: SweetAlertOptions, callback: () => void): Promise<void> {
        return Swal.fire({
            text: options.text?.capitalizeFirst() ?? '',
            icon: 'success',
            title: options.title?.toString().toUpperCase() ?? 'Conferma'.toUpperCase(),
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: options.confirmButtonText ?? 'Conferma',
            cancelButtonText: 'Annulla',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-secondary'
            }
        }).then((e) => {
            if (e.isConfirmed) {
                callback();
            }
        })
    }

    function dangerDialog(options: SweetAlertOptions, callback: () => void): Promise<void> {
        return Swal.fire({
            text: options.text?.toString().capitalizeFirst() ?? '',
            title: options.title?.toString().toUpperCase() ?? 'Attenzione'.toUpperCase(),
            icon: 'error',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: options.confirmButtonText ?? 'Continua',
            cancelButtonText: 'Annulla',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-danger',
                cancelButton: 'btn btn-secondary'
            }
        }).then((e) => {
            if (e.isConfirmed) {
                callback();
            }
        })
    }

    async function init(): Promise<void> {
        await nextTick(() => {
            KTComponents.init();
        })
        document.querySelector('body>.tooltip')?.remove();
    }

    return {
        test,
        init,
        dangerDialog,
        dialog,
        confirmDialog,
        warningDialog,
        successDialog
    }
}
