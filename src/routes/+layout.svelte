<script lang="ts">
  import '../app.css';
  import { setContext, onMount } from 'svelte';
  import { writable } from 'svelte/store';

  let { children } = $props();
  let currentTheme = $state('night');
  let sidebarCollapsed = $state(false);

  onMount(() => {
    document.documentElement.className = `theme-${currentTheme} ${currentTheme.includes('dark') || currentTheme === 'night' ? 'dark' : ''}`;
  });

  function setTheme(theme: string) {
    currentTheme = theme;
    document.documentElement.className = `theme-${theme} ${theme.includes('dark') || theme === 'night' ? 'dark' : ''}`;
  }
</script>

<div class="min-h-screen flex">
  <!-- Sidebar -->
  <aside class="w-64 bg-soha-sidebar border-r border-soha-border flex flex-col transition-all duration-300 {sidebarCollapsed ? 'w-16' : 'w-64'}">
    <!-- Logo -->
    <div class="p-4 border-b border-soha-border">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-soha-accent rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-sm">S</span>
        </div>
        {#if !sidebarCollapsed}
          <span class="font-semibold text-soha-text">SOHA</span>
        {/if}
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-2 space-y-1">
      <a href="/" class="flex items-center gap-3 px-3 py-2 rounded-lg text-soha-muted hover:bg-soha-hover hover:text-soha-text transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
        {#if !sidebarCollapsed}
          <span>Dashboard</span>
        {/if}
      </a>

      <a href="/inventario" class="flex items-center gap-3 px-3 py-2 rounded-lg text-soha-muted hover:bg-soha-hover hover:text-soha-text transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
        </svg>
        {#if !sidebarCollapsed}
          <span>Inventario</span>
        {/if}
      </a>

      <a href="/despachos" class="flex items-center gap-3 px-3 py-2 rounded-lg text-soha-muted hover:bg-soha-hover hover:text-soha-text transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
        </svg>
        {#if !sidebarCollapsed}
          <span>Despachos</span>
        {/if}
      </a>

      <a href="/auditoria" class="flex items-center gap-3 px-3 py-2 rounded-lg text-soha-muted hover:bg-soha-hover hover:text-soha-text transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        {#if !sidebarCollapsed}
          <span>Auditoría</span>
        {/if}
      </a>

      <a href="/catalogo" class="flex items-center gap-3 px-3 py-2 rounded-lg text-soha-muted hover:bg-soha-hover hover:text-soha-text transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
        </svg>
        {#if !sidebarCollapsed}
          <span>Catálogo</span>
        {/if}
      </a>
    </nav>

    <!-- Theme Switcher -->
    <div class="p-4 border-t border-soha-border">
      <div class="flex gap-2">
        <button
          onclick={() => setTheme('night')}
          class="w-6 h-6 rounded-full bg-[#0f1117] border-2 {currentTheme === 'night' ? 'border-soha-accent' : 'border-soha-border'}"
          title="Night"
        ></button>
        <button
          onclick={() => setTheme('soft-light')}
          class="w-6 h-6 rounded-full bg-[#f0f4f0] border-2 {currentTheme === 'soft-light' ? 'border-soha-accent' : 'border-soha-border'}"
          title="Soft Light"
        ></button>
        <button
          onclick={() => setTheme('high-contrast-dark')}
          class="w-6 h-6 rounded-full bg-[#000000] border-2 {currentTheme === 'high-contrast-dark' ? 'border-soha-accent' : 'border-soha-border'}"
          title="High Contrast Dark"
        ></button>
        <button
          onclick={() => setTheme('sepia')}
          class="w-6 h-6 rounded-full bg-[#f5f0e8] border-2 {currentTheme === 'sepia' ? 'border-soha-accent' : 'border-soha-border'}"
          title="Sepia"
        ></button>
      </div>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="flex-1 min-w-0">
    <!-- Demo Banner -->
    <div class="bg-amber-500/20 border-b border-amber-500/30 px-4 py-2 text-center text-sm font-mono text-amber-400">
      ⚠️ DEMO — Todos los datos son ficticios. No representa información real de pacientes o instituciones.
    </div>

    <div class="p-6">
      {@render children()}
    </div>
  </main>
</div>
