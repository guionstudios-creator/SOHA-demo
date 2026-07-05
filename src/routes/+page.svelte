<script lang="ts">
  import { onMount } from 'svelte';
  import { createMockContainer } from '$lib/mock/mock-container';
  import StatCard from '$lib/components/atoms/StatCard.svelte';
  import AlertCard from '$lib/components/molecules/AlertCard.svelte';
  import Badge from '$lib/components/atoms/Badge.svelte';
  import Skeleton from '$lib/components/atoms/Skeleton.svelte';

  const container = createMockContainer();
  let data: any = $state(null);
  let visible = $state(false);

  onMount(async () => {
    data = await container.dashboardAnalyticsService.getDashboardData();
    setTimeout(() => visible = true, 100);
  });
</script>

{#if !data}
  <div class="space-y-4">
    <Skeleton variant="card" count={4} />
  </div>
{:else}
  <div class="space-y-6" class:opacity-0={!visible} class:opacity-100={visible} style="transition: opacity 0.3s ease;">
    <div>
      <h1 class="text-2xl font-bold" style="color: var(--soha-text);">Estadísticas</h1>
      <p class="text-sm mt-1" style="color: var(--soha-muted);">Hospital Demo Central — Dashboard de inventario</p>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-container">
      <StatCard icon="pill" label="Medicamentos" value={data.totalMedicamentos} color="var(--soha-accent)" />
      <StatCard icon="package" label="Stock Total" value={data.totalUnidades.toLocaleString()} color="var(--lot-ok)" />
      <StatCard icon="alert-circle" label="Lotes Críticos" value={data.lotesUrgentes} color="var(--lot-urgent)" />
      <StatCard icon="shopping-cart" label="Despachos Hoy" value={data.despachosHoy} color="var(--soha-accent)" />
    </div>

    <!-- FEFO Status + Service Distribution -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- FEFO Status -->
      <div class="card">
        <h3 class="text-sm font-semibold uppercase tracking-wider mb-4" style="color: var(--soha-muted);">Estado de Lotes (FEFO)</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full" style="background: var(--lot-ok);"></span>
              <span class="text-sm" style="color: var(--soha-text);">OK (&gt;90 días)</span>
            </div>
            <span class="font-bold" style="color: var(--lot-ok);">{data.lotesOk}</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full" style="background: var(--lot-warning);"></span>
              <span class="text-sm" style="color: var(--soha-text);">Advertencia (30-90 días)</span>
            </div>
            <span class="font-bold" style="color: var(--lot-warning);">{data.lotesAdvertencia}</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full" style="background: var(--lot-urgent);"></span>
              <span class="text-sm" style="color: var(--soha-text);">Urgente (&lt;30 días)</span>
            </div>
            <span class="font-bold" style="color: var(--lot-urgent);">{data.lotesUrgentes}</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full" style="background: var(--lot-expired);"></span>
              <span class="text-sm" style="color: var(--soha-text);">Vencidos</span>
            </div>
            <span class="font-bold" style="color: var(--lot-expired);">{data.lotesVencidos}</span>
          </div>
        </div>
        <div class="mt-4 h-3 rounded-full overflow-hidden flex" style="background: var(--soha-surface);">
          {#if data.totalLotes > 0}
            <div style="width: {(data.lotesOk / data.totalLotes) * 100}%; background: var(--lot-ok); transition: width 0.5s ease;"></div>
            <div style="width: {(data.lotesAdvertencia / data.totalLotes) * 100}%; background: var(--lot-warning); transition: width 0.5s ease;"></div>
            <div style="width: {(data.lotesUrgentes / data.totalLotes) * 100}%; background: var(--lot-urgent); transition: width 0.5s ease;"></div>
            <div style="width: {(data.lotesVencidos / data.totalLotes) * 100}%; background: var(--lot-expired); transition: width 0.5s ease;"></div>
          {/if}
        </div>
      </div>

      <!-- Service Distribution -->
      <div class="card">
        <h3 class="text-sm font-semibold uppercase tracking-wider mb-4" style="color: var(--soha-muted);">Despachos por Servicio</h3>
        <div class="space-y-3">
          {#each Object.entries(data.serviceDistribution) as [servicio, cantidad]}
            {@const maxCant = Math.max(...Object.values(data.serviceDistribution) as number[])}
            <div class="flex items-center gap-3">
              <span class="w-32 text-sm truncate" style="color: var(--soha-muted);">{servicio}</span>
              <div class="flex-1 h-6 rounded overflow-hidden" style="background: var(--soha-surface);">
                <div class="h-full rounded" style="width: {((cantidad as number) / maxCant) * 100}%; background: var(--soha-accent); transition: width 0.5s ease;"></div>
              </div>
              <span class="w-12 text-right text-sm font-mono font-bold" style="color: var(--soha-text);">{cantidad}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Alerts -->
    <div class="card">
      <h3 class="text-sm font-semibold uppercase tracking-wider mb-4" style="color: var(--soha-muted);">Alertas Recientes</h3>
      <div class="space-y-2">
        {#each data.recentAlerts as alert}
          <AlertCard type={alert.type} message={alert.message} />
        {/each}
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-3 gap-4">
      <div class="card text-center">
        <div class="text-2xl font-bold" style="color: var(--soha-text);">{data.movimientosTotales}</div>
        <div class="text-xs mt-1" style="color: var(--soha-muted);">Total Movimientos</div>
      </div>
      <div class="card text-center">
        <div class="text-2xl font-bold" style="color: var(--soha-text);">{data.despachosTotales}</div>
        <div class="text-xs mt-1" style="color: var(--soha-muted);">Despachos Totales</div>
      </div>
      <div class="card text-center">
        <div class="text-2xl font-bold" style="color: var(--lot-warning);">{data.lowStockCount}</div>
        <div class="text-xs mt-1" style="color: var(--soha-muted);">Stock Bajo</div>
      </div>
    </div>
  </div>
{/if}
