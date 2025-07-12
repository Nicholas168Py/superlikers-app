<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

// Validación de datos esperados
if (
    !isset($input['api_key']) ||
    !isset($input['campaign']) ||
    !isset($input['participation']['codigo-de-cliente']) ||
    !isset($input['participation']['password'])
) {
    http_response_code(400);
    echo json_encode([
        'error' => 'Faltan datos requeridos',
        'recibido' => $input
    ]);
    exit;
}

// Preparar headers
$headers = [
    'Content-Type: application/json'
];

// Enviar solicitud real a la API de Superlikers
$ch = curl_init('https://api.superlikerslabs.com/v1/microsite/sessions/login');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($input));
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Verificar errores de conexión
if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Error de conexión con la API',
        'detalle' => curl_error($ch)
    ]);
    curl_close($ch);
    exit;
}

curl_close($ch);

// Mostrar respuesta exacta de la API
http_response_code($httpCode);
echo $response;
