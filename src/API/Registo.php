<?php
    // Conexão com o banco de dados
    include('Base_Dados.php');  
    header('Content-Type: application/json; charset=utf-8');  

    // Decodifica os dados recebidos via POST em formato JSON
    $data = json_decode(file_get_contents("php://input"), true);  // Recebe os dados da requisição em formato JSON e converte para um array associativo

    // Verifica se as variáveis 'utilizador', 'password' e 'cargo' foram enviadas na requisição
    if (isset($data['utilizador']) && isset($data['password']) && isset($data['cargo'])) {
        // Atribui os valores dos campos recebidos para variáveis locais
        $utilizador = $data['utilizador'];  // Nome de usuário
        $password = $data['password'];  // Senha do usuário
        $cargo = $data['cargo'];  // Cargo do usuário (Cliente, Vendedor, Administrador)

        // Verifica se o nome de usuário já existe no banco de dados
        $query = "SELECT * FROM user WHERE utilizador = :utilizador";  // SQL para buscar um usuário com o nome fornecido
        $stmt = $pdo->prepare($query);  // Prepara a consulta SQL
        $stmt->bindParam(':utilizador', $utilizador);  // Vincula o parâmetro ':utilizador' ao valor da variável $utilizador
        $stmt->execute();  // Executa a consulta SQL

        // Se o usuário já existir no banco de dados
        if ($stmt->rowCount() > 0) {
            // Retorna um erro informando que o usuário já existe
            echo json_encode(array('error' => 'Usuário já existe'));  // Retorna o erro em formato JSON
        } else {
            // Caso o nome de usuário não exista, insere o novo usuário no banco de dados
            $query = "INSERT INTO user (utilizador, password, cargo) VALUES (:utilizador, :password, :cargo)";  // SQL para inserir o novo usuário
            $stmt = $pdo->prepare($query);  // Prepara a consulta SQL
            $stmt->bindParam(':utilizador', $utilizador);  // Vincula o parâmetro ':utilizador' ao valor da variável $utilizador
            $stmt->bindParam(':password', $password);  // Vincula o parâmetro ':password' ao valor da variável $password (sem criptografar)
            $stmt->bindParam(':cargo', $cargo);  // Vincula o parâmetro ':cargo' ao valor da variável $cargo
            $stmt->execute();  // Executa a consulta SQL

            // Retorna uma resposta de sucesso indicando que o usuário foi registrado
            echo json_encode(array('success' => 'Usuário registrado com sucesso'));  // Retorna a mensagem de sucesso em formato JSON
        }
    } else {
        // Se algum dos dados obrigatórios não foi fornecido, retorna um erro
        echo json_encode(array('error' => 'Dados inválidos'));  // Retorna o erro em formato JSON
    }
?>
