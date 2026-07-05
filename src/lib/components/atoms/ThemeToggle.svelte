<script lang="ts">
  import Icon from './Icon.svelte';

  let expanded = $state(false);

  const themes = [
    { id: 'night', label: 'Nocturno', icon: 'moon', color: '#0f172a' },
    { id: 'midday', label: 'Mediodía', icon: 'sun', color: '#ffffff' },
    { id: 'afternoon', label: 'Tarde', icon: 'sunset', color: '#f5f0e8' },
    { id: 'morning', label: 'Mañana', icon: 'sunrise', color: '#f1f4f1' },
    { id: 'soft-light', label: 'Luz Suave', icon: 'lightbulb', color: '#f1f4f1' },
    { id: 'sepia', label: 'Sepia', icon: 'book-open', color: '#f4ecd8' },
    { id: 'high-contrast-dark', label: 'Alto Contraste', icon: 'eye', color: '#000000' },
  ];

  let currentTheme = $state('night');
  let isDark = $derived(currentTheme === 'night' || currentTheme === 'high-contrast-dark');

  function applyTheme(themeId: string) {
    const html = document.documentElement;
    themes.forEach(t => html.classList.remove(t.id, `theme-${t.id}`));
    if (themeId === 'night') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
      html.classList.add(`theme-${themeId}`);
    }
    currentTheme = themeId;
    try { localStorage.setItem('soha_theme', themeId); } catch {}
    expanded = false;
  }

  /** Quick toggle between light (midday) and dark (night) */
  function quickToggle() {
    const target = isDark ? 'midday' : 'night';
    applyTheme(target);
  }

  function toggleExpanded() {
    expanded = !expanded;
  }

  function getThemeIcon(themeId: string): string {
    const map: Record<string, string> = {
      'night': 'moon', 'midday': 'sun', 'afternoon': 'sunset',
      'morning': 'sunrise', 'soft-light': 'lightbulb', 'sepia': 'book-open',
      'high-contrast-dark': 'eye'
    };
    return map[themeId] || 'circle';
  }
</script>

<div class="theme-toggle-wrapper">
  <!-- Main toggle button: click toggles light/dark immediately -->
  <button
    onclick={quickToggle}
    class="theme-toggle-btn"
    title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
  >
    {#if isDark}
      <Icon name="sun" size={16} />
    {:else}
      <Icon name="moon" size={16} />
    {/if}
  </button>

  <!-- Dropdown arrow for all 7 themes -->
  <button
    onclick={toggleExpanded}
    class="theme-toggle-more"
    title="Todos los temas"
  >
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  </button>

  {#if expanded}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div role="presentation" class="theme-backdrop" onclick={() => expanded = false}></div>
    <div class="theme-dropdown">
      <div class="theme-dropdown-header">Tema visual</div>
      {#each themes as theme}
        <button
          onclick={() => applyTheme(theme.id)}
          class="theme-option"
          class:theme-option-active={currentTheme === theme.id}
        >
          <span class="theme-swatch" style="background: {theme.color};"></span>
          <Icon name={getThemeIcon(theme.id)} size={14} color="var(--soha-muted)" />
          <span>{theme.label}</span>
          {#if currentTheme === theme.id}
            <span class="theme-check">✓</span>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .theme-toggle-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .theme-toggle-btn {
    width: 32px; height: 32px; border-radius: 0.5rem 0 0 0.5rem;
    display: flex; align-items: center; justify-content: center;
    color: var(--soha-muted); border: none; background: none;
    cursor: pointer; transition: all 0.2s;
  }
  .theme-toggle-btn:hover {
    color: var(--soha-accent);
    background: var(--soha-hover);
  }

  .theme-toggle-more {
    width: 16px; height: 32px; border-radius: 0 0.5rem 0.5rem 0;
    display: flex; align-items: center; justify-content: center;
    color: var(--soha-muted); border: none; background: none;
    cursor: pointer; transition: all 0.2s;
    padding: 0 2px;
  }
  .theme-toggle-more:hover {
    color: var(--soha-accent);
    background: var(--soha-hover);
  }

  .theme-backdrop {
    position: fixed; inset: 0; z-index: 9999;
  }

  .theme-dropdown {
    position: absolute; bottom: calc(100% + 8px); right: 0;
    z-index: 10000; background: var(--soha-card);
    border: 1px solid var(--soha-border);
    border-radius: 0.75rem; padding: 0.5rem;
    min-width: 200px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  }

  .theme-dropdown-header {
    font-size: 0.65rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.1em; color: var(--soha-muted);
    padding: 0.25rem 0.5rem 0.5rem;
    border-bottom: 1px solid var(--soha-border);
    margin-bottom: 0.25rem;
  }

  .theme-option {
    display: flex; align-items: center; gap: 0.5rem;
    width: 100%; padding: 0.5rem; border-radius: 0.5rem;
    border: none; background: transparent;
    color: var(--soha-text); cursor: pointer;
    font-size: 0.8125rem; font-weight: 400;
    transition: background 0.15s; text-align: left;
  }
  .theme-option:hover {
    background: var(--soha-hover);
  }
  .theme-option-active {
    background: var(--soha-accent-soft) !important;
    font-weight: 600;
  }

  .theme-swatch {
    width: 16px; height: 16px; border-radius: 50%;
    border: 2px solid var(--soha-border); flex-shrink: 0;
  }

  .theme-check {
    margin-left: auto; color: var(--soha-accent);
  }
</style>
