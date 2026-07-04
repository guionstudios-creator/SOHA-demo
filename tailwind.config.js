/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        soha: {
          bg: 'var(--soha-bg)',
          text: 'var(--soha-text)',
          card: 'var(--soha-card)',
          border: 'var(--soha-border)',
          sidebar: 'var(--soha-sidebar)',
          'input-bg': 'var(--soha-input-bg)',
          hover: 'var(--soha-hover)',
          muted: 'var(--soha-muted)',
          surface: 'var(--soha-surface)',
          'badge-bg': 'var(--soha-badge-bg)',
          'badge-text': 'var(--soha-badge-text)',
          accent: 'var(--soha-accent)',
          'accent-light': 'var(--soha-accent-light)',
          'accent-dark': 'var(--soha-accent-dark)',
          'accent-soft': 'var(--soha-accent-soft)'
        },
        lot: {
          ok: '#22c55e',
          warning: '#f59e0b',
          urgent: '#ef4444',
          expired: '#6b7280'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Fira Code', 'monospace']
      }
    }
  },
  plugins: []
};
