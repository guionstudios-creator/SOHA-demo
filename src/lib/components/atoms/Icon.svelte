<script lang="ts">
  import {
    Activity, AlertCircle, Archive, ArrowLeft, ArrowRight, BarChart3,
    Box, Calendar, CheckCircle, ChevronDown, ChevronLeft, ChevronRight,
    CircleUser, Clock, Download, Edit, Eye, FileText, Filter, History,
    Home, Info, LayoutDashboard, List, LogOut, Menu, Package, PackagePlus,
    Plus, RefreshCw, Search, Settings, Shield, ShoppingCart, SlidersHorizontal,
    Trash2, Truck, Upload, Users, Warehouse, X, AlertTriangle, FileBarChart,
    Undo2, Pill, Stethoscope, UserCheck, UserCog, type IconNode
  } from 'lucide-svelte';
  import type { ComponentType } from 'svelte';

  const iconMap: Record<string, ComponentType> = {
    'activity': Activity, 'alert-circle': AlertCircle, 'alert-triangle': AlertTriangle,
    'archive': Archive, 'arrow-left': ArrowLeft, 'arrow-right': ArrowRight,
    'bar-chart': BarChart3, 'box': Box, 'calendar': Calendar,
    'check-circle': CheckCircle, 'chevron-down': ChevronDown,
    'chevron-left': ChevronLeft, 'chevron-right': ChevronRight,
    'circle-user': CircleUser, 'clock': Clock, 'download': Download,
    'edit': Edit, 'eye': Eye, 'file-text': FileText, 'file-bar-chart': FileBarChart,
    'filter': Filter, 'history': History, 'home': Home, 'info': Info,
    'layout-dashboard': LayoutDashboard, 'list': List, 'log-out': LogOut,
    'menu': Menu, 'package': Package, 'package-plus': PackagePlus,
    'plus': Plus, 'refresh-cw': RefreshCw, 'search': Search,
    'settings': Settings, 'shield': Shield, 'shopping-cart': ShoppingCart,
    'sliders-horizontal': SlidersHorizontal, 'trash-2': Trash2, 'truck': Truck,
    'upload': Upload, 'users': Users, 'warehouse': Warehouse, 'x': X,
    'undo-2': Undo2, 'pill': Pill, 'stethoscope': Stethoscope,
    'user-check': UserCheck, 'user-cog': UserCog,
  };

  let { name = 'box', size = 20, class: className = '', color, style = '', ...rest }: {
    name?: string;
    size?: number;
    class?: string;
    color?: string;
    style?: string;
  } = $props();

  const IconComponent = $derived(iconMap[name.toLowerCase()]);
</script>

{#if IconComponent}
  <IconComponent {size} class={className} color={color || 'currentColor'} style={style} {...rest} />
{:else}
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={className} style={style}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
{/if}
