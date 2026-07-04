<script lang="ts">
  import { onMount } from 'svelte';
  import { createMockContainer } from '$lib/mock/mock-container';

  const container = createMockContainer();

  let dashboardData: any = $state(null);
  let loading = $state(true);

  onMount(async () => {
    dashboardData = await container.dashboardAnalyticsService.getDashboardData();
    loading = false;
  });
</script>

<svelte:head>
  <title>SOHA Demo - Dashboard</title>
</svelte:head>

{#if loading}
  <div class="space-y-6">
    <div class="h-8 bg-soha-card rounded w-1/3 animate-pulse"></div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      {#each Array(4) as _}
        <div class="h-24 bg-soha-card rounded animate-pulse"></div>
      {/each}
    </div>
    <div class="h-64 bg-soha-card rounded animate-pulse"></div>
  </div>
{:else if dashboardData}
  <div class="space-y-6">
    <h1 class="text-2xl font-semibold text-soha-text">Dashboard</h1>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-soha-card border border-soha-border rounded-lg p-4">
        <div class="text-sm text-soha-muted">Total Medicamentos</div>
        <div class="text-3xl font-bold text-soha-accent">{dashboardData.totalMedicamentos}</div>
      </div>
      <div class="bg-soha-card border border-soha-border rounded-lg p-4">
        <div class="text-sm text-soha-muted">Stock Total</div>
        <div class="text-3xl font-bold text-green-500">{dashboardData.totalUnidades.toLocaleString()}</div>
      </div>
      <div class="bg-soha-card border border-soha-border rounded-lg p-4">
        <div class="text-sm text-soha-muted">Lotes Críticos</div>
        <div class="text-3xl font-bold text-red-500">{dashboardData.lotesUrgentes}</div>
      </div>
      <div class="bg-soha-card border border-soha-border rounded-lg p-4">
        <div class="text-sm text-soha-muted">Despachos Hoy</div>
        <div class="text-3xl font-bold text-purple-500">{dashboardData.despachosHoy}</div>
      </div>
    </div>

    <!-- Lot Status Distribution -->
    <div class="bg-soha-card border border-soha-border rounded-lg p-6">
      <h2 class="text-lg font-semibold text-soha-text mb-4">Estado de Lotes (FEFO)</h2>
      <div class="flex gap-4">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-green-500"></span>
          <span class="text-sm text-soha-muted">OK (&gt;90 días): {dashboardData.lotesOk}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span class="text-sm text-soha-muted">Advertencia (30-90 días): {dashboardData.lotesAdvertencia}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-red-500"></span>
          <span class="text-sm text-soha-muted">Urgente (&lt;30 días): {dashboardData.lotesUrgentes}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-gray-500"></span>
          <span class="text-sm text-soha-muted">Vencidos: {dashboardData.lotesVencidos}</span>
        </div>
      </div>

      <!-- Visual bar -->
      <div class="mt-4 h-4 rounded-full overflow-hidden flex">
        {#if dashboardData.totalLotes > 0}
          <div class="bg-green-500" style="width: {(dashboardData.lotesOk / dashboardData.totalLotes) * 100}%"></div>
          <div class="bg-yellow-500" style="width: {(dashboardData.lotesAdvertencia / dashboardData.totalLotes) * 100}%"></div>
          <div class="bg-red-500" style="width: {(dashboardData.lotesUrgentes / dashboardData.totalLotes) * 100}%"></div>
          <div class="bg-gray-500" style="width: {(dashboardData.lotesVencidos / dashboardData.totalLotes) * 100}%"></div>
        {/if}
      </div>
    </div>

    <!-- Service Distribution -->
    <div class="bg-soha-card border border-soha-border rounded-lg p-6">
      <h2 class="text-lg font-semibold text-soha-text mb-4">Despachos por Servicio</h2>
      <div class="space-y-3">
        {#each Object.entries(dashboardData.serviceDistribution) as [servicio, cantidad]}
          {@const maxCant = Math.max(...Object.values(dashboardData.serviceDistribution) as number[])}
          <div class="flex items-center gap-4">
            <span class="w-32 text-sm text-soha-muted">{servicio}</span>
            <div class="flex-1 h-6 bg-soha-surface rounded overflow-hidden">
              <div class="h-full bg-soha-accent rounded" style="width: {((cantidad as number) / maxCant) * 100}%"></div>
            </div>
            <span class="w-12 text-right text-sm font-mono text-soha-text">{cantidad}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Recent Alerts -->
    <div class="bg-soha-card border border-soha-border rounded-lg p-6">
      <h2 class="text-lg font-semibold text-soha-text mb-4">Alertas Recientes</h2>
      <div class="space-y-2">
        {#each dashboardData.recentAlerts as alert}
          <div class="flex items-center gap-3 p-3 rounded-lg {alert.type === 'urgent' ? 'bg-red-500/10 border border-red-500/20' : 'bg-yellow-500/10 border border-yellow-500/20'}">
            <span class="text-lg">{alert.type === 'urgent' ? '🔴' : '⚠️'}</span>
            <span class="text-sm {alert.type === 'urgent' ? 'text-red-400' : 'text-yellow-400'}">{alert.message}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-soha-card border border-soha-border rounded-lg p-4">
        <div class="text-sm text-soha-muted">Total Movimientos</div>
        <div class="text-2xl font-bold text-soha-text">{dashboardData.movimientosTotales}</div>
      </div>
      <div class="bg-soha-card border border-soha-border rounded-lg p-4">
        <div class="text-sm text-soha-muted">Despachos Totales</div>
        <div class="text-2xl font-bold text-soha-text">{dashboardData.despachosTotales}</div>
      </div>
      <div class="bg-soha-card border border-soha-border rounded-lg p-4">
        <div class="text-sm text-soha-muted">Medicamentos con Stock Bajo</div>
        <div class="text-2xl font-bold text-orange-500">{dashboardData.lowStockCount}</div>
      </div>
    </div>
  </div>
{/if}
