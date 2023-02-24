import { onMounted, ref } from "vue";

interface SBModal {
    close(): void
    open(): void
    onClosing(fn: () => {}|void): void
    onClosed(fn: () => {}|void): void
    onOpened(fn: () => {}|void): void
    element(): HTMLElement|null
    bsElement() : typeof bootstrap.Modal
}

function useModal(modalId: string): SBModal {

    const isOpen = ref(false);

    function element() : HTMLElement|null {
        return document.getElementById(modalId);
    }

    function bsElement() : typeof bootstrap.Modal {
        return bootstrap.Modal.getOrCreateInstance(element()!);
    }

    function close() {
        bsElement().hide();
    }

    function open() {
        isOpen.value = true;
        bsElement().show();
    }

    function onClosed(fn: () => {}|void): void {
        if (typeof element() !== "string")
            (element() as HTMLElement)?.addEventListener('hidden.bs.modal', fn)
    }

    function onClosing(fn: () => {}|void): void {
        if (typeof element() !== "string")
            (element() as HTMLElement)?.addEventListener('hide.bs.modal', fn)
    }

    function onOpened(fn: () => {}|void): void {
        (element() as HTMLElement)?.addEventListener('shown.bs.modal', fn)
    }

    onMounted(() => {
        onClosed(() => {
            if (isOpen.value === true) isOpen.value = false;
        })
    })

    return { close, open, onClosing, onClosed, onOpened, element, bsElement}

}

export { useModal, SBModal }
