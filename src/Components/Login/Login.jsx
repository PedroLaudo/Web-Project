import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o useNavigate
import './Login.css';
import Navbar from '../Navbar/Navbar';

const Login = () => {
    const [utilizador, setUtilizador] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(true);  // Estado para alternar entre login e registro
    const navigate = useNavigate(); // Inicia o hook de navegação

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

            const data = await response.json();

            if (data.message === 'Login successful') {
                // Exibe um alerta informando que o login foi bem-sucedido
                alert('Login successful');
                // Redireciona para a página Back_Office após o login bem-sucedido
                navigate('/back_office');
            } else {
                setError(data.error || 'Erro');
            }
        } catch (error) {
            setError('Erro na comunicação com o servidor');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const registerData = {
            utilizador,
            password,
        };

        try {
            const response = await fetch('http://localhost/web-project/src/API/Register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });

            const data = await response.json();

            if (data.message === 'Registration successful') {
                // Exibe um alerta informando que o registro foi bem-sucedido
                alert('Registration successful');
                // Redireciona para a página Back_Office após o registro bem-sucedido
                navigate('/back_office');
            } else {
                setError(data.error || 'Erro');
            }
        } catch (error) {
            setError('Erro na comunicação com o servidor');
        }
    };

    return (
        <body>
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
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Não tem uma conta? Registre-se' : 'Já tem uma conta? Faça login'}
                    </button>
                </div>
            </div>
        </body>
    );
};

export default Login;
