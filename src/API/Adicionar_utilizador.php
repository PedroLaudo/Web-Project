<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Permitir requisições de outros domínios
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Conexão com o banco de dados
$conn = new mysqli("localhost", "root", "", "web_project");

if ($conn->connect_error) {
    echo json_encode(["error" => "Erro ao conectar ao banco de dados"]);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $utilizador = $data['utilizador'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($utilizador) || empty($password)) {
        echo json_encode(["error" => "Utilizador e senha são obrigatórios"]);
        exit();
    }

    // Verifica se o usuário já existe
    $stmt = $conn->prepare("SELECT id FROM usuarios WHERE utilizador = ?");
    $stmt->bind_param("s", $utilizador);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo json_encode(["error" => "Usuário já existe"]);
        exit();
    }
    $stmt->close();

    // Insere o novo usuário no banco de dados
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $conn->prepare("INSERT INTO usuarios (utilizador, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $utilizador, $hashedPassword);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Usuário registrado com sucesso"]);
    } else {
        echo json_encode(["error" => "Erro ao registrar usuário"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Método não permitido"]);
}

$conn->close();
?>
