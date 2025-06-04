'use client'



import {useTheme} from "@/src/components/theme-provider";

interface ThemeControllerProps {
  dict: any
}

export default function ThemeController({ dict }: ThemeControllerProps) {
  const { theme, setTheme } = useTheme()

  const themes = [
    { value: 'light', label: dict.light },
    { value: 'dark', label: dict.dark },
    { value: 'cupcake', label: dict.cupcake },
    { value: 'emerald', label: dict.emerald },
  ]

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost">
        🎨 Theme
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow">
        {themes.map((t) => (
          <li key={t.value}>
            <button 
              onClick={() => setTheme(t.value)}
              className={theme === t.value ? 'active' : ''}
            >
              {t.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}