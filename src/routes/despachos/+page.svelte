<script lang="ts">
  import { onMount } from 'svelte';
  import { createMockContainer } from '$lib/mock/mock-container';

  const container = createMockContainer();

  let dispatches: any[] = $state([]);
  let loading = $state(true);
  let selectedDate = $state('');
  let selectedService = $state('');

  onMount(async () => {
    dispatches = await container.dispatchService.findAll();
    loading = false;
  });

  async function handleFilter() {
    loading = true;
    dispatches = await container.dispatchService.findAll({
      fecha: selectedDate || undefined,
      servicio: selectedService || undefined
    });
    loading = false;
  }

  function getEstadoColor(estado: string): string {
    switch (estado) {
      case 'completada': return 'text-green-500 bg-green-500/10';
      case 'pendiente': return 'text-yellow-500 bg-yellow-500/10';
      case 'cancelada': return 'text-red-500 bg-red-500/10';
      default: return 'text-soha-muted bg-soha-surface';
    }
  }

  const services = ['Emergencia', 'Consulta Externa', 'Hospitalización', 'Quirófano', 'UCI', 'Pediatría'];
</script>

<svelte:head>
  <title>SOHA Demo - Despachos</title>
</svelte:head>

<div class="space-y-6">
  <h1 class="text-2xl font-semibold text-soha-text">Despachos</h1>

  <!-- Filters -->
  <div class="flex flex-wrap gap-4">
    <input
      type="date"
      bind:value={selectedDate}
      onchange={handleFilter}
      class="px-4 py-2 bg-soha-input-bg border border-soha-border rounded-lg text-soha-text focus:outline-none focus:ring-2 focus:ring-soha-accent"
    />
    <select
      bind:value={selectedService}
      onchange={handleFilter}
      class="px-4 py-2 bg-soha-input-bg border border-soha-border rounded-lg text-soha-text focus:outline-none focus:ring-2 focus:ring-soha-accent"
    >
      <option value="">Todos los servicios</option>
      {#each services as service}
        <option value={service}>{service}</option>
      {/each}
    </select>
  </div>

  {#if loading}
    <div class="space-y-4">
      {#each Array(5) as _}
        <div class="h-24 bg-soha-card rounded animate-pulse"></div>
      {/each}
    </div>
  {:else}
    <!-- Dispatches List -->
    <div class="space-y-4">
      {#each dispatches as dispatch}
        <div class="bg-soha-card border border-soha-border rounded-lg p-4">
          <div class="flex flex-wrap justify-between items-start gap-4">
            <div class="flex-1 min-w-[200px]">
              <div class="flex items-center gap-3 mb-2">
                <span class="font-mono text-sm text-soha-accent">{dispatch.codigoTrazabilidad}</span>
                <span class="px-2 py-0.5 rounded text-xs font-medium {getEstadoColor(dispatch.estado)}">
                  {dispatch.estado}
                </span>
              </div>
              <div class="text-sm text-soha-muted">
                <span>{dispatch.fecha}</span>
                <span class="mx-2">•</span>
                <span>{dispatch.servicio}</span>
                <span class="mx-2">•</span>
                <span>{dispatch.usuario}</span>
              </div>
            </div>
            <div class="text-right">
              <div class="text-lg font-bold text-soha-text">{dispatch.items.length}</div>
              <div class="text-xs text-soha-muted">items</div>
            </div>
          </div>

          <!-- Items -->
          <div class="mt-3 pt-3 border-t border-soha-border">
            <div class="flex flex-wrap gap-2">
              {#each dispatch.items as item}
                <span class="px-2 py-1 bg-soha-surface rounded text-xs text-soha-text">
                  {item.nombreMedicamento} × {item.cantidad}
                </span>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>

    {#if dispatches.length === 0}
      <div class="text-center py-12 text-soha-muted">
        No se encontraron despachos con los filtros aplicados.
      </div>
    {/if}
  {/if}
</div>
