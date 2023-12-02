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
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="title">
                            <h2>Dossiers</h2>
                        </div>
                    </div>
                    <div className="menu-toggle-btn mr-15">
                        <Link to="/dashboard/addBucket" className="main-btn primary-btn btn-hover">
                            Ajouter
                        </Link>
                    </div>
                </div>
            </div>

            {buckets.length > 0 ? (
                <div className="row">
                    {buckets.map((bucket) => (
                        <div className="col-xl-3 col-lg-4 col-sm-6" key={bucket.id}>
                            <div className="icon-card mb-30">
                                <div className="icon purple">
                                    <i className="lni lni-cart-full"></i>
                                </div>
                                <div className="content">
                                    <h6 className="mb-10">{bucket.label}</h6>
                                    <h3 className="text-bold mb-10">{bucket.description}</h3>
                                    <p className="text-sm text-success">
                                        <i className="lni lni-arrow-up"></i> ... fichiers
                                        <span className="text-gray">(30 days)</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No buckets available.</p>
            )}
        </div>
    );
};
