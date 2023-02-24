<template xmlns="http://www.w3.org/1999/html">
    <TeamMemberLayout :user="user">
<!--        <div class="row gy-5 g-xl-10">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-body">
                        <apexchart height="180" :series="barChart1.series" :options="barChart1.chartOptions" :type="barChart1.type" />
                    </div>
                </div>
            </div>
            <div class="col-xxl-5 min-w-850px">
                <div class="card">
                    <div class="card-body">
                        <div class="px-10 py-12">
                            <div class="card bg-light" v-for="log in timesheetStore.selectedLogs">
                                <div class="card-body p-4">
                                    <form>
                                        <div id="kt_customer_view_payment_method" class="accordion">
                                            &lt;!&ndash;begin::Option&ndash;&gt;
                                            <div id="time_logs_collapsible_wrap">
                                                &lt;!&ndash;begin::Header&ndash;&gt;
                                                <div class="d-flex flex-stack flex-wrap">
                                                    &lt;!&ndash;begin::Toggle&ndash;&gt;
                                                    <div class="d-flex align-items-center flex-row-fluid gap-10">
                                                        <div class="d-flex flex-row gap-4 align-items-center">
                                                            <b class="mx-6"> 1 </b>
                                                            <div>
                                                                <label class="form-label">Inizio</label>
                                                                <input class="form-control form-control-sm" type="time" />
                                                            </div>
                                                            <div>
                                                                <label class="form-label">Fine</label>
                                                                <input class="form-control form-control-sm" type="time" />
                                                            </div>
                                                            <div>
                                                                <label class="form-label">Durata</label>
                                                                <input class="form-control w-100px form-control-sm" disabled type="number" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    &lt;!&ndash;end::Toggle&ndash;&gt;
                                                    &lt;!&ndash;begin::Toolbar&ndash;&gt;
                                                    <div class="d-flex flex-row-auto">
                                                        &lt;!&ndash;begin::Edit&ndash;&gt;
                                                        <button aria-controls="time_logs_collapsible" aria-expanded="false" class="btn btn-icon btn-light w-30px h-30px me-3 collapsible rotate collapsed" data-bs-target="#time_logs_collapsible" data-bs-toggle="collapse" @click.prevent>
                                                            <span>
                                                                &lt;!&ndash;begin::Svg Icon | path: icons/duotune/art/art005.svg&ndash;&gt;
                                                                <i class="bi bi-pencil-fill fs-4"></i>
                                                                &lt;!&ndash;end::Svg Icon&ndash;&gt;
                                                            </span>
                                                        </button>
                                                        &lt;!&ndash;end::Edit&ndash;&gt;
                                                        &lt;!&ndash;begin::Delete&ndash;&gt;
                                                        <button class="btn btn-icon btn-light w-30px h-30px me-3" @click.prevent>
                                                            &lt;!&ndash;begin::Svg Icon | path: icons/duotune/general/gen027.svg&ndash;&gt;
                                                            <i class="bi bi-x-lg fs-4"></i>
                                                            &lt;!&ndash;end::Svg Icon&ndash;&gt;
                                                        </button>
                                                        &lt;!&ndash;end::Delete&ndash;&gt;
                                                    </div>
                                                    &lt;!&ndash;end::Toolbar&ndash;&gt;
                                                </div>
                                                &lt;!&ndash;end::Header&ndash;&gt;
                                                &lt;!&ndash;begin::Body&ndash;&gt;
                                                <div id="time_logs_collapsible" class="fs-6 collapse" data-bs-parent="#time_logs_collapsible_wrap" style="">
                                                    &lt;!&ndash;begin::Details&ndash;&gt;
                                                    <div class="card bg-gray-200 mt-6">
                                                        <div class="card-body px-8 py-4">
                                                            <div class="d-flex flex-center flex-column gap-2">
                                                                <i class="bi bi-briefcase fs-2x" />
                                                                <button class="btn btn-sm btn-flush" @click.prevent>
                                                                    Assegna progetto <i class="bi bi-plus fs-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    &lt;!&ndash;end::Details&ndash;&gt;
                                                </div>
                                                &lt;!&ndash;end::Body&ndash;&gt;
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="col-xl-12">
                <div class="card card-flush">
                    <div class="card-body">
