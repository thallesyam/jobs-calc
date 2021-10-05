import Image from 'next/image'

export function LoginSection() {
  return (
    <section className="h-screen bg-gray800 flex flex-col justify-center align-center p-5 text-center sm:hidden">
      <div>
        <Image
          src="/assets/icons/logo.svg"
          alt="Logo"
          width="220"
          height="48"
        />

        <h2 className="text-ice900 text-2xl font-semibold font-ibm leading-10 mx-auto mt-7">
          O Jobscalc é o lugar perfeito para você <br />
          que busca ter uma vida profissional <br />
          mais organizada.
        </h2>
      </div>
    </section>
  )
}
