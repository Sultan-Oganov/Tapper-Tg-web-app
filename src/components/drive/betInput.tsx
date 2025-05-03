interface BetInputProps {
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BetInput = ({ value, onChange }: BetInputProps) => (
    <div className="input__wrapper relative">
        <label className="pl-[8px]" style={{ color: '#FFFFFF7A' }}>
            Ставка
        </label>
        <input
            value={value}
            onChange={onChange}
            min={0}
            type="number"
            className="input-style"
            placeholder="Введите сумму"
        />
        <div className="flex gap-[4px] absolute bottom-[7px] right-[10px]">
            <div className="btn-def w-[32px] h-[36px] flex items-center justify-center">
                <div className="text-[13px]">1/2</div>
            </div>
            <div className="btn-def w-[32px] h-[36px] flex items-center justify-center">
                <div className="text-[13px]">x2</div>
            </div>
            <div className="rounded-[12px] bg-[#FFFFFF05] w-[32px] h-[36px] flex items-center justify-center">
                <div className="text-[13px]">MAX</div>
            </div>
        </div>
    </div>
);

export default BetInput;
