import { useEffect, useState } from 'react'

export default function Admin() {
  const [certs, setCerts] = useState([])
  const [name, setName] = useState('')
  const [program, setProgram] = useState('Volunteer')
  const [year, setYear] = useState('2025')
  const [batch, setBatch] = useState('B1')

  const fetchData = async () => {
    const res = await fetch('/api/list')
    const data = await res.json()
    setCerts(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleGenerate = async () => {
    await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, program, year, batch })
    })

    fetchData()
    setName('')
  }

  const handleDelete = async (id) => {
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
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <select value={program} onChange={(e)=>setProgram(e.target.value)}>
        <option>Volunteer</option>
        <option>Internship</option>
        <option>Seminar</option>
      </select>

      <input
        placeholder="Year"
        value={year}
        onChange={(e)=>setYear(e.target.value)}
        style={{width:'80px'}}
      />

      <select value={batch} onChange={(e)=>setBatch(e.target.value)}>
        <option>B1</option>
        <option>B2</option>
        <option>B3</option>
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
                <button onClick={()=>handleDelete(c.id)}>
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