<script lang="ts">
  import '../app.css';
  import Sidebar from '$lib/components/organisms/Sidebar.svelte';

  let { children } = $props();
</script>

<Sidebar>
  {@render children()}
</Sidebar>
