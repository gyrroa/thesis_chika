'use client';

import { useState } from 'react';
import Image from 'next/image';

type AgeSelectorProps = {
  name?: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  visibleRange?: number;
  onChange?: (value: number) => void;
};

export const AgeSelector = ({
  name = 'age',
  min = 1,
  max = 10,
  defaultValue = 4,
  visibleRange = 2,
  onChange,
}: AgeSelectorProps) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleSelect = (val: number) => {
    if (val < min || val > max) return;
    setSelected(val);
    onChange?.(val);
  };

  const totalSlots = visibleRange * 2 + 1;

  const visibleAges: (number | null)[] = Array.from({ length: totalSlots }).map((_, i) => {
    const offset = i - visibleRange;
    const age = selected + offset;
    return age >= min && age <= max ? age : null;
  });

  return (
    <div className="flex flex-col items-center gap-[13px]">
      <h2 className="text-xl font-bold text-[#C45500] text-center">
        Select child’s age
      </h2>

      <div className="flex items-center gap-9 font-bold min-h-[60px]">
        {visibleAges.map((age, i) => {
          const isSelected = age === selected;

          return (
            <div
              key={i}
              className={`w-[20px] text-[36px] text-center transition-all duration-100 ${isSelected
                ? 'text-[#FF9900] relative text-[48px] w-[81px]'
                : age === null
                  ? 'text-transparent'
                  : 'text-[#FF9900]/30 cursor-pointer hover:scale-105'
                }`}
              onClick={() => age !== null && handleSelect(age)}
            >
              {isSelected && (
                <>
                  <Image
                    src="/register-child/select.svg"
                    alt="arrow-left"
                    width={10}
                    height={12}
                    className="absolute left-[13px] top-1/2 -translate-y-1/2 -translate-x-full rotate-180"
                    priority
                  />
                  <Image
                    src="/register-child/select.svg"
                    alt="arrow-right"
                    width={10}
                    height={12}
                    className="absolute right-[13px] top-1/2 -translate-y-1/2 translate-x-full"
                    priority
                  />
                </>
              )}
              {age}
            </div>
          );
        })}
      </div>

      {/* Hidden input for form compatibility */}
      <input type="hidden" name={name} value={selected} />
    </div>
  );
};
