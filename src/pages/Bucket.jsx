import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { GetBucketData } from "../services/BucketService";
import { AddFile } from '../components/AddFile';
import { getFile, deleteFile } from '../services/FileService';

export const Bucket = () => {
    const [bucket, setBucket] = useState([]);
    const { idBucket } = useParams();
    const [fileUrl, setFileUrl] = useState(null);
    const [fileType, setFileType] = useState('');
    const [fileContent, setFileContent] = useState(null);
    const defaultImageType = ['application/png', 'application/jpg'];

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

    const resetFileData = () => {
        setFileUrl(null);
        setFileType('');
        setFileContent(null);
    }

    const openFile = async (fileName, fileExtension) => {
        try {
            resetFileData();
            const response = await getFile(fileName + '.' + fileExtension);
            const file = new Blob([response.data], { type: `application/${fileExtension}` });
            const objectURL = URL.createObjectURL(file);
            setFileUrl(objectURL);
            const reader = new FileReader();
            reader.onloadend = function() {
                setFileContent(reader.result);
                setFileType(file.type);
            };
            if (defaultImageType.includes(file.type)) {
                reader.readAsDataURL(file);
            } else if (file.type === 'application/pdf') {
                reader.readAsArrayBuffer(file);
            } else {
                reader.readAsText(file); // Fallback if it's neither an image nor PDF
            }
        } catch (error) {
            console.error('Error opening file', error);
        }
    };

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

    const renderFileContent = () => {
        if (!fileContent) return null;
        if (defaultImageType.includes(fileType)) {
            return <img src={fileContent} alt="File content" style={{ width: '100%' }} />;
        } else if (fileType === 'application/pdf') {
            return <embed src={fileUrl} style={{ width: '100%', height: '100vh' }}/>;
        } else {
            return <textarea value={fileContent} readOnly style={{ width: '100%', height: '100vh' }} />;
        }
    };

    return (
        <div className='bg-primary'>
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
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Icône</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Type</th>
                            <th scope="col">Taille</th>
                            <th scope="col">Date de création</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bucket.files && bucket.files.length > 0 ? (
                            bucket.files.map((file) => (
                                <tr key={file.id} onClick={() => openFile(file.createdAt, file.extension)} style={{ cursor: 'pointer' }} className="hover:bg-gray-200">
                                    <td className='text-primary'>
                                        <i className={getIcon(file)} style={{fontSize: '2rem'}} />
                                    </td>
                                    <th>{file.label.split('.').shift()}</th>
                                    <td>{file.extension}</td>
                                    <td>{file.size} Ko</td>
                                    <td>{file.createdAt}</td>
                                    <td>
                                        <button onClick={() => removeFile(file.id)} className='btn btn-danger'>
                                            <i className="bi bi-trash" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">Pas de fichiers dans ce bucket.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {fileContent && renderFileContent()}
        </div>
    );
}