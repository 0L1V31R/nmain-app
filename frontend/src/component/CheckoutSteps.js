import React from 'react';

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
        <div className={props.step1 ? 'active': ''}>Acesso</div>
        <div className={props.step2 ? 'active': ''}>Envio</div>
        <div className={props.step3 ? 'active': ''}>Pagamento</div>
        <div className={props.step4 ? 'active': ''}>Place order</div>
    </div>
  );
}
