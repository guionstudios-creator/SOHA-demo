<script lang="ts">
  import { onMount } from 'svelte';
  import { createMockContainer } from '$lib/mock/mock-container';

  const container = createMockContainer();

  let items: any[] = $state([]);
  let loading = $state(true);
  let searchQuery = $state('');
  let selectedBlock = $state('');
  let selectedItem: any = $state(null);

  onMount(async () => {
    items = await container.inventoryService.findAll();
    loading = false;
  });

  async function handleSearch() {
    loading = true;
    items = await container.inventoryService.findAll({ search: searchQuery, bloque: selectedBlock });
    loading = false;
  }

  function getStatusColor(status: string): string {
    switch (status) {
      case 'ok': return 'badge-lot-ok';
      case 'warning': return 'badge-lot-warning';
      case 'urgent': return 'badge-lot-urgent';
      case 'expired': return 'badge-lot-expired';
      default: return 'badge-lot-expired';
    }
  }

  function getStatusLabel(status: string): string {
    switch (status) {
      case 'ok': return 'OK';
      case 'warning': return 'Advertencia';
      case 'urgent': return 'Urgente';
      case 'expired': return 'Vencido';
      default: return 'Desconocido';
    }
  }

  function daysUntilExpiry(fecha: string): number {
    const now = new Date();
    const exp = new Date(fecha);
    return Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  }
</script>

<svelte:head>
  <title>SOHA Demo - Inventario</title>
</svelte:head>

<div class="space-y-6">
  <h1 class="text-2xl font-semibold text-soha-text">Inventario FEFO</h1>

  <!-- Filters -->
  <div class="flex flex-wrap gap-4">
    <input
      type="text"
      bind:value={searchQuery}
      oninput={handleSearch}
      placeholder="Buscar medicamento..."
      class="flex-1 min-w-[200px] px-4 py-2 bg-soha-input-bg border border-soha-border rounded-lg text-soha-text placeholder-soha-muted focus:outline-none focus:ring-2 focus:ring-soha-accent"
    />
    <select
      bind:value={selectedBlock}
      onchange={handleSearch}
      class="px-4 py-2 bg-soha-input-bg border border-soha-border rounded-lg text-soha-text focus:outline-none focus:ring-2 focus:ring-soha-accent"
    >
      <option value="">Todos los bloques</option>
      <option value="b001">Estante A - Analgésicos</option>
      <option value="b002">Estante B - Antibióticos</option>
      <option value="b003">Estante C - Cardiovasculares</option>
      <option value="b004">Estante D - Controlados</option>
      <option value="b005">Refrigerador - Biológicos</option>
    </select>
  </div>

  {#if loading}
    <div class="space-y-4">
      {#each Array(5) as _}
        <div class="h-32 bg-soha-card rounded animate-pulse"></div>
      {/each}
    </div>
  {:else}
    <!-- Items Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {#each items as item}
        <div
          class="bg-soha-card border border-soha-border rounded-lg p-4 cursor-pointer hover:border-soha-accent transition-colors"
          onclick={() => selectedItem = selectedItem?.id === item.id ? null : item}
          role="button"
          tabindex="0"
          onkeydown={(e) => e.key === 'Enter' && (selectedItem = selectedItem?.id === item.id ? null : item)}
        >
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="font-semibold text-soha-text">{item.nombreComercial}</h3>
              <p class="text-sm text-soha-muted">{item.principioActivo} - {item.presentacion}</p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-soha-accent">{item.stockActual}</div>
              <div class="text-xs text-soha-muted">unidades</div>
            </div>
          </div>

          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs text-soha-muted">Mínimo: {item.stockMinimo}</span>
            {#if item.stockActual < item.stockMinimo}
              <span class="text-xs text-red-500 font-medium">Stock bajo</span>
            {/if}
          </div>

          <!-- Lot FEFO badges -->
          <div class="flex flex-wrap gap-2">
            {#each item.lotesDetalle.slice(0, 3) as lot}
              <span class="px-2 py-1 rounded text-xs font-medium {getStatusColor(lot.status)}">
                {lot.numeroLote} - {lot.cantidadActual}u
                {#if lot.status !== 'expired'}
                  ({daysUntilExpiry(lot.fechaVencimiento)}d)
                {/if}
              </span>
            {/each}
            {#if item.lotesDetalle.length > 3}
              <span class="px-2 py-1 rounded text-xs text-soha-muted bg-soha-surface">
                +{item.lotesDetalle.length - 3} más
              </span>
            {/if}
          </div>

          <!-- Expanded lot details -->
          {#if selectedItem?.id === item.id}
            <div class="mt-4 pt-4 border-t border-soha-border">
              <h4 class="text-sm font-medium text-soha-text mb-2">Detalle de Lotes (FEFO)</h4>
              <div class="space-y-2">
                {#each item.lotesDetalle as lot}
                  <div class="flex items-center justify-between p-2 bg-soha-surface rounded">
                    <div class="flex items-center gap-2">
                      <span class="px-2 py-0.5 rounded text-xs font-medium {getStatusColor(lot.status)}">
                        {getStatusLabel(lot.status)}
                      </span>
                      <span class="text-sm text-soha-text">{lot.numeroLote}</span>
                    </div>
                    <div class="text-right">
                      <span class="text-sm font-mono text-soha-text">{lot.cantidadActual}/{lot.cantidadOriginal}</span>
                      <span class="text-xs text-soha-muted ml-2">Vence: {lot.fechaVencimiento}</span>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    {#if items.length === 0}
      <div class="text-center py-12 text-soha-muted">
        No se encontraron medicamentos con los filtros aplicados.
      </div>
    {/if}
  {/if}
</div>
