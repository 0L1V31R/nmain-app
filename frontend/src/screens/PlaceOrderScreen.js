import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CkeckoutSteps from '../component/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';

export default function PlaceOrderScreen(props) {
    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }
    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0): toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const dispatch = useDispatch();
    const placeOrderhandler = () => {
        dispatch(createOrder({...cart, orderItems: cart.cartItems}));
    };
    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET});
        }
    }, [dispatch, order, props.history, success]);

    return (
    <div>
        <CkeckoutSteps step1 step2 step3 step4 ></CkeckoutSteps>
        <div className="row top">
            <div className="col-2">
                <ul>
                    <li>
                        <div className="card card-body">
                            <h2>Enviar para:</h2>
                            <p>
                                <strong>Nome: </strong> {cart.shippingAddress.fullName} <br />
                                <strong>Endereço: </strong> {cart.shippingAddress.address},
                                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, 
                                {cart.shippingAddress.country}
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="card card-body">
                            <h2>Forma de Pagamento:</h2>
                            <p>
                                <strong>Método: </strong> {cart.paymentMethod}
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="card card-body">
                            <h2>Lista de Produtos:</h2>
                            <ul>
                                {cart.cartItems.map((item) => (
                                    <li key={item.product}>
                                        <div className="row">
                                            <div>
                                                <img src={item.image} alt={item.name} className="small"></img>
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div>{item.qty} x ${item.price} = {item.qty * item.price}</div>
                                        </div>
                                    </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>Total do Pedido</h2>
                        </li>
                        <li>
                            <div className="row">
                                <div>Itens</div>
                                <div>${cart.itemsPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Frete</div>
                                <div>${cart.shippingPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Imposto</div>
                                <div>${cart.taxPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>
                                    <strong>Total do Pedido</strong>
                                </div>
                                <div>
                                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                                </div>
                            </div>
                        </li>
                        <li>
                            <button 
                                type="button" 
                                onClick={placeOrderhandler} 
                                className="primary block"
                                disabled={cart.cartItems.length === 0} >
                                Finalizar Pedido
                            </button>
                        </li>
                        {loading && <LoadingBox></LoadingBox>}
                        {error && <MessageBox variant="danger">{error}</MessageBox>}
                    </ul>
                </div>
            </div>
        </div>
    </div>
  );
}
