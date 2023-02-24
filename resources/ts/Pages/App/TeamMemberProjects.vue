<template>
    <div class="row g-5 g-xxl-8">
        <div class="col-xl-12">
            <div class="card card-flush">
                <div class="card-header">
                    <div class="card-title">
                        <h2>Riepilogo</h2>
                    </div>
                    <div class="card-toolbar">
                        <select id="year_filter" name="year_filter" :value="projects.filter.year" data-control="select2" data-hide-search="true" class="form-select form-select-sm form-select-solid w-125px">
                            <option value="">Tutti</option>
                            <option :value="year" v-for="year in projects.years">{{ year }}</option>
                        </select>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row g-5 g-xxl-8">
                        <div class="col-xl-6">
                            <!--begin::Heading-->
                            <div class="fs-2hx fw-bold">{{ projects.counts.total }}</div>
                            <div class="fs-4 fw-semibold text-gray-400 mb-7">Progetti Assegnati: {{ projects.filter.year }}</div>
                            <!--end::Heading-->
                            <!--begin::Wrapper-->
                            <div class="d-flex flex-wrap">
                                <!--begin::Chart-->
                                <div class="d-flex flex-center h-100px w-100px me-9 mb-5">
                                    <apexchart height="120" :series="donutChart1.series" :options="donutChart1.chartOptions" :type="donutChart1.type" />
                                </div>
                                <!--end::Chart-->
                                <!--begin::Labels-->
                                <div class="d-flex flex-column justify-content-center flex-row-fluid pe-11 mb-5">
                                    <!--begin::Label-->
                                    <div class="d-flex fs-6 fw-semibold align-items-center mb-3">
                                        <div class="bullet bg-info me-3"></div>
                                        <div class="text-gray-400">Da Iniziare</div>
                                        <div class="ms-auto fw-bold text-gray-700">{{ projects.counts.new }}</div>
                                    </div>
                                    <!--end::Label-->
                                    <!--begin::Label-->
                                    <div class="d-flex fs-6 fw-semibold align-items-center mb-3">
                                        <div class="bullet bg-primary me-3"></div>
                                        <div class="text-gray-400">In Corso</div>
                                        <div class="ms-auto fw-bold text-gray-700">{{ projects.counts.ongoing }}</div>
                                    </div>
                                    <!--end::Label-->
                                    <!--begin::Label-->
                                    <div class="d-flex fs-6 fw-semibold align-items-center">
                                        <div class="bullet bg-success me-3"></div>
                                        <div class="text-gray-400">Completati</div>
                                        <div class="ms-auto fw-bold text-gray-700">{{ projects.counts.completed }}</div>
                                    </div>
                                    <!--end::Label-->
                                </div>
                                <!--end::Labels-->
                            </div>
                            <!--end::Wrapper-->
                        </div>
                        <div class="col-xl-6">
                            <div class="d-flex flex-center h-100 text-muted text-center">
                                Coming Soon:
                                <br>
                                Grafico a Barre
                                <br>
                                con Andamento Annuale
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col">
            <!--begin::Card-->
            <div class="card card-flush">
                <!--begin::Header-->
                <div class="card-header">
                    <!--begin::Title-->
                    <div class="card-title">
