<?php
include('Base_Dados.php');
header('Content-Type: application/json; charset=utf-8');

// Permitir CORS (necessário se o React e o PHP estão em servidores diferentes)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'jwt_utils.php';

// Capturar os dados enviados no corpo da requisição
$data = json_decode(file_get_contents("php://input"), true);

$id_user = $data['id_user'] ?? null;
$utilizador = $data['utilizador'] ?? null;
$password = $data['password'] ?? null;

if  ($utilizador === 'admin' && $password === 'admin') {
    $headers = array('alg' => 'HS256', 'typ' => 'JWT');
    $payload = array('id_user' => $id_user, 'exp' => (time() + 60));

    $jwt = generate_jwt($headers, $payload);

    // Não retornar o token no JSON
    echo json_encode(array('message' => 'Login successful'));
} else {
    echo json_encode(array('error' => 'Invalid User or password'));
}
?>
