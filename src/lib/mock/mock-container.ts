import { medications } from './data/medications';
import { lots } from './data/lots';
import { dispatches } from './data/dispatches';
import { movements } from './data/movements';
import { auditEntries } from './data/audit';
import { blocks } from './data/blocks';
import { services } from './data/services';
import { users } from './data/users';

function daysUntilExpiry(fechaVencimiento: string): number {
  const now = new Date();
  const expiry = new Date(fechaVencimiento);
  const diff = expiry.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getLotStatus(lot: { fechaVencimiento: string; estado: string }): string {
  if (lot.estado === 'vencido') return 'expired';
  const days = daysUntilExpiry(lot.fechaVencimiento);
  if (days <= 0) return 'expired';
  if (days <= 30) return 'urgent';
  if (days <= 90) return 'warning';
  return 'ok';
}

export function createMockContainer() {
  return {
    inventoryService: {
      async findAll(filters?: { bloque?: string; search?: string }) {
        let items = [...medications];
        if (filters?.search) {
          const s = filters.search.toLowerCase();
          items = items.filter(m =>
            m.nombreComercial.toLowerCase().includes(s) ||
            m.principioActivo.toLowerCase().includes(s) ||
            m.categoria.toLowerCase().includes(s)
          );
        }
        return items.map(med => ({
          ...med,
          stockActual: lots
            .filter(l => l.itemId === med.id && l.estado === 'activo')
            .reduce((sum, l) => sum + l.cantidadActual, 0),
          lotesDetalle: lots
            .filter(l => l.itemId === med.id)
            .map(l => ({ ...l, status: getLotStatus(l) }))
            .sort((a, b) => new Date(a.fechaVencimiento).getTime() - new Date(b.fechaVencimiento).getTime())
        }));
      },

      async findAllFEFO(itemId: string) {
        return lots
          .filter(l => l.itemId === itemId && l.estado === 'activo')
          .map(l => ({ ...l, status: getLotStatus(l) }))
          .sort((a, b) => new Date(a.fechaVencimiento).getTime() - new Date(b.fechaVencimiento).getTime());
      },

      async getStockByBlock(blockId: string) {
        return lots
          .filter(l => l.blockId === blockId && l.estado === 'activo')
          .reduce((sum, l) => sum + l.cantidadActual, 0);
      },

      async getLowStock() {
        return medications.filter(med => {
          const stock = lots
            .filter(l => l.itemId === med.id && l.estado === 'activo')
            .reduce((sum, l) => sum + l.cantidadActual, 0);
          return stock < med.stockMinimo;
        }).map(med => ({
          ...med,
          stockActual: lots
            .filter(l => l.itemId === med.id && l.estado === 'activo')
            .reduce((sum, l) => sum + l.cantidadActual, 0)
        }));
      },

      async getExpiringLots(days: number) {
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() + days);
        return lots.filter(l =>
          l.estado === 'activo' &&
          new Date(l.fechaVencimiento) <= cutoff
        ).map(l => ({
          ...l,
          status: getLotStatus(l),
          medication: medications.find(m => m.id === l.itemId)
        }));
      }
    },

    dispatchService: {
      async findAll(filters?: { fecha?: string; servicio?: string }) {
        let items = [...dispatches];
        if (filters?.fecha) {
          items = items.filter(d => d.fecha === filters.fecha);
        }
        if (filters?.servicio) {
          items = items.filter(d => d.servicio === filters.servicio);
        }
        return items.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      },

      async getDispatchStats() {
        const today = new Date().toISOString().split('T')[0];
        return {
          totalDespachos: dispatches.length,
          despachosHoy: dispatches.filter(d => d.fecha === today).length,
          despachosCompletados: dispatches.filter(d => d.estado === 'completada').length,
          serviciosActivos: [...new Set(dispatches.map(d => d.servicio))].length
        };
      }
    },

    catalogService: {
      async findAllBlocks() { return blocks; },
      async findAllServices() { return services; },
      async findAllMedications() { return medications; }
    },

    auditService: {
      async findAll(filters?: { user?: string; operation?: string }) {
        let entries = [...auditEntries];
        if (filters?.user) entries = entries.filter(e => e.username === filters.user);
        if (filters?.operation) entries = entries.filter(e => e.operacion === filters.operation);
        return entries.sort((a, b) => new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime());
      }
    },

    dashboardAnalyticsService: {
      async getDashboardData() {
        const activeLots = lots.filter(l => l.estado === 'activo');
        const expiredLots = lots.filter(l => l.estado === 'vencido');
        const urgentLots = activeLots.filter(l => daysUntilExpiry(l.fechaVencimiento) <= 30);
        const warningLots = activeLots.filter(l => {
          const days = daysUntilExpiry(l.fechaVencimiento);
          return days > 30 && days <= 90;
        });

        const today = new Date().toISOString().split('T')[0];
        const despachosHoy = dispatches.filter(d => d.fecha === today);

        // Generate chart data for last 30 days
        const chartData = [];
        for (let i = 29; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const dateStr = d.toISOString().split('T')[0];
          const dayMovements = movements.filter(m => m.fechaHora.startsWith(dateStr));
          chartData.push({
            date: dateStr,
            entradas: dayMovements.filter(m => m.tipo === 'entrada').length,
            salidas: dayMovements.filter(m => m.tipo === 'salida').length,
            total: dayMovements.length
          });
        }

        // Service distribution for donut chart
        const serviceDist = dispatches.reduce((acc, d) => {
          acc[d.servicio] = (acc[d.servicio] || 0) + d.items.reduce((sum, item) => sum + item.cantidad, 0);
          return acc;
        }, {} as Record<string, number>);

        return {
          totalUnidades: activeLots.reduce((s, l) => s + l.cantidadActual, 0),
          totalMedicamentos: medications.length,
          totalBloques: blocks.length,
          totalLotes: lots.length,
          lotesActivos: activeLots.length,
          lotesVencidos: expiredLots.length,
          lotesUrgentes: urgentLots.length,
          lotesAdvertencia: warningLots.length,
          lotesOk: activeLots.filter(l => daysUntilExpiry(l.fechaVencimiento) > 90).length,
          despachosHoy: despachosHoy.length,
          despachosTotales: dispatches.length,
          movimientosTotales: movements.length,
          lowStockCount: medications.filter(med => {
            const stock = lots
              .filter(l => l.itemId === med.id && l.estado === 'activo')
              .reduce((sum, l) => sum + l.cantidadActual, 0);
            return stock < med.stockMinimo;
          }).length,
          chartData,
          serviceDistribution: serviceDist,
          recentAlerts: [
            ...urgentLots.slice(0, 3).map(l => ({
              type: 'urgent' as const,
              message: `${medications.find(m => m.id === l.itemId)?.nombreComercial} - Lote ${l.numeroLote} vence en ${daysUntilExpiry(l.fechaVencimiento)} días`
            })),
            ...medications.filter(med => {
              const stock = lots
                .filter(l => l.itemId === med.id && l.estado === 'activo')
                .reduce((sum, l) => sum + l.cantidadActual, 0);
              return stock < med.stockMinimo;
            }).slice(0, 2).map(med => ({
              type: 'warning' as const,
              message: `${med.nombreComercial} - Stock bajo (${lots.filter(l => l.itemId === med.id && l.estado === 'activo').reduce((sum, l) => sum + l.cantidadActual, 0)} unidades)`
            }))
          ]
        };
      }
    },

    settingsService: {
      getSettings: async () => ({
        nombreHospital: 'Hospital Demo Central',
        strictFEFO: true,
        tema: 'night',
        idioma: 'es'
      })
    },

    userService: {
      getCurrentUser: async () => ({
        id: 'u001',
        nombre: 'Admin Demo',
        rol: 'administrador' as const,
        username: 'admin_demo',
        activo: true
      }),
      findAll: async () => users
    }
  };
}

export type MockContainer = ReturnType<typeof createMockContainer>;
