import { Types } from "mongoose";

export const mapId = (value: any): string => {
    if (!value) return value;

    if (typeof value === "string") return value;

    if (value instanceof Types.ObjectId) {
        return value.toString();
    }

    if (value._id) {
        return value._id.toString();
    }

    return value;
};

export const mapRelation = <T>(
    value: any,
    mapper: (doc: any) => T
): string | T => {

    if (!value) return value;

    if (typeof value === "string") return value;

    if (value instanceof Types.ObjectId) {
        return value.toString();
    }

    if (value._id) {
        return mapper(value);
    }

    return value;
};

export const mapArray = <T, R>(
    arr: T[] | undefined,
    mapper: (item: T) => R
): R[] | undefined => {

    if (!arr) return undefined;

    return arr.map(mapper);
};
