'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestConnection() {
  const [status, setStatus] = useState('Testing...')

  useEffect(() => {
    const test = async () => {
      try {
        const { data, error } = await supabase.from('logs').select('*').limit(1)
        if (error) {
          setStatus(`❌ Error: ${error.message}`)
        } else {
          setStatus('✅ Connected to Supabase!')
        }
      } catch (err) {
        setStatus(`❌ Error: ${String(err)}`)
      }
    }

    test()
  }, [])

  return <div className="p-4 text-lg">{status}</div>
}