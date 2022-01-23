export default function Rafi() {
  return (
    <main className='w-full max-w-4xl min-h-screen px-8 pb-5 mx-auto sm:pb-0 xl:px-0 font-inter pt-30'>
      <div className='flex flex-col text-lg text-gray-600 my-14'>
        <div>
          <span className='font-bold text-gray-700'>Nama :</span> Rafi Amrulah Putra Indriarto
        </div>
        <div>
          <span className='font-bold text-gray-700'>Tugas :</span> TIK - Memasukan Video dan Audio
          ke HTML
        </div>
      </div>

      <div className='grid grid-cols-2 gap-10'>
        <figure>
          <figcaption className='mb-1 sm:mb-3'>
            <span className='font-semibold text-gray-700'>Justin Bieber </span> - STAY (Video)
          </figcaption>
          <video className='block w-full h-auto shadow-lg rounded-2xl' controls>
            <source src='/justin-stay.mp4' type='video/mp4' />
          </video>
        </figure>
        <figure>
          <figcaption className='mb-2'>
            <span className='font-semibold text-gray-700'>Justin Bieber </span> - STAY (Audio)
          </figcaption>
          <audio
            id='Audio'
            controls
            src='/justin-stay.mp3'
            className='w-full border border-gray-400 rounded-full sm:w-2/3'
          >
            This is author title song
          </audio>
        </figure>
      </div>
    </main>
  );
}


//This is way how to see the react tree dom on every html element we make, we can see this via console
// const Example = (
//   <main>
//     <h1>This is Heading!</h1>
//   </main>
// );

// console.log(Example);
