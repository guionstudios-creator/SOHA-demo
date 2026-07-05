<script lang="ts">
  let { type = 'ok', label = '', class: className = '' }: {
    type?: 'ok' | 'warning' | 'urgent' | 'expired' | 'info';
    label?: string;
    class?: string;
  } = $props();

  const colors = {
    ok: { bg: 'var(--lot-ok)', text: 'var(--lot-ok)' },
    warning: { bg: 'var(--lot-warning)', text: 'var(--lot-warning)' },
    urgent: { bg: 'var(--lot-urgent)', text: 'var(--lot-urgent)' },
    expired: { bg: 'var(--soha-badge-bg)', text: 'var(--soha-badge-text)' },
    info: { bg: 'var(--soha-accent)', text: 'var(--soha-accent)' },
  };

  const c = $derived(colors[type]);
</script>

<span
  class={className}
  style="display: inline-flex; align-items: center; gap: 0.25rem; padding: 0.125rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500; background: color-mix(in srgb, {c.bg} 15%, transparent); color: {c.text};"
>
  {#if type !== 'expired' && type !== 'info'}
    <span style="width: 6px; height: 6px; border-radius: 50%; background: {c.bg}; flex-shrink: 0;"></span>
  {/if}
  {label}
</span>
