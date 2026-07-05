<script lang="ts">
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

<div class="table-container {className}">
  <table class="table">
    <thead>
      <tr>
        {#each columns as col}
          <th class={col.class}>{col.label}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row, i}
        <tr
          class="table-row"
          onclick={() => onRowClick(row)}
        >
          {#each columns as col}
            <td>
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
      {/each}
    </tbody>
  </table>
</div>

<style>
  .table-row {
    border-top: 1px solid var(--soha-border);
    transition: background 0.15s ease;
    cursor: pointer;
  }
  .table-row:hover {
    background: var(--soha-hover);
  }
  .table-row td {
    padding: 0.75rem 1rem;
    color: var(--soha-text);
    vertical-align: middle;
  }
</style>
