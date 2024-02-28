import { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, auth } from '../config/firebase';
import Navbar from '../page/Navbar';
import { onAuthStateChanged } from 'firebase/auth'; 
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [file, setFile] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => unsubscribe();
    }, []);

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

   

    const onFileUpload = async () => {
        if (!file || !currentUser) {
            alert('Please select a file and provide a title.');
            return;

        }

        const userUID = currentUser.uid;
        const storageRef = ref(storage, `/files/${userUID}/${file.name}`);
        navigate('/list')
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Handle progress here
            },
            (error) => {
                console.error(error);
                alert('Error uploading file.');
            },
            () => {
                // Handle successful upload here
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    // You can use the downloadURL to display the file or save it to your database
                });
            }
        );
    };

    return (
        <div className='container'>
            <Navbar />
            <div className='row mt-4'>
            <div className='col-lg-3 mb-3 mb-sm-0'>
                  
                </div>
                <div className='col-lg-6 mb-3 mb-sm-0'>
                    <div className='card'>
                        <div className='card-body text-end'>
                            <form>
                                <div className='mb-3'>
                                    <input className='form-control' type='file' onChange={onFileChange} />
                                </div>
                                <button type='button' className='btn btn-primary' onClick={onFileUpload}>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;
