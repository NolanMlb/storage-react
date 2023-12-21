import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetBucketData } from "../services/BucketService";

export const Bucket = () => {
    const [bucket, setBucket] = useState([]);
    const { idBucket } = useParams();

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
            <Link to={`/dashboard`} className="main-btn primary-btn btn-hover mb-10">
                Retour à liste
            </Link>
            </div>
        </div>

        <div className="card-style mb-30">
            {bucket.files && bucket.files.length > 0 ? (
                <div className="row">
                    {bucket.files.map((file) => (
                        <div key={file.id}>
                            <Link to={`/buckets/${file.id}`} >
                                <div className="row icon-card mb-10" role='button'>
                                    <div className="col mb-20 d-flex justify-content-center">
                                        <div className='icon blue'>
                                            {file.label.split('.').pop() === 'png' ? (
                                                <i className="bi bi-filetype-png" style={{fontSize: '3rem'}} />
                                            ) : file.label.split('.').pop() === 'pdf' ?(
                                                <i className="bi bi-filetype-pdf" style={{fontSize: '3rem'}} />
                                            ) : (
                                                <i className="bi bi-file-earmark" style={{fontSize: '3rem'}} />
                                            )}
                                        </div>
                                    </div>
                                    <div className="col content">
                                        <h6 className="mb-10">{file.label}</h6>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Pas de fichiers dans ce bucket.</p>
            )}
        </div>
        </>
    );
}