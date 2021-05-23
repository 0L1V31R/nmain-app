import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../component/CheckoutSteps';

export default function ShippingAddressScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!userInfo) {
        props.history.push('/signin');
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        // Todo: dispatch save shipping address action
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}));
        props.history.push('/payment');
    };
    
  return (
    <div>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <form className="form" onSubmit={submitHandler}>
            <div>
                <h1>Endereço de Envio</h1>
            </div>
            <div>
                <label htmlFor="fullName">Nome Completo</label>
                <input
                    type="text"
                    id="fullName"
                    placeholder="Digite seu nome completo"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required></input>
            </div>
            <div>
                <label htmlFor="address">Endereço</label>
                <input
                    type="text"
                    id="address"
                    placeholder="Digite seu endereço"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required></input>
            </div>
            <div>
                <label htmlFor="city">Cidade</label>
                <input
                    type="text"
                    id="city"
                    placeholder="Digite sua cidade"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required></input>
            </div>
            <div>
                <label htmlFor="postalCode">CEP</label>
                <input
                    type="text"
                    id="postalCode"
                    placeholder="Digite seu CEP"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required></input>
            </div>
            <div>
                <label htmlFor="country">País</label>
                <input
                    type="text"
                    id="country"
                    placeholder="Digite o País"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required></input>
            </div>
            <div>
                <label />
                <button className="primary" type="submit">
                    Proseguir
                </button>
            </div>
        </form>
    </div>
  );
}
