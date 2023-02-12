import React from 'react';
import AdminForm from '../components/AdminForm';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const AdminPage = () => {
    return (
        <div>
            <NavBar />
            <AdminForm/>
            <Footer />
        </div>
    );
}

export default AdminPage;