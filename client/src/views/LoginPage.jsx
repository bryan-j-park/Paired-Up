import React, {useState, useEffect} from "react";
import axios from 'axios';
import LoginForm from "../components/LoginForm";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    return(
        <div>
            <LoginForm />
        </div>
    );
}

export default LoginPage;