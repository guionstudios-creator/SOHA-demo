<script lang="ts">
  let { variant = 'card', count = 1, height = '' }: {
    variant?: 'card' | 'row' | 'text' | 'avatar';
    count?: number;
    height?: string;
  } = $props();

  const heights: Record<string, string> = {
    card: '6rem',
    row: '3rem',
    text: '1rem',
    avatar: '2.5rem',
  };

  const h = $derived(height || heights[variant] || '4rem');
</script>

{#each Array(count) as _}
  <div
    style="background: var(--soha-card); border: 1px solid var(--soha-border); border-radius: 0.75rem; padding: 1rem; {variant === 'avatar' ? 'width: ' + h + '; height: ' + h + '; border-radius: 50%; padding: 0;' : ''}"
    class="shimmer-container"
  >
    {#if variant === 'card'}
      <div style="display: flex; gap: 0.75rem; align-items: center; margin-bottom: 1rem;">
        <div style="width: 2.5rem; height: 2.5rem; border-radius: 0.5rem; background: var(--soha-border); flex-shrink: 0;"></div>
        <div style="flex: 1; height: 0.75rem; border-radius: 0.25rem; background: var(--soha-border);"></div>
      </div>
      <div style="width: 60%; height: 1.5rem; border-radius: 0.25rem; background: var(--soha-border);"></div>
    {:else if variant === 'row'}
      <div style="display: flex; gap: 1rem; align-items: center;">
        <div style="flex: 2; height: 0.75rem; border-radius: 0.25rem; background: var(--soha-border);"></div>
        <div style="flex: 1; height: 0.75rem; border-radius: 0.25rem; background: var(--soha-border);"></div>
        <div style="flex: 1; height: 0.75rem; border-radius: 0.25rem; background: var(--soha-border);"></div>
        <div style="width: 4rem; height: 1.5rem; border-radius: 0.25rem; background: var(--soha-border);"></div>
      </div>
    {:else}
      <div style="width: 100%; height: {h}; border-radius: 0.25rem; background: var(--soha-border);"></div>
    {/if}
  </div>
{/each}
