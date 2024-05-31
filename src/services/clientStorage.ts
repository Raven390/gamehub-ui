// Получение элемента из локального хранилища
export const getItem = (name: string) => {
    const data = window.localStorage.getItem(name);
    return data ? JSON.parse(data) : undefined;
};

// Удаление элемента из локального хранилища
export const removeItem = (name: string) =>
    window.localStorage.removeItem(name);

// Установка элемента в локальное хранилище
export const setItem = (name: string, value: string) => {
    if (value) {
        window.localStorage.setItem(name, JSON.stringify(value));
    }
};

// Очистка всего локального хранилища
export const clearAll = () => window.localStorage.clear();

// Получение элемента из сессионного хранилища
export const getSessionItem = (name: string) => {
    const data = window.sessionStorage.getItem(name);
    return data ? JSON.parse(data) : undefined;
};

// Удаление элемента из сессионного хранилища
export const removeSessionItem = (name: string) =>
    window.sessionStorage.removeItem(name);

// Установка элемента в сессионное хранилище
export const setSessionItem = (name: string, value: object) => {
    value ?
        window.sessionStorage.setItem(name, JSON.stringify(value))
        : window.sessionStorage.removeItem(name);
    // Создание события изменения хранилища для оповещения других вкладок
    const storageEvent =
        new StorageEvent('storage', { storageArea: sessionStorage });
    window.dispatchEvent(storageEvent);
};

// Получение значения cookie по имени
export const getCookie = (name:string) => {
    const matches = document.cookie.match(new RegExp(
        '(?:^|; )' + name.replace(/([\\.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

// Установка значения cookie
export const setCookie = async (
    name: string,
    value: string,
    options:any = {}
)=> {
    options = {
        path: '/',
        ...options
    };
    // Преобразование срока действия cookie в строку, если он представлен объектом Date
    if (options?.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    // Добавление дополнительных параметров к cookie
    for (const optionKey in options) {
        updatedCookie += `; ${optionKey}`;
        const optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += `= ${optionValue as string}`;
        }
    }
    // Установка cookie
    document.cookie = updatedCookie;
};

// Удаление cookie по имени
export const removeCookie = async (name: string)=> {
    // Установка cookie с истекшим сроком действия
    await setCookie(name, '', {
        'max-age': -1
    });
};
