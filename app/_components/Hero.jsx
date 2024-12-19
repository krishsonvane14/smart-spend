import React from 'react'
import Image from  "next/image"

function Hero() {
  return (
    <div>
      <section className="bg-gray-50 flex items-center flex-col">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Plan Smart
        <strong className="font-extrabold text-primary sm:block"> Spend Smarter. </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
        Effortlessly track your expenses and take control of your finances to save more!
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring active:bg-primary sm:w-auto"
          href="/sign-in"
        >
          Get Started
        </a>
      </div>
    </div>
  </div>
  <Image src='/dashboard.webp' alt='dashboard-img'
    width={1000}
    height={700}
    className='mt-5 rounded-xl border-2'/>
</section>
    </div>
  )
}

export default Hero