&lt;!&ndash;                        <FullCalendar :options="calendarOptions" ref="calendar">&ndash;&gt;
&lt;!&ndash;                            <template #eventContent="arg">&ndash;&gt;
&lt;!&ndash;                                <div class="px-1 py-0 fc-event-title">&ndash;&gt;
&lt;!&ndash;                                    <div v-if="!!arg.event.end" class="fs-8">&ndash;&gt;
&lt;!&ndash;                                        {{ moment(arg.event.started_at).format('HH:mm') + ' - ' + moment(arg.event.end).format('HH:mm')&ndash;&gt;
&lt;!&ndash;                                        }}&ndash;&gt;
&lt;!&ndash;                                        <br>&ndash;&gt;
&lt;!&ndash;                                        <span class="mt-n3 opacity-75">&ndash;&gt;
&lt;!&ndash;                                            {{ arg.event.title }}&ndash;&gt;
&lt;!&ndash;                                        </span>&ndash;&gt;
&lt;!&ndash;                                    </div>&ndash;&gt;
&lt;!&ndash;                                    <span v-else class="animation-blink">&ndash;&gt;
&lt;!&ndash;                                        {{ moment(arg.event.started_at).format('HH:mm') + ' - In Corso' }}&ndash;&gt;
&lt;!&ndash;                                    </span>&ndash;&gt;
&lt;!&ndash;                                </div>&ndash;&gt;
&lt;!&ndash;                            </template>&ndash;&gt;
&lt;!&ndash;                        </FullCalendar>&ndash;&gt;
                    </div>
                </div>
            </div>
        </div>-->
    </TeamMemberLayout>
    <!--    <teleport to="body">-->
    <!--        <AppModal id="timesheet" :modal="timesheetModal" centered size="large">-->
    <!--            <template #title>
                    <span>
                        Sessioni di: {{ moment(timesheetStore.filter.date?.toISOString()).format('dddd, LL').capitalize() }}
                    </span>
                </template>-->
    <div class="px-10 py-12">
                <form>
                    <div id="kt_customer_view_payment_method" class="accordion">
                        <!--begin::Option-->
                        <div class="py-0" id="time_logs_collapsible_wrap">
                            <!--begin::Header-->
                            <div class="py-3 d-flex flex-stack flex-wrap">
                                <!--begin::Toggle-->
                                <div class="d-flex align-items-center flex-row-fluid gap-10">
                                    <div class="d-flex flex-row gap-4">
                                        <input type="time" class="form-control form-control-solid" />
                                        <input type="time" class="form-control form-control-solid" />
                                    </div>
                                    <div class="d-flex">
                                        Durata
                                    </div>
                                </div>
                                <!--end::Toggle-->
                                <!--begin::Toolbar-->
                                <div class="d-flex flex-row-auto">
                                    <!--begin::Edit-->
                                    <div data-bs-toggle="collapse" data-bs-target="#time_logs_collapsible" aria-expanded="false" aria-controls="time_logs_collapsible" role="button" class="btn btn-icon btn-active-light-primary w-30px h-30px me-3 collapsible rotate collapsed">
                                        <span data-bs-toggle="tooltip" data-bs-trigger="hover" aria-label="Edit" data-bs-original-title="Edit">
                                            <!--begin::Svg Icon | path: icons/duotune/art/art005.svg-->
                                            <span class="svg-icon svg-icon-3">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z"
                                                        fill="currentColor"></path>
                                                    <path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z"
                                                        fill="currentColor"></path>
                                                </svg>
                                            </span>
                                            <!--end::Svg Icon-->
                                        </span>
                                    </div>
                                    <!--end::Edit-->
                                    <!--begin::Delete-->
                                    <a href="#" class="btn btn-icon btn-active-light-primary w-30px h-30px me-3" data-bs-toggle="tooltip" data-kt-customer-payment-method="delete" aria-label="Delete"
                                        data-bs-original-title="Delete" data-kt-initialized="1">
                                        <!--begin::Svg Icon | path: icons/duotune/general/gen027.svg-->
                                        <span class="svg-icon svg-icon-3">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor"></path>
                                                <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor"></path>
                                                <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                        <!--end::Svg Icon-->
                                    </a>
                                    <!--end::Delete-->
                                </div>
                                <!--end::Toolbar-->
                            </div>
                            <!--end::Header-->
                            <!--begin::Body-->
                            <div id="time_logs_collapsible" class="fs-6 ps-10 collapse" data-bs-parent="#time_logs_collapsible_wrap" style="">
                                <!--begin::Details-->
                                <div class="d-flex flex-wrap py-5">
                                    Form per i progetti
                                </div>
                                <!--end::Details-->
                            </div>
                            <!--end::Body-->
                        </div>
                        <!--end::Option-->
                        <div class="separator separator-dashed"></div>
                    </div>
                </form>
            </div>
    <!--        </AppModal>-->
    <!--    </teleport>-->
