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

<div class="search-wrapper">
  <div class="search-icon">
    <Icon name="search" size={16} />
  </div>
  <input
    type="text"
    {placeholder}
    value={value}
    oninput={handleInput}
    class="search-input"
  />
</div>

<style>
  .search-wrapper {
    position: relative;
    flex: 1;
    min-width: 200px;
  }

  .search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--soha-muted);
    pointer-events: none;
    z-index: 1;
  }

  .search-input {
    width: 100%;
    min-height: 44px;
    padding: 0.5rem 0.75rem 0.5rem 2.5rem;
    border: 1px solid var(--soha-border);
    border-radius: 0.5rem;
    font-size: 0.875rem;
    background: var(--soha-input-bg);
    color: var(--soha-text);
    transition: border-color 0.15s, box-shadow 0.15s;
    outline: none;
  }
  .search-input::placeholder {
    color: var(--soha-muted);
  }
  .search-input:focus {
    border-color: var(--soha-accent);
    box-shadow: 0 0 0 2px var(--soha-accent-soft);
  }
</style>
