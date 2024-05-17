import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetBuckets } from '../services/BucketService';

export const Dashboard = () => {
    const [buckets, setBuckets] = useState([]);

    useEffect(() => {
        const fetchBuckets = async () => {
            try {
                const response = await GetBuckets();
                setBuckets(response.data);
            } catch (error) {
                console.error('Error fetching buckets', error);
            }
        };

        fetchBuckets();
    }, []);

    return (
        <div>
            <div className="title-wrapper pt-30">
                <div className="row align-items-center justify-content-center">
                    <div className="col-md-6">
                        <div className="title text-center">
                            <h2>Vos dossiers</h2>
                        </div>
                    </div>
                    <div className="menu-toggle-btn mr-15">
                        <Link to="/dashboard/addBucket" className="main-btn primary-btn btn-hover mb-10">
                            Ajouter
                        </Link>
                    </div>
                </div>
            </div>

            {buckets.length > 0 ? (
                <div className="row">
                    {buckets.map((bucket) => (
                        <div className="col-lg-4 col-sm-6" key={bucket.id}>
                            <Link to={`/buckets/${bucket.id}`} className='w-100'>
                                <div className="icon-card mb-30" role='button'>
                                    <div className="icon blue">
                                        <i className="lni lni-folder"></i>
                                    </div>
                                    <div className="content">
                                        <h6 className="mb-10">{bucket.label}</h6>
                                        <h3 className="text-bold mb-10">{bucket.description}</h3>
                                        <p className="text-sm text-success">
                                            {bucket.files.length} fichiers
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No buckets available.</p>
            )}
        </div>
    );
};
