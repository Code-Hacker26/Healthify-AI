import React, { useContext } from 'react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import GlobalContext from '../../context/GlobalContext';
import useApiHelper from '../../api';

const CustomNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const api = useApiHelper();
    const gContext = useContext(GlobalContext);

    const handleLogout = () => {
        api.logout().then(() => {
            Cookies.remove('accessToken');
            gContext.setUser({});
            gContext.setIsLoggedIn(false);
            navigate('/');
        }).catch(() => {
            Cookies.remove('accessToken');
            gContext.setUser({});
            gContext.setIsLoggedIn(false);
            navigate('/');
        });
    };

    return (
        <div className='border-b'>
            <Navbar className="max-w-screen-xl mx-auto" rounded>
                <Navbar.Brand onClick={() => navigate('/')} href="#">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Predico</span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img="https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png" rounded />
                        }
                    >
                        {gContext?.isLoggedIn && <>
                            <Dropdown.Header>
                                <span className="block text-sm">
                                    {gContext?.user?.is_patient ? gContext?.user?.patient?.name : gContext?.user?.doctor?.name}
                                </span>
                                <span className="block truncate text-sm font-medium">{gContext?.user?.email}</span>
                            </Dropdown.Header>
                            {gContext?.user?.is_patient ? (
                                <Dropdown.Item onClick={() => navigate(`/profile/patient/${gContext?.user?.patient?.pk}`)}>Profile</Dropdown.Item>
                            ) : (
                                <Dropdown.Item onClick={() => navigate(`/profile/doctor/${gContext?.user?.doctor?.pk}`)}>Profile</Dropdown.Item>
                            )}
                            {gContext?.user?.is_patient &&
                                <Dropdown.Item onClick={() => navigate('/predict')}>Check Disease</Dropdown.Item>}
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
                        </>}
                    </Dropdown>
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Navbar.Link onClick={() => navigate('/')} href="#" active={location.pathname === '/'}>
                        Home
                    </Navbar.Link>
                    <Navbar.Link active={location.pathname === '/about'} href="#">About</Navbar.Link>
                    <Navbar.Link active={location.pathname === '/contact'} href="#">Contact</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default CustomNavbar;
