"use client"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
function SuccessInner(){
  const sp = useSearchParams()
  const sid = sp.get("session_id")
  return (
    <div style={{background:'#000',color:'#fff',minHeight:'100vh',padding:'32px',textAlign:'center'}}>
      <h1 style={{color:'#0f0'}}>PAGO OK - HELLFIRE DESATADO</h1>
      <p>Session: {sid}</p>
      <p>Licencia: mock_license_123</p>
      <a href="/feed/metal" style={{color:'#f00'}}>IR AL FEED</a>
    </div>
  )
}
export default function Success(){ return <Suspense><SuccessInner/></Suspense> }
