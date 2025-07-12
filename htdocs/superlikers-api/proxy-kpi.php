<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$token = $_GET['token'] ?? '';
$distinct_id = $_GET['distinct_id'] ?? '';

if (!$token || !$distinct_id) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan token o distinct_id']);
    exit;
}

$headers = [
    "Content-Type: application/json",
    "Authorization: Bearer $token",
];

// BODY REAL para la API
$body = json_encode([
    "api_key" => "be65a08aa1121cf6ffe52a80743c8cef",
    "campaign" => "4u",
    "distinct_id" => $distinct_id,
    "date_filter" => [
        "sdate" => "2024-08-01",
        "edate" => "2024-08-31"
    ],
    "_type" => "External",
    "atype" => "avance_metas"
]);

$ch = curl_init("https://api.superlikerslabs.com/v1/entries/index");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $body);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

header('Content-Type: application/json; charset=utf-8');

if ($response === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al conectar con la API', 'detalle' => $curlError]);
    exit;
}

http_response_code($httpCode);
echo $response;
