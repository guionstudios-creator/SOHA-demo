import type { Lot } from '$lib/domain/entities';

function daysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function randomId(): string {
  return Math.random().toString(36).substring(2, 9);
}

const blocks = ['b001', 'b002', 'b003', 'b004', 'b005'];

export const lots: Lot[] = [
  // Paracetamol 500mg
  { id: 'l001', itemId: 'm001', numeroLote: 'PCM-2024-A14', cantidadOriginal: 200, cantidadActual: 150, fechaIngreso: '2024-06-15', fechaVencimiento: daysFromNow(120), blockId: 'b001', estado: 'activo', catalogoId: 'c001' },
  { id: 'l002', itemId: 'm001', numeroLote: 'PCM-2024-A22', cantidadOriginal: 150, cantidadActual: 80, fechaIngreso: '2024-08-20', fechaVencimiento: daysFromNow(45), blockId: 'b001', estado: 'activo', catalogoId: 'c001' },
  { id: 'l003', itemId: 'm001', numeroLote: 'PCM-2023-B08', cantidadOriginal: 100, cantidadActual: 30, fechaIngreso: '2023-12-10', fechaVencimiento: daysFromNow(-15), blockId: 'b001', estado: 'vencido', catalogoId: 'c001' },

  // Ibuprofeno 400mg
  { id: 'l004', itemId: 'm002', numeroLote: 'IBU-2024-C11', cantidadOriginal: 180, cantidadActual: 120, fechaIngreso: '2024-07-01', fechaVencimiento: daysFromNow(90), blockId: 'b001', estado: 'activo', catalogoId: 'c002' },
  { id: 'l005', itemId: 'm002', numeroLote: 'IBU-2024-C19', cantidadOriginal: 100, cantidadActual: 45, fechaIngreso: '2024-09-15', fechaVencimiento: daysFromNow(25), blockId: 'b001', estado: 'activo', catalogoId: 'c002' },

  // Amoxicilina 500mg
  { id: 'l006', itemId: 'm003', numeroLote: 'AMX-2024-D05', cantidadOriginal: 120, cantidadActual: 90, fechaIngreso: '2024-05-10', fechaVencimiento: daysFromNow(180), blockId: 'b002', estado: 'activo', catalogoId: 'c003' },
  { id: 'l007', itemId: 'm003', numeroLote: 'AMX-2024-D12', cantidadOriginal: 80, cantidadActual: 20, fechaIngreso: '2024-03-20', fechaVencimiento: daysFromNow(10), blockId: 'b002', estado: 'activo', catalogoId: 'c003' },

  // Azitromicina 500mg
  { id: 'l008', itemId: 'm004', numeroLote: 'AZT-2024-E08', cantidadOriginal: 100, cantidadActual: 75, fechaIngreso: '2024-06-25', fechaVencimiento: daysFromNow(150), blockId: 'b002', estado: 'activo', catalogoId: 'c004' },

  // Ciprofloxacino 500mg
  { id: 'l009', itemId: 'm005', numeroLote: 'CIP-2024-F15', cantidadOriginal: 90, cantidadActual: 60, fechaIngreso: '2024-04-12', fechaVencimiento: daysFromNow(200), blockId: 'b002', estado: 'activo', catalogoId: 'c005' },
  { id: 'l010', itemId: 'm005', numeroLote: 'CIP-2023-F22', cantidadOriginal: 60, cantidadActual: 10, fechaIngreso: '2023-11-05', fechaVencimiento: daysFromNow(-30), blockId: 'b002', estado: 'vencido', catalogoId: 'c005' },

  // Metronidazol 500mg
  { id: 'l011', itemId: 'm006', numeroLote: 'MET-2024-G10', cantidadOriginal: 150, cantidadActual: 100, fechaIngreso: '2024-07-20', fechaVencimiento: daysFromNow(110), blockId: 'b003', estado: 'activo', catalogoId: 'c006' },

  // Ceftriaxona 1g
  { id: 'l012', itemId: 'm007', numeroLote: 'CTX-2024-H05', cantidadOriginal: 50, cantidadActual: 35, fechaIngreso: '2024-08-01', fechaVencimiento: daysFromNow(85), blockId: 'b003', estado: 'activo', catalogoId: 'c007' },

  // Diclofenaco 50mg
  { id: 'l013', itemId: 'm008', numeroLote: 'DIC-2024-I12', cantidadOriginal: 200, cantidadActual: 140, fechaIngreso: '2024-05-15', fechaVencimiento: daysFromNow(160), blockId: 'b003', estado: 'activo', catalogoId: 'c008' },
  { id: 'l014', itemId: 'm008', numeroLote: 'DIC-2024-I18', cantidadOriginal: 100, cantidadActual: 35, fechaIngreso: '2024-09-01', fechaVencimiento: daysFromNow(20), blockId: 'b003', estado: 'activo', catalogoId: 'c008' },

  // Naproxeno 500mg
  { id: 'l015', itemId: 'm009', numeroLote: 'NAP-2024-J08', cantidadOriginal: 80, cantidadActual: 55, fechaIngreso: '2024-06-10', fechaVencimiento: daysFromNow(130), blockId: 'b001', estado: 'activo', catalogoId: 'c009' },

  // Ketorolaco 30mg
  { id: 'l016', itemId: 'm010', numeroLote: 'KET-2024-K03', cantidadOriginal: 60, cantidadActual: 40, fechaIngreso: '2024-07-25', fechaVencimiento: daysFromNow(100), blockId: 'b003', estado: 'activo', catalogoId: 'c010' },

  // Tramadol 50mg
  { id: 'l017', itemId: 'm011', numeroLote: 'TRA-2024-L11', cantidadOriginal: 100, cantidadActual: 70, fechaIngreso: '2024-04-20', fechaVencimiento: daysFromNow(175), blockId: 'b004', estado: 'activo', catalogoId: 'c011' },

  // Morfina 10mg
  { id: 'l018', itemId: 'm012', numeroLote: 'MOR-2024-M05', cantidadOriginal: 30, cantidadActual: 18, fechaIngreso: '2024-08-10', fechaVencimiento: daysFromNow(70), blockId: 'b004', estado: 'activo', catalogoId: 'c012' },

  // Losartán 50mg
  { id: 'l019', itemId: 'm013', numeroLote: 'LOS-2024-N15', cantidadOriginal: 180, cantidadActual: 130, fechaIngreso: '2024-05-05', fechaVencimiento: daysFromNow(200), blockId: 'b004', estado: 'activo', catalogoId: 'c013' },
  { id: 'l020', itemId: 'm013', numeroLote: 'LOS-2024-N22', cantidadOriginal: 100, cantidadActual: 40, fechaIngreso: '2024-09-10', fechaVencimiento: daysFromNow(15), blockId: 'b004', estado: 'activo', catalogoId: 'c013' },

  // Enalapril 10mg
  { id: 'l021', itemId: 'm014', numeroLote: 'ENA-2024-O08', cantidadOriginal: 120, cantidadActual: 85, fechaIngreso: '2024-06-18', fechaVencimiento: daysFromNow(140), blockId: 'b005', estado: 'activo', catalogoId: 'c014' },

  // Amlodipino 5mg
  { id: 'l022', itemId: 'm015', numeroLote: 'AML-2024-P12', cantidadOriginal: 150, cantidadActual: 110, fechaIngreso: '2024-07-08', fechaVencimiento: daysFromNow(125), blockId: 'b005', estado: 'activo', catalogoId: 'c015' },

  // Atorvastatina 20mg
  { id: 'l023', itemId: 'm016', numeroLote: 'ATV-2024-Q05', cantidadOriginal: 100, cantidadActual: 70, fechaIngreso: '2024-04-25', fechaVencimiento: daysFromNow(190), blockId: 'b005', estado: 'activo', catalogoId: 'c016' },

  // Metoprolol 50mg
  { id: 'l024', itemId: 'm017', numeroLote: 'MET-2024-R10', cantidadOriginal: 80, cantidadActual: 55, fechaIngreso: '2024-08-15', fechaVencimiento: daysFromNow(95), blockId: 'b001', estado: 'activo', catalogoId: 'c017' },

  // Furosemida 40mg
  { id: 'l025', itemId: 'm018', numeroLote: 'FUR-2024-S08', cantidadOriginal: 90, cantidadActual: 60, fechaIngreso: '2024-05-30', fechaVencimiento: daysFromNow(155), blockId: 'b002', estado: 'activo', catalogoId: 'c018' },

  // Metformina 850mg
  { id: 'l026', itemId: 'm019', numeroLote: 'MET-2024-T15', cantidadOriginal: 200, cantidadActual: 150, fechaIngreso: '2024-06-05', fechaVencimiento: daysFromNow(170), blockId: 'b003', estado: 'activo', catalogoId: 'c019' },
  { id: 'l027', itemId: 'm019', numeroLote: 'MET-2024-T22', cantidadOriginal: 100, cantidadActual: 25, fechaIngreso: '2024-09-20', fechaVencimiento: daysFromNow(8), blockId: 'b003', estado: 'activo', catalogoId: 'c019' },

  // Glibenclamida 5mg
  { id: 'l028', itemId: 'm020', numeroLote: 'GLI-2024-U05', cantidadOriginal: 60, cantidadActual: 40, fechaIngreso: '2024-07-12', fechaVencimiento: daysFromNow(135), blockId: 'b004', estado: 'activo', catalogoId: 'c020' },

  // Salbutamol 100mcg
  { id: 'l029', itemId: 'm021', numeroLote: 'SAL-2024-V10', cantidadOriginal: 50, cantidadActual: 30, fechaIngreso: '2024-08-05', fechaVencimiento: daysFromNow(80), blockId: 'b005', estado: 'activo', catalogoId: 'c021' },

  // Beclometasona 200mcg
  { id: 'l030', itemId: 'm022', numeroLote: 'BEC-2024-W08', cantidadOriginal: 40, cantidadActual: 25, fechaIngreso: '2024-06-22', fechaVencimiento: daysFromNow(145), blockId: 'b001', estado: 'activo', catalogoId: 'c022' },

  // Montelukast 10mg
  { id: 'l031', itemId: 'm023', numeroLote: 'MON-2024-X12', cantidadOriginal: 70, cantidadActual: 50, fechaIngreso: '2024-05-18', fechaVencimiento: daysFromNow(185), blockId: 'b002', estado: 'activo', catalogoId: 'c023' },

  // Prednisona 5mg
  { id: 'l032', itemId: 'm024', numeroLote: 'PRE-2024-Y05', cantidadOriginal: 120, cantidadActual: 85, fechaIngreso: '2024-07-28', fechaVencimiento: daysFromNow(115), blockId: 'b003', estado: 'activo', catalogoId: 'c024' },

  // Dexametasona 4mg
  { id: 'l033', itemId: 'm025', numeroLote: 'DEX-2024-Z10', cantidadOriginal: 40, cantidadActual: 20, fechaIngreso: '2024-08-18', fechaVencimiento: daysFromNow(65), blockId: 'b004', estado: 'activo', catalogoId: 'c025' },

  // Omeprazol 20mg
  { id: 'l034', itemId: 'm026', numeroLote: 'OME-2024-AA08', cantidadOriginal: 180, cantidadActual: 130, fechaIngreso: '2024-04-15', fechaVencimiento: daysFromNow(210), blockId: 'b005', estado: 'activo', catalogoId: 'c026' },
  { id: 'l035', itemId: 'm026', numeroLote: 'OME-2024-AA15', cantidadOriginal: 100, cantidadActual: 45, fechaIngreso: '2024-09-05', fechaVencimiento: daysFromNow(30), blockId: 'b005', estado: 'activo', catalogoId: 'c026' },

  // Ranitidina 150mg
  { id: 'l036', itemId: 'm027', numeroLote: 'RAN-2024-BB12', cantidadOriginal: 80, cantidadActual: 55, fechaIngreso: '2024-06-28', fechaVencimiento: daysFromNow(125), blockId: 'b001', estado: 'activo', catalogoId: 'c027' },

  // Domperidona 10mg
  { id: 'l037', itemId: 'm028', numeroLote: 'DOM-2024-CC05', cantidadOriginal: 60, cantidadActual: 40, fechaIngreso: '2024-07-15', fechaVencimiento: daysFromNow(105), blockId: 'b002', estado: 'activo', catalogoId: 'c028' },

  // Loperamida 2mg
  { id: 'l038', itemId: 'm029', numeroLote: 'LOP-2024-DD10', cantidadOriginal: 50, cantidadActual: 35, fechaIngreso: '2024-08-08', fechaVencimiento: daysFromNow(90), blockId: 'b003', estado: 'activo', catalogoId: 'c029' },

  // Diazepam 5mg
  { id: 'l039', itemId: 'm030', numeroLote: 'DIA-2024-EE08', cantidadOriginal: 70, cantidadActual: 50, fechaIngreso: '2024-05-22', fechaVencimiento: daysFromNow(165), blockId: 'b004', estado: 'activo', catalogoId: 'c030' },

  // Lorazepam 2mg
  { id: 'l040', itemId: 'm031', numeroLote: 'LOR-2024-FF15', cantidadOriginal: 50, cantidadActual: 30, fechaIngreso: '2024-06-30', fechaVencimiento: daysFromNow(140), blockId: 'b005', estado: 'activo', catalogoId: 'c031' },

  // Fenitoína 100mg
  { id: 'l041', itemId: 'm032', numeroLote: 'FEN-2024-GG12', cantidadOriginal: 40, cantidadActual: 25, fechaIngreso: '2024-07-22', fechaVencimiento: daysFromNow(120), blockId: 'b001', estado: 'activo', catalogoId: 'c032' },

  // Carbamazepina 200mg
  { id: 'l042', itemId: 'm033', numeroLote: 'CAR-2024-HH05', cantidadOriginal: 50, cantidadActual: 35, fechaIngreso: '2024-08-12', fechaVencimiento: daysFromNow(100), blockId: 'b002', estado: 'activo', catalogoId: 'c033' },

  // Levotiroxina 50mcg
  { id: 'l043', itemId: 'm034', numeroLote: 'LEV-2024-II10', cantidadOriginal: 100, cantidadActual: 70, fechaIngreso: '2024-05-08', fechaVencimiento: daysFromNow(195), blockId: 'b003', estado: 'activo', catalogoId: 'c034' },

  // Heparina 5000UI
  { id: 'l044', itemId: 'm035', numeroLote: 'HEP-2024-JJ08', cantidadOriginal: 30, cantidadActual: 15, fechaIngreso: '2024-09-01', fechaVencimiento: daysFromNow(55), blockId: 'b004', estado: 'activo', catalogoId: 'c035' },

  // Ácido Fólico 5mg
  { id: 'l045', itemId: 'm036', numeroLote: 'ACF-2024-KK15', cantidadOriginal: 80, cantidadActual: 60, fechaIngreso: '2024-06-12', fechaVencimiento: daysFromNow(175), blockId: 'b005', estado: 'activo', catalogoId: 'c036' },

  // Sulfato Ferroso 300mg
  { id: 'l046', itemId: 'm037', numeroLote: 'SFE-2024-LL12', cantidadOriginal: 120, cantidadActual: 90, fechaIngreso: '2024-07-05', fechaVencimiento: daysFromNow(150), blockId: 'b001', estado: 'activo', catalogoId: 'c037' },

  // Acetaminofén 1g
  { id: 'l047', itemId: 'm038', numeroLote: 'ACE-2024-MM08', cantidadOriginal: 150, cantidadActual: 110, fechaIngreso: '2024-08-22', fechaVencimiento: daysFromNow(85), blockId: 'b002', estado: 'activo', catalogoId: 'c038' },

  // Clonazepam 2mg
  { id: 'l048', itemId: 'm039', numeroLote: 'CLO-2024-NN15', cantidadOriginal: 40, cantidadActual: 25, fechaIngreso: '2024-05-28', fechaVencimiento: daysFromNow(180), blockId: 'b003', estado: 'activo', catalogoId: 'c039' },

  // Biperideno 2mg
  { id: 'l049', itemId: 'm040', numeroLote: 'BIP-2024-OO10', cantidadOriginal: 30, cantidadActual: 18, fechaIngreso: '2024-06-18', fechaVencimiento: daysFromNow(160), blockId: 'b004', estado: 'activo', catalogoId: 'c040' },

  // Haloperidol 5mg
  { id: 'l050', itemId: 'm041', numeroLote: 'HAL-2024-PP05', cantidadOriginal: 25, cantidadActual: 12, fechaIngreso: '2024-07-30', fechaVencimiento: daysFromNow(75), blockId: 'b005', estado: 'activo', catalogoId: 'c041' },

  // Amitriptilina 25mg
  { id: 'l051', itemId: 'm042', numeroLote: 'AMI-2024-QQ12', cantidadOriginal: 50, cantidadActual: 35, fechaIngreso: '2024-08-05', fechaVencimiento: daysFromNow(110), blockId: 'b001', estado: 'activo', catalogoId: 'c042' },

  // Clozapina 100mg
  { id: 'l052', itemId: 'm043', numeroLote: 'CLZ-2024-RR08', cantidadOriginal: 30, cantidadActual: 18, fechaIngreso: '2024-05-15', fechaVencimiento: daysFromNow(190), blockId: 'b002', estado: 'activo', catalogoId: 'c043' },

  // Bicarbonato de Sodio 8.4%
  { id: 'l053', itemId: 'm044', numeroLote: 'BIC-2024-SS15', cantidadOriginal: 60, cantidadActual: 40, fechaIngreso: '2024-06-25', fechaVencimiento: daysFromNow(135), blockId: 'b003', estado: 'activo', catalogoId: 'c044' },

  // Ringer Lactato 500ml
  { id: 'l054', itemId: 'm045', numeroLote: 'RIN-2024-TT12', cantidadOriginal: 100, cantidadActual: 70, fechaIngreso: '2024-07-18', fechaVencimiento: daysFromNow(120), blockId: 'b004', estado: 'activo', catalogoId: 'c045' },

  // Suero Fisiológico 500ml
  { id: 'l055', itemId: 'm046', numeroLote: 'SUE-2024-UU08', cantidadOriginal: 120, cantidadActual: 85, fechaIngreso: '2024-08-10', fechaVencimiento: daysFromNow(105), blockId: 'b005', estado: 'activo', catalogoId: 'c046' },

  // Glucosa 5% 500ml
  { id: 'l056', itemId: 'm047', numeroLote: 'GLU-2024-VV15', cantidadOriginal: 80, cantidadActual: 55, fechaIngreso: '2024-05-20', fechaVencimiento: daysFromNow(175), blockId: 'b001', estado: 'activo', catalogoId: 'c047' },

  // Naloxona 0.4mg
  { id: 'l057', itemId: 'm048', numeroLote: 'NAL-2024-WW12', cantidadOriginal: 20, cantidadActual: 10, fechaIngreso: '2024-06-08', fechaVencimiento: daysFromNow(155), blockId: 'b002', estado: 'activo', catalogoId: 'c048' },

  // Epinefrina 1mg
  { id: 'l058', itemId: 'm049', numeroLote: 'EPI-2024-XX08', cantidadOriginal: 25, cantidadActual: 15, fechaIngreso: '2024-07-25', fechaVencimiento: daysFromNow(95), blockId: 'b003', estado: 'activo', catalogoId: 'c049' },

  // Atropina 1mg
  { id: 'l059', itemId: 'm050', numeroLote: 'ATR-2024-YY15', cantidadOriginal: 20, cantidadActual: 8, fechaIngreso: '2024-08-15', fechaVencimiento: daysFromNow(50), blockId: 'b004', estado: 'activo', catalogoId: 'c050' },

  // Additional lots for variety
  { id: 'l060', itemId: 'm001', numeroLote: 'PCM-2024-A30', cantidadOriginal: 100, cantidadActual: 0, fechaIngreso: '2024-03-01', fechaVencimiento: daysFromNow(-60), blockId: 'b001', estado: 'vencido', catalogoId: 'c001' },
  { id: 'l061', itemId: 'm002', numeroLote: 'IBU-2024-C25', cantidadOriginal: 80, cantidadActual: 0, fechaIngreso: '2024-02-15', fechaVencimiento: daysFromNow(-45), blockId: 'b001', estado: 'vencido', catalogoId: 'c002' },
  { id: 'l062', itemId: 'm003', numeroLote: 'AMX-2024-D18', cantidadOriginal: 60, cantidadActual: 12, fechaIngreso: '2024-01-20', fechaVencimiento: daysFromNow(-20), blockId: 'b002', estado: 'vencido', catalogoId: 'c003' },
  { id: 'l063', itemId: 'm008', numeroLote: 'DIC-2024-I25', cantidadOriginal: 100, cantidadActual: 45, fechaIngreso: '2024-04-10', fechaVencimiento: daysFromNow(5), blockId: 'b003', estado: 'activo', catalogoId: 'c008' },
  { id: 'l064', itemId: 'm013', numeroLote: 'LOS-2024-N28', cantidadOriginal: 80, cantidadActual: 60, fechaIngreso: '2024-03-25', fechaVencimiento: daysFromNow(-10), blockId: 'b004', estado: 'vencido', catalogoId: 'c013' },
  { id: 'l065', itemId: 'm019', numeroLote: 'MET-2024-T28', cantidadOriginal: 120, cantidadActual: 80, fechaIngreso: '2024-02-28', fechaVencimiento: daysFromNow(-25), blockId: 'b003', estado: 'vencido', catalogoId: 'c019' },
  { id: 'l066', itemId: 'm026', numeroLote: 'OME-2024-AA22', cantidadOriginal: 150, cantidadActual: 100, fechaIngreso: '2024-04-05', fechaVencimiento: daysFromNow(35), blockId: 'b005', estado: 'activo', catalogoId: 'c026' },
  { id: 'l067', itemId: 'm011', numeroLote: 'TRA-2024-L18', cantidadOriginal: 60, cantidadActual: 25, fechaIngreso: '2024-05-12', fechaVencimiento: daysFromNow(18), blockId: 'b004', estado: 'activo', catalogoId: 'c011' },
  { id: 'l068', itemId: 'm015', numeroLote: 'AML-2024-P18', cantidadOriginal: 100, cantidadActual: 70, fechaIngreso: '2024-06-20', fechaVencimiento: daysFromNow(145), blockId: 'b005', estado: 'activo', catalogoId: 'c015' },
  { id: 'l069', itemId: 'm016', numeroLote: 'ATV-2024-Q12', cantidadOriginal: 80, cantidadActual: 50, fechaIngreso: '2024-07-08', fechaVencimiento: daysFromNow(115), blockId: 'b005', estado: 'activo', catalogoId: 'c016' },
  { id: 'l070', itemId: 'm017', numeroLote: 'MET-2024-R18', cantidadOriginal: 70, cantidadActual: 45, fechaIngreso: '2024-08-02', fechaVencimiento: daysFromNow(80), blockId: 'b001', estado: 'activo', catalogoId: 'c017' }
];
