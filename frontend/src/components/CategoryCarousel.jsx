import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='px-4 pb-8 pt-2'>
            <Carousel className="mx-auto my-10 w-full max-w-5xl">
                <CarouselContent>
                    {
                        category.map((cat) => (
                            <CarouselItem key={cat} className="basis-full md:basis-1/2 lg:basis-1/3">
                                <div className='flex justify-center'>
                                    <Button onClick={()=>searchJobHandler(cat)} variant="outline" className="min-w-[240px] rounded-full border-slate-200 bg-white px-8 py-6 text-base font-semibold text-slate-800 shadow-[0_18px_40px_rgba(15,23,42,0.04)] hover:border-orange-200 hover:bg-orange-50 hover:text-[#ff7a1a]">{cat}</Button>
                                </div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="left-0 h-14 w-14 border-slate-200 bg-white text-slate-700 shadow-[0_18px_30px_rgba(15,23,42,0.06)] hover:border-orange-200 hover:bg-orange-50 hover:text-[#ff7a1a]" />
                <CarouselNext className="right-0 h-14 w-14 border-slate-200 bg-white text-slate-700 shadow-[0_18px_30px_rgba(15,23,42,0.06)] hover:border-orange-200 hover:bg-orange-50 hover:text-[#ff7a1a]" />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel
