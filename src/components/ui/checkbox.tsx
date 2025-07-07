import { useState } from 'react';

export default function CustomCheckbox() {
    const [checked, setChecked] = useState(false);

    return (
        <label className="flex items-center space-x-2 text-[14px] cursor-pointer select-none">
            <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)}
                className="sr-only" // hides native checkbox for accessibility
            />

            <span className="w-[31px] h-[30px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                    <rect x="8.5" y="7.5" width="15" height="15" rx="6.7" fill={checked ? "#FF9900" : "#FFFDF2"}
                        stroke="#FF9900" />
                    {checked && (
                        <path d="M13.5 15.5l2 2 4-4" stroke="#FFFDF2" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round" />
                    )}
                </svg>
            </span>

            <span>
                I agree to the <span className="text-[#FF9900] underline">Terms and Conditions.</span>
            </span>
        </label>
    );
}