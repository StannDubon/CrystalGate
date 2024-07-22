<?php

require '../libraries/PhpSpreadsheet-2.1.0/src/PhpSpreadsheet/';
require '../helpers/database.php';

use PhpOffice\PhpSpreadsheet\{Spreadsheet,IOFactory};

$anio = $mysqli->real_escape_string($_POST['anio']);
$seccion = $mysqli->real_escape_string($_POST['seccion']);

$sql = "SELECT id, matricula, email, telefono, anio, seccion FROM alumnos WHERE anio LIKE '$anio' AND seccion LIKE '$seccion'";
$resulado = $mysqli->query($sql);

$excel = new Spreadsheet();
$hojaActiva = $excel->getActiveSheet();
$hojaActiva->setTitle('Alumnos');

$hojaActiva->getColumnDimension('A')->setWidth(10);
$hojaActiva->setCellValue('A1','ID');
$hojaActiva->getColumnDimension('B')->setWidth(15);
$hojaActiva->setCellValue('B1','MATRICULA');
$hojaActiva->getColumnDimension('C')->setWidth(30);
$hojaActiva->setCellValue('C1','NOMBRE');
$hojaActiva->getColumnDimension('D')->setWidth(25);
$hojaActiva->setCellValue('D1','CORREO');
$hojaActiva->getColumnDimension('E')->setWidth(15);
$hojaActiva->setCellValue('E1','TELEFONO');
$hojaActiva->getColumnDimension('F')->setWidth(15);
$hojaActiva->setCellValue('F1','AÑO');
$hojaActiva->getColumnDimension('G')->setWidth(15);
$hojaActiva->setCellValue('G1','SECCION');

$fila = 2;

while ($rows = $resulado->fetch_assoc()) {
    $hojaActiva->setCellValue('A'.$fila, $rows['id']);
    $hojaActiva->setCellValue('B'.$fila, $rows['matricula']);
    $hojaActiva->setCellValue('C'.$fila, $rows['nombre']);
    $hojaActiva->setCellValue('D'.$fila, $rows['email']);
    $hojaActiva->setCellValue('E'.$fila, $rows['telefono']);
    $hojaActiva->setCellValue('F'.$fila, $rows['anio']);
    $hojaActiva->setCellValue('G'.$fila, $rows['seccion']);
    $fila++;
}

header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="alumnos.xlsx"');
header('Cache-Control: max-age=0');

$writer = IOFactory::createWriter($excel, 'Xlsx');

ob_end_clean();
$writer->save('php://output');

exit;