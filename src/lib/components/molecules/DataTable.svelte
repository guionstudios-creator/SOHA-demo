<script lang="ts">
  import type { ComponentType, SvelteComponent } from 'svelte';

  interface Column {
    key: string;
    label: string;
    render?: (row: any) => any;
    class?: string;
  }

  let { columns = [] as Column[], rows = [] as any[], onRowClick = (_row: any) => {}, class: className = '' }: {
    columns?: Column[];
    rows?: any[];
    onRowClick?: (row: any) => void;
    class?: string;
  } = $props();
</script>

<div
  style="width: 100%; overflow-x: auto; border-radius: 0.75rem; border: 1px solid var(--soha-border);"
  class={className}
>
  <table style="width: 100%; font-size: 0.875rem; text-align: left; border-collapse: collapse;">
    <thead>
      <tr style="background: var(--soha-surface); color: var(--soha-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">
        {#each columns as col}
          <th style="padding: 0.75rem 1rem; font-weight: 500; white-space: nowrap;" class={col.class}>{col.label}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row, i}
        <tr
          style="border-top: 1px solid var(--soha-border); transition: background 0.15s; cursor: pointer;"
          onclick={() => onRowClick(row)}
          onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--soha-hover)'; }}
          onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = ''; }}
        >
          {#each columns as col}
            <td style="padding: 0.75rem 1rem; color: var(--soha-text); vertical-align: middle;">
              {#if col.render}
                {@const rendered = col.render(row)}
                {#if rendered}
                  {@render rendered()}
                {/if}
              {:else}
                {row[col.key] ?? ''}
              {/if}
            </td>
          {/each}
        </tr>
        {#if i < rows.length - 1}
          <tr style="border-top: 1px solid var(--soha-border);"><td colspan={columns.length} style="padding: 0;"></td></tr>
        {/if}
      {/each}
    </tbody>
  </table>
</div>
