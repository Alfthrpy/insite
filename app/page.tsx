

export default function Home() {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen">

      <div className="flex flex-col justify-center items-center">
        Insite
      </div>

      <div className="flex flex-col justify-center items-center bg-slate-300 rounded-md py-1 px-1 m-1">
        <a href="/login">Login</a>
      </div>

      <div className="flex flex-col justify-center items-center bg-slate-300 rounded-md py-1 px-1 m-1">
        <a href="/register">Register</a>
      </div>
    
    </section>
  );
}
