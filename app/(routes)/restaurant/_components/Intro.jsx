import Image from 'next/image';

function Intro({ restaurant }) {
  if (!restaurant) {
    return (
      <div>
        <div className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'></div>
        <h2 className='text-3xl font-bold mt-2'>Loading...</h2>
        <div>
          <Image src={"/star.png"} alt='star' width={20} height={20} />
          <label className='text-sm text-gray-500'>Loading...</label>
        </div>
        <h2 className='text-gray-500 mt-2 flex gap-2'>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Image
          src={restaurant.banner?.url}
          width={1000}
          height={500}
          className='w-full h-[420px] object-cover rounded-xl'
          alt={restaurant.name}
        />
      </div>
      <h2 className='text-3xl font-bold mt-2'>{restaurant.name}</h2>
      <div>
        <Image src={"/star.png"} alt='star' width={20} height={20} />
        <label className='text-sm text-gray-500'>4.5 (55)</label>
      </div>
      <h2 className='text-gray-500 mt-2 flex gap-2'>{restaurant.address}</h2>
    </div>
  );
}

export default Intro;
