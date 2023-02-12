import React, {useState, useEffect} from "react";
import axios from 'axios';
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from 'react-router-dom';
import NewLogin from "../components/NewLogin";

const RegisterPage = () => {

    return(
        <div>
            <RegisterForm />
        </div>
    );
}

export default RegisterPage;