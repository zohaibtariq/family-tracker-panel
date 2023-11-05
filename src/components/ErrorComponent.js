import React from 'react';

const ErrorComponent = ({ errors }) => {
    let errorList = errors;
    if (typeof errors === 'string') {
        errorList = [errors];
    }

    return (
        <div className="error">
            <ul>
                {errorList.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>
        </div>
    );
};

export default ErrorComponent;
