import React from 'react';
import PaymentMethod from './payMethod';

const PaymentMethodsComponent: React.FC = () => {
  return (
    <>
      <div>
        <div>
          <div className="p-4 flex justify-center">
            <PaymentMethod
              imageSrc='CardCredit'
              title="Todos los medios de pago"
              description="trud nisi nostrud nostrud incididunt fugiat. Enim nostrud tempor cillum ea velit."
            />
            <PaymentMethod
              imageSrc='Truck'
              title="Envio a todo el pais"
              description="trud nisi nostrud nostrud incididunt fugiat. Enim nostrud tempor cillum ea velit."
            />
            <PaymentMethod
              imageSrc='Shield'
              title="Compra Segura"
              description="trud nisi nostrud nostrud incididunt fugiat. Enim nostrud tempor cillum ea velit."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentMethodsComponent;

