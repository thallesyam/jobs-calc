import { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode

  addPlus?: boolean
  size?: 'large' | 'medium'
  color: string
  handleClick?: () => void
}

export function Button({
  children,
  addPlus = false,
  color,
  size = 'medium',
  handleClick,
}: ButtonProps) {
  return (
    <button
      onClick={handleClick}
      className={`bg-${color} ${
        size === 'medium' ? 'w-52 h-12' : 'w-64 h-14'
      } flex items-center justify-between p-3 gap-2 rounded-md hover:opacity-90 transition-all`}
    >
      {addPlus && (
        <div className="w-8 h-8 flex items-center justify-center bg-orange800 hover:opacity-70 transition-all rounded-lg">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 12H19"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
      <div className="flex-1 uppercase text-white font-ibm font-bold text-sm">
        {children}
      </div>
    </button>
  )
}
