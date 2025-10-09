import Image from 'next/image'

export default function Loading() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[200px]'>
      <div className='relative'>
        {/* Spinning logo */}
        <Image
          src='/static/logo.png'
          width={44}
          height={44}
          alt='Loading'
          className='animate-spin duration-1000'
          style={{
            animationTimingFunction: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
          }}
        />

        {/* Outer ring */}
        <div className='absolute inset-0 -m-2 border-4 border-primary/20 border-t-primary/60 rounded-full animate-spin duration-1500'></div>
      </div>

      {/* Subtle background dots */}
      <div className='absolute inset-0 pointer-events-none'>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className='absolute w-1 h-1 bg-primary/30 rounded-full animate-ping'
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1.5s',
            }}
          />
        ))}
      </div>
    </div>
  )
}
