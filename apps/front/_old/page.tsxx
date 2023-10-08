'use client'
import useSWR from 'swr'
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import { TupleType } from 'typescript';


const fetcher = async (url: string, param?: any) => {
  const response = await fetch(url, param);
  return await response.json() as [];
}

export default async function Home() {
 
  const router = useRouter()
  const { data, error, isLoading } = useSWR("http://localhost:3000/post", fetcher)
  
  // const token = localStorage.getItem("token");
  // if(!token){
  //   router.push("/login");  
  // } 

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if(!token){
  //     router.push("/login");  
  //   } 
  // }, [])


  

  // const response = await fetch("http://localhost:3000/post");
  // const posts = await response.json() as [];
  
 

  

  

  const header = (
    <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
  );
  const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
        <Button label="Save" icon="pi pi-check" />
        <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary" />
    </div>
  );

  const card = (cardData: any) => (
    <Card title="Title" subTitle="Subtitle" footer={footer} header={header} className="md:w-25rem">
                <p className="m-0">
                  
                    {cardData.textContent}
                </p>
    </Card>
  )

  if (error) return <p>Failed to load.</p>
  if (isLoading) return <p>Loading...</p>

  return (
    <div className="card flex justify-content-center">
      {data.map(element => card(element))}
    </div>
  )
}

