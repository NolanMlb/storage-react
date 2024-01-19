import { UploadFile } from "../services/FileService"; // Adjust this import based on your actual service
import PropTypes from 'prop-types';
import { useState } from 'react';

export const AddFile = ({idBucket, onFileUpload}) => {
    AddFile.propTypes = {
        idBucket: PropTypes.string.isRequired,
        onFileUpload: PropTypes.func.isRequired
    };
    // const navigate = useNavigate();
    const [dragStatus, setDragStatus] = useState('Glissez et déposez vos fichiers ici');

    const handleDrop = async (e) => {
        e.preventDefault();
        setDragStatus('Traitement du fichier...');
        const files = e.dataTransfer.files;
        const formData = new FormData();
        // Add all files to formData
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        try {
            const response = await UploadFile(idBucket.toString(), formData);
            onFileUpload(response.data);
            setDragStatus('Fichiers téléchargés avec succès ✅');
        } catch (error) {
            console.error("Erreur lors du téléchargement du fichier:", error);
            alert('Erreur lors du téléchargement du fichier');
        } finally {
            setTimeout(() => {
                setDragStatus('Glissez et déposez vos fichiers ici');
            }, 2000);
        }
    }
    
    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDragEnter = () => {
        setDragStatus('Relâchez pour déposer vos fichiers');
    }

    const handleDragLeave = () => {
        setDragStatus('Glissez et déposez vos fichiers ici');
    }

    return (
        <div className="col-lg-12">
            <div 
                onDrop={handleDrop} 
                onDragOver={handleDragOver} 
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                className="card-style mb-30" 
                style={{ border: '2px dashed grey', minWidth: '50vw' }}
            >
                {dragStatus}
            </div>
        </div>
    );
};