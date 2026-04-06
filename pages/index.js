import { useState } from 'react'

export default function Home() {
  const [id, setId] = useState('')
  const [data, setData] = useState(null)
  const [notFound, setNotFound] = useState(false)

  const verify = async () => {
    setNotFound(false)
    setData(null)

    const res = await fetch('/api/verify?id=' + id)

    if (res.status === 200) {
      const result = await res.json()
      setData(result)
    } else {
      setNotFound(true)
    }
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

      {/* Logo */}
      <img src="/logo.png" width="120" />

      <h1 style={{color:'#FF8FB1'}}>
        ShineHope Foundation
      </h1>

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
          placeholder="Enter Credential ID"
          value={id}
          onChange={(e)=>setId(e.target.value)}
          style={{
            padding:'12px',
            width:'80%',
            borderRadius:'8px',
            border:'1px solid #ddd'
          }}
        />

        <br/><br/>

        <button
          onClick={verify}
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

        {/* RESULT */}
        {data && (
          <div style={{marginTop:'20px'}}>
            <h3 style={{color:'green'}}>Certificate Valid</h3>
            <p><b>Name:</b> {data.name}</p>
            <p><b>Program:</b> {data.program}</p>
            <p><b>Credential ID:</b> {data.id}</p>
            <p><b>Date:</b> {data.date}</p>
          </div>
        )}

        {notFound && (
          <div style={{marginTop:'20px'}}>
            <h3 style={{color:'red'}}>Certificate Not Found</h3>
          </div>
        )}
      </div>

      <p style={{marginTop:'20px', color:'#888'}}>
        © 2026 ShineHope Foundation
      </p>

    </div>
  )
}