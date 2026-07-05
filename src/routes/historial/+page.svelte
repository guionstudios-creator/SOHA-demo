<script lang="ts">
  let visible = $state(false);
  import { onMount } from 'svelte';
  onMount(() => setTimeout(() => visible = true, 200));
</script>

<div class="space-y-6" class:opacity-0={!visible} class:opacity-100={visible} style="transition: opacity 0.3s ease 0.1s;">
  <div>
    <h1 class="text-2xl font-bold" style="color: var(--soha-text);">Historial</h1>
    <p class="text-sm mt-1" style="color: var(--soha-muted);">Registro cronológico de movimientos del inventario</p>
  </div>

  <div class="card text-center py-16 px-6">
    <div class="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
      style="background: var(--soha-accent-soft);">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--soha-accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    </div>
    <h2 class="text-xl font-bold mb-3" style="color: var(--soha-text);">Disponible en la versión completa</h2>
    <p class="text-sm max-w-md mx-auto leading-relaxed" style="color: var(--soha-muted);">
      El historial de movimientos registra cada transacción del inventario: entradas, salidas,
      transferencias, ajustes y donaciones. Permite filtrar por fecha, tipo de movimiento,
      servicio y usuario, con visualización en tabla y gráficos temporales.
    </p>
    <div class="flex flex-wrap gap-6 justify-center mt-6 text-sm">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full" style="background: var(--lot-ok);"></span>
        <span style="color: var(--soha-text);">Filtros por tipo y fecha</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full" style="background: var(--lot-ok);"></span>
        <span style="color: var(--soha-text);">Gráficos temporales</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full" style="background: var(--lot-ok);"></span>
        <span style="color: var(--soha-text);">Exportación a CSV</span>
      </div>
    </div>
  </div>
</div>
