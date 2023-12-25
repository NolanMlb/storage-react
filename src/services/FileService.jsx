import instance from "../api/http";

export const UploadFile = (bucketId, data) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    return instance.post(`/buckets/${bucketId}/file`, data, config);
}
