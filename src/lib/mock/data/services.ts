import type { MedicalService } from '$lib/domain/entities';

export const services: MedicalService[] = [
  { id: 's001', nombre: 'Emergencia' },
  { id: 's002', nombre: 'Consulta Externa' },
  { id: 's003', nombre: 'Hospitalización' },
  { id: 's004', nombre: 'Quirófano' },
  { id: 's005', nombre: 'UCI' },
  { id: 's006', nombre: 'Pediatría' },
  { id: 's007', nombre: 'Maternidad' },
  { id: 's008', nombre: 'Laboratorio' }
];
