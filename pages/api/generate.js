import QRCode from 'qrcode'
import { supabase } from '../../lib/supabase'

function programCode(program) {
  if (program === 'Volunteer') return 'VOL'
  if (program === 'Internship') return 'INT'
  if (program === 'Seminar') return 'SEM'
  return 'GEN'
}

async function generateID(program) {
  const code = programCode(program)

  const { data } = await supabase
    .from('certificates')
    .select('id')
    .like('id', `SHF-${code}-2026-%`)

  const count = data.length + 1
  const number = String(count).padStart(3, '0')

  return `SHF-${code}-2026-${number}`
}

export default async function handler(req, res) {
  try {
    const { name, program } = req.body

    const id = await generateID(program)
    const date = new Date().toLocaleDateString()

    const verifyURL = `https://shinehope-cert.vercel.app/${id}`
    const qr = await QRCode.toDataURL(verifyURL)

    const { error } = await supabase
      .from('certificates')
      .insert([{ id, name, program, date }])

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.status(200).json({
      id,
      name,
      program,
      date,
      qr
    })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}