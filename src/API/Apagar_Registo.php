<?php
include('Base_Dados.php'); // Inclui a conexão com o banco de dados
header('Content-Type: application/json; charset=utf-8');

// Captura os dados da URL (ID do registro a ser deletado)
parse_str(file_get_contents("php://input"), $data);
$id = $data['id'] ?? null;

// Verifica se o ID foi passado
if ($id === null) {
    echo json_encode(array('error' => 'ID não fornecido'));
    exit;
}

// Query SQL para deletar o registro com base no ID
$sql = "DELETE FROM tabela WHERE id = :id"; // Substitua 'tabela' pelo nome da sua tabela
$stmt = $conn->prepare($sql);

// Executa a query com o ID
if ($stmt->execute([':id' => $id])) {
    echo json_encode(array('message' => 'Registro deletado com sucesso'));
} else {
    echo json_encode(array('error' => 'Falha ao deletar o registro'));
}
?>
