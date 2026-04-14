import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);
    const skills = user?.profile?.skills || [];
    const hasResume = Boolean(user?.profile?.resume);
    const userInitials = user?.fullname
        ? user.fullname
            .split(" ")
            .map((name) => name[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "JP";

    return (
        <div className='min-h-screen bg-slate-50'>
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 py-8'>
                <div className='rounded-2xl border border-slate-200 bg-white p-8 shadow-sm'>
                    <div className='flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between'>
                        <div className='flex items-center gap-4'>
                            <Avatar className="h-24 w-24 border border-slate-200">
                                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                <AvatarFallback className="bg-slate-900 text-2xl font-semibold text-white">
                                    {userInitials}
                                </AvatarFallback>
                            </Avatar>
                            <div className='space-y-2'>
                                <h1 className='text-xl font-semibold text-slate-900'>{user?.fullname}</h1>
                                <p className='max-w-xl text-sm leading-6 text-slate-600'>
                                    {user?.profile?.bio || "Add a short bio so your profile feels complete."}
                                </p>
                                <Badge variant="secondary" className="w-fit capitalize">
                                    {user?.role || "user"}
                                </Badge>
                            </div>
                        </div>
                        <Button onClick={() => setOpen(true)} className="self-start" variant="outline">
                            <Pen className='mr-2 h-4 w-4' />
                            Edit Profile
                        </Button>
                    </div>
                    <div className='my-8 grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2'>
                        <div className='flex items-center gap-3 rounded-lg bg-white p-4'>
                            <Mail className='h-5 w-5 text-slate-500' />
                            <div>
                                <p className='text-xs uppercase tracking-wide text-slate-500'>Email</p>
                                <span className='text-sm text-slate-800'>{user?.email || "NA"}</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 rounded-lg bg-white p-4'>
                            <Contact className='h-5 w-5 text-slate-500' />
                            <div>
                                <p className='text-xs uppercase tracking-wide text-slate-500'>Phone</p>
                                <span className='text-sm text-slate-800'>{user?.phoneNumber || "NA"}</span>
                            </div>
                        </div>
                    </div>
                    <div className='my-6 space-y-3'>
                        <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Skills</h2>
                        <div className='flex flex-wrap gap-2'>
                            {
                                skills.length > 0 ? skills.map((item, index) => (
                                    <Badge key={index} className="rounded-full bg-slate-900 px-3 py-1 text-white hover:bg-slate-800">
                                        {item}
                                    </Badge>
                                )) : <span className='text-sm text-slate-500'>No skills added yet.</span>
                            }
                        </div>
                    </div>
                    <div className='grid w-full items-center gap-2 rounded-xl border border-slate-200 p-5'>
                        <Label className="text-sm font-semibold uppercase tracking-wide text-slate-500">Resume</Label>
                        {
                            hasResume ? (
                                <a target='_blank' rel="noreferrer" href={user?.profile?.resume} className='w-fit text-sm font-medium text-blue-600 hover:underline'>
                                    {user?.profile?.resumeOriginalName || "View resume"}
                                </a>
                            ) : <span className='text-sm text-slate-500'>No resume uploaded yet.</span>
                        }
                    </div>
                </div>
            </div>
            <div className='max-w-4xl mx-auto px-4 pb-10'>
                <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
                    <h1 className='mb-5 text-lg font-semibold text-slate-900'>Applied Jobs</h1>
                    <AppliedJobTable />
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile
