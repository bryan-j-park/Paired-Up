import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const AdminPage = () => {
    return (
        <div>
            <NavBar />
            <main className="mx-auto max-w-2xl py-10 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-4xl font-bold tracking-tight text-dark-blue">About Us</h1>
                <p className='py-10 text-lg'>Paired Up is a full-stack application created for learning purposes only and is not an actual website.</p>

                <h2 className="text-2xl font-bold tracking-tight text-dark-blue">The Team</h2>
                <h3 className='py-2 text-lg'>Bryan Park</h3>
                <p className='pb-3 text-md'>
                    <a className='text-green hover:text-dark-blue' href="https://www.linkedin.com/in/bryanjpark/" target='_blank' rel="noopener noreferrer">LinkedIn</a> | <a className='text-light-blue hover:text-dark-blue' href="https://github.com/bryan-j-park" target='_blank' rel="noopener noreferrer">Github</a>
                </p>

                <h3 className='py-2 text-lg'>Erwin Rosales</h3>
                <p className='pb-3 text-md'>
                    <a className='text-green hover:text-dark-blue' href="https://www.linkedin.com/in/erwin-rosales-724334253/" target='_blank' rel="noopener noreferrer">LinkedIn</a> | <a className='text-light-blue hover:text-dark-blue' href="https://github.com/Erwin-R" target='_blank' rel="noopener noreferrer">Github</a>
                </p>


                <h3 className='py-2 text-lg'>Gabriela Flores</h3>
                <p className='pb-3 text-md'>
                    <a className='text-green hover:text-dark-blue' href="https://www.linkedin.com/in/gabrielareneflores/" target='_blank' rel="noopener noreferrer">LinkedIn</a> | <a className='text-light-blue hover:text-dark-blue' href="https://github.com/floresgabriela" target='_blank' rel="noopener noreferrer">Github</a>
                </p>

                <h2 className="text-2xl font-bold tracking-tight text-dark-blue pt-4">Built With</h2>
                <ul className='pb-3 text-md'>
                    <li>MERN</li>
                    <li>Stripe API</li>
                    <li>Tailwind CSS</li>
                </ul>

            </main>
            <Footer />
        </div>
    );
}

export default AdminPage;