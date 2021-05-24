export function setCookie(name: string, val: string) {
    if(val == null) return;
    const date = new Date();
    const value = val;

    // Set it expire in 120 days
    date.setTime(date.getTime() + (120 * 24 * 60 * 60 * 1000));

    // Set it
    const cookieValue =`${name}=${value}; expires=${date.toUTCString()}; path=/`;
    document.cookie = cookieValue;
}

export function getCookie(name: string) {
    const value = `;${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
    return null;
}

export function deleteCookie(name: string) {
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = `${name}=; expires=${date.toUTCString()}; path=/`;
}

export const LamaCookieName = "lamafriend"