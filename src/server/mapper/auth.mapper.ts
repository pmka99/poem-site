import { IUser } from "@/server/models/user";
import { SignInResponse, SignUpResponse } from "@/shared/types/auth.type";
import { mapId } from "../utils/mapper";

export const toSignInResponse = (doc: IUser): SignInResponse => ({
    id: mapId(doc._id),
    username: doc.username,
    phoneNumber: doc.phoneNumber,
});

export const toSignUpResponse = (doc: IUser): SignUpResponse => ({
    id: mapId(doc._id),
    username: doc.username,
    phoneNumber: doc.phoneNumber,
});
