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

  function applyTheme(themeId: string) {
    const html = document.documentElement;
    // Remove all theme classes
    themes.forEach(t => html.classList.remove(t.id, `theme-${t.id}`));
    // Add the selected theme class
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

  function toggleExpanded() {
    expanded = !expanded;
  }

  // Get icon for each theme
  function getThemeIcon(themeId: string): string {
    const map: Record<string, string> = {
      'night': 'moon',
      'midday': 'sun',
      'afternoon': 'sunset',
      'morning': 'sunrise',
      'soft-light': 'lightbulb',
      'sepia': 'book-open',
      'high-contrast-dark': 'eye'
    };
    return map[themeId] || 'circle';
  }
</script>

<div style="position: relative;">
  <button
    onclick={toggleExpanded}
    style="width: 32px; height: 32px; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: var(--soha-muted); border: none; background: none; cursor: pointer; transition: all 0.2s;"
    onmouseenter={(e) => { e.currentTarget.style.color = 'var(--soha-accent)'; e.currentTarget.style.background = 'var(--soha-hover)'; }}
    onmouseleave={(e) => { e.currentTarget.style.color = 'var(--soha-muted)'; e.currentTarget.style.background = 'transparent'; }}
    title="Cambiar tema"
  >
    <Icon name={getThemeIcon(currentTheme)} size={16} />
  </button>

  {#if expanded}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div role="presentation"
      style="position: fixed; inset: 0; z-index: 9999;"
      onclick={() => expanded = false}
    ></div>
    <div
      style="position: absolute; bottom: calc(100% + 8px); right: 0; z-index: 10000; background: var(--soha-card); border: 1px solid var(--soha-border); border-radius: 0.75rem; padding: 0.5rem; min-width: 200px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);"
    >
      <div style="font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--soha-muted); padding: 0.25rem 0.5rem 0.5rem; border-bottom: 1px solid var(--soha-border); margin-bottom: 0.25rem;">
        Tema visual
      </div>
      {#each themes as theme}
        <button
          onclick={() => applyTheme(theme.id)}
          style="display: flex; align-items: center; gap: 0.5rem; width: 100%; padding: 0.5rem; border-radius: 0.5rem; border: none; background: {currentTheme === theme.id ? 'var(--soha-accent-soft)' : 'transparent'}; color: var(--soha-text); cursor: pointer; font-size: 0.8125rem; font-weight: {currentTheme === theme.id ? '600' : '400'}; transition: background 0.15s; text-align: left;"
          onmouseenter={(e) => { if (currentTheme !== theme.id) e.currentTarget.style.background = 'var(--soha-hover)'; }}
          onmouseleave={(e) => { if (currentTheme !== theme.id) e.currentTarget.style.background = 'transparent'; }}
        >
          <span style="width: 16px; height: 16px; border-radius: 50%; border: 2px solid var(--soha-border); flex-shrink: 0; background: {theme.color};"></span>
          <Icon name={getThemeIcon(theme.id)} size={14} color="var(--soha-muted)" />
          <span>{theme.label}</span>
          {#if currentTheme === theme.id}
            <span style="margin-left: auto; color: var(--soha-accent);">✓</span>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>
