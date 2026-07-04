import type { AuditEntry } from '$lib/domain/entities';

function daysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  const h = Math.floor(Math.random() * 12) + 7;
  const m = Math.floor(Math.random() * 60);
  const s = Math.floor(Math.random() * 60);
  return `${d.toISOString().split('T')[0]} ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function randomHash(): string {
  return Math.random().toString(16).substring(2, 18);
}

const users = ['admin_demo', 'farmacia01', 'farmacia02', 'enfermeria01'];
const roles = ['administrador', 'asistente', 'asistente', 'asistente'];

export const auditEntries: AuditEntry[] = [
  { id: 'a001', tabla: 'log_auditoria', operacion: 'INSERT', registroId: 'mov-001', userId: 'u001', username: 'admin_demo', userRole: 'administrador', contexto: 'Creación de movimiento de salida', fechaHora: daysAgo(0), hash: randomHash() },
  { id: 'a002', tabla: 'log_auditoria', operacion: 'INSERT', registroId: 'mov-002', userId: 'u002', username: 'farmacia01', userRole: 'asistente', contexto: 'Registro de entrada de medicamento', fechaHora: daysAgo(0), hash: randomHash() },
  { id: 'a003', tabla: 'log_auditoria', operacion: 'UPDATE', registroId: 'lote-001', userId: 'u001', username: 'admin_demo', userRole: 'administrador', contexto: 'Actualización de cantidad en lote', fechaHora: daysAgo(0), hash: randomHash() },
  { id: 'a004', tabla: 'log_auditoria', operacion: 'LOGIN', registroId: 'sesion-001', userId: 'u001', username: 'admin_demo', userRole: 'administrador', contexto: 'Inicio de sesión exitoso', fechaHora: daysAgo(0), hash: randomHash() },
  { id: 'a005', tabla: 'log_auditoria', operacion: 'INSERT', registroId: 'desp-001', userId: 'u002', username: 'farmacia01', userRole: 'asistente', contexto: 'Confirmación de despacho UCI', fechaHora: daysAgo(0), hash: randomHash() },
  { id: 'a006', tabla: 'log_auditoria', operacion: 'UPDATE', registroId: 'item-001', userId: 'u001', username: 'admin_demo', userRole: 'administrador', contexto: 'Modificación de stock mínimo', fechaHora: daysAgo(1), hash: randomHash() },
  { id: 'a007', tabla: 'log_auditoria', operacion: 'INSERT', registroId: 'mov-003', userId: 'u003', username: 'farmacia02', userRole: 'asistente', contexto: 'Salida de medicamento a Hospitalización', fechaHora: daysAgo(1), hash: randomHash() },
  { id: 'a008', tabla: 'log_auditoria', operacion: 'DELETE', registroId: 'lote-002', userId: 'u001', username: 'admin_demo', userRole: 'administrador', contexto: 'Eliminación de lote vencido', fechaHora: daysAgo(1), hash: randomHash() },
  { id: 'a009', tabla: 'log_auditoria', operacion: 'INSERT', registroId: 'desp-002', userId: 'u003', username: 'farmacia02', userRole: 'asistente', contexto: 'Despacho a Consulta Externa', fechaHora: daysAgo(1), hash: randomHash() },
  { id: 'a010', tabla: 'log_auditoria', operacion: 'UPDATE', registroId: 'config-001', userId: 'u001', username: 'admin_demo', userRole: 'administrador', contexto: 'Cambio de configuración FEFO estricto', fechaHora: daysAgo(1), hash: randomHash() },
  { id: 'a011', tabla: 'log_auditoria', operacion: 'INSERT', registroId: 'mov-004', userId: 'u002', username: 'farmacia01', userRole: 'asistente', contexto: 'Transferencia entre bloques', fechaHora: daysAgo(2), hash: randomHash() },
  { id: 'a012', tabla: 'log_auditoria', operacion: 'INSERT', registroId: 'desp-003', userId: 'u004', username: 'enfermeria01', userRole: 'asistente', contexto: 'Solicitud de medicamento UCI', fechaHora: daysAgo(2), hash: randomHash() },
  { id: 'a013', tabla: 'log_auditoria', operacion: 'UPDATE', registroId: 'user-002', userId: 'u001', username: 'admin_demo', userRole: 'administrador', contexto: 'Actualización de permisos de usuario', fechaHora: daysAgo(2), hash: randomHash() },
  { id: 'a014', tabla: 'log_auditoria', operacion: 'INSERT', registroId: 'mov-005', userId: 'u003', username: 'farmacia02', userRole: 'asistente', contexto: 'Entrada de inventario por compra', fechaHora: daysAgo(2), hash: randomHash() },
  { id: 'a015', tabla: 'log_auditoria', operacion: 'DELETE', registroId: 'lote-003', userId: 'u001', username: 'admin_demo', userRole: 'administrador', contexto: 'Baja de lote dañado', fechaHora: daysAgo(2), hash: randomHash() },
  { id: 'a016', tabla: 'log_auditoria', operacion: 'LOGIN', registroId: 'sesion-002', userId: 'u002', username: 'farmacia01', userRole: 'asistente', contexto: 'Inicio de sesión', fechaHora: daysAgo(3), hash: randomHash() },
  { id: 'a017', tabla: 'log_auditoria', operacion: 'INSERT', registroId: 'desp-004', userId: 'u002', username: 'farmacia01', userRole: 'asistente', contexto: 'Despacho a Emergencia', fechaHora: daysAgo(3), hash: randomHash() },
  { id: 'a018', tabla: 'log_auditoria', operacion: 'UPDATE', registroId: 'item-005', userId: 'u001', username: 'admin_demo', userRole: 'administrador', contexto: 'Actualización de presentación', fechaHora: daysAgo(3), hash: randomHash() },
  { id: 'a019', tabla: 'log_auditoria', operacion: 'INSERT', registroId: 'mov-006', userId: 'u004', username: 'enfermeria01', userRole: 'asistente', contexto: 'Salida de material de curación', fechaHora: daysAgo(3), hash: randomHash() },
  { id: 'a020', tabla: 'log_auditoria', operacion: 'INSERT', registroId: 'desp-005', userId: 'u003', username: 'farmacia02', userRole: 'asistente', contexto: 'Despacho a Quirófano', fechaHora: daysAgo(3), hash: randomHash() },
  { id: 'a021', tabla: 'log_auditoria', operacion: 'UPDATE', registroId: 'bloque-001', userId: 'u001', username: 'admin_demo', userRole: 'administrador', contexto: 'Modificación de ubicación', fechaHora: daysAgo(4), hash: randomHash() },
  { id: 'a022', tabla: 'log_auditoria', operacion: 'INSERT', registroId: 'mov-007', userId: 'u002', username: 'farmacia01', userRole: 'asistente', contexto: 'Ajuste de inventario', fechaHora: daysAgo(4), hash: randomHash() },
  { id: 'a023', tabla: 'log_auditoria', operacion: 'DELETE', registroId: 'user-003', userId: 'u001', username: 'admin_demo', userRole: 'administrador', contexto: 'Desactivación de usuario inactivo', fechaHora: daysAgo(4), hash: randomHash() },
  { id: 'a024', tabla: 'log_auditoria', operacion: 'INSERT', registroId: 'desp-006', userId: 'u002', username: 'farmacia01', userRole: 'asistente', contexto: 'Despacho a Pediatría', fechaHora: daysAgo(4), hash: randomHash() },
  { id: 'a025', tabla: 'log_auditoria', operacion: 'UPDATE', registroId: 'servicio-002', userId: 'u001', username: 'admin_demo', userRole: 'administrador', contexto: 'Actualización de datos del servicio', fechaHora: daysAgo(5), hash: randomHash() },
  { id: 'a026', tabla: 'log_auditoria', operacion: 'INSERT', registroId: 'mov-008', userId: 'u003', username: 'farmacia02', userRole: 'asistente', contexto: 'Entrada por donación', fechaHora: daysAgo(5), hash: randomHash() },
  { id: 'a027', tabla: 'log_auditoria', operacion: 'LOGIN', registroId: 'sesion-003', userId: 'u003', username: 'farmacia02', userRole: 'asistente', contexto: 'Inicio de sesión', fechaHora: daysAgo(5), hash: randomHash() },
  { id: 'a028', tabla: 'log_auditoria', operacion: 'INSERT', registroId: 'desp-007', userId: 'u004', username: 'enfermeria01', userRole: 'asistente', contexto: 'Despacho a UCI', fechaHora: daysAgo(5), hash: randomHash() },
  { id: 'a029', tabla: 'log_auditoria', operacion: 'UPDATE', registroId: 'config-002', userId: 'u001', username: 'admin_demo', userRole: 'administrador', contexto: 'Cambio de tema del sistema', fechaHora: daysAgo(6), hash: randomHash() },
  { id: 'a030', tabla: 'log_auditoria', operacion: 'INSERT', registroId: 'mov-009', userId: 'u002', username: 'farmacia01', userRole: 'asistente', contexto: 'Salida de urgencia', fechaHora: daysAgo(6), hash: randomHash() }
];
