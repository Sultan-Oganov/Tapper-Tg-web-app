type Theme = 'easy' | 'medium' | 'hard' | 'legend';

interface ThemeSelectorProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const themes: { label: string; value: Theme }[] = [
    { label: 'Легкий', value: 'easy' },
    { label: 'Средний', value: 'medium' },
    { label: 'Тяжелый', value: 'hard' },
    { label: 'Ультима', value: 'legend' },
];

const ThemeSelector = ({ theme, setTheme }: ThemeSelectorProps) => (
    <div className="down_taps">
        {themes.map(({ label, value }) => (
            <div
                key={value}
                onClick={() => setTheme(value)}
                className={`down_taps_card py-[8px] h-[32px] px-[4px] ${theme === value ? 'active' : ''}`}
                style={{ borderRadius: 32, background: '#ffffff0d' }}
            >
                {label}
            </div>
        ))}
    </div>
);

export default ThemeSelector;
