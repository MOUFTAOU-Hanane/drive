import React, { useEffect, useState } from 'react';
import { fetchFilesByEmail } from '../config/firestoreUtils';
import Navbar from './Navbar';
import { getFileDownloadURL } from '../config/urlFile';
import { ref, getDownloadURL} from 'firebase/storage';
import { storage, auth } from '../config/firebase';


const FichiersPartagee = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fileUrl, setFileUrl] = useState(''); 
    const [selectedFile, setSelectedFile] = useState(null); // Nouvel état pour suivre le fichier sélectionné


    useEffect(() => {
        const userEmail = auth.currentUser.email;
        fetchFilesByEmail(userEmail)
            .then((files) => {
                setFiles(files);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching files:', error);
                setLoading(false);
            });
    }, []);

    const getFileDownloadURL = async (fileRef) => {
        try {
            const downloadURL = await getDownloadURL(fileRef);
            return downloadURL;
        } catch (error) {
            console.error('Error getting download URL:', error);
            return null;
        }
    };

    const getFileUrl = async (fileName, senderUID) => {
        try {
            const fileRef = ref(storage, `/files/${senderUID}/${fileName}`);
            const url = await getFileDownloadURL(fileRef); 
            setFileUrl(url);
        } catch (error) {
            console.error('Error getting file URL:', error);
        }
    };


    return (
        <div className=''>
            <Navbar />
            <div className='container mt-4'>
                <div className='row mt-4'>
                    <ul className="list-group">
                        {loading && <p>Chargement en cours...</p>}
                        {!loading && files.length === 0 && <p>Aucun fichier trouvé.</p>}
                        {!loading && files.length > 0 && files.map((file, index) => (
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                {file.file_name}
                                <div>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => getFileUrl(file.file_name, file.send_by)}>Voir</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

export default FichiersPartagee;
