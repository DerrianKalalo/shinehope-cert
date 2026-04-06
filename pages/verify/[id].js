import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function VerifyPage() {
  const router = useRouter()
  const { id } = router.query

  const [cert, setCert] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    fetch(`/api/verify?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setCert(data)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div style={{textAlign:'center', padding:'50px'}}>
        <h2>Checking certificate...</h2>
      </div>
    )
  }

  if (!cert || cert.message) {
    return (
      <div style={{
        minHeight:'100vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        background:'#FFF5CC'
      }}>
        <div style={{
          background:'white',
          padding:'40px',
          borderRadius:'15px',
          textAlign:'center'
        }}>
          <h2 style={{color:'red'}}>Certificate Not Found</h2>
          <button onClick={()=>router.push('/')}>
            Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight:'100vh',
      background:'#FFF5CC',
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    }}>
      <div style={{
        background:'white',
        padding:'40px',
        borderRadius:'15px',
        textAlign:'center',
        boxShadow:'0 10px 25px rgba(0,0,0,0.1)'
      }}>

        <img src="/logo.png" width="100"/>

        <h1 style={{color:'#FF8FB1'}}>
          Certificate Verified
        </h1>

        <p><b>Name:</b> {cert.name}</p>
        <p><b>Program:</b> {cert.program}</p>
        <p><b>Credential ID:</b> {cert.id}</p>
        <p><b>Date:</b> {cert.date}</p>

        <br/>

        <button onClick={()=>router.push('/')}>
          Verify Another
        </button>

      </div>
    </div>
  )
}