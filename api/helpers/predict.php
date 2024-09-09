<?php

function regresionLineal($x, $y, $xPredict)
{
    // Verificar que los arrays tengan la misma longitud
    if (count($x) !== count($y)) {
        throw new Exception('Both arrays gotta have the same length');
    }

    // Verificar que haya al menos dos puntos de datos
    if (count($x) < 2) {
        throw new Exception('It is necessary to have at least two numbers in both arrays');
    }

    // Inicializar variables
    $sumX = 0;
    $sumY = 0;
    $sumXY = 0;
    $sumXX = 0;
    $n = count($x);

    // Calcular sumas necesarias
    for ($i = 0; $i < $n; $i++) {
        $sumX += $x[$i];
        $sumY += $y[$i];
        $sumXY += $x[$i] * $y[$i];
        $sumXX += $x[$i] * $x[$i];
    }

    // Calcular medias
    $meanX = $sumX / $n;
    $meanY = $sumY / $n;

    // Calcular pendiente (m) y ordenada al origen (b)
    $m = ($sumXY - $n * $meanX * $meanY) / ($sumXX - $n * $meanX * $meanX);
    $b = $meanY - $m * $meanX;

    // Calcular el valor predicho y redondear a dos decimales
    $yPredict = number_format($m * $xPredict + $b, 2);

    return floatval($yPredict);
}

function predictData($x, $y, $pred)
{
    $xPredict = [];
    $filledData = [];

    // Rellenar los valores para la predicción
    for ($i = count($x) + 1; $i <= $pred; $i++) {
        $xPredict[] = $i;
    }

    // Realizar la predicción para cada valor
    foreach ($xPredict as $value) {
        $yPred = regresionLineal($x, $y, $value);
        $filledData[] = $yPred;
        echo $yPred . PHP_EOL; // Imprimir los resultados
    }

    return $filledData;
}