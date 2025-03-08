import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home(){
    return (
        <div>
            <ToastContainer/>
            <h1 >User Enquiry</h1>
        </div>
    );
}