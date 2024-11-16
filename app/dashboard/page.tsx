
export default function Dahsboard() {
  
  return (
    <><div className="container w-4/5 m-4 p-5 rounded-box bg-white">
      <div className="flex w-full flex-col lg:flex-row">
        <div className="card bg-base-300 rounded-md grid h-24 flex-grow place-items-center">content</div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="card bg-base-300 rounded-md grid h-24 flex-grow place-items-center">content</div>
      </div>

      <div className="flex w-full flex-col mt-4 gap-5">
      <div className="btn no-animation bg-purpleHover hover:bg-purpleSecondary rounded-md flex h-20 items-center justify-start px-4">
          <div className="flex flex-col items-start gap-1 ml-2">
            <h1 className="text-xl font-bold text-base-100 m-0 leading-none">Buat Undangan Baru</h1>
            <h1 className="text-sm text-base-100 m-0 leading-none">Buat Undangan Baru</h1>
          </div>
        </div>
        <div className="card bg-base-300 rounded-md grid h-20 place-items-center">content</div>
      </div>

    </div><div className="container w-4/5 m-4 p-5 rounded-box bg-white">
        <div className="flex w-full flex-col mt-4 gap-5">
          <div className="card bg-base-300 rounded-box grid h-20 place-items-center">content</div>
          <div className="card bg-base-300 rounded-box grid h-20 place-items-center">content</div>
        </div>
      </div></>    
  )
}
