'use client'

import { useEffect } from 'react';

const Toast = ({ message, duration = 3000, onClose } : any) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className="toast">
            {message}
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default Toast;
