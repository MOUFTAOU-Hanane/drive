import React, { useState, useEffect } from 'react';
import { collection, getFirestore, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

import { auth } from '../config/firebase';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './styles.css'; // Importez le fichier CSS

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [email, setEmail] = useState();


    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const userUID = auth.currentUser.uid;
                const usermail = auth.currentUser.email;
                const db = getFirestore();
                const notificationsRef = collection(db, 'shared_files');
                const q = query(notificationsRef, where('email', '==', usermail), where('opened', '==', false));
                const querySnapshot = await getDocs(q);


                const fetchedNotifications = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    opened: false // Ajoutez une propriété 'opened' initialisée à false pour chaque notification
                }));

                setNotifications(fetchedNotifications);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    // Fonction pour marquer une notification comme ouverte
    const markNotificationAsOpened = async (id) => {
        try {
            const db = getFirestore();
            const notificationRef = doc(db, 'shared_files', id);
            await updateDoc(notificationRef, {
                opened: true
            });
            // Mettre à jour localement les notifications après modification dans Firestore
            const updatedNotifications = notifications.map(notification =>
                notification.id === id ? { ...notification, opened: true } : notification
            );
            setNotifications(updatedNotifications);
        } catch (error) {
            console.error('Error marking notification as opened:', error);
        }
    };

    return (
        <div className=''>
            <Navbar />
            <div className="container py-4">
            {notifications.length === 0 ? (
                <p>Aucune notification trouvée.</p>
            ) : (
                notifications.map(notification => (
                    
                    <div key={notification.id} className="row shadow-sm py-2 mb-4 bg-body-light rounded" role="alert">
                        <div className='col-md-11'>
                            <h6 className='text-start'>{notification.sender_name} vient de vous envoyer le fichier {notification.file_name}</h6>
                        </div>   

                        <div className='col-md-1'>

                            <Link to="/send_list"><button className="btn btn-primary" onClick={() => markNotificationAsOpened(notification.id)}>Voir</button></Link>
                        </div>
                       
                    </div>
                    
                    
                    
                ))
            )}
        </div>
        </div>


    );
};


export default Notifications;



