import React from 'react'
import { ArrowLeft, BookOpenText } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { getBlogBySlug } from '@/data/blogs'

const BlogDetails = () => {
  const { slug } = useParams()
  const blog = getBlogBySlug(slug)

  if (!blog) {
    return <Navigate to="/" replace />
  }

  return (
    <div className='min-h-screen'>
      <Navbar />
      <main className='mx-auto max-w-5xl px-4 py-12'>
        <Link
          to="/"
          className='inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-orange-50 hover:text-[#ff7a1a]'
        >
          <ArrowLeft className='h-4 w-4' />
          Back to home
        </Link>

        <article className='mt-8 overflow-hidden rounded-[2.2rem] border border-orange-100 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.06)]'>
          <div className={`bg-gradient-to-r ${blog.accent} p-8 text-white`}>
            <div className='inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm'>
              <BookOpenText className='h-4 w-4' />
              {blog.category}
            </div>
            <h1 className='mt-5 max-w-4xl text-4xl font-extrabold leading-tight md:text-5xl'>
              {blog.title}
            </h1>
            <p className='mt-4 max-w-3xl text-base leading-8 text-white/90 md:text-lg'>
              {blog.subtitle}
            </p>
            <p className='mt-4 text-sm font-medium uppercase tracking-[0.18em] text-white/80'>
              {blog.readTime}
            </p>
          </div>

          <div className='p-8 md:p-10'>
            <p className='text-lg leading-9 text-slate-700'>
              {blog.intro}
            </p>

            <div className='mt-10 space-y-8'>
              {blog.sections.map((section) => (
                <section key={section.heading} className='rounded-2xl border border-slate-100 bg-slate-50/70 p-6'>
                  <h2 className='text-2xl font-bold text-slate-900'>{section.heading}</h2>
                  <p className='mt-3 text-base leading-8 text-slate-700'>
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export default BlogDetails
