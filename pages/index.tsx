import { LoginSection } from './components/LogoSection';

export default function Login() {
  return (
   <main className="h-screen w-100 grid grid-cols-2 content-center justify-center bg-gray400">
     <LoginSection />

     <section className="h-screen flex flex-col justify-center p-11 w-5/6 mx-auto">
       <h2 className="text-4xl text-gray700 font-semibold font-ibm mb-12">Faça Login</h2>
       <input className="h-14 border border-gray500 p-6 rounded mb-1.5" type="email" placeholder="E-mail" />
       <p className="text-gray900 text-base font-medium font-inter mb-5">Não tem uma conta ?</p>
       <button className="bg-orange900 rounded p-5 text-white font-ibm font-semibold text-xl hover:opacity-80 transition duration-500 ease-in-out">
         Faça o Login
        </button>
     </section>
   </main>
  )
}
