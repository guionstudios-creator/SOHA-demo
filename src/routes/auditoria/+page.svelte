<script lang="ts">
  import { onMount } from 'svelte';
  import { createMockContainer } from '$lib/mock/mock-container';

  const container = createMockContainer();

  let entries: any[] = $state([]);
  let loading = $state(true);
  let selectedOperation = $state('');
  let selectedUser = $state('');

  onMount(async () => {
    entries = await container.auditService.findAll();
    loading = false;
  });

  async function handleFilter() {
    loading = true;
    entries = await container.auditService.findAll({
      user: selectedUser || undefined,
      operation: selectedOperation || undefined
    });
    loading = false;
  }

  function getOperationColor(op: string): string {
    switch (op) {
      case 'INSERT': return 'text-green-500 bg-green-500/10';
      case 'UPDATE': return 'text-blue-500 bg-blue-500/10';
      case 'DELETE': return 'text-red-500 bg-red-500/10';
      case 'LOGIN': return 'text-purple-500 bg-purple-500/10';
      default: return 'text-soha-muted bg-soha-surface';
    }
  }

  const operations = ['INSERT', 'UPDATE', 'DELETE', 'LOGIN'];
  const users = ['admin_demo', 'farmacia01', 'farmacia02', 'enfermeria01'];
</script>

<svelte:head>
  <title>SOHA Demo - Auditoría</title>
</svelte:head>

<div class="space-y-6">
  <h1 class="text-2xl font-semibold text-soha-text">Auditoría</h1>

  <!-- Filters -->
  <div class="flex flex-wrap gap-4">
    <select
      bind:value={selectedOperation}
      onchange={handleFilter}
      class="px-4 py-2 bg-soha-input-bg border border-soha-border rounded-lg text-soha-text focus:outline-none focus:ring-2 focus:ring-soha-accent"
    >
      <option value="">Todas las operaciones</option>
      {#each operations as op}
        <option value={op}>{op}</option>
      {/each}
    </select>
    <select
      bind:value={selectedUser}
      onchange={handleFilter}
      class="px-4 py-2 bg-soha-input-bg border border-soha-border rounded-lg text-soha-text focus:outline-none focus:ring-2 focus:ring-soha-accent"
    >
      <option value="">Todos los usuarios</option>
      {#each users as user}
        <option value={user}>{user}</option>
      {/each}
    </select>
  </div>

  {#if loading}
    <div class="space-y-2">
      {#each Array(10) as _}
        <div class="h-16 bg-soha-card rounded animate-pulse"></div>
      {/each}
    </div>
  {:else}
    <!-- Audit Table -->
    <div class="bg-soha-card border border-soha-border rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-soha-border">
              <th class="px-4 py-3 text-left text-soha-muted font-medium">Fecha/Hora</th>
              <th class="px-4 py-3 text-left text-soha-muted font-medium">Operación</th>
              <th class="px-4 py-3 text-left text-soha-muted font-medium">Usuario</th>
              <th class="px-4 py-3 text-left text-soha-muted font-medium">Contexto</th>
              <th class="px-4 py-3 text-left text-soha-muted font-medium">Hash</th>
            </tr>
          </thead>
          <tbody>
            {#each entries as entry}
              <tr class="border-b border-soha-border hover:bg-soha-hover transition-colors">
                <td class="px-4 py-3 font-mono text-soha-text">{entry.fechaHora}</td>
                <td class="px-4 py-3">
                  <span class="px-2 py-0.5 rounded text-xs font-medium {getOperationColor(entry.operacion)}">
                    {entry.operacion}
                  </span>
                </td>
                <td class="px-4 py-3 text-soha-text">{entry.username}</td>
                <td class="px-4 py-3 text-soha-muted">{entry.contexto}</td>
                <td class="px-4 py-3 font-mono text-xs text-soha-muted">{entry.hash}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    {#if entries.length === 0}
      <div class="text-center py-12 text-soha-muted">
        No se encontraron entradas de auditoría con los filtros aplicados.
      </div>
    {/if}
  {/if}
</div>
