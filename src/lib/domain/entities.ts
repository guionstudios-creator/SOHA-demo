export interface Medication {
  id: string;
  nombreComercial: string;
  principioActivo: string;
  presentacion: string;
  concentracion: string;
  unidadBase: string;
  stockMinimo: number;
  laboratorio: string;
  categoria: string;
  activo: boolean;
}

export interface Lot {
  id: string;
  itemId: string;
  numeroLote: string;
  cantidadOriginal: number;
  cantidadActual: number;
  fechaIngreso: string;
  fechaVencimiento: string;
  blockId: string;
  estado: 'activo' | 'vencido' | 'danado';
  catalogoId: string;
}

export interface Dispatch {
  id: string;
  fecha: string;
  servicio: string;
  usuario: string;
  items: { lotId: string; cantidad: number; nombreMedicamento: string }[];
  estado: 'completada' | 'pendiente' | 'cancelada';
  codigoTrazabilidad: string;
}

export interface Movement {
  id: string;
  tipo: 'entrada' | 'salida' | 'transferencia' | 'ajuste' | 'donacion';
  userId: string;
  servicio: string | null;
  lotId: string;
  cantidad: number;
  fechaHora: string;
  turno: 'manana' | 'tarde' | 'noche';
  motivo: string;
}

export interface AuditEntry {
  id: string;
  tabla: string;
  operacion: string;
  registroId: string;
  userId: string;
  username: string;
  userRole: string;
  contexto: string;
  fechaHora: string;
  hash: string;
}

export interface Block {
  id: string;
  nombre: string;
  ubicacion: string;
  tipo: string;
}

export interface MedicalService {
  id: string;
  nombre: string;
}

export interface User {
  id: string;
  nombre: string;
  rol: 'administrador' | 'asistente' | 'cuenta_administrativa';
  username: string;
  activo: boolean;
}
