import instance from "../api/http";

export const Authenticate = (data) => {
    return instance.post("/users/login", data);
}

export const CreateAccount = (data) => {
    return instance.post("/users/", data);
}