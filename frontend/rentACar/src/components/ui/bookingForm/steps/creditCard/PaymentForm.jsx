import React, { useState, useRef } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData
} from "./utils";

const PaymentForm = () => {
    const [state, setState] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        issuer: "",
        focused: "",
        formData: null
    });


    const formRef = useRef(null);

    const handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            setState(prevState => ({ ...prevState, issuer }));
        }
    };

    const handleInputFocus = ({ target }) => {
        setState(prevState => ({ ...prevState, focused: target.name }));
    };

    const handleInputChange = ({ target }) => {
        let value = target.value;

        if (target.name === "number") {
            value = formatCreditCardNumber(value);
        } else if (target.name === "expiry") {
            value = formatExpirationDate(value);
        } else if (target.name === "cvc") {
            value = formatCVC(value);
        } else if (target.name === "name") {
            value = value.replace(/[^A-Za-z ]/g, ''); // Sadece harfleri ve boşlukları kabul et
        }

        setState(prevState => ({ ...prevState, [target.name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        const { issuer } = state;
        const formData = [...e.target.elements]
            .filter(d => d.name)
            .reduce((acc, d) => {
                acc[d.name] = d.value;
                return acc;
            }, {});

        setState(prevState => ({ ...prevState, formData }));
        console.log("Form Data:", state);
        formRef.current.reset();
    };

    const { name, number, expiry, cvc, focused, issuer, formData } = state;

    return (
        <div key="Payment">
            <div className="App-payment ">
                <Cards
                    number={number}
                    name={name}
                    expiry={expiry}
                    cvc={cvc}
                    focused={focused}
                    callback={handleCallback}
                />
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="form-group mb-4 mt-4">
                        <input
                            type="text"
                            id="number"
                            name="number"
                            className="form-control"
                            placeholder="Enter Card Number"
                            pattern="\d*"
                            maxLength="16"
                            required
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                        />
                    </div>
                    <div className="form-group mb-4">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            placeholder="Enter Name"
                            pattern="[A-Za-z ]+"
                            required
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                        />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <input
                                type="text"
                                id="expiry"
                                name="expiry"
                                className="form-control"
                                placeholder="MM/YY"
                                maxLength="4"
                                required
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                            />
                        </div>
                        <div className="col-6">
                            <input
                                type="number"
                                id="cvc"
                                name="cvc"
                                className="form-control"
                                placeholder="CVC"
                                pattern="\d{3,4}"
                                maxLength="3"
                                required
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                            />
                        </div>
                    </div>
                    <input type="hidden" name="issuer" value={issuer} />
                    {/* <div className="form-actions">
                        <button type="submit" className="btn btn-primary btn-block">PAY</button>
                    </div> */}
                </form>

                {/* Girilen bilgileri ekrana yazdırmak için */}
                {/* {formData && (
                    <div className="App-highlight">
                        {formatFormData(formData).map((d, i) => (
                            <div key={i}>{d}</div>
                        ))}
                    </div>
                )} */}

                <hr style={{ margin: "60px 0 30px" }} />
            </div>
        </div>
    );

};

export default PaymentForm;

