<template>
    <div class="d-flex flex-column flex-root">
        <div class="d-flex flex-column flex-column-fluid flex-lg-row">
            <div class="d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10">
                <div class="d-flex flex-center flex-lg-start flex-column">
                    <p class="text-white fw-normal fs-1">Archivision</p>
                    <h1 class="fs-5tx fw-bolder text-uppercase text-white">Desky</h1>
                </div>
            </div>
            <div class="d-flex flex-center w-lg-50 p-10">
                <div class="card rounded-3 w-md-550px">
                    <div class="card-body p-10 p-lg-20">
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    document.body.style.backgroundImage = "url('/assets/media/auth/bg9.jpg')"
</script>
