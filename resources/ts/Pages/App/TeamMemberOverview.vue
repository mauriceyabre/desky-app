<template>
    <TeamMemberLayout :user="user" :is-current="isCurrent">
        <div class="row">
            <div class="col">
                <!--begin::Card-->
                <div class="card">
                    <div class="card-body">
                        Coming Soon
                    </div>
                </div>
                <!--end::Card-->
            </div>
        </div>
    </TeamMemberLayout>
</template>

<script setup lang="ts">
    import { computed } from "vue";
    import User from "@Models/User";
    import TeamMemberLayout from "@Layouts/app/TeamMemberLayout.vue";

    interface Props {
        member: Object,
        is_current: Boolean
    }

    const props = defineProps<Props>();
    const user = computed(() => {
        return new User(props.member)
    })

    console.log(props.member, user.value);

    const isCurrent = computed(() => props.is_current ?? false);
</script>
