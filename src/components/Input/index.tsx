import { forwardRef, ReactNode } from 'react'

type InputProps = {
  type?: 'text' | 'password' | 'email'
  defaultValue?: string | number
  error: string
  placeholder?: string
  children?: ReactNode
  yupRef: any
}

export const Input = forwardRef(
  (
    {
      type = 'text',
      error,
      placeholder,
      children,
      yupRef,
      defaultValue,
      ...rest
    }: InputProps,
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
            defaultValue={defaultValue}
            type={type}
            placeholder={placeholder}
            className={`w-full max-w-input-small h-14 px-6 border border-gray500 rounded `}
          />

          {error}
        </div>
      </>
    )
  }
)
