import Image from 'next/image'

import { Header } from '../components/Header'
import { useLoginContext } from '../contexts/LoginContext'

export default function Profile() {
  const { user } = useLoginContext()

  return (
    <>
      <Header prevLink={'/home'} title="Meu perfil" />

      <main className="mt-16 w-screen max-w-wild mx-auto flex ">
        <section className="bg-white px-16 py-16 flex flex-col items-center justify-center text-center rounded border border-gray600 h-screen max-h-profilebox">
          <div className="w-40 h-40 bg-gradient-to-r from-gray700 to-gray800 rounded-full border-2 border-orange900 flex items-center justify-center mb-6">
            <p className="text-white text-2xl ma0 font-inter font-semibold">
              {user.image ? (
                <Image width="160" height="160" alt="Name" src={user.image} />
              ) : (
                user.email?.charAt(0).toUpperCase()
              )}
            </p>
          </div>

          <h3 className="text-2xl text-gray700 font-ibm font-semibold mb-16">
            {user.name ? user.name : user.email}
          </h3>

          <p className="text-xl text-gray700 font-inter font-normal mb-6">
            O valor da sua hora é <p className="font-bold">R$ 75,00 reais</p>
          </p>

          <button className="w-48 h-12 bg-green900 rounded text-ice900 text-sm uppercase font-ibm font-bold transition-all hover:opacity-70">
            Salvar dados
          </button>
        </section>

        <section></section>
      </main>
    </>
  )
}
