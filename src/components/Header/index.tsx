import Image from 'next/image'
import Link from 'next/link'

import { useLoginContext } from '../../contexts/LoginContext'

type HeaderProps = {
  isHome?: boolean
}

export function Header({ isHome = false }: HeaderProps) {
  const { user } = useLoginContext()

  return (
    <>
      {isHome ? (
        <header className="h-72 bg-gray800 pt-4 mb-8">
          <section className="max-w-wild w-screen h-24 mx-auto flex justify-between items-center border-b border-border900">
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
                  <a className="text-sm text-gray600 font-ibm">Ver perfil</a>
                </Link>
              </div>

              <div className="w-16 h-16 bg-gradient-to-r from-gray700 to-gray800 rounded-full border-2 border-orange900 flex items-center justify-center">
                <p className="text-white text-2xl ma0 font-inter font-semibold">
                  {user.image ? user.image : user.email.charAt(0).toUpperCase()}
                </p>
              </div>
            </div>
          </section>
        </header>
      ) : (
        <h1>Thalles</h1>
      )}
    </>
  )
}
