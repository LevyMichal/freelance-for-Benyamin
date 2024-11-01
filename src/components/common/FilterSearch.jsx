import { useState } from 'react';

export default function FilterSearch({ value, onChange }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isFilter, setIsFilter] = useState(false);

    return (
        <div>
            <div className="relative">
                {/* filter icon */}
                <button
                    onClick={() => setIsFilter(!isFilter)}
                    onMouseOver={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="bg-violet-500  hover:bg-violet-700 p-2 rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 stroke-white"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                        />
                    </svg>
                </button>

                {/* filter input */}
                {isFilter || isHovered ? (
                    <input
                        type="text"
                        value={value}
                        placeholder="Filter By Name"
                        onChange={onChange}
                        className="absolute top-0 right-full w-50  p-2 pl-4 text-sm bg-neutral-100  hover:bg-neutral-200 rounded-full focus:ring-0 focus:border-violet-500"
                    />
                ) : null}
            </div>
        </div>
    );
};
