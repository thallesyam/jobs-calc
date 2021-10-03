type EditIcon = {
  width?: string
  height?: string
}

export function EditIcon({ height = '25', width = '24' }: EditIcon) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 20.0298H21"
        stroke="#787880"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 3.52986C16.8978 3.13203 17.4374 2.90854 18 2.90854C18.2786 2.90854 18.5544 2.96341 18.8118 3.07001C19.0692 3.17662 19.303 3.33288 19.5 3.52986C19.697 3.72684 19.8532 3.96069 19.9598 4.21806C20.0665 4.47544 20.1213 4.75128 20.1213 5.02986C20.1213 5.30843 20.0665 5.58428 19.9598 5.84165C19.8532 6.09902 19.697 6.33288 19.5 6.52986L7 19.0299L3 20.0299L4 16.0299L16.5 3.52986Z"
        stroke="#787880"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
