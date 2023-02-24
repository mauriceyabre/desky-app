import { computed, onBeforeUnmount, ref } from "vue";

export const useCurrentTime = () => {
    const date = ref<string>();
    const time = ref<string>();

    const getDate = () => moment().format('ddd, DD MMM YY').toString().capitalize();
    const getTime = () => {
        const hour = moment().format('HH');
        const minute = moment().format('mm');
        const second = (moment().second() % 2) ? ':' : ' ';
        return `${hour}${second}${minute}`;
    }

    date.value = getDate();
    time.value = getTime();

    const fullTime = computed(() => {
        return `${date.value} - ${time.value}`
    })

    const updateCurrentTime = () => {
        date.value = getDate();
        time.value = getTime();
    };

    const updateTimeInterval = setInterval(updateCurrentTime, 1000);

    onBeforeUnmount(() => {
        clearInterval(updateTimeInterval);
    });

    return { date, time, fullTime };
};
