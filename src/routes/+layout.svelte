<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  let { children } = $props();
  let mobileMenuOpen = $state(false);
  let isExpanded = $state(true);
  let layoutReady = $state(false);

  const rutaActual = $derived($page.url.pathname);

  const navOperativo = [
    { href: '/', icon: '📊', label: 'Estadísticas' },
    { href: '/inventario', icon: '📦', label: 'Inventario' },
    { href: '/despachos', icon: '🛒', label: 'Salida Rápida' },
    { href: '/despachos', icon: '↩️', label: 'Devoluciones' },
    { href: '/historial', icon: '🕐', label: 'Historial' },
    { href: '/reportes', icon: '📄', label: 'Reportes' },
  ];

  const navAdmin = [
    { href: '/inventario', icon: '📁', label: 'Ubicaciones' },
    { href: '/catalogo', icon: '📋', label: 'Catálogo' },
    { href: '/usuarios', icon: '👥', label: 'Usuarios' },
    { href: '/auditoria', icon: '🛡️', label: 'Auditoría' },
    { href: '/configuracion', icon: '⚙️', label: 'Admin Tool' }
  ];

  onMount(() => {
    try {
      const saved = localStorage.getItem('soha_sidebar_expanded');
      if (saved !== null) isExpanded = saved === 'true';
    } catch {}
    layoutReady = true;
  });

  function toggleExpand() {
    isExpanded = !isExpanded;
    try { localStorage.setItem('soha_sidebar_expanded', String(isExpanded)); } catch {}
  }

  function isRouteActive(path: string) {
    return rutaActual === path;
  }
</script>

{#if !layoutReady}
  <div class="fixed inset-0 bg-slate-50 flex flex-col items-center justify-center gap-4">
    <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    <p class="text-slate-500 font-medium animate-pulse">Iniciando SOHA...</p>
  </div>
{:else}
  <div class="layout-root">
    <!-- Sidebar -->
    <aside class="sb-root" class:sb-expanded={isExpanded} class:sb-collapsed={!isExpanded}>
      <!-- Header -->
      <div class="sb-header">
        <a href="/" class="sb-logo-wrapper flex items-center gap-0 rounded-xl transition-colors" style="padding: 0.5rem;">
          <div class="sb-logo-box">S</div>
          {#if isExpanded}
            <div class="sb-label-slide sb-label-visible">
              <div class="sb-logo-text">
                <span class="sb-logo-title">SOHA</span>
                <span class="sb-logo-sub">Inventario</span>
              </div>
            </div>
          {/if}
        </a>
      </div>

      <!-- Navigation -->
      <nav class="sb-nav">
        {#each navOperativo as item}
          <a
            href={item.href}
            class="sb-link"
            class:sb-link-active={isRouteActive(item.href)}
          >
            <div class="sb-icon-box" class:sb-link-active={isRouteActive(item.href)}>
              <span class="text-lg">{item.icon}</span>
            </div>
            {#if isExpanded}
              <div class="sb-label-slide sb-label-visible">
                <span class="sb-link-label">{item.label}</span>
              </div>
            {/if}
          </a>
        {/each}

        <!-- Admin Divider -->
        <div class="sb-divider">
          <div class="sb-divider-line"></div>
          {#if isExpanded}
            <div class="sb-label-slide sb-label-visible">
              <span class="sb-divider-text">Admin Console</span>
            </div>
          {/if}
        </div>

        {#each navAdmin as item}
          <a
            href={item.href}
            class="sb-link"
            class:sb-link-active={isRouteActive(item.href)}
          >
            <div class="sb-icon-box">
              <span class="text-lg">{item.icon}</span>
            </div>
            {#if isExpanded}
              <div class="sb-label-slide sb-label-visible">
                <span class="sb-link-label">{item.label}</span>
              </div>
            {/if}
          </a>
        {/each}
      </nav>

      <!-- Footer Profile -->
      <div class="sb-footer">
        <div class="sb-profile-card">
          <div class="sb-profile-main">
            <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">AD</div>
            {#if isExpanded}
              <div class="sb-label-slide sb-label-visible">
                <div class="sb-profile-info">
                  <p class="sb-profile-name">Admin Demo</p>
                  <p class="sb-profile-role">administrador</p>
                </div>
              </div>
            {/if}
          </div>
          <div class="flex items-center gap-1">
            <button class="sb-action-btn sb-action-btn-expand" onclick={toggleExpand} title={isExpanded ? 'Contraer' : 'Expandir'}>
              {isExpanded ? '◀' : '▶'}
            </button>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="layout-main-wrapper">
      <!-- Desktop status strip -->
      <div
        class="hidden lg:flex items-center justify-end gap-2 px-6 py-2 border-b shrink-0"
        style="background: color-mix(in srgb, var(--soha-bg) 60%, transparent); border-color: var(--soha-border);"
      >
        <span class="text-xs text-[var(--soha-muted)]">🟢 Conectado</span>
        <span class="text-xs text-[var(--soha-muted)]">|</span>
        <span class="text-xs text-[var(--soha-muted)]">Hospital Demo Central</span>
      </div>

      <!-- Content -->
      <main class="flex-1 overflow-y-auto w-full relative p-6 lg:p-8">
        <!-- Demo Banner -->
        <div class="mb-6 px-4 py-3 rounded-lg border text-sm font-medium flex items-center gap-3"
          style="background: color-mix(in srgb, var(--lot-warning) 10%, transparent); border-color: color-mix(in srgb, var(--lot-warning) 30%, transparent); color: var(--lot-warning);">
          <span>⚠️</span>
          <span>DEMO — Todos los datos son ficticios. No representa información real de pacientes o instituciones.</span>
        </div>

        {@render children()}
      </main>
    </div>
  </div>
{/if}
