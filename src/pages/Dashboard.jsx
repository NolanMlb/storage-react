import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetBuckets } from '../services/BucketService';
import { BucketList } from '../components/Bucket/BucketList';

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

            <BucketList buckets={buckets} />
        </div>
    );
};
