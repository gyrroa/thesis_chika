export default function ProgressBar({
  value,
  max = 10,
}: {
  value: number;
  max?: number;
}) {
  const safeMax = Math.max(1, max); // avoid divide by 0
  const clampedValue = Math.max(0, Math.min(safeMax, value));
  const percentage = (clampedValue / safeMax) * 100;

  return (
    <div className="relative w-full sm:w-[377px] h-[24px] bg-[repeating-linear-gradient(45deg,#FFD27F_0px,#FFD27F_30px,#FFF3D1_30px,#FFF3D1_60px)] sm:rounded-full overflow-hidden">
      <div
        className="flex justify-end items-center h-full bg-[#C45500] rounded-r-full sm:rounded-full px-[5px] transition-all duration-300 ease-linear"
        style={{ width: `${percentage}%` }}
      >
        {/* Number bubble */}
        <div className="flex w-[16px] h-[16px] bg-[#FFFDF2] rounded-full text-[#C45500] text-[10px] font-bold items-center justify-center tabular-nums leading-none">
          {clampedValue}
        </div>
      </div>
    </div>
  );
}
