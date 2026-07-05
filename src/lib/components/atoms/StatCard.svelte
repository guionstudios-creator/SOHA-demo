<script lang="ts">
  import Icon from './Icon.svelte';

  let { icon = 'box', label = '', value = '', color = 'var(--soha-accent)', class: className = '' }: {
    icon?: string;
    label?: string;
    value?: string | number;
    color?: string;
    class?: string;
  } = $props();

  const softColor = $derived(`color-mix(in srgb, ${color} 15%, transparent)`);
</script>

<div
  class="stat-card {className}"
  style="--stat-color: {color}; --stat-soft: {softColor};"
>
  <div class="stat-card-header">
    <div class="stat-card-icon" style="background: var(--stat-soft);">
      <Icon name={icon} size={18} color={color} />
    </div>
    <span class="stat-card-label">{label}</span>
  </div>
  <div class="stat-card-value" style="color: {color};">{value}</div>
</div>

<style>
  .stat-card {
    background: var(--soha-card);
    border: 1px solid var(--soha-border);
    border-radius: 0.875rem;
    padding: 1rem;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    transition: box-shadow 0.25s ease, transform 0.25s ease;
    position: relative;
    overflow: hidden;
    cursor: default;
  }
  .stat-card::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--stat-color) 20%, transparent);
  }
  .stat-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px -8px rgba(0,0,0,0.15), 0 0 0 1px color-mix(in srgb, var(--stat-color) 15%, transparent);
  }
  .stat-card:active {
    transform: translateY(-1px);
  }
  .stat-card:hover::after {
    opacity: 1;
  }

  .stat-card-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .stat-card-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.625rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .stat-card-label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--soha-muted);
  }

  .stat-card-value {
    font-size: 1.875rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.02em;
  }
</style>
