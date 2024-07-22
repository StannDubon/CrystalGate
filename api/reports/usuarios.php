<?php

require_once __DIR__ . ('/../libraries/vendor/autoload.php');
require_once __DIR__ .  ('/../models/data/usuario-data.php');

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
$hojaActiva->getStyle('A1:F1')->applyFromArray($styleHeader);

// Desbloquear los encabezados para que se puedan editar
$hojaActiva->getStyle('A1:F1')->getProtection()->setLocked(\PhpOffice\PhpSpreadsheet\Style\Protection::PROTECTION_UNPROTECTED);

// Configurar protección de la hoja
$hojaActiva->getProtection()->setSheet(true);

// Agregar datos y aplicar protección a celdas específicas
$hojaActiva->setTitle('Employees');
$hojaActiva->getColumnDimension('A')->setWidth(25);
$hojaActiva->setCellValue('A1', 'Employee');
$hojaActiva->getColumnDimension('B')->setWidth(35);
$hojaActiva->setCellValue('B1', 'Email');
$hojaActiva->getColumnDimension('C')->setWidth(20);
$hojaActiva->setCellValue('C1', ' Charge');
$hojaActiva->getColumnDimension('D')->setWidth(30);
$hojaActiva->setCellValue('D1', 'Approved Permissions');
$hojaActiva->getColumnDimension('E')->setWidth(30);
$hojaActiva->setCellValue('E1', 'Rejected Permissions');
$hojaActiva->getColumnDimension('F')->setWidth(20);
$hojaActiva->setCellValue('F1', 'Total Permissions');

$usuario = new UsuarioData();

if ($dataPermiso = $usuario->readAllUsers()) {

    $fila = 2;

    foreach ($dataPermiso as $rows) {
        $hojaActiva->setCellValue('A' . $fila, $rows['Employee']);
        $hojaActiva->setCellValue('B' . $fila, $rows['Email']);
        $hojaActiva->setCellValue('C' . $fila, $rows['charge']);
        $hojaActiva->setCellValue('D' . $fila, $rows['approved']);
        $hojaActiva->setCellValue('E' . $fila, $rows['rejected']);
        $hojaActiva->setCellValue('F' . $fila, $rows['total']);

        // Aplicar estilo a cada fila de datos
        $hojaActiva->getStyle('A' . $fila . ':F' . $fila)->applyFromArray($styleData);

        // Bloquear las celdas de cada fila de datos
        $hojaActiva->getStyle('A' . $fila . ':F' . $fila)->getProtection()->setLocked(\PhpOffice\PhpSpreadsheet\Style\Protection::PROTECTION_PROTECTED);

        $fila++;
    }

} else {
    $hojaActiva->setCellValue('A2', 'No employees registered');

    $hojaActiva->getStyle('A2:F2')->applyFromArray($styleData);

    $hojaActiva->getStyle('A2:F2')->getProtection()->setLocked(\PhpOffice\PhpSpreadsheet\Style\Protection::PROTECTION_PROTECTED);
}

header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="Employees.xlsx"');
header('Cache-Control: max-age=0');

$writer = IOFactory::createWriter($excel, 'Xlsx');

ob_end_clean();
$writer->save('php://output');

exit;
