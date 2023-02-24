<template>
    <div class="d-flex flex-column flex-xl-row">
        <div class="flex-column flex-lg-row-auto w-100 w-xl-350px mb-10">
            <div class="card mb-5 mb-xl-8">
                <div class="card-body pt-15">
                    <div class="d-flex flex-center flex-column mb-5">
                        <div class="symbol symbol-100px mb-7">
                            <div class="symbol-label fs-fluid fw-bold text-primary bg-light-primary">
                                <span class="fs-2hx">{{ customer.initials }}</span>
                            </div>
                        </div>
                        <span class="fs-3 text-center text-gray-800 fw-bold mb-1">
                            {{ customer.name }}
                        </span>
                        <div class="fs-5 fw-semibold text-muted mb-6">
                            <div class="badge badge-light-primary d-inline me-2" v-if="customer.category">
                                {{ customer.category.capitalize() }}
                            </div>
                            <div class="badge badge-light d-inline" v-if="customer.type">
                                {{ customer.type.capitalize() }}
                            </div>
                        </div>
                        <div class="d-flex flex-wrap flex-center w-100">
                            <div class="border border-gray-300 border-dashed rounded py-3 px-3 mb-3 flex-row-fluid">
                                <div class="fs-4 fw-bold text-gray-700">
                                    <span class="w-75px">0,00</span>
                                    <span class="svg-icon svg-icon-3 svg-icon-success">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="currentColor"></rect>
                                            <path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z"
                                                    fill="currentColor"></path>
                                        </svg>
                                    </span>
                                </div>
                                <div class="fw-semibold text-muted">Coming Soon</div>
                            </div>
                            <div class="border border-gray-300 border-dashed rounded py-3 px-3 mx-4 mb-3 flex-row-fluid">
                                <div class="fs-4 fw-bold text-gray-700">
                                    <span class="w-50px">0,00</span>
                                    <span class="svg-icon svg-icon-3 svg-icon-danger">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect opacity="0.5" x="11" y="18" width="13" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor"></rect>
                                            <path d="M11.4343 15.4343L7.25 11.25C6.83579 10.8358 6.16421 10.8358 5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75L11.2929 18.2929C11.6834 18.6834 12.3166 18.6834 12.7071 18.2929L18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25C17.8358 10.8358 17.1642 10.8358 16.75 11.25L12.5657 15.4343C12.2533 15.7467 11.7467 15.7467 11.4343 15.4343Z"
                                                    fill="currentColor"></path>
                                        </svg>
                                    </span>
                                </div>
                                <div class="fw-semibold text-muted">Coming Soon</div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-stack fs-4 py-3">
                        <div class="fw-bold rotate collapsible" data-bs-toggle="collapse" href="#kt_customer_view_details" role="button" aria-expanded="false" aria-controls="kt_customer_view_details">
                            Dettagli
                            <span class="ms-2 rotate-180">
                                <i class="bi bi-chevron-down" />
                            </span>
                        </div>
                        <span data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-original-title="Modifica Cliente">
                            <button class="btn btn-sm btn-light-primary" @click.prevent="isEditModalOpen = true">
                                Modifica
                            </button>
                        </span>
                    </div>
                    <div class="separator separator-dashed my-3"></div>
                    <div id="kt_customer_view_details" class="collapse show">
                        <div class="pt-5 fs-6">
                            <div>
                                <div class="fw-bold">ID Cliente</div>
                                <div class="text-gray-600">
                                    #{{ customer.id }}
                                    <span v-if="customer.ref_id">(Ref: {{ customer.ref_id }})</span>
                                </div>
                            </div>
                            <div v-if="customer.email">
                                <div class="fw-bold mt-5">Email Principale</div>
                                <div class="text-gray-600">
                                    <a :href="`mailto:${customer.email}`" class="text-gray-600 text-hover-primary">{{ customer.email }}</a>
                                </div>
                            </div>
                            <div v-if="customer.phone">
                                <div class="fw-bold mt-5">Telefono Principale</div>
                                <div class="text-gray-600">
                                    <a :href="`tel:${customer.phone.replaceAll(' ', '')}`" class="text-gray-600 text-hover-primary">{{ customer.phone }}</a>
                                </div>
                            </div>
                            <div v-if="customer.website">
                                <div class="fw-bold mt-5">Sito Web</div>
                                <div class="text-gray-600">
                                    <a :href="`${customer.website}`" class="text-gray-600 text-hover-primary">{{ customer.website }}</a>
                                </div>
                            </div>
                            <div v-if="customer.social_links">
                                <div class="fw-bold mt-5">Link Social</div>
                                <div class="text-gray-600">
                                    <a :href="`${link}`" target="_blank" rel="nofollow" v-for="(link, key) in customer.social_links" :key="key" class="d-block text-gray-600 text-hover-primary">
                                        <i :class="`bi bi-${key} me-2`" />
                                        {{ key.capitalize() }}
                                    </a>
                                </div>
                            </div>
                            <div class="separator separator-dashed my-6" />
                            <div>
                                <div class="fw-bold mt-5">Ragione Sociale</div>
                                <div class="text-gray-600">{{ customer.name }}</div>
                            </div>
                            <div v-if="customer.vat_number">
                                <div class="fw-bold mt-5">Partita IVA</div>
                                <div class="text-gray-600">
                                    <span class="text-gray-600">{{ customer.vat_number }}</span>
                                </div>
                            </div>
                            <div v-if="customer.tax_code">
                                <div class="fw-bold mt-5">Codice Fiscale</div>
                                <div class="text-gray-600">
                                    <span class="text-gray-600">{{ customer.tax_code }}</span>
                                </div>
                            </div>
                            <div v-if="customer.sdi_code">
                                <div class="fw-bold mt-5">Codice SDI
                                    <i class="bi bi-check-circle-fill text-primary" v-if="customer.wantEInvoice" />
                                </div>
                                <div class="text-gray-600">
                                    <span class="text-gray-600">{{ customer.sdi_code }}</span>
                                </div>
                            </div>
                            <div v-if="customer.pec">
                                <div class="fw-bold mt-5">PEC</div>
                                <div class="text-gray-600">
                                    <span class="text-gray-600">{{ customer.pec }}</span>
                                </div>
                            </div>
                            <div v-if="customer.hasAddress">
                                <div class="fw-bold mt-5">Indirizzo</div>
                                <div class="text-gray-600" v-html="customer.address.plainAddress"></div>
                            </div>
                            <div v-if="customer.hasAddress">
                                <div class="fw-bold mt-5">Paese</div>
                                <div class="text-gray-600">{{ customer.address.countryName }}</div>
                            </div>
                            <div>
                                <div class="separator separator-dashed my-6" />
                                <div class="text-gray-600 fs-7">
                                    <span class="text-muted">
                                        Creato il {{ moment(customer.created_at).format('ll').capitalize() }}
                                        <span v-if="customer.creator">da
                                            <AppLink class="text-muted text-hover-primary" :href="route('member.overview', { id: customer.creator?.id })">{{ customer.creator?.first_name }}</AppLink>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-lg-row-fluid ms-lg-15">
            <ul class="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-8" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link text-active-primary pb-4 active">Panoramica</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link text-active-primary pb-4">Progetti</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link text-active-primary pb-4">Fatture</button>
                </li>
                <li class="nav-item ms-auto">
                    <a href="#" class="btn btn-dark btn-icon" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
                        <i class="bi bi-three-dots-vertical fs-4" />
                    </a>
                    <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold py-4 w-250px fs-6" data-kt-menu="true">
                        <div class="menu-item px-5">
                            <div class="menu-content text-muted pb-2 px-5 fs-7 text-uppercase">
                                Payments
                            </div>
                        </div>
                        <div class="menu-item px-5">
                            <a href="#" class="menu-link px-5">
                                Create invoice
                            </a>
                        </div>
                        <div class="menu-item px-5">
                            <a href="#" class="menu-link flex-stack px-5">
                                Create payments
                                <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" aria-label="Specify a target name for future usage and reference" data-bs-original-title="Specify a target name for future usage and reference"></i>
                            </a>
                        </div>
                        <div class="menu-item px-5" data-kt-menu-trigger="hover" data-kt-menu-placement="left-start">
                            <a href="#" class="menu-link px-5">
                                <span class="menu-title">Subscription</span>
                                <span class="menu-arrow"></span>
                            </a>
                            <div class="menu-sub menu-sub-dropdown w-175px py-4">
                                <div class="menu-item px-3">
                                    <a href="#" class="menu-link px-5">
                                        Apps
                                    </a>
                                </div>
                                <div class="menu-item px-3">
                                    <a href="#" class="menu-link px-5">
                                        Billing
                                    </a>
                                </div>
                                <div class="menu-item px-3">
                                    <a href="#" class="menu-link px-5">
                                        Statements
                                    </a>
                                </div>
                                <div class="separator my-2"></div>
                                <div class="menu-item px-3">
                                    <div class="menu-content px-3">
                                        <label class="form-check form-switch form-check-custom form-check-solid">
                                            <input class="form-check-input w-30px h-20px" type="checkbox" value="" name="notifications" checked="" id="kt_user_menu_notifications">
                                            <span class="form-check-label text-muted fs-6" for="kt_user_menu_notifications">
                                                Notifications
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="separator my-3"></div>
                        <div class="menu-item px-5">
                            <div class="menu-content text-muted pb-2 px-5 fs-7 text-uppercase">
                                Account
                            </div>
                        </div>
                        <div class="menu-item px-5">
                            <a href="#" class="menu-link px-5">
                                Reports
                            </a>
                        </div>
                        <div class="menu-item px-5 my-1">
                            <a href="#" class="menu-link px-5">
                                Account Settings
                            </a>
                        </div>
                        <div class="menu-item px-5">
                            <a href="#" class="menu-link text-danger px-5">
                                Delete customer
                            </a>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="tab-content">
                <div role="tabpanel">
                    <div class="card">
                        <div class="card-body text-center">
                            Coming Soon
                        </div>
                    </div>
                    <!--<div class="row gy-5 g-xl-10">
                        <div class="col-sm-6 col-xl-6 mb-xl-10">
                            <div class="card">
                                <div class="card-body text-center">
                                    <div class="p-4 bg-light-success mb-4 rounded">
                                        <span class="fw-bold d-block text-success fs-3x lh-1 ls-n1 mb-1">{{ customer.time_bounded_projects_count }}</span>
                                    </div>
                                    <div>
                                        <span class="text-muted fw-semibold fs-6">Progetto in scadenza</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-xl-3 mb-xl-10">
                            <div class="card">
                                <div class="card-body text-center">
                                    <div class="p-4 bg-light mb-4 rounded">
                                        <span class="fw-bold d-block text-inverse-light fs-3x lh-1 ls-n1 mb-1">{{ customer.active_projects_count }}</span>
                                    </div>
                                    <div>
                                        <span class="text-muted fw-semibold fs-6">Progetti Attivi</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-xl-3 mb-xl-10">
                            <div class="card">
                                <div class="card-body text-center">
                                    <div class="p-4 bg-light-success mb-4 rounded">
                                        <span class="fw-bold d-block text-success fs-3x lh-1 ls-n1 mb-1">{{ customer.completed_projects_count }}</span>
                                    </div>
                                    <div>
                                        <span class="text-muted fw-semibold fs-6">Progetti Completati</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card pt-4 mb-6 mb-xl-9">
                        &lt;!&ndash;begin::Card header&ndash;&gt;
                        <div class="card-header border-0">
                            &lt;!&ndash;begin::Card title&ndash;&gt;
                            <div class="card-title">
                                <h2 class="fw-bold">Credit Balance</h2>
                            </div>
                            &lt;!&ndash;end::Card title&ndash;&gt;
                            &lt;!&ndash;begin::Card toolbar&ndash;&gt;
                            <div class="card-toolbar">
                                <a href="#" class="btn btn-sm btn-flex btn-light-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_adjust_balance">
                                    &lt;!&ndash;begin::Svg Icon | path: icons/duotune/art/art005.svg&ndash;&gt;
                                    <span class="svg-icon svg-icon-3">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z"
                                                    fill="currentColor"></path>
                                            <path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z"
                                                    fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    &lt;!&ndash;end::Svg Icon&ndash;&gt;                Adjust Balance
                                </a>
                            </div>
                            &lt;!&ndash;end::Card toolbar&ndash;&gt;
                        </div>
                        &lt;!&ndash;end::Card header&ndash;&gt;
                        &lt;!&ndash;begin::Card body&ndash;&gt;
                        <div class="card-body pt-0">
                            <div class="fw-bold fs-2">
                                $32,487.57
                                <span class="text-muted fs-4 fw-semibold">USD</span>
                                <div class="fs-7 fw-normal text-muted">Balance will increase the amount due on the customer's next invoice.</div>
                            </div>
                        </div>
                        &lt;!&ndash;end::Card body&ndash;&gt;
                    </div>
                    <div class="card pt-4 mb-6 mb-xl-9">
                        &lt;!&ndash;begin::Card header&ndash;&gt;
                        <div class="card-header border-0">
                            &lt;!&ndash;begin::Card title&ndash;&gt;
                            <div class="card-title">
                                <h2>Payment Records</h2>
                            </div>
                            &lt;!&ndash;end::Card title&ndash;&gt;
                            &lt;!&ndash;begin::Card toolbar&ndash;&gt;
                            <div class="card-toolbar">
                                &lt;!&ndash;begin::Filter&ndash;&gt;
                                <button type="button" class="btn btn-sm btn-flex btn-light-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_add_payment">
                                    &lt;!&ndash;begin::Svg Icon | path: icons/duotune/general/gen035.svg&ndash;&gt;
                                    <span class="svg-icon svg-icon-3">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor"></rect>
                                            <rect x="10.8891" y="17.8033" width="12" height="2" rx="1" transform="rotate(-90 10.8891 17.8033)" fill="currentColor"></rect>
                                            <rect x="6.01041" y="10.9247" width="12" height="2" rx="1" fill="currentColor"></rect>
                                        </svg>
                                    </span>
                                    &lt;!&ndash;end::Svg Icon&ndash;&gt;Add payment
                                </button>
                                &lt;!&ndash;end::Filter&ndash;&gt;
                            </div>
                            &lt;!&ndash;end::Card toolbar&ndash;&gt;
                        </div>
                        &lt;!&ndash;end::Card header&ndash;&gt;
                        &lt;!&ndash;begin::Card body&ndash;&gt;
                        <div class="card-body pt-0 pb-5">
                            &lt;!&ndash;begin::Table&ndash;&gt;
                            <div id="kt_table_customers_payment_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                                <div class="table-responsive">
                                    <table class="table align-middle table-row-dashed gy-5 dataTable no-footer" id="kt_table_customers_payment">
                                        &lt;!&ndash;begin::Table head&ndash;&gt;
                                        <thead class="border-bottom border-gray-200 fs-7 fw-bold">
                                            &lt;!&ndash;begin::Table row&ndash;&gt;
                                            <tr class="text-start text-muted text-uppercase gs-0">
                                                <th class="min-w-100px sorting" tabindex="0" aria-controls="kt_table_customers_payment" rowspan="1" colspan="1" aria-label="Invoice No.: activate to sort column ascending" style="width: 139.219px;">Invoice No.
                                                </th>
                                                <th class="sorting" tabindex="0" aria-controls="kt_table_customers_payment" rowspan="1" colspan="1" aria-label="Status: activate to sort column ascending" style="width: 117.781px;">Status
                                                </th>
                                                <th class="sorting" tabindex="0" aria-controls="kt_table_customers_payment" rowspan="1" colspan="1" aria-label="Amount: activate to sort column ascending" style="width: 113.625px;">Amount
                                                </th>
                                                <th class="min-w-100px sorting" tabindex="0" aria-controls="kt_table_customers_payment" rowspan="1" colspan="1" aria-label="Date: activate to sort column ascending" style="width: 231.938px;">Date
                                                </th>
                                                <th class="text-end min-w-100px pe-4 sorting_disabled" rowspan="1" colspan="1" aria-label="Actions" style="width: 148.188px;">Actions</th>
                                            </tr>
                                            &lt;!&ndash;end::Table row&ndash;&gt;
                                        </thead>
                                        &lt;!&ndash;end::Table head&ndash;&gt;
                                        &lt;!&ndash;begin::Table body&ndash;&gt;
                                        <tbody class="fs-6 fw-semibold text-gray-600">
                                            &lt;!&ndash;begin::Table row&ndash;&gt;
                                            &lt;!&ndash;end::Table row&ndash;&gt;
                                            &lt;!&ndash;begin::Table row&ndash;&gt;
                                            &lt;!&ndash;end::Table row&ndash;&gt;
                                            &lt;!&ndash;begin::Table row&ndash;&gt;
                                            &lt;!&ndash;end::Table row&ndash;&gt;
                                            &lt;!&ndash;begin::Table row&ndash;&gt;
                                            &lt;!&ndash;end::Table row&ndash;&gt;
                                            &lt;!&ndash;begin::Table row&ndash;&gt;
                                            &lt;!&ndash;end::Table row&ndash;&gt;
                                            &lt;!&ndash;begin::Table row&ndash;&gt;
                                            &lt;!&ndash;end::Table row&ndash;&gt;
                                            &lt;!&ndash;begin::Table row&ndash;&gt;
                                            &lt;!&ndash;end::Table row&ndash;&gt;
                                            &lt;!&ndash;begin::Table row&ndash;&gt;
                                            &lt;!&ndash;end::Table row&ndash;&gt;
                                            &lt;!&ndash;begin::Table row&ndash;&gt;
                                            &lt;!&ndash;end::Table row&ndash;&gt;
                                            <tr class="odd">
                                                &lt;!&ndash;begin::Invoice-&ndash;&gt;
                                                <td>
                                                    <a href="#" class="text-gray-600 text-hover-primary mb-1">6789-6181</a>
                                                </td>
                                                &lt;!&ndash;end::Invoice-&ndash;&gt;
                                                &lt;!&ndash;begin::Status-&ndash;&gt;
                                                <td>
                                                    <span class="badge badge-light-success">Successful</span>
                                                </td>
                                                &lt;!&ndash;end::Status-&ndash;&gt;
                                                &lt;!&ndash;begin::Amount-&ndash;&gt;
                                                <td>
                                                    $1,200.00
                                                </td>
                                                &lt;!&ndash;end::Amount-&ndash;&gt;
                                                &lt;!&ndash;begin::Date-&ndash;&gt;
                                                <td data-order="2020-12-14T20:43:00+01:00">
                                                    14 Dec 2020, 8:43 pm
                                                </td>
                                                &lt;!&ndash;end::Date-&ndash;&gt;
                                                &lt;!&ndash;begin::Action-&ndash;&gt;
                                                <td class="pe-0 text-end">
                                                    <a href="#" class="btn btn-sm btn-light btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                                                        Actions
                                                        &lt;!&ndash;begin::Svg Icon | path: icons/duotune/arrows/arr072.svg&ndash;&gt;
                                                        <span class="svg-icon svg-icon-5 m-0">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z"
                                                                        fill="currentColor"></path>
                                                            </svg>
                                                        </span>
                                                        &lt;!&ndash;end::Svg Icon&ndash;&gt;
                                                    </a>
                                                    &lt;!&ndash;begin::Menu&ndash;&gt;
                                                    <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4"
                                                            data-kt-menu="true">
                                                        &lt;!&ndash;begin::Menu item&ndash;&gt;
                                                        <div class="menu-item px-3">
                                                            <a href="/metronic8/demo9/../demo9/apps/customers/view.html" class="menu-link px-3">
                                                                View
                                                            </a>
                                                        </div>
                                                        &lt;!&ndash;end::Menu item&ndash;&gt;
                                                        &lt;!&ndash;begin::Menu item&ndash;&gt;
                                                        <div class="menu-item px-3">
                                                            <a href="#" class="menu-link px-3" data-kt-customer-table-filter="delete_row">
                                                                Delete
                                                            </a>
                                                        </div>
                                                        &lt;!&ndash;end::Menu item&ndash;&gt;
                                                    </div>
                                                    &lt;!&ndash;end::Menu&ndash;&gt;
                                                </td>
                                                &lt;!&ndash;end::Action-&ndash;&gt;
                                            </tr>
                                            <tr class="even">
                                                &lt;!&ndash;begin::Invoice-&ndash;&gt;
                                                <td>
                                                    <a href="#" class="text-gray-600 text-hover-primary mb-1">3760-7409</a>
                                                </td>
                                                &lt;!&ndash;end::Invoice-&ndash;&gt;
                                                &lt;!&ndash;begin::Status-&ndash;&gt;
                                                <td>
                                                    <span class="badge badge-light-success">Successful</span>
                                                </td>
                                                &lt;!&ndash;end::Status-&ndash;&gt;
                                                &lt;!&ndash;begin::Amount-&ndash;&gt;
                                                <td>
                                                    $79.00
                                                </td>
                                                &lt;!&ndash;end::Amount-&ndash;&gt;
                                                &lt;!&ndash;begin::Date-&ndash;&gt;
                                                <td data-order="2020-12-01T10:12:00+01:00">
                                                    01 Dec 2020, 10:12 am
                                                </td>
                                                &lt;!&ndash;end::Date-&ndash;&gt;
                                                &lt;!&ndash;begin::Action-&ndash;&gt;
                                                <td class="pe-0 text-end">
                                                    <a href="#" class="btn btn-sm btn-light btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                                                        Actions
                                                        &lt;!&ndash;begin::Svg Icon | path: icons/duotune/arrows/arr072.svg&ndash;&gt;
                                                        <span class="svg-icon svg-icon-5 m-0">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z"
                                                                        fill="currentColor"></path>
                                                            </svg>
                                                        </span>
                                                        &lt;!&ndash;end::Svg Icon&ndash;&gt;
                                                    </a>
                                                    &lt;!&ndash;begin::Menu&ndash;&gt;
                                                    <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4"
                                                            data-kt-menu="true">
                                                        &lt;!&ndash;begin::Menu item&ndash;&gt;
                                                        <div class="menu-item px-3">
                                                            <a href="/metronic8/demo9/../demo9/apps/customers/view.html" class="menu-link px-3">
                                                                View
                                                            </a>
                                                        </div>
                                                        &lt;!&ndash;end::Menu item&ndash;&gt;
                                                        &lt;!&ndash;begin::Menu item&ndash;&gt;
                                                        <div class="menu-item px-3">
                                                            <a href="#" class="menu-link px-3" data-kt-customer-table-filter="delete_row">
                                                                Delete
                                                            </a>
                                                        </div>
                                                        &lt;!&ndash;end::Menu item&ndash;&gt;
                                                    </div>
                                                    &lt;!&ndash;end::Menu&ndash;&gt;
                                                </td>
                                                &lt;!&ndash;end::Action-&ndash;&gt;
                                            </tr>
                                            <tr class="odd">
                                                &lt;!&ndash;begin::Invoice-&ndash;&gt;
                                                <td>
                                                    <a href="#" class="text-gray-600 text-hover-primary mb-1">8892-1259</a>
                                                </td>
                                                &lt;!&ndash;end::Invoice-&ndash;&gt;
                                                &lt;!&ndash;begin::Status-&ndash;&gt;
                                                <td>
                                                    <span class="badge badge-light-success">Successful</span>
                                                </td>
                                                &lt;!&ndash;end::Status-&ndash;&gt;
                                                &lt;!&ndash;begin::Amount-&ndash;&gt;
                                                <td>
                                                    $5,500.00
                                                </td>
                                                &lt;!&ndash;end::Amount-&ndash;&gt;
                                                &lt;!&ndash;begin::Date-&ndash;&gt;
                                                <td data-order="2020-11-12T14:01:00+01:00">
                                                    12 Nov 2020, 2:01 pm
                                                </td>
                                                &lt;!&ndash;end::Date-&ndash;&gt;
                                                &lt;!&ndash;begin::Action-&ndash;&gt;
                                                <td class="pe-0 text-end">
                                                    <a href="#" class="btn btn-sm btn-light btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                                                        Actions
                                                        &lt;!&ndash;begin::Svg Icon | path: icons/duotune/arrows/arr072.svg&ndash;&gt;
                                                        <span class="svg-icon svg-icon-5 m-0">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z"
                                                                        fill="currentColor"></path>
                                                            </svg>
                                                        </span>
                                                        &lt;!&ndash;end::Svg Icon&ndash;&gt;
                                                    </a>
                                                    &lt;!&ndash;begin::Menu&ndash;&gt;
                                                    <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4"
                                                            data-kt-menu="true">
                                                        &lt;!&ndash;begin::Menu item&ndash;&gt;
                                                        <div class="menu-item px-3">
                                                            <a href="/metronic8/demo9/../demo9/apps/customers/view.html" class="menu-link px-3">
                                                                View
                                                            </a>
                                                        </div>
                                                        &lt;!&ndash;end::Menu item&ndash;&gt;
                                                        &lt;!&ndash;begin::Menu item&ndash;&gt;
                                                        <div class="menu-item px-3">
                                                            <a href="#" class="menu-link px-3" data-kt-customer-table-filter="delete_row">
                                                                Delete
                                                            </a>
                                                        </div>
                                                        &lt;!&ndash;end::Menu item&ndash;&gt;
                                                    </div>
                                                    &lt;!&ndash;end::Menu&ndash;&gt;
                                                </td>
                                                &lt;!&ndash;end::Action-&ndash;&gt;
                                            </tr>
                                            <tr class="even">
                                                &lt;!&ndash;begin::Invoice-&ndash;&gt;
                                                <td>
                                                    <a href="#" class="text-gray-600 text-hover-primary mb-1">3401-6856</a>
                                                </td>
                                                &lt;!&ndash;end::Invoice-&ndash;&gt;
                                                &lt;!&ndash;begin::Status-&ndash;&gt;
                                                <td>
                                                    <span class="badge badge-light-warning">Pending</span>
                                                </td>
                                                &lt;!&ndash;end::Status-&ndash;&gt;
                                                &lt;!&ndash;begin::Amount-&ndash;&gt;
                                                <td>
                                                    $880.00
                                                </td>
                                                &lt;!&ndash;end::Amount-&ndash;&gt;
                                                &lt;!&ndash;begin::Date-&ndash;&gt;
                                                <td data-order="2020-10-21T17:54:00+02:00">
                                                    21 Oct 2020, 5:54 pm
                                                </td>
                                                &lt;!&ndash;end::Date-&ndash;&gt;
                                                &lt;!&ndash;begin::Action-&ndash;&gt;
                                                <td class="pe-0 text-end">
                                                    <a href="#" class="btn btn-sm btn-light btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                                                        Actions
                                                        &lt;!&ndash;begin::Svg Icon | path: icons/duotune/arrows/arr072.svg&ndash;&gt;
                                                        <span class="svg-icon svg-icon-5 m-0">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z"
                                                                        fill="currentColor"></path>
                                                            </svg>
                                                        </span>
                                                        &lt;!&ndash;end::Svg Icon&ndash;&gt;
                                                    </a>
                                                    &lt;!&ndash;begin::Menu&ndash;&gt;
                                                    <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4"
                                                            data-kt-menu="true">
                                                        &lt;!&ndash;begin::Menu item&ndash;&gt;
                                                        <div class="menu-item px-3">
                                                            <a href="/metronic8/demo9/../demo9/apps/customers/view.html" class="menu-link px-3">
                                                                View
                                                            </a>
                                                        </div>
                                                        &lt;!&ndash;end::Menu item&ndash;&gt;
                                                        &lt;!&ndash;begin::Menu item&ndash;&gt;
                                                        <div class="menu-item px-3">
                                                            <a href="#" class="menu-link px-3" data-kt-customer-table-filter="delete_row">
                                                                Delete
                                                            </a>
                                                        </div>
                                                        &lt;!&ndash;end::Menu item&ndash;&gt;
                                                    </div>
                                                    &lt;!&ndash;end::Menu&ndash;&gt;
                                                </td>
                                                &lt;!&ndash;end::Action-&ndash;&gt;
                                            </tr>
                                            <tr class="odd">
                                                &lt;!&ndash;begin::Invoice-&ndash;&gt;
                                                <td>
                                                    <a href="#" class="text-gray-600 text-hover-primary mb-1">6288-3645</a>
                                                </td>
                                                &lt;!&ndash;end::Invoice-&ndash;&gt;
                                                &lt;!&ndash;begin::Status-&ndash;&gt;
                                                <td>
                                                    <span class="badge badge-light-success">Successful</span>
                                                </td>
                                                &lt;!&ndash;end::Status-&ndash;&gt;
                                                &lt;!&ndash;begin::Amount-&ndash;&gt;
                                                <td>
                                                    $7,650.00
                                                </td>
                                                &lt;!&ndash;end::Amount-&ndash;&gt;
                                                &lt;!&ndash;begin::Date-&ndash;&gt;
                                                <td data-order="2020-10-19T07:32:00+02:00">
                                                    19 Oct 2020, 7:32 am
                                                </td>
                                                &lt;!&ndash;end::Date-&ndash;&gt;
                                                &lt;!&ndash;begin::Action-&ndash;&gt;
                                                <td class="pe-0 text-end">
                                                    <a href="#" class="btn btn-sm btn-light btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                                                        Actions
                                                        &lt;!&ndash;begin::Svg Icon | path: icons/duotune/arrows/arr072.svg&ndash;&gt;
                                                        <span class="svg-icon svg-icon-5 m-0">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z"
                                                                        fill="currentColor"></path>
                                                            </svg>
                                                        </span>
                                                        &lt;!&ndash;end::Svg Icon&ndash;&gt;
                                                    </a>
                                                    &lt;!&ndash;begin::Menu&ndash;&gt;
                                                    <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4"
                                                            data-kt-menu="true">
                                                        &lt;!&ndash;begin::Menu item&ndash;&gt;
                                                        <div class="menu-item px-3">
                                                            <a href="/metronic8/demo9/../demo9/apps/customers/view.html" class="menu-link px-3">
                                                                View
                                                            </a>
                                                        </div>
                                                        &lt;!&ndash;end::Menu item&ndash;&gt;
                                                        &lt;!&ndash;begin::Menu item&ndash;&gt;
                                                        <div class="menu-item px-3">
                                                            <a href="#" class="menu-link px-3" data-kt-customer-table-filter="delete_row">
                                                                Delete
                                                            </a>
                                                        </div>
                                                        &lt;!&ndash;end::Menu item&ndash;&gt;
                                                    </div>
                                                    &lt;!&ndash;end::Menu&ndash;&gt;
                                                </td>
                                                &lt;!&ndash;end::Action-&ndash;&gt;
                                            </tr>
                                        </tbody>
                                        &lt;!&ndash;end::Table body&ndash;&gt;
                                    </table>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start"></div>
                                    <div class="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
                                        <div class="dataTables_paginate paging_simple_numbers" id="kt_table_customers_payment_paginate">
                                            <ul class="pagination">
                                                <li class="paginate_button page-item previous disabled" id="kt_table_customers_payment_previous">
                                                    <a href="#" aria-controls="kt_table_customers_payment" data-dt-idx="0" tabindex="0" class="page-link">
                                                        <i class="previous"></i>
                                                    </a>
                                                </li>
                                                <li class="paginate_button page-item active">
                                                    <a href="#" aria-controls="kt_table_customers_payment" data-dt-idx="1" tabindex="0" class="page-link">1</a>
                                                </li>
                                                <li class="paginate_button page-item ">
                                                    <a href="#" aria-controls="kt_table_customers_payment" data-dt-idx="2" tabindex="0" class="page-link">2</a>
                                                </li>
                                                <li class="paginate_button page-item next" id="kt_table_customers_payment_next">
                                                    <a href="#" aria-controls="kt_table_customers_payment" data-dt-idx="3" tabindex="0" class="page-link">
                                                        <i class="next"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            &lt;!&ndash;end::Table&ndash;&gt;
                        </div>
                        &lt;!&ndash;end::Card body&ndash;&gt;
                    </div>-->
                </div>
            </div>
        </div>
    </div>
    <teleport to="body">
        <CustomerModalEditDetails v-if="isEditModalOpen" :customer="customer" @modal_closed="reset" />
    </teleport>
</template>
<script setup lang="ts">
    import { computed, ref } from "vue";
    import Customer from "@Models/Customer";
    import CustomerModalEditDetails from "@Pages/App/Customers/Partials/CustomerModalEditDetails.vue";

    interface Props {
        customer: object
    }

    const props = defineProps<Props>()

    const customer = computed(() => new Customer(props.customer))

    const isEditModalOpen = ref(false)

    function reset() {
        isEditModalOpen.value = false
    }
</script>
