import type { User } from '$lib/domain/entities';

export const users: User[] = [
  { id: 'u001', nombre: 'Admin Demo', rol: 'administrador', username: 'admin_demo', activo: true },
  { id: 'u002', nombre: 'Farmacia 01', rol: 'asistente', username: 'farmacia01', activo: true },
  { id: 'u003', nombre: 'Farmacia 02', rol: 'asistente', username: 'farmacia02', activo: true },
  { id: 'u004', nombre: 'Enfermería 01', rol: 'asistente', username: 'enfermeria01', activo: true },
  { id: 'u005', nombre: 'Cuenta Admin', rol: 'cuenta_administrativa', username: 'admin', activo: true }
];
