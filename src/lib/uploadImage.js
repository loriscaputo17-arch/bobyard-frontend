import { supabase } from './supabase'

export async function uploadImage(file) {
  // Nome file unico per evitare collisioni
  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error } = await supabase.storage
    .from('images')
    .upload(fileName, file, { cacheControl: '3600', upsert: false })

  if (error) throw error

  // URL pubblico
  const { data } = supabase.storage.from('images').getPublicUrl(fileName)
  return data.publicUrl
}