</template>
<script setup lang="ts">
    import '@fullcalendar/core/vdom'
    import User from "@Models/User"
    import TeamMemberLayout from "@Layouts/app/TeamMemberLayout.vue"
    import { computed, onMounted, reactive, ref, watch } from "vue"
    import { ApexOptions } from "apexcharts"
    import { CalendarOptions } from "@fullcalendar/vue3"
    import dayGridPlugin from '@fullcalendar/daygrid/main'
    import interactionPlugin from '@fullcalendar/interaction/main'
    import momentTimezonePlugin from '@fullcalendar/moment-timezone'
    import itLocale from '@fullcalendar/core/locales/it'
    import { useModal } from "@Composables/useModal"
    import { useTimesheetStore } from "@Helpers/Stores/useTimesheetStore"

    interface Props {
        member: Object,
        data: Object
    }

    const props = defineProps<Props>();

    const user = computed(() => {
        return new User(props.member);
    })

    const timesheetModal = useModal('timesheet_modal');

    const timesheetStore = useTimesheetStore();
    timesheetStore.setTimeLogs(props.data);

    const calendar = ref();

    const calendarFormattedTimeLogs = computed(() => {
        return timesheetStore.all.map(log => {
            const started_at = log.started_at ? new Date(log.started_at) : undefined
            const ended_at = log.ended_at ? new Date(log.ended_at) : undefined
            const duration = log.printedDuration
            return {
                id: log.id?.toString(),
                started_at: started_at,
                ended_at: ended_at,
                title: duration,
                className: 'fc-event-primary',
                fullDay: true
            }
        })
    })

    const calendarOptions: CalendarOptions = reactive({
        timeZone: 'Europe/Rome',
        locale: itLocale,
        plugins: [
            dayGridPlugin,
            momentTimezonePlugin,
            interactionPlugin
        ],
        themeSystem: 'bootstrap3',
        headerToolbar: {
            left: 'prev,next today',
            right: 'title',
            center: ''
        },
        // hiddenDays: [0],
        businessHours: {
            dayOfWeek: [1, 2, 3, 4, 5],
            startTime: '9:30',
            endTime: '19:30'
        },
        showNonCurrentDates: false,
        initialView: 'dayGridMonth',
        editable: false,
        events: function (info, successCallback) {
            successCallback(calendarFormattedTimeLogs.value)
        },
        eventDisplay: 'block',
        dateClick: function (info) {
            if (moment(info.date).isAfter(moment(), 'day')) {
                return false;
            }
            handleCalendarClick(info.date)
        },
        eventClick: function (info) {
            handleCalendarClick(info.event.start)
        }
    })

    watch(() => props.data, () => {
        timesheetStore.setTimeLogs(props.data);
        calendarOptions.events = calendarFormattedTimeLogs.value
    })

    const barChart1: { type: string, series: Array<any>, chartOptions: ApexOptions } = reactive({
        type: 'bar',
        series: [
            {
                name: 'Sessione',
                data: timesheetStore.latest30Days.groupedByDays.hourlyDurations
            }
        ],
        chartOptions: {
            chart: {
                toolbar: {
                    show: false
                }
            },
            title: {
                text: 'Andamento Ultimi 15 Giorni'
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    dataLabels: {
                        position: 'bottom'
                    }
                }
            },
            fill: {
                colors: ['#009ef7']
            },
            grid: {
                show: false
            },
            tooltip: {
                enabled: true,
                y: {
                    formatter(val: number): string {
                        return Math.floor(val).toString() + 'h ' + ((val % 1) * 60).toString() + 'm';
                    }
                }
            },
            xaxis: {
                categories: timesheetStore.latest30Days.groupedByDays.days.map(day => moment(day).format('DD/MM'))
            },
            yaxis: {
                show: false,
                opposite: true,
                forceNiceScale: true,
                labels: {
                    formatter(val: number): string | string[] {
                        return Math.floor(val).toString() + 'h';
                    }
                }
            },
            annotations: {
                yaxis: [
                    {
                        y: 8,
                        label: {
                            text: '8h'
                        }
                    }
                ]
            },
            labels: ['Nuovi', 'In Corso', 'Completati'],
            colors: ['#7239ea', '#009ef7', '#50cd89'],
            dataLabels: {
                enabled: true
            },
            legend: {
                show: false
            },
        }
    })

    function handleCalendarClick(date: Date | null) {
        timesheetStore.filter.date = date;
        timesheetModal.open();
    }

    onMounted(() => {
        timesheetModal.onClosed(() => {
            timesheetStore.filter.date = null;
        })

      timesheetStore.filter.date = moment().subtract(1, 'day').toDate()
    })
</script>
<style>
    .fc-daygrid-day {
        cursor: pointer !important;
    }
</style>
