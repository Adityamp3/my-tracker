import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('wins')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const { data, error } = await supabase
      .from('wins')
      .insert([
        {
          user_id: user.id,
          win_text: body.win_text,
          emotion_category: body.emotion_category,
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}