import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query.trim()));
        navigate("/browse");
    }

    return (
        <section className='relative overflow-hidden'>
            <div className='pointer-events-none absolute left-0 top-4 h-80 w-80 rounded-full bg-[#ffb866]/20 blur-3xl' />
            <div className='pointer-events-none absolute bottom-0 right-20 h-72 w-72 rounded-full bg-[#ff8f4d]/15 blur-3xl' />
            <div className='mx-auto grid max-w-7xl items-center gap-14 px-4 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-20'>
                <div className='relative z-10'>
                    <span className='inline-flex rounded-full border border-orange-200 bg-orange-50 px-6 py-3 text-lg font-semibold text-[#d85e00] shadow-[0_18px_40px_rgba(255,174,86,0.12)]'>
                        JobNest Career Platform
                    </span>
                    <h1 className='mt-8 max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight text-slate-900 md:text-6xl xl:text-7xl'>
                        Search, Apply &
                        <br />
                        Build Your <span className='text-[#ff7a1a]'>Dream Career</span>
                    </h1>
                    <p className='mt-8 max-w-2xl text-lg leading-9 text-slate-600 md:text-[1.45rem]'>
                        Discover meaningful roles, connect with fast-growing companies, and take the next step with confidence on JobNest.
                    </p>
                    <div className='mt-10 flex max-w-3xl items-center rounded-full border border-orange-100 bg-white p-2 pl-6 shadow-[0_24px_60px_rgba(255,181,110,0.18)]'>
                        <input
                            type="text"
                            placeholder='Find your dream jobs'
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    searchJobHandler();
                                }
                            }}
                            className='h-14 w-full border-none bg-transparent text-lg outline-none placeholder:text-slate-400'
                        />
                        <Button onClick={searchJobHandler} className="h-14 w-20 rounded-full bg-[#ff7a1a] shadow-[0_16px_35px_rgba(255,122,26,0.35)] hover:bg-[#ef6d11]">
                            <Search className='h-6 w-6' />
                        </Button>
                    </div>
                </div>
                <div className='relative flex justify-center lg:justify-end'>
                    <div className='absolute inset-x-10 top-10 h-72 rounded-[3rem] bg-[#ffd7a8]/35 blur-3xl' />
                    <div className='relative w-full max-w-[430px] rounded-[3rem] border border-orange-100/70 bg-white/90 p-6 shadow-[0_30px_80px_rgba(255,183,102,0.28)] backdrop-blur-sm'>
                        <div className='rounded-[2.3rem] bg-gradient-to-br from-[#fffaf4] via-white to-[#fff7ef] p-4'>
                            <dotlottie-player
                                src="/appointment-booking.lottie"
                                background="transparent"
                                speed="1"
                                style={{ width: "100%", height: "460px" }}
                                loop
                                autoplay
                            ></dotlottie-player>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
