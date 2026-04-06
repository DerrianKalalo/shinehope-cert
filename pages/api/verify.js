import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'certificates.json')
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

  // GET = verify / list
  if (req.method === 'GET') {
    const { id } = req.query

    if (id) {
      const cert = data.find(c => c.id === id)
      if (cert) return res.status(200).json(cert)
      return res.status(404).json({ error: 'Not found' })
    }

    // return all certificates
    return res.status(200).json(data)
  }

  // DELETE certificate
  if (req.method === 'DELETE') {
    const { id } = req.body

    const newData = data.filter(c => c.id !== id)
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2))

    return res.status(200).json({ message: 'Deleted' })
  }
}