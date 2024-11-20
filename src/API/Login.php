<?php 
    include('Base_Dados.php');
    header('Content-Type: application/json; charset=utf-8');
    
    require_once 'jwt_utils.php';

    $username = $_POST["username"];
    $password = $_POST["password"];


   
    $data = json_decode(file_get_contents("php://input", true));
    
    if ( $username == 'admin' && $password == 'admin') {
        $headers = array('alg'=>'HS256','typ'=>'JWT');
        $payload = array('username'=>$username, 'exp'=>(time() + 60));

        $jwt = generate_jwt($headers, $payload);
    
    echo json_encode(array('token' => $jwt));
    } else {
        echo json_encode(array('error' => 'Invalid User or password'));
        }
    


?>