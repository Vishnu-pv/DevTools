import { NextResponse } from 'next/server'

// Health check endpoint
export async function GET(request) {
  const { pathname } = new URL(request.url)
  
  if (pathname === '/api/health') {
    return NextResponse.json({ 
      status: 'ok',
      message: 'DevToolbox API is running',
      timestamp: new Date().toISOString()
    })
  }

  return NextResponse.json({ 
    error: 'Not found',
    message: 'This endpoint does not exist'
  }, { status: 404 })
}

export async function POST(request) {
  return NextResponse.json({ 
    error: 'Not implemented',
    message: 'This endpoint is not yet implemented'
  }, { status: 501 })
}
