import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { width: string; height: string } }
) {
  try {
    const { width, height } = params;
    const widthNum = parseInt(width);
    const heightNum = parseInt(height);

    if (isNaN(widthNum) || isNaN(heightNum) || widthNum <= 0 || heightNum <= 0) {
      return NextResponse.json({ error: 'Invalid dimensions' }, { status: 400 });
    }

    // Create a simple SVG placeholder
    const svg = `<svg width="${widthNum}" height="${heightNum}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999" font-family="Arial, sans-serif" font-size="14">
        ${widthNum}×${heightNum}
      </text>
    </svg>`;

    return new NextResponse(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Error generating placeholder:', error);
    return NextResponse.json({ error: 'Failed to generate placeholder' }, { status: 500 });
  }
}