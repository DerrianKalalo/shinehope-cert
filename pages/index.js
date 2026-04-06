import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [id, setId] = useState('')
  const router = useRouter()

  const handleVerify = () => {
    if (!id) return
    router.push(`/verify/${id}`)
  }

  return (
    <div style={{
      minHeight:'100vh',
      background:'#FFF5CC',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center'
    }}>

      {/* LOGO */}
      <img src="/logo.png" width="120" />

      {/* TITLE */}
      <h1 style={{color:'#FF8FB1'}}>
        ShineHope Foundation
      </h1>

      {/* CARD */}
      <div style={{
        background:'white',
        padding:'40px',
        borderRadius:'15px',
        width:'400px',
        textAlign:'center',
        boxShadow:'0 10px 25px rgba(0,0,0,0.1)'
      }}>
        <h2>Certificate Verification</h2>

        <input
          placeholder="Enter Credential ID (e.g. SHF-VOL-2026-001)"
          value={id}
          onChange={(e)=>setId(e.target.value)}
          style={{
            padding:'12px',
            width:'85%',
            borderRadius:'8px',
            border:'1px solid #ddd'
          }}
        />

        <br/><br/>

        <button
          onClick={handleVerify}
          style={{
            background:'#FFD966',
            border:'none',
            padding:'12px 25px',
            borderRadius:'8px',
            fontWeight:'bold',
            cursor:'pointer'
          }}
        >
          Verify Certificate
        </button>
      </div>

      {/* FOOTER */}
      <p style={{marginTop:'20px', color:'#888'}}>
        © 2026 ShineHope Foundation
      </p>

    </div>
  )
}