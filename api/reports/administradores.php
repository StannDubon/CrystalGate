<?php

require_once __DIR__ . ('/../libraries/vendor/autoload.php');
require_once __DIR__ .  ('/../models/data/administrador-data.php');

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
$hojaActiva->getStyle('A1:E1')->applyFromArray($styleHeader);

// Desbloquear los encabezados para que se puedan editar
$hojaActiva->getStyle('A1:E1')->getProtection()->setLocked(\PhpOffice\PhpSpreadsheet\Style\Protection::PROTECTION_UNPROTECTED);

// Configurar protección de la hoja
$hojaActiva->getProtection()->setSheet(true);

// Agregar datos y aplicar protección a celdas específicas
$hojaActiva->setTitle('Administrators');
$hojaActiva->getColumnDimension('A')->setWidth(25);
$hojaActiva->setCellValue('A1', 'Administrator');
$hojaActiva->getColumnDimension('B')->setWidth(35);
$hojaActiva->setCellValue('B1', 'Email');
$hojaActiva->getColumnDimension('C')->setWidth(20);
$hojaActiva->setCellValue('C1', 'Type');
$hojaActiva->getColumnDimension('D')->setWidth(30);
$hojaActiva->setCellValue('D1', 'Accepted Permissions');
$hojaActiva->getColumnDimension('E')->setWidth(30);
$hojaActiva->setCellValue('E1', 'Rejected Permissions');

$admin = new AdministradorData();

if ($dataPermiso = $admin->readAllAdministrators()) {

    $fila = 2;

    foreach ($dataPermiso as $rows) {
        $hojaActiva->setCellValue('A' . $fila, $rows['administrator']);
        $hojaActiva->setCellValue('B' . $fila, $rows['email']);
        $hojaActiva->setCellValue('C' . $fila, $rows['type']);
        $hojaActiva->setCellValue('D' . $fila, $rows['approved']);
        $hojaActiva->setCellValue('E' . $fila, $rows['rejected']);

        // Aplicar estilo a cada fila de datos
        $hojaActiva->getStyle('A' . $fila . ':E' . $fila)->applyFromArray($styleData);

        // Bloquear las celdas de cada fila de datos
        $hojaActiva->getStyle('A' . $fila . ':E' . $fila)->getProtection()->setLocked(\PhpOffice\PhpSpreadsheet\Style\Protection::PROTECTION_PROTECTED);

        $fila++;
    }

} else {
    $hojaActiva->setCellValue('A2', 'No administrators registered');

    $hojaActiva->getStyle('A2:E2')->applyFromArray($styleData);

    $hojaActiva->getStyle('A2:E2')->getProtection()->setLocked(\PhpOffice\PhpSpreadsheet\Style\Protection::PROTECTION_PROTECTED);
}

header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="Administrators.xlsx"');
header('Cache-Control: max-age=0');

$writer = IOFactory::createWriter($excel, 'Xlsx');

ob_end_clean();
$writer->save('php://output');

exit;
