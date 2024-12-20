"use client";

class LocalStorage {
    static getKey<T>(key: string): T|null {
        const data = localStorage.getItem(key)
        return data === null ? null : (JSON.parse(data) as T)
    }

    static setKey<T>(key: string, newData: T): void {
        const stringified = JSON.stringify(newData)
        localStorage.setItem(key, stringified)
    }
}

export default LocalStorage;
