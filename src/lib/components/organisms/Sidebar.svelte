<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import Icon from '../atoms/Icon.svelte';
  import ThemeToggle from '../atoms/ThemeToggle.svelte';

  let { children }: { children?: any } = $props();
  let mobileMenuOpen = $state(false);
  let isExpanded = $state(true);
  let layoutReady = $state(false);

  const rutaActual = $derived($page.url.pathname);

  const navOperativo = [
    { href: '/', icon: 'layout-dashboard', label: 'Estadísticas' },
    { href: '/inventario/', icon: 'warehouse', label: 'Inventario' },
    { href: '/despachos/', icon: 'truck', label: 'Salida Rápida' },
    { href: '/devoluciones/', icon: 'undo-2', label: 'Devoluciones' },
    { href: '/historial/', icon: 'history', label: 'Historial' },
    { href: '/reportes/', icon: 'file-bar-chart', label: 'Reportes' },
  ];

  const navAdmin = [
    { href: '/catalogo/', icon: 'list', label: 'Catálogo' },
    { href: '/usuarios/', icon: 'users', label: 'Usuarios' },
    { href: '/auditoria/', icon: 'shield', label: 'Auditoría' },
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
    if (path === '/') return rutaActual === '/';
    return rutaActual.startsWith(path);
  }
</script>

{#if !layoutReady}
  <div class="fixed inset-0 flex flex-col items-center justify-center gap-4" style="background: var(--soha-bg);">
    <div class="w-12 h-12 border-4 rounded-full animate-spin" style="border-color: var(--soha-border); border-top-color: var(--soha-accent);"></div>
    <p class="font-medium animate-pulse" style="color: var(--soha-muted);">Iniciando SOHA...</p>
  </div>
{:else}
  <div class="layout-root">
    <!-- Sidebar -->
    <aside class="sb-root" class:sb-expanded={isExpanded} class:sb-collapsed={!isExpanded}>
      <!-- Header -->
      <div class="sb-header">
        <a href="/" class="sb-logo-wrapper" style="display: flex; align-items: center; gap: 0; border-radius: 0.75rem; transition: color 0.3s; text-decoration: none;">
          <div class="sb-logo-box" class:sb-logo-box-centered={!isExpanded}>S</div>
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
        <div class="sb-nav-section-label" class:sb-hidden={!isExpanded}>
          {#if isExpanded}Operativo{/if}
        </div>
        {#each navOperativo as item}
          <a
            href={item.href}
            class="sb-link"
            class:sb-link-active={isRouteActive(item.href)}
          >
            <div class="sb-icon-box">
              <Icon name={item.icon} size={18} />
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
              <Icon name={item.icon} size={18} />
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
            <div class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style="background: var(--soha-accent); color: white;">AD</div>
            {#if isExpanded}
              <div class="sb-label-slide sb-label-visible">
                <div class="sb-profile-info">
                  <p class="sb-profile-name">Admin Demo</p>
                  <p class="sb-profile-role">administrador</p>
                </div>
              </div>
            {/if}
          </div>
          <div class="sb-profile-actions">
            <ThemeToggle />
            <button class="sb-action-btn sb-action-btn-expand" onclick={toggleExpand} title={isExpanded ? 'Contraer' : 'Expandir'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="layout-main-wrapper">
      <!-- Desktop status strip -->
      <div class="status-strip">
        <span class="status-indicator" style="color: var(--soha-muted);">
          <span class="status-dot" style="background: var(--lot-ok);"></span>
          Conectado
        </span>
        <span class="status-separator" style="color: var(--soha-border);">|</span>
        <span class="text-xs" style="color: var(--soha-muted);">Hospital Demo Central</span>
      </div>

      <!-- Content -->
      <main class="flex-1 overflow-y-auto w-full relative p-6 lg:p-8 page-enter">
        <!-- Demo Banner -->
        <div class="demo-banner mb-6">
          <span class="demo-banner-icon">&#x1f6a7;</span>
          <span><strong>Demo</strong> — Todos los datos son ficticios. No representa información real de pacientes o instituciones.</span>
        </div>

        {@render children()}
      </main>
    </div>
  </div>
{/if}

<style>
  .status-strip {
    display: none;
  }
  @media (min-width: 1024px) {
    .status-strip {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.5rem;
      padding: 0.5rem 1.5rem;
      border-bottom: 1px solid var(--soha-border);
      background: color-mix(in srgb, var(--soha-bg) 60%, transparent);
      flex-shrink: 0;
    }
  }

  .status-indicator {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.75rem;
  }

  .status-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
  }

  .status-separator {
    font-size: 0.75rem;
  }

  .sb-profile-actions {
    display: flex;
    align-items: center;
    gap: 0.125rem;
  }
  .sb-collapsed .sb-profile-actions {
    flex-direction: column;
    gap: 0.125rem;
  }

  .sb-logo-box-centered {
    margin: 0 auto;
  }
</style>
