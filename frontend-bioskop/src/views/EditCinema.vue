<script lang="ts" setup>
import type { CinemaModel } from '@/models/cinema.model';
import { CinemaService } from '@/services/cinema.service';
import { formatDate } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const cinema = ref<CinemaModel>()

CinemaService.getCinemaById(id)
    .then(rsp => cinema.value = rsp.data)

function save() {
    if (cinema.value == null) return
    CinemaService.updateCinema(id, cinema.value).then(rsp => {
        router.push('/cinema')
    })
}
</script>

<template>
    <div v-if="cinema">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Početna</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/cinema">Bioskopi</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    {{ cinema.name}}
                </li>
            </ol>
        </nav>
        <form v-on:submit.prevent="save">
            <div class="mb-3">
                <label for="name" class="form-label">Naziv:</label>
                <input type="text" class="form-control" id="name" v-model="cinema.name">
            </div>
            <div class="mb-3">
                <label for="location" class="form-label">Lokacija:</label>
                <input type="text" class="form-control" id="location" v-model="cinema.location">
            </div>
            <div class="mb-3">
                <label for="updated" class="form-label">Izmenjeno:</label>
                <input type="text" class="form-control" id="updated"
                    :value="formatDate(cinema.updatedAt ?? cinema.createdAt)" disabled>
            </div>
            <button type="submit" class="btn btn-primary">
                <i class="fa-solid fa-floppy-disk"></i> Sačuvaj
            </button>
        </form>
    </div>
</template>