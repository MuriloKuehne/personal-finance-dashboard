import { ImageResponse } from 'next/og'

export const alt = 'Personal Finance Dashboard'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            Personal Finance
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 400,
              opacity: 0.9,
            }}
          >
            Dashboard
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 300,
              opacity: 0.8,
              marginTop: 40,
            }}
          >
            Manage your finances with ease
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

