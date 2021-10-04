type JobTagProps = {
  isWorking?: boolean
}

export function JobTag({ isWorking = true }: JobTagProps) {
  return (
    <>
      {isWorking ? (
        <div className="bg-green100 rounded-full py-2 px-6 esm:hidden">
          <p className="text-green900 font-medium font-inter text-sm cursor-pointer transition-all hover:opacity-70">
            Em andamento
          </p>
        </div>
      ) : (
        <div className="bg-red100 rounded-full py-2 px-6 esm:hidden">
          <p className="text-red900 font-medium font-inter text-sm cursor-pointer transition-all hover:opacity-70">
            Encerrado
          </p>
        </div>
      )}
    </>
  )
}
