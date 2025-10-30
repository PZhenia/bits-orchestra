import React, { useEffect, useMemo, useState } from "react"

import Input from "../atoms/Input.tsx";

interface ModalProps {
    mode?: "add" | "edit";
    initial?: {
        image?: string;
        title?: string;
        description?: string;
        price?: number;
    };
    onSubmit: (payload: { image: string; title: string; description: string; price: number }) => void;
    onCancel: () => void;
}

const Modal:React.FC<ModalProps> = ({ mode = "add", initial, onSubmit, onCancel }) => {
    const defaults = useMemo(() => ({
        image: initial?.image ?? "",
        title: initial?.title ?? "",
        description: initial?.description ?? "",
        price: initial?.price ?? 0,
    }), [initial]);

    const [image, setImage] = useState<string>(defaults.image);
    const [title, setTitle] = useState<string>(defaults.title);
    const [description, setDescription] = useState<string>(defaults.description);
    const [price, setPrice] = useState<string>(String(defaults.price || ""));

    useEffect(() => {
        setImage(defaults.image);
        setTitle(defaults.title);
        setDescription(defaults.description);
        setPrice(String(defaults.price || ""));
    }, [defaults]);

    const hasChanges = useMemo(() => {
        if (mode !== "edit") return true;
        const numericPrice = Number(price) || 0;
        return (
            image.trim() !== (initial?.image || "") ||
            title.trim() !== (initial?.title || "") ||
            description.trim() !== (initial?.description || "") ||
            numericPrice !== (initial?.price || 0)
        );
    }, [mode, image, title, description, price, initial]);

    const isValid = useMemo(() => {
        const numericPrice = Number(price);
        return (
            title.trim().length > 0 &&
            description.trim().length > 0 &&
            !Number.isNaN(numericPrice) &&
            numericPrice >= 0 &&
            (mode === "add" || hasChanges)
        );
    }, [title, description, price, mode, hasChanges]);

    const submit = () => {
        if (!isValid) return;
        const numericPrice = Number(price);
        onSubmit({ 
            image: image.trim(), 
            title: title.trim(), 
            description: description.trim(), 
            price: numericPrice 
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
            <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
            <div className="relative z-10 w-full max-w-lg rounded-lg bg-white p-4 sm:p-5 shadow-lg max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">{mode === "add" ? "Add Wish" : "Edit Wish"}</h3>
                <div className="flex flex-col gap-3">
                    <Input value={title} onChange={setTitle} placeholder="Title" type="text" name="title" />
                    <Input value={image} onChange={setImage} placeholder="Image URL" type="url" name="image" />
                    <Input value={description} onChange={setDescription} placeholder="Description" type="text" name="description" />
                    <Input value={price} onChange={setPrice} placeholder="Price" type="text" name="price" />
                </div>
                <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-end">
                    <button 
                        onClick={onCancel} 
                        className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm sm:text-base cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={submit} 
                        disabled={!isValid}
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-default text-sm sm:text-base cursor-pointer"
                    >
                        {mode === "add" ? "Add" : "Save"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;