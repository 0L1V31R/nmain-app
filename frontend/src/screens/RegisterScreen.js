import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';

export default function RegisterScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert('senhas digitadas são diferentes');
        } else {
            dispatch(register(name, email, password));
        }
    };

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

  return (
    <div>
        <form className="form" onSubmit={submitHandler}>
            <div>
                <h1>Cadastro</h1>
            </div>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <div>
                <label htmlFor="name">Nome</label>
                <input 
                    type="text" 
                    id="name" 
                    placeholder="Enter name" 
                    required
                    onChange={(e) => setName(e.target.value)}
                ></input>
            </div>
            <div>
                <label htmlFor="email">Email address</label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="Enter email" 
                    required
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
            </div>
            <div>
                <label htmlFor="password">Senha</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Digite a senha" 
                    required
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirme a senha</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Redigite a senha" 
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
            </div>
            <div>
                <label />
                <button className="primary" type="submit">
                    Registrar
                </button>
            </div>
            <div>
                <label />
                <div>
                    Já tem cadastro? <Link to={`/signin?redirect=${redirect}`}>Acesse</Link>
                </div>
            </div>
        </form>
    </div>
  );
}
