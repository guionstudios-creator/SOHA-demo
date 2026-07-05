<script lang="ts">
  import Icon from '../atoms/Icon.svelte';

  let { icon = 'box', title = '', description = '', features = [] as string[] }: {
    icon?: string;
    title?: string;
    description?: string;
    features?: string[];
  } = $props();
</script>

<div
  style="background: var(--soha-card); border: 1px solid var(--soha-border); border-radius: 0.75rem; padding: 4rem 1.5rem; text-align: center;"
>
  <div
    style="width: 4rem; height: 4rem; margin: 0 auto 1rem; border-radius: 1rem; display: flex; align-items: center; justify-content: center; background: var(--soha-accent-soft);"
  >
    <Icon name={icon} size={32} color="var(--soha-accent)" />
  </div>
  <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--soha-text);">{title}</h2>
  {#if description}
    <p style="font-size: 0.875rem; max-width: 28rem; margin: 0 auto; line-height: 1.6; color: var(--soha-muted);">{description}</p>
  {/if}
  {#if features.length > 0}
    <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; margin-top: 1.5rem; font-size: 0.875rem;">
      {#each features as feature}
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="width: 0.5rem; height: 0.5rem; border-radius: 50%; background: var(--lot-ok); flex-shrink: 0;"></span>
          <span style="color: var(--soha-text);">{feature}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>
