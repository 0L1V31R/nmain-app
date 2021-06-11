import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile;
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!user) {
            dispatch({type: USER_UPDATE_PROFILE_RESET});
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, user, userInfo._id]);

    const submitHandler = (e) => {
        e.preventDefault();
        //dispatch update profile
        if (password !== confirmPassword) {
            alert('Os campos senha e confirmar senha não correspondem');
        } else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password }));
        }
    }

  return (
    <div>
        <form className="form" onSubmit={submitHandler}>
            <div>
                <h1>Seu Perfil</h1>
            </div>
            { loading ? ( 
                <LoadingBox></LoadingBox> 
            ) : error ? ( 
                <MessageBox variant="danger">{error}</MessageBox> 
            ) : (
                <>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                    {successUpdate && <MessageBox variant="success">Perfil atualizado com sucesso</MessageBox>}
                    <div>
                        <label htmlFor="name">Nome</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Seu Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="password">Senha</label>
                        <input
                            id="password"
                            type="text"
                            placeholder="Sua Senha"
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirme sua Senha</label>
                        <input
                            id="confirmPassword"
                            type="text"
                            placeholder="Confirme sua Senha"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label/>
                        <button className="primary" type="submit">Atualizar</button>
                    </div>
                </>
            )}
        </form>
    </div>
  );
}
