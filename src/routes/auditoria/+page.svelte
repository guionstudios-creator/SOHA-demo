<script lang="ts">
  import { onMount } from 'svelte';
  import { createMockContainer } from '$lib/mock/mock-container';

  const container = createMockContainer();
  let entries: any[] = $state([]);
  let loading = $state(true);
  let selectedOperation = $state('');

  const operations = ['INSERT', 'UPDATE', 'DELETE', 'LOGIN'];

  onMount(async () => {
    entries = await container.auditService.findAll();
    loading = false;
  });

  async function handleFilter() {
    loading = true;
    entries = await container.auditService.findAll({ operation: selectedOperation || undefined });
    loading = false;
  }

  function getOpClass(op: string): string {
    switch (op) {
      case 'INSERT': return 'badge-lot-ok';
      case 'UPDATE': return 'badge-lot-warning';
      case 'DELETE': return 'badge-lot-urgent';
      case 'LOGIN': return 'badge-lot-expired';
      default: return 'badge-lot-expired';
    }
  }
</script>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-bold" style="color: var(--soha-text);">Auditoría</h1>
    <p class="text-sm mt-1" style="color: var(--soha-muted);">Registro inmutable de operaciones con hashes SHA-256</p>
  </div>

  <div class="flex flex-wrap gap-3">
    <select bind:value={selectedOperation} onchange={handleFilter} class="input w-auto">
      <option value="">Todas las operaciones</option>
      {#each operations as op}
        <option value={op}>{op}</option>
      {/each}
    </select>
  </div>

  {#if loading}
    <div class="space-y-2">
      {#each Array(10) as _}
        <div class="card animate-pulse h-14"></div>
      {/each}
    </div>
  {:else}
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Fecha/Hora</th>
            <th>Operación</th>
            <th>Usuario</th>
            <th>Contexto</th>
            <th>Hash</th>
          </tr>
        </thead>
        <tbody>
          {#each entries as entry}
            <tr>
              <td class="font-mono text-xs">{entry.fechaHora}</td>
              <td><span class={getOpClass(entry.operacion)}>{entry.operacion}</span></td>
              <td>{entry.username}</td>
              <td style="color: var(--soha-muted);">{entry.contexto}</td>
              <td class="font-mono text-xs" style="color: var(--soha-muted);">{entry.hash}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
