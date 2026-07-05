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

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class={className}
  style="background: var(--soha-card); border: 1px solid var(--soha-border); border-radius: 0.75rem; padding: 1rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: box-shadow 0.2s ease;"
  onmouseenter={(e) => (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
  onmouseleave={(e) => (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
>
  <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
    <div style="width: 2.5rem; height: 2.5rem; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; background: {softColor};">
      <Icon name={icon} size={18} color={color} />
    </div>
    <span style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--soha-muted);">{label}</span>
  </div>
  <div style="font-size: 1.875rem; font-weight: 700; line-height: 1; color: {color};">{value}</div>
</div>