<!--                        <h3 class="d-flex flex-center">Progetti Assegnati</h3>-->
                    </div>
                    <!--begin::Toolbar-->
                    <div class="card-toolbar min-w-125px">
                        <select id="group_filter" name="group_filter" :value="projects.filter.group" data-control="select2" data-hide-search="true" class="form-select form-select-sm form-select-solid min-w-125px">
                            <option :value="group.value" v-for="group in filterValues">{{ group.text }}</option>
                        </select>
                    </div>
                    <!--end::Toolbar-->
                </div>
                <!--end::Header-->
                <!--begin::Body-->
                <div class="card-body pt-6">
                    <!--begin::Table container-->
                    <div class="table-responsive">
                        <!--begin::Table-->
                        <table class="table table-row-dashed align-middle gs-0 gy-3 my-0">
                            <!--begin::Table head-->
                            <thead>
                                <tr class="fs-7 fw-bold text-gray-400 border-bottom-0">
                                    <th class="p-0 pb-3 min-w-200px text-start">PROGETTO</th>
                                    <th class="p-0 pb-3 text-end">FASE</th>
                                    <th class="p-0 pb-3 text-end">{{ (filter === 'completed') ? 'COMPLETATO' : 'SCADENZA' }}</th>
                                    <th class="p-0 pb-3 w-50px text-end"></th>
                                </tr>
                            </thead>
                            <!--end::Table head-->
                            <!--begin::Table body-->
                            <tbody>
                                <tr v-for="project in projects.filtered">
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="symbol symbol-50px me-3">
                                                <div class="symbol-label">
                                                    {{ (!!project.customer) ? project.customer.initials.toUpperCase() : '-' }}
                                                </div>
                                            </div>
                                            <div class="d-flex justify-content-start flex-column">
                                                <a href="#" class="text-gray-800 fw-bold text-hover-primary mb-1 fs-6">{{ project.name }}</a>
                                                <span class="text-gray-400 fw-semibold d-block fs-7">{{ project.customer?.name }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-end pe-0">
                                        <!--begin::Label-->
                                        <span class="badge fs-7 px-4 py-3" :class="`badge-light-${project.getPhase.color}`">
                                            {{ project.phaseName }}
                                        </span>
                                        <!--end::Label-->
                                    </td>
                                    <td class="text-end pe-0">
                                        <!--begin::Label-->
                                        <span class="badge fs-7 px-4 py-3" :class="`badge-light-${project.daysToDeadline>0 ? project.daysToDeadline<=7 ? 'warning' : 'success' : 'danger'}`"
                                                v-if="project.hasDeadline && !project.isCompleted" data-bs-toggle="tooltip" data-bs-trigger="hover" :title="moment(project.deadline).format('ddd, D MMMM').capitalize()"
                                                data-bs-delay-show="500">
                                            {{ moment(project.deadline).fromNow() }}
                                        </span>
                                        <span class="badge badge-light-success px-4 fs-7 py-3" v-else-if="project.isCompleted" data-bs-toggle="tooltip" data-bs-trigger="hover" :title="moment(project.completed_at).format('ddd, D MMMM').capitalize()"
                                                data-bs-delay-show="500">{{ moment(project.completed_at).fromNow() }}</span>
                                        <span class="badge badge-light-secondary px-4 fs-7 py-3" v-else>-</span>
                                        <!--end::Label-->
                                    </td>
                                    <td class="text-end">
                                        <a href="#" class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px">
                                            <!--begin::Svg Icon | path: icons/duotune/arrows/arr001.svg-->
                                            <span class="svg-icon svg-icon-5 svg-icon-gray-700">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.4 11H3C2.4 11 2 11.4 2 12C2 12.6 2.4 13 3 13H14.4V11Z" fill="currentColor"></path>
                                                    <path opacity="0.3" d="M14.4 20V4L21.7 11.3C22.1 11.7 22.1 12.3 21.7 12.7L14.4 20Z" fill="currentColor"></path>
                                                </svg>
                                            </span>
                                            <!--end::Svg Icon-->
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                            <!--end::Table body-->
                        </table>
                    </div>
                    <!--end::Table-->
                </div>
                <!--end: Card Body-->
            </div>
            <!--end::Card-->
        </div>
    </div>
</template>
<script setup lang="ts">
    import { useProjectsStore } from "@Helpers/Stores/useProjectsStore";
    import User from "@Models/User";
    import { onMounted, onUpdated, ref } from "vue";
    import { ApexOptions } from "apexcharts";

    const props = defineProps({
        user: User
    })

    const projects = useProjectsStore();
    if (props.user?.projects) {
        projects.all = props.user.projects
        projects.filter.year = moment().year()
    }

    const filterValues = [
        {
            value: 'new',
            text: 'Nuovi'
        },
        {
            value: 'active',
            text: 'In Corso'
        },
        {
            value: 'completed',
            text: 'Completati'
        }
    ]

    const filter = ref('active');

    const donutChart1: { type: string, series: Array<any>, chartOptions: ApexOptions } = {
        type: 'donut',
        series: [projects.counts.new, projects.counts.ongoing, projects.counts.completed],
        chartOptions: {
            chart: {
                id: 'projects_donut',
                animations: {
                    enabled: false
                }
            },
            labels: ['Nuovi', 'In Corso', 'Completati'],
            colors: ['#7239ea', '#009ef7', '#50cd89'],
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
        }
    }

    onUpdated(() => {
        // AppCore.init();
    })

    onMounted(() => {
        const yearFilter = $('#year_filter');
        yearFilter.on('select2:select', function (e: any) {
            projects.filter.year = e.params.data.id
        });
        $('#group_filter').on('select2:select', function (e: any) {
            projects.filter.group = e.params.data.id
        });
    })
</script>
