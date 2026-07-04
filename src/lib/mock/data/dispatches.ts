import type { Dispatch } from '$lib/domain/entities';

function daysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
}

function randomTime(): string {
  const h = Math.floor(Math.random() * 12) + 7;
  const m = Math.floor(Math.random() * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

const services = ['Emergencia', 'Consulta Externa', 'Hospitalización', 'Quirófano', 'UCI'];
const users = ['Dr. Martínez', 'Enf. Rodríguez', 'Dr. López', 'Enf. García', 'Dr. Hernández', 'Enf. Pérez'];

export const dispatches: Dispatch[] = [
  { id: 'd001', fecha: daysAgo(0), servicio: 'UCI', usuario: 'Dr. Martínez', items: [{ lotId: 'l001', cantidad: 5, nombreMedicamento: 'Paracetamol 500mg' }, { lotId: 'l012', cantidad: 2, nombreMedicamento: 'Ceftriaxona 1g' }], estado: 'completada', codigoTrazabilidad: 'SOHA-001' },
  { id: 'd002', fecha: daysAgo(0), servicio: 'Emergencia', usuario: 'Enf. Rodríguez', items: [{ lotId: 'l004', cantidad: 8, nombreMedicamento: 'Ibuprofeno 400mg' }, { lotId: 'l011', cantidad: 3, nombreMedicamento: 'Metronidazol 500mg' }], estado: 'completada', codigoTrazabilidad: 'SOHA-002' },
  { id: 'd003', fecha: daysAgo(0), servicio: 'Pediatría', usuario: 'Dr. López', items: [{ lotId: 'l006', cantidad: 4, nombreMedicamento: 'Amoxicilina 500mg' }], estado: 'completada', codigoTrazabilidad: 'SOHA-003' },
  { id: 'd004', fecha: daysAgo(1), servicio: 'Consulta Externa', usuario: 'Enf. García', items: [{ lotId: 'l019', cantidad: 6, nombreMedicamento: 'Losartán 50mg' }, { lotId: 'l022', cantidad: 6, nombreMedicamento: 'Amlodipino 5mg' }, { lotId: 'l034', cantidad: 10, nombreMedicamento: 'Omeprazol 20mg' }], estado: 'completada', codigoTrazabilidad: 'SOHA-004' },
  { id: 'd005', fecha: daysAgo(1), servicio: 'Hospitalización', usuario: 'Dr. Hernández', items: [{ lotId: 'l013', cantidad: 5, nombreMedicamento: 'Diclofenaco 50mg' }, { lotId: 'l026', cantidad: 8, nombreMedicamento: 'Metformina 850mg' }], estado: 'completada', codigoTrazabilidad: 'SOHA-005' },
  { id: 'd006', fecha: daysAgo(1), servicio: 'UCI', usuario: 'Enf. Pérez', items: [{ lotId: 'l018', cantidad: 3, nombreMedicamento: 'Morfina 10mg' }, { lotId: 'l035', cantidad: 4, nombreMedicamento: 'Omeprazol 20mg' }], estado: 'completada', codigoTrazabilidad: 'SOHA-006' },
  { id: 'd007', fecha: daysAgo(2), servicio: 'Emergencia', usuario: 'Dr. Martínez', items: [{ lotId: 'l010', cantidad: 6, nombreMedicamento: 'Ketorolaco 30mg' }], estado: 'completada', codigoTrazabilidad: 'SOHA-007' },
  { id: 'd008', fecha: daysAgo(2), servicio: 'Quirófano', usuario: 'Enf. Rodríguez', items: [{ lotId: 'l016', cantidad: 4, nombreMedicamento: 'Ketorolaco 30mg' }, { lotId: 'l054', cantidad: 2, nombreMedicamento: 'Ringer Lactato 500ml' }], estado: 'completada', codigoTrazabilidad: 'SOHA-008' },
  { id: 'd009', fecha: daysAgo(2), servicio: 'Consulta Externa', usuario: 'Dr. López', items: [{ lotId: 'l021', cantidad: 5, nombreMedicamento: 'Enalapril 10mg' }, { lotId: 'l023', cantidad: 5, nombreMedicamento: 'Atorvastatina 20mg' }], estado: 'completada', codigoTrazabilidad: 'SOHA-009' },
  { id: 'd010', fecha: daysAgo(3), servicio: 'Hospitalización', usuario: 'Enf. García', items: [{ lotId: 'l025', cantidad: 6, nombreMedicamento: 'Furosemida 40mg' }, { lotId: 'l024', cantidad: 4, nombreMedicamento: 'Metoprolol 50mg' }], estado: 'completada', codigoTrazabilidad: 'SOHA-010' },
  { id: 'd011', fecha: daysAgo(3), servicio: 'UCI', usuario: 'Dr. Hernández', items: [{ lotId: 'l044', cantidad: 2, nombreMedicamento: 'Heparina 5000UI' }, { lotId: 'l055', cantidad: 3, nombreMedicamento: 'Suero Fisiológico 500ml' }], estado: 'completada', codigoTrazabilidad: 'SOHA-011' },
  { id: 'd012', fecha: daysAgo(3), servicio: 'Emergencia', usuario: 'Enf. Pérez', items: [{ lotId: 'l058', cantidad: 1, nombreMedicamento: 'Epinefrina 1mg' }, { lotId: 'l057', cantidad: 1, nombreMedicamento: 'Naloxona 0.4mg' }], estado: 'completada', codigoTrazabilidad: 'SOHA-012' },
  { id: 'd013', fecha: daysAgo(4), servicio: 'Pediatría', usuario: 'Dr. Martínez', items: [{ lotId: 'l008', cantidad: 3, nombreMedicamento: 'Azitromicina 500mg' }, { lotId: 'l032', cantidad: 4, nombreMedicamento: 'Prednisona 5mg' }], estado: 'completada', codigoTrazabilidad: 'SOHA-013' },
  { id: 'd014', fecha: daysAgo(4), servicio: 'Consulta Externa', usuario: 'Enf. Rodríguez', items: [{ lotId: 'l036', cantidad: 8, nombreMedicamento: 'Ranitidina 150mg' }], estado: 'completada', codigoTrazabilidad: 'SOHA-014' },
  { id: 'd015', fecha: daysAgo(4), servicio: 'Hospitalización', usuario: 'Dr. López', items: [{ lotId: 'l017', cantidad: 5, nombreMedicamento: 'Tramadol 50mg' }, { lotId: 'l039', cantidad: 3, nombreMedicamento: 'Diazepam 5mg' }], estado: 'completada', codigoTrazabilidad: 'SOHA-015' },
  { id: 'd016', fecha: daysAgo(5), servicio: 'Quirófano', usuario: 'Enf. García', items: [{ lotId: 'l016', cantidad: 6, nombreMedicamento: 'Ketorolaco 30mg' }, { lotId: 'l054', cantidad: 4, nombreMedicamento: 'Ringer Lactato 500ml' }], estado: 'completada', codigoTrazabilidad: 'SOHA-016' },
  { id: 'd017', fecha: daysAgo(5), servicio: 'UCI', usuario: 'Dr. Hernández', items: [{ lotId: 'l044', cantidad: 3, nombreMedicamento: 'Heparina 5000UI' }, { lotId: 'l055', cantidad: 5, nombreMedicamento: 'Suero Fisiológico 500ml' }], estado: 'completada', codigoTrazabilidad: 'SOHA-017' },
  { id: 'd018', fecha: daysAgo(5), servicio: 'Emergencia', usuario: 'Enf. Pérez', items: [{ lotId: 'l059', cantidad: 2, nombreMedicamento: 'Atropina 1mg' }], estado: 'completada', codigoTrazabilidad: 'SOHA-018' },
  { id: 'd019', fecha: daysAgo(6), servicio: 'Consulta Externa', usuario: 'Dr. Martínez', items: [{ lotId: 'l019', cantidad: 8, nombreMedicamento: 'Losartán 50mg' }, { lotId: 'l026', cantidad: 10, nombreMedicamento: 'Metformina 850mg' }, { lotId: 'l034', cantidad: 12, nombreMedicamento: 'Omeprazol 20mg' }], estado: 'completada', codigoTrazabilidad: 'SOHA-019' },
  { id: 'd020', fecha: daysAgo(6), servicio: 'Hospitalización', usuario: 'Enf. Rodríguez', items: [{ lotId: 'l037', cantidad: 4, nombreMedicamento: 'Domperidona 10mg' }], estado: 'completada', codigoTrazabilidad: 'SOHA-020' },
  { id: 'd021', fecha: daysAgo(7), servicio: 'UCI', usuario: 'Dr. López', items: [{ lotId: 'l018', cantidad: 4, nombreMedicamento: 'Morfina 10mg' }, { lotId: 'l044', cantidad: 2, nombreMedicamento: 'Heparina 5000UI' }], estado: 'completada', codigoTrazabilidad: 'SOHA-021' },
  { id: 'd022', fecha: daysAgo(7), servicio: 'Pediatría', usuario: 'Enf. García', items: [{ lotId: 'l006', cantidad: 6, nombreMedicamento: 'Amoxicilina 500mg' }, { lotId: 'l038', cantidad: 3, nombreMedicamento: 'Loperamida 2mg' }], estado: 'completada', codigoTrazabilidad: 'SOHA-022' },
  { id: 'd023', fecha: daysAgo(8), servicio: 'Emergencia', usuario: 'Dr. Hernández', items: [{ lotId: 'l010', cantidad: 8, nombreMedicamento: 'Ketorolaco 30mg' }], estado: 'completada', codigoTrazabilidad: 'SOHA-023' },
  { id: 'd024', fecha: daysAgo(8), servicio: 'Consulta Externa', usuario: 'Enf. Pérez', items: [{ lotId: 'l028', cantidad: 5, nombreMedicamento: 'Glibenclamida 5mg' }, { lotId: 'l043', cantidad: 5, nombreMedicamento: 'Levotiroxina 50mcg' }], estado: 'completada', codigoTrazabilidad: 'SOHA-024' },
  { id: 'd025', fecha: daysAgo(9), servicio: 'Hospitalización', usuario: 'Dr. Martínez', items: [{ lotId: 'l029', cantidad: 3, nombreMedicamento: 'Salbutamol 100mcg' }, { lotId: 'l030', cantidad: 2, nombreMedicamento: 'Beclometasona 200mcg' }], estado: 'completada', codigoTrazabilidad: 'SOHA-025' },
  { id: 'd026', fecha: daysAgo(10), servicio: 'Quirófano', usuario: 'Enf. Rodríguez', items: [{ lotId: 'l054', cantidad: 6, nombreMedicamento: 'Ringer Lactato 500ml' }, { lotId: 'l055', cantidad: 4, nombreMedicamento: 'Suero Fisiológico 500ml' }], estado: 'completada', codigoTrazabilidad: 'SOHA-026' },
  { id: 'd027', fecha: daysAgo(10), servicio: 'UCI', usuario: 'Dr. López', items: [{ lotId: 'l050', cantidad: 2, nombreMedicamento: 'Haloperidol 5mg' }, { lotId: 'l052', cantidad: 2, nombreMedicamento: 'Clozapina 100mg' }], estado: 'completada', codigoTrazabilidad: 'SOHA-027' },
  { id: 'd028', fecha: daysAgo(11), servicio: 'Emergencia', usuario: 'Enf. García', items: [{ lotId: 'l053', cantidad: 3, nombreMedicamento: 'Bicarbonato de Sodio 8.4%' }], estado: 'completada', codigoTrazabilidad: 'SOHA-028' },
  { id: 'd029', fecha: daysAgo(12), servicio: 'Consulta Externa', usuario: 'Dr. Hernández', items: [{ lotId: 'l041', cantidad: 3, nombreMedicamento: 'Fenitoína 100mg' }, { lotId: 'l042', cantidad: 3, nombreMedicamento: 'Carbamazepina 200mg' }], estado: 'completada', codigoTrazabilidad: 'SOHA-029' },
  { id: 'd030', fecha: daysAgo(13), servicio: 'Hospitalización', usuario: 'Enf. Pérez', items: [{ lotId: 'l046', cantidad: 5, nombreMedicamento: 'Sulfato Ferroso 300mg' }, { lotId: 'l045', cantidad: 5, nombreMedicamento: 'Ácido Fólico 5mg' }], estado: 'completada', codigoTrazabilidad: 'SOHA-030' }
];
