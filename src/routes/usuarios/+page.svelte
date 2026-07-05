<script lang="ts">
  let visible = $state(false);
  import { onMount } from 'svelte';
  onMount(() => setTimeout(() => visible = true, 200));
</script>

<div class="space-y-6" class:opacity-0={!visible} class:opacity-100={visible} style="transition: opacity 0.3s ease 0.1s;">
  <div>
    <h1 class="text-2xl font-bold" style="color: var(--soha-text);">Usuarios</h1>
    <p class="text-sm mt-1" style="color: var(--soha-muted);">Gestión de usuarios, roles y permisos del sistema</p>
  </div>

  <div class="card text-center py-16 px-6">
    <div class="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
      style="background: var(--soha-accent-soft);">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--soha-accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    </div>
    <h2 class="text-xl font-bold mb-3" style="color: var(--soha-text);">Disponible en la versión completa</h2>
    <p class="text-sm max-w-md mx-auto leading-relaxed" style="color: var(--soha-muted);">
      El módulo de usuarios permite administrar el personal del sistema con roles diferenciados:
      administrador, asistente y cuenta administrativa. Cada rol tiene permisos específicos
      sobre las operaciones del inventario, reportes y configuración del sistema.
    </p>
    <div class="flex flex-wrap gap-6 justify-center mt-6 text-sm">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full" style="background: var(--lot-ok);"></span>
        <span style="color: var(--soha-text);">3 roles: administrador, asistente, cuenta adm.</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full" style="background: var(--lot-ok);"></span>
        <span style="color: var(--soha-text);">Autenticación con bcrypt + JWT</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full" style="background: var(--lot-ok);"></span>
        <span style="color: var(--soha-text);">Sesión local persistente</span>
      </div>
    </div>
  </div>
</div>
