import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  const { id } = req.query

  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return res.status(404).json({ message: 'Certificate not found' })
  }

  res.status(200).json(data)
}