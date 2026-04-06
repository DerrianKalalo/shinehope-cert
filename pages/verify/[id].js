import fs from 'fs'
import path from 'path'

export default function Page({ cert }) {
  if (!cert) {
    return (
      <div style={{textAlign:'center', padding:'50px'}}>
        <h1>Certificate Not Found</h1>
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
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx){
  const { id } = ctx.params

  const filePath = path.join(process.cwd(), 'data', 'certificates.json')
  const data = JSON.parse(fs.readFileSync(filePath,'utf8'))

  const cert = data.find(c=>c.id===id) || null

  return { props:{ cert } }
}