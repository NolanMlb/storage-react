import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const BucketList = ({buckets}) => {
    BucketList.propTypes = {
        buckets: PropTypes.array.isRequired
    };

    return (
        <div>
            { buckets.length > 0 ? (
                <div className="row align-items-center">
                    {buckets.map((bucket) => (
                        <div className="col-lg-4 col-sm-6 w-50 mb-30" key={bucket.id} style={{height: '150px'}}>
                            <Link to={`/buckets/${bucket.id}`} className='w-100 h-100'>
                                <div className="icon-card h-100">
                                    <div className="icon blue">
                                        <i className="lni lni-folder"></i>
                                    </div>
                                    <div className="row w-100 justify-content-start text-black">
                                        <div className="fw-bold ">{bucket.label}</div>
                                        <span className="fw-lighter">{bucket.description}</span>
                                        <span className="text-sm text-success">
                                            {bucket.files.length} fichiers
                                        </span>
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
}