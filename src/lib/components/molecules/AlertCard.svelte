<script lang="ts">
  import Icon from '../atoms/Icon.svelte';

  let { type = 'warning', message = '', class: className = '' }: {
    type?: 'warning' | 'urgent';
    message?: string;
    class?: string;
  } = $props();

  const config = {
    warning: { icon: 'alert-triangle', bg: 'var(--lot-warning)', bgSoft: 'color-mix(in srgb, var(--lot-warning) 8%, transparent)', borderSoft: 'color-mix(in srgb, var(--lot-warning) 30%, transparent)' },
    urgent: { icon: 'alert-circle', bg: 'var(--lot-urgent)', bgSoft: 'color-mix(in srgb, var(--lot-urgent) 8%, transparent)', borderSoft: 'color-mix(in srgb, var(--lot-urgent) 30%, transparent)' },
  };

  const c = $derived(config[type]);
</script>

<div
  class={className}
  style="display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid; font-size: 0.875rem; background: {c.bgSoft}; border-color: {c.borderSoft}; color: {c.bg};"
>
  <Icon name={c.icon} size={18} style="flex-shrink: 0; margin-top: 1px;" />
  <span>{message}</span>
</div>
