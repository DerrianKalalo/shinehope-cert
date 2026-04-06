import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Verify() {
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

  if (loading) return <h2>Loading...</h2>

  if (!cert || cert.message) {
    return <h2>Certificate not found</h2>
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Certificate Verified</h1>
      <p><b>Name:</b> {cert.name}</p>
      <p><b>Program:</b> {cert.program}</p>
      <p><b>Credential ID:</b> {cert.id}</p>
      <p><b>Date:</b> {cert.date}</p>
    </div>
  )
}