interface GameStatsProps {
    score: number;
    multiplier: number;
}

const GameStats = ({ score, multiplier }: GameStatsProps) => (
    <div className="flex items-center justify-center w-full">
        <div className="font-semibold text-center flex justify-center items-center flex-col w-[49.5%] min-w-[100px]">
            <div className="text-[#FFFFFF7A] game__text-break">Max ставка</div>
            <div>{score}</div>
        </div>
        <div className="h-[32px] w-[1px] bg-[#FFFFFF3D]"></div>
        <div className="font-semibold text-center flex justify-center items-center flex-col w-[49.5%] min-w-[100px]">
            <div className="text-[#FFFFFF7A] game__text-break">Max коэффициент</div>
            <div>{multiplier.toFixed(2)}x</div>
        </div>
    </div>
);

export default GameStats;
