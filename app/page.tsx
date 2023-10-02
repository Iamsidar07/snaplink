import Form from '@/components/Form'
import History from '@/components/History'
import ToggleButton from '@/components/ToggleButton'
import { getHistory } from '@/utils/getHistory'
import Image from 'next/image'

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-24 gap-6 text-center max-w-[1440px] mx-auto">
      <h1 className="text-lg sm:text-2xl lg:text-5xl gradient-text font-semibold">Shorten your Loooong Links :) </h1>
      <p >SnapLink is an efficient and easy-to-use URL shortening service that streamlines your <br className='hidden sm:block' /> online experience.</p>
      <Form />
      <History/>

    </main>
  )
}
