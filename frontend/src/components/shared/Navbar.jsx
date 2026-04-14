import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { BriefcaseBusiness, LogOut, Sparkles, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInitials = user?.fullname
        ? user.fullname
            .split(" ")
            .map((name) => name[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "JN";

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='border-b border-orange-100/80 bg-white/85 backdrop-blur-md'>
            <div className='mx-auto flex h-24 max-w-7xl items-center justify-between px-4'>
                <Link to="/" className='flex items-center gap-4'>
                    <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffb347] via-[#ff9f3f] to-[#ff6a3d] text-white shadow-[0_20px_45px_rgba(255,145,77,0.35)]'>
                        <BriefcaseBusiness className='h-6 w-6' />
                    </div>
                    <div>
                        <h1 className='text-3xl font-extrabold tracking-tight text-slate-900'>Job<span className='text-[#ff7a1a]'>Nest</span></h1>
                        <p className='text-xs font-semibold uppercase tracking-[0.35em] text-slate-400'>Career Platform</p>
                    </div>
                </Link>
                <div className='flex items-center gap-6'>
                    <ul className='hidden items-center gap-3 rounded-full border border-orange-200 bg-white px-5 py-3 text-[15px] font-semibold text-slate-600 shadow-[0_18px_50px_rgba(255,190,120,0.08)] md:flex'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link className='rounded-full px-5 py-2 transition-colors hover:bg-orange-50 hover:text-[#ff7a1a]' to="/admin/companies">Companies</Link></li>
                                    <li><Link className='rounded-full px-5 py-2 transition-colors hover:bg-orange-50 hover:text-[#ff7a1a]' to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link className='rounded-full px-5 py-2 transition-colors hover:bg-orange-50 hover:text-[#ff7a1a]' to="/">Home</Link></li>
                                    <li><Link className='rounded-full px-5 py-2 transition-colors hover:bg-orange-50 hover:text-[#ff7a1a]' to="/jobs">Jobs</Link></li>
                                    <li><Link className='rounded-full px-5 py-2 transition-colors hover:bg-orange-50 hover:text-[#ff7a1a]' to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login"><Button variant="outline" className="rounded-full border-orange-200 px-7 py-6 text-base font-semibold text-slate-900 hover:bg-orange-50">Login</Button></Link>
                                <Link to="/signup"><Button className="rounded-full bg-[#ff7a1a] px-7 py-6 text-base font-semibold text-white shadow-[0_18px_40px_rgba(255,122,26,0.35)] hover:bg-[#ef6d11]"><Sparkles className='mr-2 h-4 w-4' />Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="h-12 w-12 cursor-pointer border border-orange-100 shadow-sm">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                        <AvatarFallback className="bg-slate-900 text-sm font-semibold text-white">
                                            {userInitials}
                                        </AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-3'>
                                            <Avatar className="h-12 w-12 border border-slate-200">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                                <AvatarFallback className="bg-slate-900 font-semibold text-white">
                                                    {userInitials}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio || user?.email}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <User2 />
                                                <Button variant="link" asChild>
                                                    <Link to="/profile">View Profile</Link>
                                                </Button>
                                            </div>

                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
