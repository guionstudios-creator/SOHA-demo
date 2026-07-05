<script lang="ts">
  import { onMount } from 'svelte';
  import { createMockContainer } from '$lib/mock/mock-container';
  import Badge from '$lib/components/atoms/Badge.svelte';
  import Skeleton from '$lib/components/atoms/Skeleton.svelte';

  const container = createMockContainer();
  let dispatches: any[] = $state([]);
  let loading = $state(true);
  let selectedService = $state('');

  const services = ['Emergencia', 'Consulta Externa', 'Hospitalización', 'Quirófano', 'UCI', 'Pediatría'];

  onMount(async () => {
    dispatches = await container.dispatchService.findAll();
    loading = false;
  });

  async function handleFilter() {
    loading = true;
    dispatches = await container.dispatchService.findAll({ servicio: selectedService || undefined });
    loading = false;
  }

  function getEstadoType(estado: string): 'ok' | 'warning' | 'urgent' {
    switch (estado) {
      case 'completada': return 'ok';
      case 'pendiente': return 'warning';
      case 'cancelada': return 'urgent';
      default: return 'expired' as any;
    }
  }
</script>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-bold" style="color: var(--soha-text);">Despachos</h1>
    <p class="text-sm mt-1" style="color: var(--soha-muted);">Registro de salidas con códigos de trazabilidad</p>
  </div>

  <div class="flex flex-wrap gap-3">
    <select bind:value={selectedService} onchange={handleFilter} class="input w-auto">
      <option value="">Todos los servicios</option>
      {#each services as s}
        <option value={s}>{s}</option>
      {/each}
    </select>
  </div>

  {#if loading}
    <div class="space-y-3">
      <Skeleton variant="card" count={5} />
    </div>
  {:else}
    <div class="space-y-3">
      {#each dispatches as dispatch}
        <div class="card">
          <div class="flex flex-wrap justify-between items-start gap-4">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <span class="font-mono text-sm font-bold" style="color: var(--soha-accent);">{dispatch.codigoTrazabilidad}</span>
                <Badge type={getEstadoType(dispatch.estado)} label={dispatch.estado} />
              </div>
              <div class="text-sm" style="color: var(--soha-muted);">
                {dispatch.fecha} · {dispatch.servicio} · {dispatch.usuario}
              </div>
            </div>
            <div class="text-right">
              <div class="text-lg font-bold" style="color: var(--soha-text);">{dispatch.items.length}</div>
              <div class="text-xs" style="color: var(--soha-muted);">items</div>
            </div>
          </div>
          <div class="mt-3 pt-3 flex flex-wrap gap-2" style="border-top: 1px solid var(--soha-border);">
            {#each dispatch.items as item}
              <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium" style="background: var(--soha-surface); color: var(--soha-text);">
                {item.nombreMedicamento} × {item.cantidad}
              </span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
