import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userActions';
import { LoadingBox } from '../component/LoadingBox';
import { MessageBox } from '../component/MessageBox';

export default function ProfileScreen() {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsUser(userInfo._id));
    }, [dispatch, userInfo._id]);
    const submitHandler = (e) => {
        e.preventDefault();
        //dispatch update profile
    }

  return (
    <div>
        <form className="form" onSubmit={submitHandler}>
            <div>
                <h1>User Profile</h1>
            </div>
            { loading ? ( 
                <LoadingBox></LoadingBox> 
            ) : error ? ( 
                <MessageBox variant="danger">{error}</MessageBox> 
            ) : (
                <>
                    <div>
                        <label htmlFor="name">Nome</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Seu Nome"
                            value={user.name}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Seu email"
                            value={user.email}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="password">Senha</label>
                        <input
                            id="password"
                            type="text"
                            placeholder="Sua Senha"
                            value={user.password}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirme sua Senha</label>
                        <input
                            id="confirmPassword"
                            type="text"
                            placeholder="Confirme sua Senha"
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
