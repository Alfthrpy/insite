import RegisterFormComponents from "./form";
import '../globals.css'

export default function Register(){
    return(
        <section className="flex flex-col justify-center items-center min-h-screen">
            <RegisterFormComponents />
        </section>
    )
}