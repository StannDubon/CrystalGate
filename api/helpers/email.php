<?php
require_once ('../../libs/PHPMailer/PHPMailer.php');
require_once ('../../libs/PHPMailer/SMTP.php');
require_once ('../../libs/PHPMailer/Exception.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendVerificationEmail($to, $random) {
    // Construir el cuerpo del correo
    $body = '
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        /* Estilos generales */
        body {
            font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f7fa;
            margin: 0;
            padding: 0;
        }

        .top-bar {
            background-color: #4a8af7;
            width: 100%;
            height: 30px;
            border-radius: 0 0 15px 15px;
            margin-bottom: 20px;
        }

        .container {
            width: 100%;
            max-width: 700px;
            margin: 50px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        h1 {
            color: #4a8af7;
            font-size: 28px;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            font-weight: bold;
        }

        p {
            color: #666666;
            font-size: 18px;
            margin: 15px 0;
            line-height: 1.5;
        }

        .code {
            font-size: 36px;
            font-weight: bold;
            color: #4a8af7;
            background-color: #e7f0ff;
            padding: 15px 30px;
            border-radius: 10px;
            display: inline-block;
            letter-spacing: 2px;
            margin-top: 30px;
        }

        .highlight {
            font-size: 20px;
            font-weight: 600;
            color: #333333;
        }

        hr {
            border: none;
            border-top: 2px dashed #e0e0e0;
            margin: 40px 0;
            width: 80%;
        }

        .goodbye {
            font-size: 20px;
            font-weight: 300;
            color: #4a8af7;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Email Verification</h1>
        <p>Hi <span class="highlight">Climber</span>,</p>
        <p>Thanks for registering! Your verification code is:</p>
        <p class="code">' . $random . '</p>
        <p>Please use this code to verify your email and change your password.</p>
        <hr>
        <p class="goodbye">If you didn’t request this email, please contact us</p>
    </div>
</body>
</html>

    ';

    // Llamar a la función para enviar el correo electrónico
    sendEmail($to, "Verificación de correo electrónico", $body);
}

function sendEmail($to, $subject, $body) {
    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Cambia esto al host de tu servidor SMTP
        $mail->SMTPAuth = true;
        $mail->Username = 'crystal.gate.sender@gmail.com'; // Cambia esto a tu usuario SMTP
        $mail->Password = 'zgzhufreemtifglo'; // Cambia esto a tu contraseña SMTP
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587; // Cambia esto al puerto de tu servidor SMTP

        // Configuración del remitente y destinatarios
        $mail->setFrom('crystal.gate.sender@gmail.com', 'Mailer');
        $mail->addAddress($to);

        // Contenido del correo
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $body;

        $mail->send();
    } catch (Exception $e) {
        echo "El mensaje no se pudo enviar. Mailer Error: {$mail->ErrorInfo}";
    }
}
  
#   CREDENCIALES:

#   crystal.gate.sender@gmail.com
#   #CrY5t4lG4t3-2024
#   zgzh ufre emti fglo

?>