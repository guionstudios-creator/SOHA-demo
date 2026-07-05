<script lang="ts">
  import Icon from '../atoms/Icon.svelte';

  let { placeholder = 'Buscar...', value = $bindable(''), onSearch = () => {} }: {
    placeholder?: string;
    value?: string;
    onSearch?: (val: string) => void;
  } = $props();

  let debounceTimer: ReturnType<typeof setTimeout>;

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    value = target.value;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => onSearch(value), 300);
  }
</script>

<div style="position: relative; flex: 1; min-width: 200px;">
  <div style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--soha-muted); pointer-events: none;">
    <Icon name="search" size={16} />
  </div>
  <input
    type="text"
    {placeholder}
    value={value}
    oninput={handleInput}
    style="width: 100%; min-height: 44px; padding: 0.5rem 0.75rem 0.5rem 2.5rem; border: 1px solid var(--soha-border); border-radius: 0.5rem; font-size: 0.875rem; background: var(--soha-input-bg); color: var(--soha-text); transition: border-color 0.15s, box-shadow 0.15s; outline: none;"
    onfocus={(e) => { e.currentTarget.style.borderColor = 'var(--soha-accent)'; e.currentTarget.style.boxShadow = '0 0 0 2px var(--soha-accent-soft)'; }}
    onblur={(e) => { e.currentTarget.style.borderColor = 'var(--soha-border)'; e.currentTarget.style.boxShadow = 'none'; }}
  />
</div>
