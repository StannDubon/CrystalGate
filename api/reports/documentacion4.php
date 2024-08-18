<?php

require_once __DIR__ . ('/../libraries/vendor/autoload.php');
require_once __DIR__ .  ('/../models/data/peticion-data.php');

use PhpOffice\PhpSpreadsheet\{Spreadsheet, IOFactory};

$excel = new Spreadsheet();

// Definir estilo para encabezados
$styleHeader = [
    'font' => [
        'bold' => true,
        'color' => [
            'argb' => 'FFFFFFFF', // Blanco para contraste
        ],
        'size' => 12,
        'name' => 'Arial',
    ],
    'alignment' => [
        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
    ],
    'borders' => [
        'allBorders' => [
            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
            'color' => ['argb' => 'FFFFFFFF'], // Blanco para contraste
        ],
    ],
    'fill' => [
        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_GRADIENT_LINEAR,
        'rotation' => 90,
        'startColor' => [
            'argb' => 'FF4292F6', // color-extra-6
        ],
        'endColor' => [
            'argb' => 'FF3F91FD', // color-extra-9
        ],
    ],
];

// Definir estilo para datos
$styleData = [
    'borders' => [
        'allBorders' => [
            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
            'color' => ['argb' => 'FF000000'], // Negro para contraste
        ],
    ],
    'alignment' => [
        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
    ],
];

// Establecer la hoja activa
$hojaActiva = $excel->getActiveSheet();

// Desbloquear todas las celdas inicialmente
$hojaActiva->getStyle('A1:XFD1048576')->getProtection()->setLocked(\PhpOffice\PhpSpreadsheet\Style\Protection::PROTECTION_UNPROTECTED);

// Aplicar estilo a los encabezados
$hojaActiva->getStyle('A1:J1')->applyFromArray($styleHeader);

// Desbloquear los encabezados para que se puedan editar
$hojaActiva->getStyle('A1:J1')->getProtection()->setLocked(\PhpOffice\PhpSpreadsheet\Style\Protection::PROTECTION_UNPROTECTED);

// Configurar protección de la hoja
$hojaActiva->getProtection()->setSheet(true);

// Agregar datos y aplicar protección a celdas específicas
$hojaActiva->setTitle('Permissions');
$hojaActiva->getColumnDimension('A')->setWidth(15);
$hojaActiva->setCellValue('A1', 'Employee ID');
$hojaActiva->getColumnDimension('B')->setWidth(25);
$hojaActiva->setCellValue('B1', 'Employee');
$hojaActiva->getColumnDimension('C')->setWidth(25);
$hojaActiva->setCellValue('C1', 'Request Type');
$hojaActiva->getColumnDimension('D')->setWidth(25);
$hojaActiva->setCellValue('D1', 'Location');
$hojaActiva->getColumnDimension('E')->setWidth(35);
$hojaActiva->setCellValue('E1', 'Address To');
$hojaActiva->getColumnDimension('F')->setWidth(25);
$hojaActiva->setCellValue('F1', 'Request Name');
$hojaActiva->getColumnDimension('G')->setWidth(35);
$hojaActiva->setCellValue('G1', 'Request Email');
$hojaActiva->getColumnDimension('H')->setWidth(20);
$hojaActiva->setCellValue('H1', 'Contact Number');
$hojaActiva->getColumnDimension('I')->setWidth(20);
$hojaActiva->setCellValue('I1', 'Date Sent');
$hojaActiva->getColumnDimension('J')->setWidth(10);
$hojaActiva->setCellValue('J1', 'State');

$peticion = new PeticionData();

if ($dataPermiso = $peticion->readAllSatSun()) {

    $fila = 2;

    foreach ($dataPermiso as $rows) {
        $hojaActiva->setCellValue('A' . $fila, $rows['id_usuario']);
        $hojaActiva->setCellValue('B' . $fila, $rows['employee']);
        $hojaActiva->setCellValue('C' . $fila, $rows['tipo_peticion']);
        $hojaActiva->setCellValue('D' . $fila, $rows['centro_entrega']);
        $hojaActiva->setCellValue('E' . $fila, $rows['direccion']);
        $hojaActiva->setCellValue('F' . $fila, $rows['nombre_entrega']);
        $hojaActiva->setCellValue('G' . $fila, $rows['email_entrega']);
        $hojaActiva->setCellValue('H' . $fila, $rows['telefono_contacto']);
        $hojaActiva->setCellValue('I' . $fila, $rows['fecha_envio']);
        $hojaActiva->setCellValue('J' . $fila, $rows['estado']);

        // Aplicar estilo a cada fila de datos
        $hojaActiva->getStyle('A' . $fila . ':J' . $fila)->applyFromArray($styleData);

        // Bloquear las celdas de cada fila de datos
        $hojaActiva->getStyle('A' . $fila . ':J' . $fila)->getProtection()->setLocked(\PhpOffice\PhpSpreadsheet\Style\Protection::PROTECTION_PROTECTED);

        $fila++;
    }

} else {
    $hojaActiva->setCellValue('A2', 'No petitions registered');
    // Aplicar estilo a la fila de "No petitions registered"
    $hojaActiva->getStyle('A2:J2')->applyFromArray($styleData);
    // Bloquear la fila de "No petitions registered"
    $hojaActiva->getStyle('A2:J2')->getProtection()->setLocked(\PhpOffice\PhpSpreadsheet\Style\Protection::PROTECTION_PROTECTED);
}

header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="Report of Documentation Requests.xlsx"');
header('Cache-Control: max-age=0');

$writer = IOFactory::createWriter($excel, 'Xlsx');

ob_end_clean();
$writer->save('php://output');

exit;
