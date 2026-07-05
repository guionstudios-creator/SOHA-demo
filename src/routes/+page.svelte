<script lang="ts">
  import { onMount } from 'svelte';
  import { createMockContainer } from '$lib/mock/mock-container';

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
    {#each Array(4) as _}
      <div class="card animate-pulse h-24"></div>
    {/each}
  </div>
{:else}
  <div class="space-y-6" class:opacity-0={!visible} class:opacity-100={visible} style="transition: opacity 0.3s ease;">
    <!-- Hospital Name -->
    <div>
      <h1 class="text-2xl font-bold" style="color: var(--soha-text);">Estadísticas</h1>
      <p class="text-sm mt-1" style="color: var(--soha-muted);">Hospital Demo Central — Dashboard de inventario</p>
    </div>

    <!-- Stat Cards Row -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Total Medicamentos -->
      <div class="card group hover:shadow-md transition-shadow">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background: var(--soha-accent-soft);">
            <span class="text-lg">💊</span>
          </div>
          <span class="text-xs font-semibold uppercase tracking-wider" style="color: var(--soha-muted);">Medicamentos</span>
        </div>
        <div class="text-3xl font-bold" style="color: var(--soha-accent);">{data.totalMedicamentos}</div>
      </div>

      <!-- Stock Total -->
      <div class="card group hover:shadow-md transition-shadow">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background: color-mix(in srgb, var(--lot-ok) 15%, transparent);">
            <span class="text-lg">📦</span>
          </div>
          <span class="text-xs font-semibold uppercase tracking-wider" style="color: var(--soha-muted);">Stock Total</span>
        </div>
        <div class="text-3xl font-bold" style="color: var(--lot-ok);">{data.totalUnidades.toLocaleString()}</div>
      </div>

      <!-- Lotes Críticos -->
      <div class="card group hover:shadow-md transition-shadow">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background: color-mix(in srgb, var(--lot-urgent) 15%, transparent);">
            <span class="text-lg">⚠️</span>
          </div>
          <span class="text-xs font-semibold uppercase tracking-wider" style="color: var(--soha-muted);">Lotes Críticos</span>
        </div>
        <div class="text-3xl font-bold" style="color: var(--lot-urgent);">{data.lotesUrgentes}</div>
      </div>

      <!-- Despachos Hoy -->
      <div class="card group hover:shadow-md transition-shadow">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background: color-mix(in srgb, var(--soha-accent) 15%, transparent);">
            <span class="text-lg">🛒</span>
          </div>
          <span class="text-xs font-semibold uppercase tracking-wider" style="color: var(--soha-muted);">Despachos Hoy</span>
        </div>
        <div class="text-3xl font-bold" style="color: var(--soha-accent);">{data.despachosHoy}</div>
      </div>
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
        <!-- Visual bar -->
        <div class="mt-4 h-3 rounded-full overflow-hidden flex" style="background: var(--soha-surface);">
          {#if data.totalLotes > 0}
            <div style="width: {(data.lotesOk / data.totalLotes) * 100}%; background: var(--lot-ok);"></div>
            <div style="width: {(data.lotesAdvertencia / data.totalLotes) * 100}%; background: var(--lot-warning);"></div>
            <div style="width: {(data.lotesUrgentes / data.totalLotes) * 100}%; background: var(--lot-urgent);"></div>
            <div style="width: {(data.lotesVencidos / data.totalLotes) * 100}%; background: var(--lot-expired);"></div>
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
                <div class="h-full rounded" style="width: {((cantidad as number) / maxCant) * 100}%; background: var(--soha-accent);"></div>
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
          <div class="flex items-center gap-3 p-3 rounded-lg"
            style={alert.type === 'urgent'
              ? 'background: color-mix(in srgb, var(--lot-urgent) 8%, transparent); border: 1px solid color-mix(in srgb, var(--lot-urgent) 30%, transparent);'
              : 'background: color-mix(in srgb, var(--lot-warning) 8%, transparent); border: 1px solid color-mix(in srgb, var(--lot-warning) 30%, transparent);'}
          >
            <span>{alert.type === 'urgent' ? '🔴' : '⚠️'}</span>
            <span class="text-sm" style="color: {alert.type === 'urgent' ? 'var(--lot-urgent)' : 'var(--lot-warning)'};">{alert.message}</span>
          </div>
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
