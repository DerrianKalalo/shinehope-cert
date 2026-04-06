import fs from 'fs'
import path from 'path'
import QRCode from 'qrcode'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'certificates.json')

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]')
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    const year = new Date().getFullYear()

    // MASS GENERATE (CSV)
    if (req.body.participants) {
      const participants = req.body.participants
      let newCerts = []

      for (let p of participants) {
        const number = data.length + newCerts.length + 1
        const code = p.program.substring(0,3).toUpperCase()

        const id = `SHF-${year}-${code}-${String(number).padStart(3, '0')}`

        newCerts.push({
          id,
          name: p.name,
          program: p.program,
          date: new Date().toLocaleDateString()
        })
      }

      const finalData = [...data, ...newCerts]
      fs.writeFileSync(filePath, JSON.stringify(finalData, null, 2))

      return res.status(200).json({ message: 'Mass generated' })
    }

    // SINGLE GENERATE
    const { name, program } = req.body
    const number = data.length + 1
    const code = program.substring(0,3).toUpperCase()

    const id = `SHF-${year}-${code}-${String(number).padStart(3, '0')}`
    const qr = await QRCode.toDataURL(`https://shinehope-cert.vercel.app/verify/${id}`)

    const newCert = {
      id,
      name,
      program,
      date: new Date().toLocaleDateString()
    }

    data.push(newCert)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    res.status(200).json({ id, qr })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Server Error' })
  }
}