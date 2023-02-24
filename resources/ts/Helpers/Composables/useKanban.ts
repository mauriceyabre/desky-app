import { onMounted, onUnmounted, onUpdated, ref, watch } from "vue";

export default function useKanban(sliderBoardId: string = 'board', draggableClass: string = 'kanban-item') {

    const sliderEl = ref<HTMLElement>();
    const draggableEls = ref<Element[]>();
    const toolButtons = ref<Element[]>()

    const startX = ref<number>(0);
    const scrollLeft = ref<number>(0);

    const isMouseDown = ref<boolean>(false);

    const isCardHovered = ref<boolean>(false);
    const isCardDragged = ref<boolean>(false);
    const isBoardScrollable = ref<boolean>(true);
    const isBoardScrolling = ref<boolean>(false);

    // Bord Sizes

    function isHScrollValidEvent(e: MouseEvent) {
        return ((e instanceof MouseEvent) && e.button === 0)
    }

    function scrollListenMouseDown(e: MouseEvent): void {
        if (isHScrollValidEvent(e)) {
            isMouseDown.value = true;

            if(sliderEl.value) {
                sliderEl.value.classList.remove('cursor-grab');
                sliderEl.value.classList.add('active', 'cursor-grabbing');

                startX.value = e.pageX - sliderEl.value.offsetLeft;
                scrollLeft.value = sliderEl.value.scrollLeft;
            }
        }
    }

    function scrollListenMouseMove(e: MouseEvent): void {
        if (!isMouseDown.value) return;
        // e.preventDefault();

        if (sliderEl.value) {
            const x = e.pageX - sliderEl.value.offsetLeft;
            const walk = (x - startX.value); //scroll-fast
            sliderEl.value.scrollLeft = scrollLeft.value - walk;
        }
    }

    function stopScrolling() {
        isMouseDown.value = false;

        sliderEl.value?.classList.add('cursor-grab');
        sliderEl.value?.classList.remove('active','cursor-grabbing');
        // console.log('Scroll Stopped')
    }

    function addListItemsListeners() {
        sliderEl.value?.addEventListener('mousemove', scrollListenMouseMove, true);
        document.addEventListener('mouseup', stopScrolling);
        document.addEventListener('mouseleave', stopScrolling)
        // console.log('Scroll Events Added')
    }

    function removeListItemsListeners() {
        sliderEl.value?.removeEventListener('mousemove', scrollListenMouseMove, true);
        document.removeEventListener('mouseup', stopScrolling);
        document.removeEventListener('mouseleave', stopScrolling)
        // console.log('Scroll Events Removed')
    }

    const chT = () => isCardHovered.value = true;
    const chF = () => isCardHovered.value = false;
    const cdT = () => isCardDragged.value = true;
    const cdF = () => isCardDragged.value = false;

    function addDraggableListeners() {
        draggableEls.value?.forEach((item) => {
            item.addEventListener('mouseenter', chT)
            item.addEventListener('mouseover', chT)
            item.addEventListener('mouseleave', chF)
            item.addEventListener('dragstart', cdT)
            item.addEventListener('dragend', cdF)
        })
        // console.log('Draggable Events Added')
    }


    function removeDraggableListeners() {
        draggableEls.value?.forEach((item) => {
            item.removeEventListener('mouseenter', chT)
            item.removeEventListener('mouseover', chT)
            item.removeEventListener('mouseleave', chF)
            item.removeEventListener('dragstart', cdT)
            item.removeEventListener('dragend', cdF)
        })
        // console.log('Draggable Events Removed')
    }

    function addScrollListenerMouseDown() {
        sliderEl.value!.addEventListener('mousedown', scrollListenMouseDown);
        // console.log('Scroll Area Mouse Down Added')
    }

    function removeScrollListenerMouseDown() {
        sliderEl.value!.removeEventListener('mousedown', scrollListenMouseDown);
        // console.log('Scroll Area Mouse Down Removed')
    }

    function init() {

        // set mouse as up
        isMouseDown.value = false

        // set init variables
        isCardHovered.value = false
        isCardDragged.value = false
        isBoardScrollable.value = true
        isBoardScrolling.value = false

        // Html Elements
        sliderEl.value = document.getElementById(sliderBoardId)!;
        draggableEls.value = Array.from(document.getElementsByClassName(draggableClass)!);
        toolButtons.value = Array.from(document.getElementsByClassName('tools-button-box'));

        // console.log(toolButtons.value)

        // sliderEl.value?.addEventListener("mousemove", handleScrollMove, false);

        // Add Cursor Grab Icon
        sliderEl.value?.classList.add('cursor-grab');

    }

    watch([isCardHovered, isCardDragged], ([newHovered, newDragged]) => {
        // console.log(['Dragged, Hovered', newDragged, newHovered])
        isBoardScrollable.value = !(newHovered || newDragged);
    })

    watch(isMouseDown, (newValue) => {
        // console.log('check click', (newValue), isBoardScrollable.value)
            if (newValue) {
                // mousedown -> start scroll
                addListItemsListeners();
                removeDraggableListeners()
            } else {
                // mouseup -> stop scroll
                removeListItemsListeners()
                addDraggableListeners()
            }
        // }
    })

    watch(isBoardScrollable, (scrollValue) => {
        // console.log('isScrollable', scrollValue);

        if (scrollValue) {
            // In scrollable area
            addScrollListenerMouseDown()
        } else {
            // Not in scrollable area
            removeScrollListenerMouseDown()
        }

    })

    onUpdated(() => {
        // reset();
        init();
        addDraggableListeners();
        addScrollListenerMouseDown();

        // console.log('Updated')
        // console.log(isCardHovered.value)
    })

    onMounted(() => {
        init()
        // Add Listeners to Cards
        addDraggableListeners()

        // Add Listener to Scroll Region
        addScrollListenerMouseDown()
    })

    onUnmounted(() => {
        removeScrollListenerMouseDown()
        removeListItemsListeners()
        removeDraggableListeners()
    })

    return { isCardHovered, isCardDragged, isBoardScrollable, isBoardScrolling, isMouseDown }
}
