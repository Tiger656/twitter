"use client"; 
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
//https://www.primefaces.org/primereact-v8/reactfinalform/
export default function Login() {

    const [checked, setChecked] = useState(false);
    const router = useRouter();

    function afa() {
        const a = "a";
        const b = a;
        console.log(b);
    }
    const abc = async (e: FormEvent) => {
        e.preventDefault();
        console.log("hello");
        const form = new FormData(e.target as HTMLFormElement);
        console.log(form.get('username'));
        console.log(form.get('password'));
       
        const res = await fetch("http://localhost:3000/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: form.get('username'), password: form.get('password')}),
            });
         const token = await res.json()
         console.log(token);
         localStorage.setItem("token", token.access_token)
         if(token){
            
            router.push("/");  
         } 
        // const response = await fetch("https://example.com/profile", {
        //     method: "POST", // or 'PUT'
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(e.target),
        //   });
        //form.restart();
    };

    return (
    <div className="flex align-items-center justify-content-center">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
            <div className="text-center mb-5">
                {/* <img src="/demo/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" /> */}
                <img src="shitter1.png" alt="hyper" height={200} className="mb-3" />
                <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                <span className="text-600 font-medium line-height-3">Don't have an account?</span>
                <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
            </div>

            <div>
                <form onSubmit={abc} action="" >
                    <label htmlFor="username" className="block text-900 font-medium mb-2">Username</label>
                    <InputText id="username" type="text" placeholder="Username" className="w-full mb-3" name="username"/>

                    <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                    <InputText id="password" type="password" placeholder="Password" className="w-full mb-3" name="password"/>

                    {/* <div className="flex align-items-center justify-content-between mb-6">
                        <div className="flex align-items-center">
                            <Checkbox id="rememberme" onChange={e => setChecked(e.value.checked)} checked={checked} className="mr-2" />
                            <label htmlFor="rememberme">Remember me</label>
                        </div>
                        <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
                    </div> */}

                    <Button type="submit" label="Sign In" icon="pi pi-user" className="w-full"/>
                </form>
            </div>
        </div>
    </div>)
  }
  