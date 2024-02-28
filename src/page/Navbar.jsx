import { Link } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';



const Navbar = () => {
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        fetchNotifications();
    }, []); 

    const fetchNotifications = async () => {
        try {
            const userMail = auth.currentUser.email;
            const db = getFirestore();
            const notificationsRef = collection(db, 'shared_files');
            const q = query(notificationsRef, where('email', '==', userMail), where('opened', '==', false));
            const querySnapshot = await getDocs(q);
            const count = querySnapshot.docs.length;
            setNotificationCount(count);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    return (
        <div className=''>
            <nav className='navbar navbar-expand-lg bg-body-tertiary'>
                <div className='container'>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarSupportedContent'
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-between w-100'>
                            <li className='nav-item mx-4'>
                                <a className='nav-link'>
                                    <Link to="/home">Acceuil</Link>
                                </a>
                            </li>
                            <li className='nav-item mx-4 text-dark'>
                                <a className='nav-link'>
                                    <Link to="/list"> Mes Fichiers</Link>
                                </a>
                            </li>
                            <li className='nav-item mx-4 text-dark'>
                                <a className='nav-link'>
                                    <Link to="/send_list">Fichiers Partagés</Link>
                                </a>
                            </li>
                            <li className='nav-item mx-4 text-dark'>
                              <a  className="nav-link position-relative">
                              <Link to="/notifications"> Notification</Link>
                                    {notificationCount > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {notificationCount}
                                        </span>
                                    )}
                             </a>

                        
                            </li>
                            <li className='nav-item mx-4 text-dark'>
                                <a className='nav-link'>
                                    <Link to="/profil"> Profil</Link>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
