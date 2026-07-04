import type { Block } from '$lib/domain/entities';

export const blocks: Block[] = [
  { id: 'b001', nombre: 'Estante A - Analgésicos', ubicacion: 'Farmacia Central - Nivel 1', tipo: 'Estante' },
  { id: 'b002', nombre: 'Estante B - Antibióticos', ubicacion: 'Farmacia Central - Nivel 1', tipo: 'Estante' },
  { id: 'b003', nombre: 'Estante C - Cardiovasculares', ubicacion: 'Farmacia Central - Nivel 2', tipo: 'Estante' },
  { id: 'b004', nombre: 'Estante D - Controlados', ubicacion: 'Farmacia Central - Nivel 2', tipo: 'Estante' },
  { id: 'b005', nombre: 'Refrigerador - Biológicos', ubicacion: 'Farmacia Central - Sala Fría', tipo: 'Refrigerador' }
];
