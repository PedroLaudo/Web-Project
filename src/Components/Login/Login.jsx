import React, { useState } from 'react';

// Definindo o componente funcional "Login"
const Login = () => {
    // Definindo os estados para armazenar as entradas do usuário e o erro, se houver
    const [utilizador, setUtilizador] = useState('');  // Estado para o nome de usuário
    const [password, setPassword] = useState('');      // Estado para a senha do usuário
    const [error, setError] = useState('');            // Estado para armazenar mensagens de erro

    // Função que será chamada ao submeter o formulário de login
    const handleLogin = async (e) => {
        e.preventDefault();  // Impede o comportamento padrão de envio do formulário (recarregar a página)

        // Cria o objeto com os dados de login a serem enviados na requisição
        const loginData = {
            utilizador,  // Nome de usuário
            password,    // Senha
        };

        try {
            // Envia a requisição POST para o backend com os dados de login
            const response = await fetch('http://localhost/web-project/src/API/Login.php', {
                method: 'POST',  // Método HTTP POST para enviar dados
                headers: {
                    'Content-Type': 'application/json',  // Define o tipo de conteúdo como JSON
                },
                body: JSON.stringify(loginData),  // Converte o objeto loginData para JSON e envia no corpo da requisição
            });

            // Aguarda a resposta da API e converte a resposta para JSON
            const data = await response.json();

            // Verifica se o login foi bem-sucedido com base na mensagem retornada pela API
            if (data.message === 'Login successful') {
                // Exibe um alerta informando que o login foi bem-sucedido
                alert('Login successful');
                // Aqui você pode adicionar a lógica para redirecionar para outra página ou armazenar o token JWT, por exemplo
                // navigate('/dashboard'); // Descomente essa linha se quiser redirecionar para outra página após o login
            } else {
                // Se ocorrer algum erro, define o erro no estado e exibe a mensagem de erro
                setError(data.error || 'Erro');
            }
        } catch (error) {
            // Caso ocorra um erro na comunicação com o servidor, define o erro no estado
            setError('Erro na comunicação com o servidor');
        }
    };

    // JSX para renderizar o formulário de login
    return (
        <div className="login-container">
            {/* Formulário de login */}
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                {/* Exibe a mensagem de erro, se houver */}
                {error && <p className="error">{error}</p>}
                {/* Campo para o nome de usuário */}
                <div className="input-group">
                    <label htmlFor="utilizador">Usuário:</label>
                    <input
                        type="text"
                        id="utilizador"
                        name="utilizador"
                        value={utilizador}  // Valor do campo de nome de usuário
                        onChange={(e) => setUtilizador(e.target.value)}  // Atualiza o estado de 'utilizador' quando o valor mudar
                        required  // Torna o campo obrigatório
                    />
                </div>
                {/* Campo para a senha */}
                <div className="input-group">
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}  // Valor do campo de senha
                        onChange={(e) => setPassword(e.target.value)}  // Atualiza o estado de 'password' quando o valor mudar
                        required  // Torna o campo obrigatório
                    />
                </div>
                {/* Botão de submissão do formulário */}
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

// Exporta o componente Login para poder ser usado em outras partes do código
export default Login;
