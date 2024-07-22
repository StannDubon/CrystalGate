<?php

require_once __DIR__ . ('/../libraries/vendor/autoload.php');
require_once __DIR__ .  ('/../models/data/permiso-data.php');

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
$hojaActiva->getStyle('A1:I1')->applyFromArray($styleHeader);

// Desbloquear los encabezados para que se puedan editar
$hojaActiva->getStyle('A1:I1')->getProtection()->setLocked(\PhpOffice\PhpSpreadsheet\Style\Protection::PROTECTION_UNPROTECTED);

// Configurar protección de la hoja
$hojaActiva->getProtection()->setSheet(true);

// Agregar datos y aplicar protección a celdas específicas
$hojaActiva->setTitle('Permissions');
$hojaActiva->getColumnDimension('A')->setWidth(25);
$hojaActiva->setCellValue('A1', 'Employee');
$hojaActiva->getColumnDimension('B')->setWidth(20);
$hojaActiva->setCellValue('B1', 'Classification');
$hojaActiva->getColumnDimension('C')->setWidth(30);
$hojaActiva->setCellValue('C1', 'Permission Type');
$hojaActiva->getColumnDimension('D')->setWidth(15);
$hojaActiva->setCellValue('D1', 'Lapse');
$hojaActiva->getColumnDimension('E')->setWidth(20);
$hojaActiva->setCellValue('E1', 'Start Date');
$hojaActiva->getColumnDimension('F')->setWidth(20);
$hojaActiva->setCellValue('F1', 'Finish Date');
$hojaActiva->getColumnDimension('G')->setWidth(20);
$hojaActiva->setCellValue('G1', 'Send Date');
$hojaActiva->getColumnDimension('H')->setWidth(40);
$hojaActiva->setCellValue('H1', 'Description');
$hojaActiva->getColumnDimension('I')->setWidth(10);
$hojaActiva->setCellValue('I1', 'State');

$permiso = new PermisoData();

if ($dataPermiso = $permiso->readAllPermissions()) {

    $fila = 2;

    foreach ($dataPermiso as $rows) {
        $hojaActiva->setCellValue('A' . $fila, $rows['employee']);
        $hojaActiva->setCellValue('B' . $fila, $rows['clasification']);
        $hojaActiva->setCellValue('C' . $fila, $rows['type']);
        $hojaActiva->setCellValue('D' . $fila, $rows['lapso']);
        $hojaActiva->setCellValue('E' . $fila, $rows['fecha_inicio']);
        $hojaActiva->setCellValue('F' . $fila, $rows['fecha_final']);
        $hojaActiva->setCellValue('G' . $fila, $rows['fecha_envio']);
        $hojaActiva->setCellValue('H' . $fila, $rows['description']);
        $hojaActiva->setCellValue('I' . $fila, $rows['estado']);

        // Aplicar estilo a cada fila de datos
        $hojaActiva->getStyle('A' . $fila . ':I' . $fila)->applyFromArray($styleData);

        // Bloquear las celdas de cada fila de datos
        $hojaActiva->getStyle('A' . $fila . ':I' . $fila)->getProtection()->setLocked(\PhpOffice\PhpSpreadsheet\Style\Protection::PROTECTION_PROTECTED);

        $fila++;
    }

} else {
    $hojaActiva->setCellValue('A2', 'No permissions registered');
    // Aplicar estilo a la fila de "No permissions registered"
    $hojaActiva->getStyle('A2:I2')->applyFromArray($styleData);
    // Bloquear la fila de "No permissions registered"
    $hojaActiva->getStyle('A2:I2')->getProtection()->setLocked(\PhpOffice\PhpSpreadsheet\Style\Protection::PROTECTION_PROTECTED);
}

header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="Permissions.xlsx"');
header('Cache-Control: max-age=0');

$writer = IOFactory::createWriter($excel, 'Xlsx');

ob_end_clean();
$writer->save('php://output');

exit;
