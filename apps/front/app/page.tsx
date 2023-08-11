'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Key } from 'readline';

export default async function Home() {
  const router = useRouter()
  const token = localStorage.getItem("token");
  if(!token){
    router.push("/login");  
  } 

  const response = await fetch("http://localhost:3000/post");
  const posts = await response.json() as [];

  const header = (
    <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
  );
  const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
        <Button label="Save" icon="pi pi-check" />
        <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary" />
    </div>
  );

  const card = (data: any) => (
    <Card title="Title" subTitle="Subtitle" footer={footer} header={header} className="md:w-25rem">
                <p className="m-0">
                  
                    {data.textContent}
                </p>
    </Card>
  )

  return (
    <div className="card flex justify-content-center">
            {posts.map(element => card(element))}
    </div>
  )
}

