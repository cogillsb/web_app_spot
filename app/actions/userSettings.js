"use server";

import { cookies } from 'next/headers';

export async function setUserSettings(items) {
    const cookiesList = cookies();
    for (const [key, value] of Object.entries(items)) {
        cookiesList.set({
            name: key,
            value: value,
            path: '/',
            maxAge: 60 * 60 * 24 * 365 * 10,
        })       
    }
};

export async function getCookie(tag) {
    const cookiesList = cookies();
    const myHttpOnlyCookie = cookiesList.get(tag);
    if (myHttpOnlyCookie) {
        return myHttpOnlyCookie.value;
    } else {
        if (tag=="refreshToken"){
        return "none";
        } else {
            return undefined;
        }
    }
}



