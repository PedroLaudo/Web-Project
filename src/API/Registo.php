<?php
include('Base_Dados.php');
header('Content-Type: application/json; charset=utf-8');

// Permitir CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['utilizador']) && isset($data['password'])) {
    $utilizador = $data['utilizador'];
    $password = $data['password'];

    // Verifica se o usuário já existe no banco de dados
    $query = "SELECT * FROM user WHERE utilizador = :utilizador";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':utilizador', $utilizador);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo json_encode(array('error' => 'Usuário já existe'));
    } else {
        // Inserir o novo usuário no banco de dados
        $query = "INSERT INTO user (utilizador, password) VALUES (:utilizador, :password)";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':utilizador', $utilizador);
        $stmt->bindParam(':password', $password);
        $stmt->execute();

        echo json_encode(array('message' => 'Registro bem-sucedido'));
    }
} else {
    echo json_encode(array('error' => 'Dados inválidos'));
}
?>
