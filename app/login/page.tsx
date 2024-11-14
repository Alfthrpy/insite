import LoginFormComponents from "./form";
import '../globals.css'

export default function Login(){
    return(
        <section className="flex flex-col justify-center items-center min-h-screen">
            <LoginFormComponents />
        </section>
    )
}