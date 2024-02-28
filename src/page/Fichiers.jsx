import React, { useState, useEffect , useRef} from 'react';
import { ref, listAll, deleteObject } from 'firebase/storage';
import { storage } from '../config/firebase';
import Navbar from './Navbar';
import { auth } from '../config/firebase';
import { getFileDownloadURL } from '../config/urlFile';
import { addDoc, collection, getFirestore, getDocs, serverTimestamp } from 'firebase/firestore'; 



const Fichiers = () => {
    const [fileList, setFileList] = useState([]);
    const [email, setEmail] = useState('');
    const [selectedFileName, setSelectedFileName] = useState(''); 
    const [fileUrl, setFileUrl] = useState('');
    const [users, setUsers] = useState([]);
    const [showUserList, setShowUserList] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);


    const userUID = auth.currentUser.uid;
    const getFileList = async () => {
        try {   
            const filesRef = ref(storage, `/files/${userUID}/`);
            const filesList = await listAll(filesRef);
            const fileNames = filesList.items.map((item) => item.name);
            setFileList(fileNames);
        } catch (error) {
            console.error('Error fetching file list:', error);
        }
    };

    useEffect(() => {
        getFileList();

        const fetchUsers = async () => {
            const db = getFirestore();
            const usersCollection = collection(db, 'users');
            
            try {
              const querySnapshot = await getDocs(usersCollection);
              const usersData = querySnapshot.docs.map(doc => doc.data());
              setUsers(usersData);
            } catch (error) {
              console.error('Error fetching users:', error);
            }
          };
      
          fetchUsers();

          

    }, []);

    const getFileUrl = async (fileName) => {
        try {
            const url = await getFileDownloadURL(fileName); 
            setFileUrl(url);
        } catch (error) {
            console.error('Error getting file URL:', error);
        }
    };
    const deleteFile = async (fileName) => {
        try {
            const fileRef = ref(storage, `/files/${userUID}/${fileName}`);
            await deleteObject(fileRef);
            alert("Fichier supprimé avec succès.");
            // Rechargez la liste des fichiers après la suppression
            getFileList();
        } catch (error) {
            console.error('Error deleting file:', error);
            alert("Une erreur s'est produite lors de la suppression du fichier.");
        }
    };
    

    

    

    const handleEmailFocus = () => {
        setShowUserList(true);
    };

    // const handleUserCheckboxChange = (userEmail) => {
    //     setSelectedUsers(prevState => {
    //         if (prevState.includes(userEmail)) {
    //             return prevState.filter(email => email !== userEmail);
    //         } else {
    //             return [...prevState, userEmail];
    //         }
    //     });
    // };

    const handleUserCheckboxChange = (userEmail) => {
        setSelectedUsers(prevState => {
            let updatedUsers = [...prevState];
            if (updatedUsers.includes(userEmail)) {
                // Désélectionner l'utilisateur et le retirer de la liste
                updatedUsers = updatedUsers.filter(email => email !== userEmail);
            } else {
                // Sélectionner l'utilisateur et l'ajouter à la liste
                updatedUsers.push(userEmail);
            }
            // Mettre à jour l'état de l'e-mail avec les e-mails sélectionnés
            setEmail(updatedUsers.join(','));
            return updatedUsers;
        });
    };
    

    const sendFile = async (e) => {
        e.preventDefault();

        try {
            const db = getFirestore();
            await Promise.all(selectedUsers.map(async userEmail => {
                await addDoc(collection(db, "shared_files"), {
                    email: userEmail,
                    file_name: selectedFileName,
                    send_by: auth.currentUser.uid,
                    sender_name: auth.currentUser.email,
                    date: serverTimestamp(),
                    opened: false
                });
            }));
            setEmail('');
            setSelectedUsers([]);
            alert("fichier envoyé");
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };
    

    return (
        <div className=''>
            <Navbar />
            <div className='container mt-4'>
                <div className='row mt-4'>
                    {fileList.length === 0 ? (
                        <p>Aucun fichier trouvé.</p>
                    ) : (
                        <ul className="list-group">
                            {fileList.map((fileName, index) => (
                                <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                    {fileName}
                                    <div className='row'>
                                        <div className='col'> <button type="button" className="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setSelectedFileName(fileName)}>Partager</button></div>
                                        <div className='col'><button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={() => getFileUrl(fileName)}>Voir</button></div>
                                        <div className='col'><button type="button" className="btn btn-danger mx-2" onClick={() => deleteFile(fileName)}>Supprimer</button></div>  
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Partager le fichier</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="text-start">
                                <input
                                    type="text"
                                    className="form-control"
                                    aria-describedby="emailHelp"
                                    label="Email"
                                    value={email}
                                    onFocus={handleEmailFocus} 
                                    required
                                />
                                <div className='my-4 '>
                                    {showUserList && (
                                        <ul className="list-group  shadow-lg">
                                            {users.map((user, index) => (
                                                <li className="list-group-item" key={index}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        onChange={() => handleUserCheckboxChange(user.email)}
                                                        checked={selectedUsers.includes(user.email)}
                                                    />
                                                     <label className=" mx-2 form-check-label" > {user.email}</label>
                                                   
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={sendFile}>Partager</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Contenu du fichier</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <iframe src={fileUrl} width="100%" height="600px" title="File preview"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Fichiers;
