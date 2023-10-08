import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //return NextResponse.redirect(new URL('/login', request.url))
  //const token = localStorage.getItem("token");
  let token = request.cookies.get('token')
  console.log("Token:" + token)
  if(!token){
    return NextResponse.redirect(new URL('/login', request.url))  
  } 
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/'],
}