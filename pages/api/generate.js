import QRCode from 'qrcode'
import { supabase } from '../../lib/supabase'

function generateID() {
  return 'SHF-' + Math.random().toString(36).substr(2, 9).toUpperCase()
}

export default async function handler(req, res) {
  try {
    const { name, program } = req.body

    const id = generateID()
    const date = new Date().toLocaleDateString()

    const verifyURL = `https://shinehope-cert.vercel.app/verify/${id}`
    const qr = await QRCode.toDataURL(verifyURL)

    const { data, error } = await supabase
      .from('certificates')
      .insert([{ id, name, program, date }])

    if (error) {
      console.log(error)
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
    console.log(err)
    res.status(500).json({ error: 'Server error' })
  }
}