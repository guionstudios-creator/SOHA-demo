<script lang="ts">
  import { onMount } from 'svelte';
  import { createMockContainer } from '$lib/mock/mock-container';
  import SearchBar from '$lib/components/molecules/SearchBar.svelte';
  import Badge from '$lib/components/atoms/Badge.svelte';
  import Skeleton from '$lib/components/atoms/Skeleton.svelte';

  const container = createMockContainer();
  let medications: any[] = $state([]);
  let loading = $state(true);
  let searchQuery = $state('');
  let selectedCategory = $state('');

  const categories = ['Analgésicos', 'AINE', 'Antibióticos', 'Cardiovasculares', 'Antidiabéticos', 'Respiratorios', 'Corticosteroides', 'Gastrointestinal', 'Neurológicos', 'Endocrinos', 'Anticoagulantes', 'Vitaminas', 'Psiquiátricos', 'Emergencia'];

  onMount(async () => {
    medications = await container.catalogService.findAllMedications();
    loading = false;
  });

  async function handleSearch() {
    loading = true;
    const all = await container.catalogService.findAllMedications();
    medications = all.filter((m: any) => {
      const matchSearch = !searchQuery || m.nombreComercial.toLowerCase().includes(searchQuery.toLowerCase()) || m.principioActivo.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = !selectedCategory || m.categoria === selectedCategory;
      return matchSearch && matchCat;
    });
    loading = false;
  }

  function getCatBadgeType(cat: string): 'ok' | 'warning' | 'urgent' | 'expired' {
    const map: Record<string, 'ok' | 'warning' | 'urgent' | 'expired'> = {
      'Analgésicos': 'ok',
      'Antibióticos': 'warning',
      'Cardiovasculares': 'urgent',
      'Emergencia': 'urgent',
    };
    return map[cat] || 'expired';
  }
</script>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-bold" style="color: var(--soha-text);">Catálogo</h1>
    <p class="text-sm mt-1" style="color: var(--soha-muted);">Maestro de medicamentos con búsqueda y categorías</p>
  </div>

  <div class="flex flex-wrap gap-3">
    <SearchBar placeholder="Buscar por nombre o principio activo..." value={searchQuery} onSearch={(val) => { searchQuery = val; handleSearch(); }} />
    <select bind:value={selectedCategory} onchange={handleSearch} class="input w-auto">
      <option value="">Todas las categorías</option>
      {#each categories as cat}
        <option value={cat}>{cat}</option>
      {/each}
    </select>
  </div>

  {#if loading}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Skeleton variant="card" count={6} />
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each medications as med}
        <div class="card hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="font-semibold" style="color: var(--soha-text);">{med.nombreComercial}</h3>
              <p class="text-sm" style="color: var(--soha-muted);">{med.principioActivo}</p>
            </div>
            <Badge type={getCatBadgeType(med.categoria)} label={med.categoria} />
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span style="color: var(--soha-muted);">Presentación:</span>
              <span style="color: var(--soha-text);">{med.presentacion}</span>
            </div>
            <div class="flex justify-between">
              <span style="color: var(--soha-muted);">Concentración:</span>
              <span style="color: var(--soha-text);">{med.concentracion}</span>
            </div>
            <div class="flex justify-between">
              <span style="color: var(--soha-muted);">Laboratorio:</span>
              <span style="color: var(--soha-text);">{med.laboratorio}</span>
            </div>
            <div class="flex justify-between">
              <span style="color: var(--soha-muted);">Stock Mínimo:</span>
              <span style="color: var(--soha-text);">{med.stockMinimo} {med.unidadBase}</span>
            </div>
          </div>
          <div class="mt-3 pt-3" style="border-top: 1px solid var(--soha-border);">
            <span class="text-xs font-medium" style="color: {med.activo ? 'var(--lot-ok)' : 'var(--lot-urgent)'};">
              {med.activo ? '● Activo' : '● Inactivo'}
            </span>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
