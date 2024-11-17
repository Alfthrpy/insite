
export default function service() {
   return (
      <div className="h-full w-full xl:w-11/12">
         <div className="container m-4 p-5 rounded-box bg-white">
            <div className="flex w-full flex-col">
               <div className="card bg-base-100 rounded-box grid h-32 place-items-center"><p className="text-5xl font-bold">Hubungi Kami </p><br />
               Jangan ragu untuk menghubungi kami terkait kebutuhan Anda. Tim kami siap membantu dengan senang hati!</div>
               <div className="divider"></div>
               <div className="flex w-full flex-col lg:flex-row gap-4">
                  <div className="card bg-base-100 rounded-box grid h-28 flex-grow place-items-center">
                     <p className="text-2xl font-bold">Whatsapp</p>
                     <a href="">+62 122 333 4444</a>
                  </div>
                  <div className="divider divider-horizontal">OR</div>
                  <div className="card bg-base-100 rounded-box grid h-28 flex-grow place-items-center">
                     <p className="text-2xl font-bold">Email</p>
                     <a href="">sc.titikkoma03@gmail.com</a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}