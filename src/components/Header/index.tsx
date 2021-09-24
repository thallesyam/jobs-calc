import Image from 'next/image'
import Link from 'next/link'

import { useLoginContext } from '../../contexts/LoginContext'

import { HeaderInfo } from '../HeaderInfo'

type HeaderProps = {
  isHome?: boolean
}

export function Header({ isHome = false }: HeaderProps) {
  const { user } = useLoginContext()

  return (
    <>
      {isHome ? (
        <header className="bg-gray800">
          <section className="max-w-wild w-screen mx-auto">
            <section className="pt-4 mb-4 mx-auto flex justify-between items-center">
              <Image
                src="/assets/icons/logo.svg"
                alt="Logo"
                width="208"
                height="48"
              />

              <div className="flex align-center gap-2	">
                <Image
                  src="/assets/icons/alert.svg"
                  alt="Alert"
                  width="20"
                  height="20"
                />
                <p className="ice900 text-base font-inter font-medium text-ice900">
                  Você tem 2 horas livres no seu dia
                </p>
              </div>

              <div className="flex align-center gap-4">
                <div className="flex flex-col justify-center text-right">
                  <h1 className="text-xl text-ice900 font-ibm font-semibold">
                    {user.name ? user.name : user.email}
                  </h1>
                  <Link href="#">
                    <a className="text-sm text-gray600 font-ibm hover:text-orange900 hover:underline transition-all	block">
                      Ver perfil
                    </a>
                  </Link>
                </div>

                <div className="w-16 h-16 bg-gradient-to-r from-gray700 to-gray800 rounded-full border-2 border-orange900 flex items-center justify-center">
                  <p className="text-white text-2xl ma0 font-inter font-semibold">
                    {user.image
                      ? user.image
                      : user.email?.charAt(0).toUpperCase()}
                  </p>
                </div>
              </div>
            </section>

            <div className="w-100 h-px mb-8 bg-gray900" />

            <HeaderInfo />
          </section>
        </header>
      ) : (
        <h1>Thalles</h1>
      )}
    </>
  )
}
