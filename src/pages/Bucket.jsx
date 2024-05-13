import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { GetBucketData } from "../services/BucketService";
import { AddFile } from '../components/AddFile';
import { getFile, deleteFile } from '../services/FileService';

export const Bucket = () => {
    const [bucket, setBucket] = useState([]);
    const { idBucket } = useParams();
    const [fileUrl, setFileUrl] = useState(null);

    useEffect(() => {
        const fetchBuckets = async () => {
            try {
                const response = await GetBucketData(idBucket);
                setBucket(response.data);
            } catch (error) {
                console.error('Error fetching buckets', error);
            }
        };

        fetchBuckets();
    }, []);

    const handleFileUpload = (uploadedFiles) => {
        setBucket(prevBucket => ({
            ...prevBucket,
            files: [...prevBucket.files, ...uploadedFiles]
        }));
    };

    const openFile = async (fileName) => {
        const response = await getFile(fileName);
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const objectURL = URL.createObjectURL(blob);
        setFileUrl(objectURL);
    }

    const removeFile = async (fileId) => {
        await deleteFile(idBucket, fileId).then(() => {
            setBucket(prevBucket => ({
                ...prevBucket,
                files: prevBucket.files.filter(file => file.id !== fileId)
            }));
        });
    }

    const getIcon = (file) => {
        if (file.label.split('.').pop() === 'png') {
            return "bi bi-filetype-png";
        } else if (file.label.split('.').pop() === 'pdf') {
            return "bi bi-filetype-pdf";
        } else if (file.label.split('.').pop() === 'xlsx') {
            return "bi bi-filetype-xlsx";
        } else if (file.label.split('.').pop() === 'xml') {
            return "bi bi-filetype-xml";
        } else if (file.label.split('.').pop() === 'jpg') {
            return "bi bi-filetype-jpg";
        } else {
            return "bi bi-file-earmark";
        }
    }

    return (
        <>
        <div className="title-wrapper pt-30">
            <div className="row align-items-center">
            <div>
                <div className="title">
                <h2>Vos fichiers</h2>
                </div>
            </div>
            </div>
        </div>
        <div className="col-lg-12">
            <div className="menu-toggle-btn mr-15">
                <AddFile idBucket={idBucket} onFileUpload={handleFileUpload}/>
            </div>
        </div>

        <div className="card-style mb-30">
            {bucket.files && bucket.files.length > 0 ? (
                <div className="row row-cols-2">
                    {bucket.files.map((file) => (
                        <div key={file.id}>
                            <div className="col icon-card mb-10" role='button'>
                                <div className="col mb-20 d-flex justify-content-center">
                                    <div className='icon blue'>
                                        <i className={getIcon(file)} style={{fontSize: '3rem'}} />
                                    </div>
                                </div>
                                <div className="col content" onClick={() => openFile(file.label)}>
                                    <h6 className="mb-10">{file.label}</h6>
                                </div>
                                <div className="col content">
                                    <button onClick={() => removeFile(file.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Pas de fichiers dans ce bucket.</p>
            )}
            {fileUrl && <iframe src={fileUrl} style={{ width: '100%', height: '100vh' }} />}
        </div>
        </>
    );
}