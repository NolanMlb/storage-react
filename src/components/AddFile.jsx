import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UploadFile } from "../services/FileService"; // Adjust this import based on your actual service
import PropTypes from 'prop-types';

export const AddFile = (props) => {
    AddFile.propTypes = {
        bucketId: PropTypes.string.isRequired,
    };
    const { handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const bucketId = props.bucketId.toString();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const onSubmit = async () => {
        if (!selectedFile) {
            alert('Veuillez sélectionner un fichier!');
            return;
        }
        
        const formData = new FormData();
        formData.append('file', selectedFile);

        await UploadFile(bucketId, formData); // Adjust this function based on your actual service
        alert('Le fichier a été téléchargé avec succès');
        navigate("/dashboard");
    };

    return (
        <div className="col-lg-12">
            <div className="card-style mb-30">
                <div className="table-wrapper">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-12">
                                <div className="input-style-1">
                                    <label>Fichier</label>
                                    <input 
                                        type="file" 
                                        onChange={handleFileChange}
                                    />
                                    {errors.file && <span>Un fichier est requis</span>}
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="button-group d-flex justify-content-center flex-wrap">
                                    <button
                                        type="submit"
                                        className="main-btn primary-btn btn-hover w-100 text-center"
                                    >
                                        Télécharger
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};