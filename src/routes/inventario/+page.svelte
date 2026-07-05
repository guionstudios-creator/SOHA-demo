<script lang="ts">
  import { onMount } from 'svelte';
  import { createMockContainer } from '$lib/mock/mock-container';

  const container = createMockContainer();
  let items: any[] = $state([]);
  let loading = $state(true);
  let searchQuery = $state('');
  let selectedItem: any = $state(null);

  onMount(async () => {
    items = await container.inventoryService.findAll();
    loading = false;
  });

  async function handleSearch() {
    loading = true;
    items = await container.inventoryService.findAll({ search: searchQuery });
    loading = false;
  }

  function getLotBadgeClass(status: string): string {
    switch (status) {
      case 'ok': return 'badge-lot-ok';
      case 'warning': return 'badge-lot-warning';
      case 'urgent': return 'badge-lot-urgent';
      case 'expired': return 'badge-lot-expired';
      default: return 'badge-lot-expired';
    }
  }

  function getLotStatusLabel(status: string): string {
    switch (status) {
      case 'ok': return 'OK';
      case 'warning': return 'Advertencia';
      case 'urgent': return 'Urgente';
      case 'expired': return 'Vencido';
      default: return 'Vencido';
    }
  }

  function daysUntilExpiry(fecha: string): number {
    return Math.ceil((new Date(fecha).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  }
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold" style="color: var(--soha-text);">Inventario</h1>
      <p class="text-sm mt-1" style="color: var(--soha-muted);">Stock actual con control FEFO por lote</p>
    </div>
  </div>

  <!-- Filters -->
  <div class="flex flex-wrap gap-3">
    <input
      type="text"
      bind:value={searchQuery}
      oninput={handleSearch}
      placeholder="Buscar medicamento..."
      class="input flex-1 min-w-[200px]"
    />
  </div>

  {#if loading}
    <div class="space-y-3">
      {#each Array(5) as _}
        <div class="card animate-pulse h-20"></div>
      {/each}
    </div>
  {:else}
    <!-- Table -->
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Medicamento</th>
            <th>Principio Activo</th>
            <th>Stock</th>
            <th>Mínimo</th>
            <th>Lotes</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {#each items as item}
            <tr
              class="cursor-pointer"
              onclick={() => selectedItem = selectedItem?.id === item.id ? null : item}
            >
              <td class="font-medium">{item.nombreComercial}</td>
              <td>{item.principioActivo}</td>
              <td>
                <span class="font-bold" style="color: item.stockActual < item.stockMinimo ? 'var(--lot-urgent)' : 'var(--lot-ok)';">
                  {item.stockActual}
                </span>
              </td>
              <td>{item.stockMinimo}</td>
              <td>{item.lotesDetalle.length}</td>
              <td>
                {#if item.stockActual < item.stockMinimo}
                  <span class="badge-lot-urgent">Stock bajo</span>
                {:else if item.lotesDetalle.some((l: any) => l.status === 'urgent')}
                  <span class="badge-lot-urgent">Crítico</span>
                {:else if item.lotesDetalle.some((l: any) => l.status === 'warning')}
                  <span class="badge-lot-warning">Atención</span>
                {:else}
                  <span class="badge-lot-ok">Normal</span>
                {/if}
              </td>
            </tr>

            <!-- Expanded lot details -->
            {#if selectedItem?.id === item.id}
              <tr>
                <td colspan="6" class="!p-0">
                  <div class="p-4" style="background: var(--soha-surface);">
                    <h4 class="text-xs font-semibold uppercase tracking-wider mb-3" style="color: var(--soha-muted);">Detalle de Lotes (FEFO)</h4>
                    <div class="grid gap-2">
                      {#each item.lotesDetalle as lot}
                        <div class="flex items-center justify-between p-3 rounded-lg" style="background: var(--soha-card); border: 1px solid var(--soha-border);">
                          <div class="flex items-center gap-3">
                            <span class={getLotBadgeClass(lot.status)}>{getLotStatusLabel(lot.status)}</span>
                            <span class="font-medium text-sm" style="color: var(--soha-text);">{lot.numeroLote}</span>
                          </div>
                          <div class="flex items-center gap-4 text-sm">
                            <span class="font-mono" style="color: var(--soha-text);">{lot.cantidadActual}/{lot.cantidadOriginal} u</span>
                            <span style="color: var(--soha-muted);">Vence: {lot.fechaVencimiento}</span>
                            {#if lot.status !== 'expired'}
                              <span style="color: var(--lot-warning);">({daysUntilExpiry(lot.fechaVencimiento)}d)</span>
                            {/if}
                          </div>
                        </div>
                      {/each}
                    </div>
                  </div>
                </td>
              </tr>
            {/if}
          {/each}
        </tbody>
      </table>
    </div>

    {#if items.length === 0}
      <div class="card text-center py-12" style="color: var(--soha-muted);">
        No se encontraron medicamentos.
      </div>
    {/if}
  {/if}
</div>
