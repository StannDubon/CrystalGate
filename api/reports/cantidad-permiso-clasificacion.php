<?php

require_once __DIR__ . ('/../libraries/vendor/autoload.php');
require_once __DIR__ .  ('/../models/data/tipo-permiso-data.php');
require_once __DIR__ .  ('/../models/data/clasificacion-permiso-data.php');

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
$hojaActiva->getStyle('A1:B1')->applyFromArray($styleHeader);

// Desbloquear los encabezados para que se puedan editar
$hojaActiva->getStyle('A1:B1')->getProtection()->setLocked(\PhpOffice\PhpSpreadsheet\Style\Protection::PROTECTION_UNPROTECTED);

// Configurar protección de la hoja
$hojaActiva->getProtection()->setSheet(true);

// Agregar datos y aplicar protección a celdas específicas
$hojaActiva->setTitle('Permissions');
$hojaActiva->getColumnDimension('A')->setWidth(30);
$hojaActiva->setCellValue('A1', 'Permission Type');
$hojaActiva->getColumnDimension('B')->setWidth(15);
$hojaActiva->setCellValue('B1', 'Count');





$clasificacion_permiso = new ClasificacionPermisoData();
$tipo_permiso = new TipoPermisoData();

if ($clasificacion_permiso->setId($_GET['idClasificacionPermiso']) && $tipo_permiso->setIdClasificacion($_GET['idClasificacionPermiso']) ){

    if ($dataPermiso = $tipo_permiso->readPermissionsPerType()) {

        $fila = 2;
        foreach ($dataPermiso as $rows) {
            $hojaActiva->setCellValue('A' . $fila, $rows['tipo']);
            $hojaActiva->setCellValue('B' . $fila, $rows['cantidad']);
    
            // Aplicar estilo a cada fila de datos
            $hojaActiva->getStyle('A' . $fila . ':B' . $fila)->applyFromArray($styleData);
    
            // Bloquear las celdas de cada fila de datos
            $hojaActiva->getStyle('A' . $fila . ':B' . $fila)->getProtection()->setLocked(\PhpOffice\PhpSpreadsheet\Style\Protection::PROTECTION_PROTECTED);
    
            $fila++;
        }
    
    } else {
        $hojaActiva->setCellValue('A2', 'No permissions registered');
        // Aplicar estilo a la fila de "No permissions registered"
        $hojaActiva->getStyle('A2:B2')->applyFromArray($styleData);
        // Bloquear la fila de "No permissions registered"
        $hojaActiva->getStyle('A2:B2')->getProtection()->setLocked(\PhpOffice\PhpSpreadsheet\Style\Protection::PROTECTION_PROTECTED);
    }
    
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment;filename="Permissions count.xlsx"');
    header('Cache-Control: max-age=0');
    
    $writer = IOFactory::createWriter($excel, 'Xlsx');
    
    ob_end_clean();
    $writer->save('php://output');
    
    exit;
} else{
    print('There is an error, try again.');
}


