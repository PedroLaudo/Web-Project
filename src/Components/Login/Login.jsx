import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Navbar from '../Navbar/Navbar';

const Login = () => {
    const [utilizador, setUtilizador] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isRegistering, setIsRegistering] = useState(false); // Estado para alternar entre login e cadastro
    const navigate = useNavigate();

    // Função para lidar com login
    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = { utilizador, password };

        try {
            const response = await fetch('http://localhost/web-project/src/API/Login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (data.message === 'Login successful') {
                alert('Login successful');
                navigate('/back_office');
            } else {
                setError(data.error || 'Erro');
            }
        } catch (error) {
            setError('Erro na comunicação com o servidor');
        }
    };

    // Função para lidar com cadastro
    const handleRegister = async (e) => {
        e.preventDefault();

        const registerData = { utilizador, password };

        try {
            const response = await fetch('http://localhost/web-project/src/API/AddUser.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });

            const data = await response.json();

            if (data.message) {
                setMessage(data.message);
                setUtilizador('');
                setPassword('');
                setIsRegistering(false); // Volta para a tela de login
            } else {
                setError(data.error || 'Erro ao adicionar usuário');
            }
        } catch (error) {
            setError('Erro na comunicação com o servidor');
        }
    };

    return (
        <body>
            <Navbar />
            <div className="login-container">
                {isRegistering ? (
                    // Formulário de cadastro
                    <form className="login-form" onSubmit={handleRegister}>
                        <h2>Registre-se</h2>
                        {message && <p className="success">{message}</p>}
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
                        <button type="submit">Registrar</button>
                        <p className="toggle-form" onClick={() => setIsRegistering(false)}>
                            Já tem conta? Faça login
                        </p>
                    </form>
                ) : (
                    // Formulário de login
                    <form className="login-form" onSubmit={handleLogin}>
                        <h2>Login</h2>
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
                        <button type="submit">Entrar</button>
                        <p className="toggle-form" onClick={() => setIsRegistering(true)}>
                            Não tem conta? Registre-se
                        </p>
                    </form>
                )}
            </div>
        </body>
    );
};

export default Login;
