const Hero = () => {
  return (
    <main className='max-w-7xl mx-auto px-2 py-3 flex flex-col items-center'>
      <div className='max-w-lg  mt-16'>
        <h1 className='text-4xl text-center font-medium'>
          Organizing your day activity with Todo Daily
        </h1>
        <a
          href='#'
          className='bg-[#FF4F5A] block w-40 text-center mx-auto py-2 mt-6 rounded-lg text-white text-xl font-medium'
        >
          Get Started
        </a>
      </div>
      <img src='/static/hero-img.png' className='object-cover' alt='' />

      <div className='max-w-5xl my-24'>
        <h2 className='text-4xl text-center font-medium'>
          Don’t let your day doing nothing
        </h2>

        <div className='mt-24 grid gap-x-40 gap-y-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center'>
          <div className='flex flex-col'>
            <img src='/static/icon-task.png' className='w-24' alt='' />
            <p className='mt-10 text-center text-base font-medium'>Small Task</p>
          </div>
          <div>
            <img src='/static/icon-write.png' className='w-24' alt='' />
            <p className='mt-10 text-center text-base font-medium'>Write it</p>
          </div>
          <div>
            <img src='/static/icon-time.png' className='w-24' alt='' />
            <p className='mt-10 text-center text-base font-medium'>Do it</p>
          </div>
          <div>
            <img src='/static/icon-repeat.png' className='w-24' alt='' />
            <p className='mt-10 text-center text-base font-medium'>Repeat</p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 my-24'>
        <img src='/static/img-getstarted.png' alt='' />
        <div className='w-80 py-5'>
          <h3 className='text-4xl font-medium'>Achieve your target and won your life</h3>
          <a
            href='#'
            className='bg-[#FF4F5A] block w-40 text-center py-2 mt-6 rounded-lg text-white text-xl font-medium'
          >Get Started</a>
        </div>
      </div>
    </main>
  );
};

export default Hero;
