import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import CustomNavbar from './Header';
import Footer from './Footer';  // Import the Footer component
import { GlobalProvider } from '../context/GlobalContext';
import hospitalFooter from '../pages/hospitalfooter';

export default function RootLayout() {
    const location = useLocation();
    const pathname = location.pathname;

     const NavbarRoutes = ['/','about/','contact/']

    return (
        <div lang="en">
            <title>Dashboard</title>
            <body>
                <GlobalProvider>
                    {NavbarRoutes.includes(pathname) ? (
                        <>
                            <CustomNavbar logoSrc="/assets/images/logo.svg" variant="cs_heading_color"/>
                            <main>
                                <Outlet />
                            </main>
                            <Footer />  {/* Add the Footer here */}
                        </>
                    ) : (
                        <>
                        <CustomNavbar logoSrc="/assets/images/logo.svg" variant="cs_heading_color"/>
                                                  
                        <main>
                            <Outlet />
                        </main>
                        {/* <hospitalFooter></hospitalFooter> */}
                        </>
                       
                    )}
                </GlobalProvider>
            </body>
        </div>
    );
}
