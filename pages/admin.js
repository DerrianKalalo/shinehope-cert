import { useEffect, useState } from 'react'

export default function Admin() {
  const [certs, setCerts] = useState([])
  const [name, setName] = useState('')
  const [program, setProgram] = useState('Volunteer')

  // FETCH DATA
  const fetchData = async () => {
    const res = await fetch('/api/list')
    const data = await res.json()
    setCerts(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  // GENERATE
  const handleGenerate = async () => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, program })
    })

    await fetchData()
    setName('')
  }

  // DELETE
  const handleDelete = async (id) => {
    if (!confirm('Delete this certificate?')) return

    await fetch('/api/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })

    fetchData()
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Dashboard</h1>

      <h2>Generate Certificate</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <select value={program} onChange={(e) => setProgram(e.target.value)}>
        <option>Volunteer</option>
        <option>Internship</option>
        <option>Seminar</option>
      </select>

      <button onClick={handleGenerate}>Generate</button>

      <h2>Certificate List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Program</th>
            <th>Credential ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {certs.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.program}</td>
              <td>{c.id}</td>
              <td>
                <button onClick={() => handleDelete(c.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}