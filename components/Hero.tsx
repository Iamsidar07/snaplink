"use client"
import { useAuth } from "@clerk/nextjs"
import Form from "./Form"
import HistoryComponent from "./History"
import { History } from "@/types"
interface HeroProps {
    historyData: History[]
}
const Hero = ({ historyData }: HeroProps) => {
    const { userId } = useAuth();
    
    return (
        <main className="flex min-h-screen flex-col items-center px-4 py-24 gap-6 text-center max-w-[1440px] mx-auto">
            {
                userId ? (
                    <div className="hidden sm:flex w-full">
                        <HistoryComponent historyData={historyData}/>
                    </div>
                ) : (
                    <div className="hidden sm:block space-y-2">
                        <h1 className="text-lg sm:text-2xl lg:text-5xl gradient-text font-semibold">Shorten your Loooong Links :) </h1>
                        <p >SnapLink is an efficient and easy-to-use URL shortening service that streamlines your <br className='hidden sm:block' /> online experience.</p>
                        <Form />
                    </div>
                )
            }
            <div className="sm:hidden w-full">
                <h1 className="text-lg sm:text-2xl lg:text-5xl gradient-text font-semibold">Shorten your Loooong Links :) </h1>
                <p >SnapLink is an efficient and easy-to-use URL shortening service that streamlines your <br className='hidden sm:block' /> online experience.</p>
                <Form />
                {
                    userId && (<HistoryComponent historyData={historyData}/>)
                }
            </div>



        </main>
    )
}

export default Hero