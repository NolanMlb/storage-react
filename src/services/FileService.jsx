import instance from "../api/http";

export const UploadFile = (bucketId, data) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    return instance.post(`/buckets/${bucketId}/files`, data, config);
}

export const getFile = (fileName) => {
    return instance.get(`/files/${fileName}`, { responseType: 'blob' });
}

export const deleteFile = (bucketId, fileId) => {
    return instance.delete(`/buckets/${bucketId}/files/${fileId}`);
}