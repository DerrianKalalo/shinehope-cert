import { useState } from 'react'
import { useRouter } from 'next/router'

export default function VerifyHome() {
  const [id, setId] = useState('')
  const router = useRouter()

  const handleVerify = () => {
    if (!id) return
    router.push(`/verify/${id}`)
  }

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>Verify Certificate</h1>
      <p>Enter Credential ID</p>

      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="SHF-VOL-2026-001"
        style={{ padding: 10, width: 300 }}
      />

      <br /><br />

      <button onClick={handleVerify} style={{ padding: 10 }}>
        Verify
      </button>
    </div>
  )
}