import { forwardRef, ReactNode } from 'react'

type InputProps = {
  type?: 'text' | 'password' | 'email'
  placeholder?: string
  children?: ReactNode
  yupRef: any
}

export const Input = forwardRef(
  (
    { type = 'text', placeholder, children, yupRef, ...rest }: InputProps,
    ref
  ) => {
    return (
      <>
        <div className="w-full mb-6">
          {children && (
            <p className="text-gray900 text-base font-ibm font-medium mb-4">
              {children}
            </p>
          )}

          <input
            {...yupRef}
            {...rest}
            type={type}
            placeholder={placeholder}
            className={`w-full max-w-input-small h-14 px-6 border border-gray500 rounded `}
          />
        </div>
      </>
    )
  }
)
