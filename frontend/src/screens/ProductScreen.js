import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../component/Rating';
import data from '../data';

export default function ProductScreen(props) {
  const product = data.product.find((x) => x._id === props.match.params.id);
  if(!product) {
    return <div>Product Not Found</div>
  }
  return (
  <div>
    <Link to="/">Voltar Tela Principal</Link>
    <div className="row">
      <div className="col-2">
        <img className="large" src={product.image} alt={product.name}></img>
      </div>
      <div className="col-1">
        <ul>
          <li>
            <h1>{product.name}</h1>
          </li>
          <li>
            <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
          </li>
          <li>Preço : ${product.price}</li>
          <li>
            Description:
            <p>{product.description}</p>
          </li>
        </ul>
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <div className="row">
                <div>Preço</div>
                <div className="price">${product.price}</div>
              </div>
            </li>
            <li>
            <div className="row">
                <div>Situação</div>
                <div>
                  {product.countInStock>0? (
                    <span className="success">Em Estoque</span>
                  ) : (
                    <span className="error">Esgotado</span>
                  )}
                </div>
              </div>
            </li>
            <li>
              <button className="primary block">Adicionar ao carrinho</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  );
}
