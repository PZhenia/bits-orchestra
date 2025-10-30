import type { Wish, CreateWish, UpdateWish } from "../types.ts"

const API_BASE =
    (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"))
        ? "http://localhost:3001"
        : "https://bits-orchestra.onrender.com";
const url = `${API_BASE}/wishes`

async function getWishes(): Promise<Wish[]> {
    try{
        const res = await fetch(url);
        if(!res.ok) {
            throw new Error(`Response returned ${res.status}`);
        }
        return await res.json() as Wish[];

    } catch(err){
        throw new Error(`Failed to fetch wishes ${err}`);
    }
}

async function addWish(wish: CreateWish): Promise<Wish> {
    const newWish: Wish = {
        ...wish,
        id: `${Date.now()}${wish.title.trim()}`,
        createdAt: new Date().toISOString()
    }

    try{
        const res = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newWish),
        });
        if(!res.ok) {
            throw new Error(`Response returned ${res.status}`);
        }

        return await res.json() as Wish;

    } catch(err){
        throw new Error(`Failed to add wish ${err}`);
    }
}

async function updateWish(update: UpdateWish): Promise<Wish> {
    try{
        const {id, ...fieldsToUpdate} = update;

        const res = await fetch(`${url}/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(fieldsToUpdate),
        });
        if(!res.ok) {
            throw new Error(`Response returned ${res.status}`);
        }

        return await res.json() as Wish;

    } catch(err){
        throw new Error(`Failed to update wish ${err}`);
    }
}

async function deleteWish(id: string | number): Promise<void> {
    try{
        const res = await fetch(`${url}/${id}`, {method: "DELETE"});
        if(!res.ok) {
            throw new Error(`Response returned ${res.status}`);
        }

    } catch(err){
        throw new Error(`Failed to delete wish ${err}`);
    }
}

async function getWish(id: string | number): Promise<Wish> {
    try{
        const res = await fetch(`${url}/${id}`);
        if(!res.ok) {
            throw new Error(`Response returned ${res.status}`);
        }
        return await res.json() as Wish;

    } catch(err){
        throw new Error(`Failed to fetch wishes ${err}`);
    }
}

export { getWishes, addWish, updateWish, deleteWish, getWish };