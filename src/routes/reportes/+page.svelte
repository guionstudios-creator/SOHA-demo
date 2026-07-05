<script lang="ts">
  let visible = $state(false);
  import { onMount } from 'svelte';
  onMount(() => setTimeout(() => visible = true, 200));
</script>

<div class="space-y-6" class:opacity-0={!visible} class:opacity-100={visible} style="transition: opacity 0.3s ease 0.1s;">
  <div>
    <h1 class="text-2xl font-bold" style="color: var(--soha-text);">Reportes</h1>
    <p class="text-sm mt-1" style="color: var(--soha-muted);">Generación de reportes regulatorios y gerenciales en PDF</p>
  </div>

  <div class="card text-center py-16 px-6">
    <div class="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
      style="background: var(--soha-accent-soft);">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--soha-accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    </div>
    <h2 class="text-xl font-bold mb-3" style="color: var(--soha-text);">Disponible en la versión completa</h2>
    <p class="text-sm max-w-md mx-auto leading-relaxed" style="color: var(--soha-muted);">
      El módulo de reportes genera documentos PDF con un clic: consolidado diario, proforma mensual,
      kardex por medicamento, inventario totalizado, movimientos por período y reporte de auditoría.
      Todos con formato listo para presentación regulatoria.
    </p>
    <div class="flex flex-wrap gap-6 justify-center mt-6 text-sm">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full" style="background: var(--lot-ok);"></span>
        <span style="color: var(--soha-text);">Consolidado diario</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full" style="background: var(--lot-ok);"></span>
        <span style="color: var(--soha-text);">Kardex y proformas</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full" style="background: var(--lot-ok);"></span>
        <span style="color: var(--soha-text);">Exportación a PDF con 1 clic</span>
      </div>
    </div>
  </div>
</div>
