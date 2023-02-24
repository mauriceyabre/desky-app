<template>
    <AppModal id="session" centered no-header>
        <div class="card">
            <div class="card-body d-flex flex-column gap-3 gap-lg-6">
                <div class="d-flex flex-center">
                    <span class="fs-5 fw-normal">
                        Sessioni: {{ user.todayAttendance?.sessionsCount ?? 0 }}
                    </span>
                </div>
                <div class="row g-3 g-lg-6">
                    <div class="col-6">
                        <div class="bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5 position-relative">
                            <div class="m-0">
                                <span class="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">{{ workTimer }}
                                </span>
                                <span class="text-gray-500 fw-semibold fs-6">Sessione Attuale</span>
                            </div>
                            <span class="bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink" v-if="user.hasActiveSession" />
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5">
                            <div class="m-0">
                                <span class="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">{{ totalTimer }}
                                </span>
                                <span class="text-gray-500 fw-semibold fs-6">Totale</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex w-100" v-if="!user.hasActiveSession">
                    <button :disabled="loading" class="btn btn-lg w-100" :class="user.has ? 'btn-light-success' : 'btn-primary'" title="Avvia Sessione" @click.prevent="startSession">
                        <span>
                            Avvia Sessione
                        </span>
                    </button>
                </div>
                <div class="d-flex w-100 gap-3 gap-lg-6" v-else>
                    <button :disabled="loading" class="btn btn-lg btn-danger w-100" title="Ferma Sessione" @click.prevent="stopSession(user.activeSession.id)">
                        Termina Sessione
                    </button>
                </div>
                <div class="d-flex flex-center">
                    <AppLink class="fs-5 fw-normal" :href="route('profile.timesheet')" @click="modal.close()">
                        Foglio Presenze
                    </AppLink>
                </div>
            </div>
        </div>
    </AppModal>
</template>
<script setup lang="ts">
    import AppModal from "@Components/AppModal.vue";
    import { useModal } from "@Composables/useModal";
    import { computed, onBeforeUnmount, onMounted, ref } from "vue";
    import { useGlobalStore } from "@Stores/useGlobalStore";
    import { router } from "@inertiajs/core";
    import useAuth from "@Composables/useAuth";

    const loading = ref(false);
    let interval: number;

    const modal = useModal('session_modal');
    const mainStore = useGlobalStore();

    const user = computed(() => useAuth().user);

    const workTimer = ref('0h 00m');

    const totalTimer = ref()
    if (user.value.todayPresenceDuration) {
        totalTimer.value = user.value.todayPresenceDuration.toPrintedDuration()
    } else {
        totalTimer.value = '0h 00m'
    }

    if (user.value.hasActiveSession) {
        workTimer.value = user.value.activeSession!.duration.toPrintedDuration();
        interval = setInterval(() => {
            workTimer.value = user.value.activeSession!.duration.toPrintedDuration();
            totalTimer.value = user.value.todayPresenceDuration.toPrintedDuration();
        }, 1000)
    }

    function startSession() {
        loading.value = true;
        router.post(route('presence.start'), {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onSuccess() {
                interval = setInterval(() => {
                    workTimer.value = user.value.activeSession!.duration.toPrintedDuration();
                    totalTimer.value = user.value.todayPresenceDuration.toPrintedDuration();
                }, 1000)
            },
            onFinish() {
                setTimeout(() => {
                    modal.close()
                }, 500)
            }
        });
    }

    function stopSession(id: string) {
        if (user.value.hasActiveSession) {
            if (user.value.activeSession!.duration < 10) {
                Desky.dangerDialog({
                    text: 'Se continui, la sessione verrà cancellata?',
                    title: 'Sessione inferiore a 10 minuti',
                    confirmButtonText: 'Ok, Continua'
                }, () => {
                    loading.value = true;
                    router.delete(route('presence.destroy', { presence_log: id }), {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true,
                        onSuccess() {
                            clearInterval(interval);
                            resetTimer();
                        },
                        onFinish() {
                            setTimeout(() => {
                                modal.close()
                            }, 500)
                        }
                    })
                })
            } else {
              Desky.successDialog({
                    text: 'Vuoi terminare e salvare la sessione?',
                    confirmButtonText: 'Termina Sessione',
                    title: 'Termina Sessione'
                }, () => {
                    loading.value = true;
                    router.put(route('presence.stop', { presence_log: id }), {}, {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true,
                        onSuccess() {
                            clearInterval(interval);
                            resetTimer();
                        },
                        onFinish() {
                            loading.value = false;
                        }
                    })
                })
            }
        }
    }

    const resetTimer = () => {
        if (user.value.hasTodayAttendance && user.value.todayPresenceDuration.toPrintedDuration()) {
            workTimer.value = '0h 00m';
            totalTimer.value = user.value.todayPresenceDuration.toPrintedDuration();

        } else {
            workTimer.value = '0h 00m'
        }
    }

    onMounted(() => {
        modal.open();
        modal.onClosed(() => {
            mainStore.closeSessionModal()
        })
    })

    onBeforeUnmount(() => {
        clearInterval(interval);
    })
</script>
