import type { Movement } from '$lib/domain/entities';

function daysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  const h = Math.floor(Math.random() * 12) + 7;
  const m = Math.floor(Math.random() * 60);
  return `${d.toISOString().split('T')[0]} ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

const lotIds = ['l001', 'l002', 'l004', 'l005', 'l006', 'l007', 'l008', 'l011', 'l013', 'l019', 'l022', 'l026', 'l034', 'l039', 'l044', 'l054', 'l055'];
const services = ['Emergencia', 'Consulta Externa', 'Hospitalización', 'Quirófano', 'UCI', 'Pediatría'];
const users = ['u001', 'u002', 'u003', 'u004'];
const reasons = ['Despacho ordinario', 'Entrada por compra', 'Transferencia entre bloques', 'Ajuste de inventario', 'Donación recibida', 'Salida de urgencia', 'Devolución de paciente'];

export const movements: Movement[] = [];

// Generate 50 movements
for (let i = 0; i < 50; i++) {
  const dayOffset = Math.floor(Math.random() * 14);
  const tipo = i < 10 ? 'entrada' : i < 35 ? 'salida' : i < 40 ? 'transferencia' : i < 45 ? 'ajuste' : 'donacion';

  movements.push({
    id: `mov-${String(i + 1).padStart(3, '0')}`,
    tipo,
    userId: users[Math.floor(Math.random() * users.length)],
    servicio: tipo === 'salida' || tipo === 'transferencia' ? services[Math.floor(Math.random() * services.length)] : null,
    lotId: lotIds[Math.floor(Math.random() * lotIds.length)],
    cantidad: Math.floor(Math.random() * 20) + 1,
    fechaHora: daysAgo(dayOffset),
    turno: Math.random() > 0.6 ? 'manana' : Math.random() > 0.3 ? 'tarde' : 'noche',
    motivo: reasons[Math.floor(Math.random() * reasons.length)]
  });
}
