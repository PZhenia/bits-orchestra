import React from "react"

import Button from "../atoms/Button.tsx";

interface CardProps {
    image: string;
    title: string;
    description: string;
    price: number;
    onDelete: () => void;
    onEdit: () => void;
    onDetails: () => void;
}

const Card:React.FC<CardProps> = ({ image, title, description, price, onDelete, onEdit, onDetails }) => {
    return (
        <div className="flex flex-col rounded-lg overflow-hidden shadow bg-white">
            <div className="relative aspect-video bg-gray-100 flex items-center justify-center p-3">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain max-h-full"
                />
            </div>
            <div className="p-4 flex flex-col gap-2">
                <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
                <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
                <p className="mt-2 text-violet-700 font-bold text-lg">${price}</p>
            </div>
            <div className="p-4 pt-0 flex items-center gap-3">
                <Button
                    onClick={onDelete}
                    text="Delete"
                    variant="delete"
                />
                <Button
                    onClick={onEdit}
                    text="Edit"
                    variant="edit"
                />
                <button
                    onClick={onDetails}
                    className="ml-auto text-violet-800 hover:text-violet-900 font-medium cursor-pointer flex items-center gap-2"
                >
                    Details
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Card;