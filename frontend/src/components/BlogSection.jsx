import React from 'react'
import { ArrowUpRight, BookOpenText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { blogs } from '@/data/blogs'

const BlogSection = () => {
  return (
    <section className='mx-auto max-w-7xl px-4 pb-20'>
      <div className='mb-8 flex items-end justify-between gap-6'>
        <div>
          <span className='inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-[#d85e00]'>
            <BookOpenText className='h-4 w-4' />
            Career Blog
          </span>
          <h2 className='mt-4 text-4xl font-bold tracking-tight text-slate-900'>
            Learn, Apply & <span className='text-[#ff7a1a]'>Grow Faster</span>
          </h2>
          <p className='mt-3 max-w-2xl text-base leading-7 text-slate-600'>
            Explore practical blog guides for resumes, projects, interviews, and job applications. Open any article, read it fully, and come back whenever you want.
          </p>
        </div>
      </div>
      <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            to={`/blogs/${blog.slug}`}
            className='group overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1'
          >
            <div className={`h-2 bg-gradient-to-r ${blog.accent}`} />
            <div className='p-6'>
              <div className='mb-5 flex items-center justify-between'>
                <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>
                  {blog.category}
                </span>
                <span className='text-sm font-medium text-slate-400'>{blog.readTime}</span>
              </div>
              <h3 className='text-xl font-bold leading-8 text-slate-900 transition-colors group-hover:text-[#ff7a1a]'>
                {blog.title}
              </h3>
              <p className='mt-4 text-sm leading-7 text-slate-600'>
                {blog.subtitle}
              </p>
              <div className='mt-6 flex items-center gap-2 text-sm font-semibold text-[#ff7a1a]'>
                Read article
                <ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default BlogSection
