<script lang="ts">
  import { onMount } from 'svelte';
  import { createMockContainer } from '$lib/mock/mock-container';

  const container = createMockContainer();

  let medications: any[] = $state([]);
  let loading = $state(true);
  let searchQuery = $state('');
  let selectedCategory = $state('');

  onMount(async () => {
    medications = await container.catalogService.findAllMedications();
    loading = false;
  });

  async function handleSearch() {
    loading = true;
    const allMeds = await container.catalogService.findAllMedications();
    medications = allMeds.filter(med => {
      const matchesSearch = !searchQuery ||
        med.nombreComercial.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.principioActivo.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || med.categoria === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    loading = false;
  }

  function getCategoriaColor(cat: string): string {
    const colors: Record<string, string> = {
      'Analgésicos': 'bg-blue-500/10 text-blue-400',
      'AINE': 'bg-purple-500/10 text-purple-400',
      'Antibióticos': 'bg-green-500/10 text-green-400',
      'Cardiovasculares': 'bg-red-500/10 text-red-400',
      'Antidiabéticos': 'bg-yellow-500/10 text-yellow-400',
      'Respiratorios': 'bg-cyan-500/10 text-cyan-400',
      'Corticosteroides': 'bg-orange-500/10 text-orange-400',
      'Gastrointestinal': 'bg-pink-500/10 text-pink-400',
      'Neurológicos': 'bg-indigo-500/10 text-indigo-400',
      'Endocrinos': 'bg-teal-500/10 text-teal-400',
      'Anticoagulantes': 'bg-rose-500/10 text-rose-400',
      'Vitaminas': 'bg-amber-500/10 text-amber-400',
      'Psiquiátricos': 'bg-violet-500/10 text-violet-400',
      'Emergencia': 'bg-red-600/10 text-red-500'
    };
    return colors[cat] || 'bg-gray-500/10 text-gray-400';
  }

  let categories: string[] = $derived([...new Set(medications.map(m => m.categoria))].sort());
</script>

<svelte:head>
  <title>SOHA Demo - Catálogo</title>
</svelte:head>

<div class="space-y-6">
  <h1 class="text-2xl font-semibold text-soha-text">Catálogo de Medicamentos</h1>

  <!-- Filters -->
  <div class="flex flex-wrap gap-4">
    <input
      type="text"
      bind:value={searchQuery}
      oninput={handleSearch}
      placeholder="Buscar por nombre o principio activo..."
      class="flex-1 min-w-[250px] px-4 py-2 bg-soha-input-bg border border-soha-border rounded-lg text-soha-text placeholder-soha-muted focus:outline-none focus:ring-2 focus:ring-soha-accent"
    />
    <select
      bind:value={selectedCategory}
      onchange={handleSearch}
      class="px-4 py-2 bg-soha-input-bg border border-soha-border rounded-lg text-soha-text focus:outline-none focus:ring-2 focus:ring-soha-accent"
    >
      <option value="">Todas las categorías</option>
      {#each categories as cat}
        <option value={cat}>{cat}</option>
      {/each}
    </select>
  </div>

  {#if loading}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each Array(6) as _}
        <div class="h-48 bg-soha-card rounded animate-pulse"></div>
      {/each}
    </div>
  {:else}
    <!-- Medications Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each medications as med}
        <div class="bg-soha-card border border-soha-border rounded-lg p-4 hover:border-soha-accent transition-colors">
          <div class="flex justify-between items-start mb-3">
            <div class="flex-1">
              <h3 class="font-semibold text-soha-text">{med.nombreComercial}</h3>
              <p class="text-sm text-soha-muted">{med.principioActivo}</p>
            </div>
            <span class="px-2 py-0.5 rounded text-xs font-medium {getCategoriaColor(med.categoria)}">
              {med.categoria}
            </span>
          </div>

          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-soha-muted">Presentación:</span>
              <span class="text-soha-text">{med.presentacion}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-soha-muted">Concentración:</span>
              <span class="text-soha-text">{med.concentracion}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-soha-muted">Laboratorio:</span>
              <span class="text-soha-text">{med.laboratorio}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-soha-muted">Stock Mínimo:</span>
              <span class="text-soha-text">{med.stockMinimo} {med.unidadBase}</span>
            </div>
          </div>

          <div class="mt-3 pt-3 border-t border-soha-border">
            <span class="text-xs {med.activo ? 'text-green-500' : 'text-red-500'}">
              {med.activo ? '● Activo' : '● Inactivo'}
            </span>
          </div>
        </div>
      {/each}
    </div>

    {#if medications.length === 0}
      <div class="text-center py-12 text-soha-muted">
        No se encontraron medicamentos con los filtros aplicados.
      </div>
    {/if}
  {/if}
</div>
