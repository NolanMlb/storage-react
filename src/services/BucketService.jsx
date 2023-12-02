import instance from "../api/http";

export const CreateBucket = (data) => {
    return instance.post("/buckets/", data);
}

export const GetBuckets = () => {
    return instance.get("/buckets/");
}