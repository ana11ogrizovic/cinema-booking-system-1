<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
const year = new Date().getFullYear()
import { getUserEmail } from './auth'
import { getRefreshToken } from './auth';
import { login } from './utils';

if (!getRefreshToken()) {
  login('admin@example.com', 'admin123')
}
</script>

<template>

  <div class="container">
    <nav class="navbar navbar-expand-lg bg-body-tertiary ">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="#">PSEP</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link active" aria-current="page" to="/" exact-active-class="active">Pocetna</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/cinema" exact-active-class="active">Bioskopi</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/about" exact-active-class="active">O nama</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/list" exact-active-class="active">List</RouterLink>
            </li>
          </ul>
          <span class="navbar-text">
            <i class="fa-solid fa-user"></i> {{ getUserEmail() }}
          </span>
        </div>
      </div>
    </nav>
    <RouterView />
    <p class="text-center mt-3">&copy {{ year }} Singidunum University</p>
  </div>

</template>

