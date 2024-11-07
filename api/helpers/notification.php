<?php 

// Método para enviar notificacion
function enviarNotificacionPush($expoToken, $titulo, $mensaje) {
    // URL de la API de Expo
    $url = 'https://exp.host/--/api/v2/push/send';

    // Configura el contenido de la notificación
    $data = [
        'to' => $expoToken, // El token del dispositivo
        'title' => $titulo,
        'body' => $mensaje,
        'sound' => 'default',
    ];

    // Configura la solicitud cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Accept: application/json',
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    // Ejecuta la solicitud
    $response = curl_exec($ch);

    // Manejo de errores
    if (curl_errno($ch)) {
        echo 'Error en la solicitud: ' . curl_error($ch);
    } else {
        echo 'Respuesta de Expo: ' . $response;
    }

    // Cierra la conexión
    curl_close($ch);
}


?>
