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

/*$id_user = $data['id_user'] ?? null;
$utilizador = $data['utilizador'] ?? null;
$password = $data['password'] ?? null;

// Verifica se o nome de usuário já existe no banco de dados
$query = "SELECT * FROM user WHERE utilizador = :utilizador";  // SQL para buscar um usuário com o nome fornecido
$stmt = $pdo->prepare($query);  // Prepara a consulta SQL
$stmt->bindParam(':utilizador', $utilizador);  // Vincula o parâmetro ':utilizador' ao valor da variável $utilizador
$stmt->execute();  // Executa a consulta SQL

if  ($utilizador === 'admin' && $password === 'admin') {
    $headers = array('alg' => 'HS256', 'typ' => 'JWT');
    $payload = array('id_user' => $id_user, 'exp' => (time() + 60));

    $jwt = generate_jwt($headers, $payload);

    // Não retornar o token no JSON
    echo json_encode(array('message' => 'Login successful'));
} else {
    echo json_encode(array('error' => 'Invalid User or password'));
}
?>*/

if (isset($data['utilizador']) && isset($data['password'])) { // Removido isset($data['cargo'])
    // Atribui os valores dos campos recebidos para variáveis locais
    $utilizador = $data['utilizador'];  // Nome de usuário
    $password = $data['password'];  // Senha do usuário
    // $cargo = $data['cargo'];  // Comentado: Cargo do usuário (Cliente, Vendedor, Administrador)

    // Verifica se o nome de usuário já existe no banco de dados
    $query = "SELECT * FROM user WHERE utilizador = :utilizador AND password = :password";  // Cargo removido da consulta SQL
    $stmt = $pdo->prepare($query);  // Prepara a consulta SQL
    $stmt->bindParam(':utilizador', $utilizador);  // Vincula o parâmetro ':utilizador' ao valor da variável $utilizador
    $stmt->bindParam(':password', $password);  // Vincula o parâmetro ':password' ao valor da variável $password
    // $stmt->bindParam(':cargo', $cargo);  // Comentado: Vincula o parâmetro ':cargo' ao valor da variável $cargo
    $stmt->execute();  // Executa a consulta SQL

    // Se o usuário já existir no banco de dados
    if ($stmt->rowCount() == 1) {
        $results = $stmt->fetch(PDO::FETCH_ASSOC); // Obtém um único resultado como um array associativo
        $id_user = $results['id_user']; // Acede à propriedade id_user

        $headers = array('alg' => 'HS256', 'typ' => 'JWT');
        $payload = array('id_user' => $id_user, 'exp' => (time() + 60));
    
        $jwt = generate_jwt($headers, $payload);
    
        // Não retornar o token no JSON
        echo json_encode(array('message' => 'Login successful'));
    } else {
        echo json_encode(array('error' => 'Invalid User or password'));
    }
} else {
    // Se algum dos dados obrigatórios não foi fornecido, retorna um erro
    echo json_encode(array('error' => 'Dados inválidos'));  // Retorna o erro em formato JSON
}
?>
