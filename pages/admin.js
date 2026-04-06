import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import * as XLSX from 'xlsx'
import Papa from 'papaparse'

export default function Admin() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [program, setProgram] = useState('Leadership')
  const [result, setResult] = useState(null)
  const [certs, setCerts] = useState([])

  useEffect(()=>{
    if (!localStorage.getItem('admin')) {
      router.push('/login')
    }
    loadCertificates()
  },[])

  const loadCertificates = async () => {
    const res = await fetch('/api/verify')
    const data = await res.json()
    setCerts(data)
  }

  const generate = async () => {
    const res = await fetch('/api/generate', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ name, program })
    })

    const data = await res.json()
    setResult(data)
    loadCertificates()
  }

  const deleteCert = async (id) => {
    await fetch('/api/verify', {
      method:'DELETE',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ id })
    })

    loadCertificates()
  }

  const copyID = (id) => {
    navigator.clipboard.writeText(id)
    alert('Copied: ' + id)
  }

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(certs)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Certificates")
    XLSX.writeFile(workbook, "certificates.xlsx")
  }

  const uploadCSV = (e) => {
    const file = e.target.files[0]

    Papa.parse(file, {
      header: true,
      complete: async function(results) {
        const participants = results.data.map(r => ({
          name: r.Name,
          program: r.Program
        }))

        await fetch('/api/generate', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ participants })
        })

        alert('Mass certificates generated')
        loadCertificates()
      }
    })
  }

  return (
    <div style={{padding:'40px', textAlign:'center'}}>
      <h1>Admin Dashboard</h1>

      <div style={{background:'white', padding:'20px', borderRadius:'10px', width:'400px', margin:'auto'}}>
        <h2>Generate Certificate</h2>

        <input
          placeholder="Name"
          onChange={(e)=>setName(e.target.value)}
        />
        <br/><br/>

        <select onChange={(e)=>setProgram(e.target.value)}>
          <option>Leadership</option>
          <option>Volunteer</option>
          <option>Seminar</option>
          <option>Workshop</option>
          <option>Training</option>
        </select>
        <br/><br/>

        <button onClick={generate}>Generate</button>

        {result && (
          <div>
            <h3>Credential ID:</h3>
            <h2>{result.id}</h2>
            <button onClick={()=>copyID(result.id)}>Copy ID</button>
            <br/>
            <img src={result.qr} width="120"/>
          </div>
        )}
      </div>

      <br/>

      <h2>Upload CSV Participants</h2>
      <input type="file" accept=".csv" onChange={uploadCSV} />

      <br/><br/>
      <button onClick={exportExcel}>Export Excel</button>

      <br/><br/>

      <h2>Certificate List</h2>

      <table border="1" style={{margin:'auto', background:'white'}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Program</th>
            <th>Credential ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {certs.map((c)=>(
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.program}</td>
              <td>{c.id}</td>
              <td>
                <button onClick={()=>copyID(c.id)}>Copy</button>
                <button onClick={()=>deleteCert(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}