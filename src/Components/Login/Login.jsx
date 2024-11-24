import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importa o useNavigate
import './Login.css';
import Navbar from '../Navbar/Navbar';

const Login = () => {
    const [utilizador, setUtilizador] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(true);  // Estado para alternar entre Login e Registro
    const navigate = useNavigate();  // Inicia o hook de navegação

    // Função de Login
    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            utilizador,
            password,
        };

        try {
            const response = await fetch('http://localhost/web-project/src/API/Login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                setError(`Erro no servidor. Status: ${response.status}`);
                return;
            }

            const data = await response.json();
            console.log('Resposta da API:', data); // Para depuração

            if (data.message === 'Login successful') {
                alert('Login bem-sucedido');
                navigate('/back_office');  // Redireciona após o login bem-sucedido
            } else {
                setError(data.error || 'Erro no login');
            }
        } catch (error) {
            setError('Erro na comunicação com o servidor');
            console.error('Erro de comunicação:', error);
        }
    };

    // Função de Registro
    const handleRegister = async (e) => {
        e.preventDefault();

        const registerData = {
            utilizador,
            password,
        };

        try {
            const response = await fetch('http://localhost/Web-Project/src/API/Registo.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });

            if (!response.ok) {
                setError(`Erro no servidor. Status: ${response.status}`);
                return;
            }

            const data = await response.json();
            console.log('Resposta da API:', data); // Para depuração

            if (data.message === 'Registration successful') {
                alert('Registro bem-sucedido!');
                navigate('/login');  // Redireciona para login após registro
            } else {
                setError(data.error || 'Registrado Com Sucesso');
            }
        } catch (error) {
            setError('Erro na comunicação com o servidor');
            console.error('Erro de comunicação:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="login-container">
                <form className="login-form" onSubmit={isLogin ? handleLogin : handleRegister}>
                    <h2>{isLogin ? 'Login' : 'Registrar'}</h2>
                    {error && <p className="error">{error}</p>}
                    <div className="input-group">
                        <label htmlFor="utilizador">Utilizador:</label>
                        <input
                            type="text"
                            id="utilizador"
                            name="utilizador"
                            value={utilizador}
                            onChange={(e) => setUtilizador(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">{isLogin ? 'Entrar' : 'Registrar'}</button>
                </form>
                <div className="toggle-container">
                    <button
                        className="toggle-btn"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');  // Limpa erros ao alternar entre login e registro
                        }}
                    >
                        {isLogin ? 'Não tem uma conta? Registrar' : 'Já tem uma conta? Entrar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
