type CertLevel = "gold" | "silver" | "bronze"

interface CertificateOptions {
  companyName: string
  score: number
  level: CertLevel
  year?: number
}

export function useCertificateDownload() {
  const W = 800
  const H = 1100

  //  Design tokens
  const TOKEN = {
    primary: "#008236",
    bronze: "#7b3306",
    silver: "#9f9fa9",
    gold: "#ffba00",
    foreground: "#0a0a0a",
    muted: "#737373",
    white: "#ffffff",
    border: "#e4e4e7",
  }

  const LOGO_ICON =
    "M223.45 40.07a8 8 0 0 0-7.52-7.52C139.8 28.08 78.82 51 52.82 94a87.1 87.1 0 0 0-12.76 49a101.7 101.7 0 0 0 6.64 32.2a4 4 0 0 0 6.61 1.43l85-86.3a8 8 0 0 1 11.32 11.32l-92.89 94.29l-14.19 14.19a8.2 8.2 0 0 0-.6 11.1a8 8 0 0 0 11.71.43l16.79-16.79c14.14 6.84 28.41 10.57 42.56 11.07q1.67.06 3.33.06A86.93 86.93 0 0 0 162 203.18c43-26 65.93-86.97 61.45-163.11"

  const LEVEL_CONFIG: Record<
    CertLevel,
    {
      label: string
      sub: string
      accent: string
      accentBg: string
      badgeText: string
    }
  > = {
    gold: {
      label: "GOLD LEVEL",
      sub: "Sustainability Target Achieved",
      accent: TOKEN.gold,
      accentBg: "#fff8e1",
      badgeText: TOKEN.foreground,
    },
    silver: {
      label: "SILVER LEVEL",
      sub: "Approaching Sustainability Target",
      accent: TOKEN.silver,
      accentBg: "#f4f4f5",
      badgeText: TOKEN.white,
    },
    bronze: {
      label: "BRONZE LEVEL",
      sub: "Below Sustainability Target",
      accent: TOKEN.bronze,
      accentBg: "#fdf0e8",
      badgeText: TOKEN.white,
    },
  }

  //* Helpers
  // Draws rounded rectangle
  function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
  ) {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.arcTo(x + w, y, x + w, y + r, r)
    ctx.lineTo(x + w, y + h - r)
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
    ctx.lineTo(x + r, y + h)
    ctx.arcTo(x, y + h, x, y + h - r, r)
    ctx.lineTo(x, y + r)
    ctx.arcTo(x, y, x + r, y, r)
    ctx.closePath()
  }

  // Draws a Phosphor icon from its raw SVG path string.
  function drawIcon(
    ctx: CanvasRenderingContext2D,
    svgPath: string,
    cx: number,
    cy: number,
    size: number,
    color: string,
  ) {
    const scale = size / 256
    ctx.save()
    ctx.translate(cx - size / 2, cy - size / 2)
    ctx.scale(scale, scale)
    ctx.fillStyle = color
    ctx.strokeStyle = color
    const path = new Path2D(svgPath)
    ctx.fill(path)
    ctx.restore()
  }

  // Main draw function
  function drawCertificate(
    canvas: HTMLCanvasElement,
    opts: CertificateOptions,
  ) {
    const cfg = LEVEL_CONFIG[opts.level]
    const year = opts.year ?? new Date().getFullYear()
    const ctx = canvas.getContext("2d")!

    canvas.width = W
    canvas.height = H

    //  Background
    ctx.fillStyle = TOKEN.white
    ctx.fillRect(0, 0, W, H)

    // Subtle level-tinted top wash
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H * 0.42)
    bgGrad.addColorStop(0, cfg.accentBg)
    bgGrad.addColorStop(1, TOKEN.white)
    ctx.fillStyle = bgGrad
    ctx.fillRect(0, 0, W, H)

    //  Outer border
    ctx.save()
    roundRect(ctx, 28, 28, W - 56, H - 56, 6)
    ctx.strokeStyle = cfg.accent
    ctx.lineWidth = 2.5
    ctx.stroke()
    ctx.restore()

    //  Top accent bar
    ctx.save()
    // Manually clip top two corners to radius 6, bottom sharp
    ctx.beginPath()
    ctx.moveTo(28 + 6, 28)
    ctx.lineTo(W - 28 - 6, 28)
    ctx.arcTo(W - 28, 28, W - 28, 28 + 6, 6)
    ctx.lineTo(W - 28, 28 + 10)
    ctx.lineTo(28, 28 + 10)
    ctx.lineTo(28, 28 + 6)
    ctx.arcTo(28, 28, 28 + 6, 28, 6)
    ctx.closePath()
    ctx.fillStyle = cfg.accent
    ctx.fill()
    ctx.restore()

    // Logo
    {
      // Logo Icon bg
      ctx.save()
      ctx.beginPath()
      ctx.arc(W / 2, 164, 16, 0, Math.PI * 2)
      ctx.fillStyle = TOKEN.primary
      ctx.fill()
      ctx.restore()

      // Logo Icon
      drawIcon(ctx, LOGO_ICON, W / 2, 164, 18, TOKEN.white)

      // Logo name
      ctx.textAlign = "center"
      ctx.fillStyle = TOKEN.primary
      ctx.font = "700 15px Sora, sans-serif"
      ctx.letterSpacing = "3px"
      ctx.fillText("SUSTAIN ENERGY", W / 2, 210)
      ctx.letterSpacing = "0px"
    }

    // Divider
    ctx.save()
    ctx.strokeStyle = TOKEN.border
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(W / 2 - 90, 222)
    ctx.lineTo(W / 2 + 90, 222)
    ctx.stroke()
    ctx.restore()

    //  Certificate heading
    ctx.fillStyle = TOKEN.foreground
    ctx.font = "600 12px Sora, sans-serif"
    ctx.letterSpacing = "3.5px"
    ctx.fillText("CERTIFICATE OF SUSTAINABILITY", W / 2, 252)
    ctx.letterSpacing = "0px"

    //  Level badge pill
    const badgeW = 230
    const badgeH = 42
    const badgeX = W / 2 - badgeW / 2
    const badgeY = 282

    ctx.save()
    roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 16)
    ctx.fillStyle = cfg.accent
    ctx.fill()
    ctx.restore()

    ctx.fillStyle = cfg.badgeText
    ctx.font = "700 12px Sora, sans-serif"
    ctx.letterSpacing = "2.5px"
    ctx.fillText(cfg.label, W / 2 + 4, badgeY + 24)
    ctx.letterSpacing = "0px"

    // Sub-label
    ctx.fillStyle = TOKEN.muted
    ctx.font = "400 13px Inter, sans-serif"
    ctx.fillText(cfg.sub, W / 2 + 4, badgeY + 64)

    //  Score circle
    ctx.save()
    ctx.beginPath()
    ctx.arc(W / 2, 488, 84, 0, Math.PI * 2)
    ctx.fillStyle = cfg.accentBg
    ctx.fill()
    ctx.strokeStyle = cfg.accent
    ctx.lineWidth = 2.5
    ctx.stroke()
    ctx.restore()

    // Score number
    ctx.fillStyle = cfg.accent
    ctx.font = "700 68px Sora, sans-serif"
    ctx.fillText(String(opts.score), W / 2, 510)

    // "/100"
    ctx.fillStyle = TOKEN.muted
    ctx.font = "500 13px Sora, sans-serif"
    ctx.fillText("out of 100 points", W / 2, 534)

    //  "This certifies that"
    ctx.fillStyle = TOKEN.muted
    ctx.font = "400 italic 15px Inter, sans-serif"
    ctx.fillText("This certifies that", W / 2, 604)

    //  Company name
    ctx.fillStyle = TOKEN.foreground
    ctx.font = "700 26px Sora, sans-serif"
    let name = opts.companyName
    while (ctx.measureText(name).width > W - 120 && name.length > 4)
      name = name.slice(0, -1)
    if (name !== opts.companyName) name += "…"
    ctx.fillText(name, W / 2, 642)

    // Body copy
    ctx.fillStyle = TOKEN.muted
    ctx.font = "400 14px Inter, sans-serif"
    ctx.fillText(
      "has been assessed and awarded the above sustainability rating",
      W / 2,
      674,
    )
    ctx.fillText(`for the annual period ending ${year}.`, W / 2, 694)

    //  Footer: issued / valid
    {
      const X = 80
      const Y = 762

      //  Horizontal divider
      ctx.save()
      ctx.strokeStyle = TOKEN.border
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(72, 730)
      ctx.lineTo(W - 72, 730)
      ctx.stroke()
      ctx.restore()

      // Left block
      ctx.textAlign = "left"
      ctx.fillStyle = TOKEN.muted
      ctx.font = "600 10px Sora, sans-serif"
      ctx.letterSpacing = "1.5px"
      ctx.fillText("ISSUED BY", X, Y)
      ctx.letterSpacing = "0px"
      ctx.fillStyle = TOKEN.foreground
      ctx.font = "700 14px Sora, sans-serif"
      ctx.fillText("Sustain Energy Ltd", X, Y + 20)
      ctx.fillStyle = TOKEN.muted
      ctx.font = "400 12px Inter, sans-serif"
      ctx.fillText("Edinburgh, Scotland", X, Y + 20 + 18)

      // Right block
      ctx.textAlign = "right"
      ctx.fillStyle = TOKEN.muted
      ctx.font = "600 10px Sora, sans-serif"
      ctx.letterSpacing = "1.5px"
      ctx.fillText("VALID FOR", W - X, Y)
      ctx.letterSpacing = "0px"
      ctx.fillStyle = TOKEN.foreground
      ctx.font = "700 14px Sora, sans-serif"
      ctx.fillText(`Annual Period ${year}`, W - X, Y + 20)
      ctx.fillStyle = TOKEN.muted
      ctx.font = "400 12px Inter, sans-serif"
      ctx.fillText("Reviewed yearly", W - X, Y + 20 + 18)
    }

    //  Seal row
    ctx.textAlign = "center"
    const seals = [
      { x: W / 2 - 150, line1: "PLATFORM", line2: "CERTIFIED" },
      { x: W / 2, line1: "EDINBURGH", line2: "COLLEGE" },
      { x: W / 2 + 150, line1: "ISO 27001", line2: "ALIGNED" },
    ]
    seals.forEach((seal) => {
      ctx.save()
      ctx.beginPath()
      ctx.arc(seal.x, 920, 30, 0, Math.PI * 2)
      ctx.strokeStyle = cfg.accent
      ctx.lineWidth = 1.5
      ctx.globalAlpha = 0.3
      ctx.stroke()
      ctx.restore()

      ctx.fillStyle = cfg.accent
      ctx.font = "700 7px Sora, sans-serif"
      ctx.letterSpacing = "1px"
      ctx.fillText(seal.line1, seal.x, 920)
      ctx.fillText(seal.line2, seal.x, 920 + 12)
      ctx.letterSpacing = "0px"
    })

    //  Copyright
    ctx.fillStyle = TOKEN.muted
    ctx.font = "400 11px Inter, sans-serif"
    ctx.fillText(
      `© ${year} Sustain Energy Ltd  ·  Company No. SC123456  ·  sustainenergy.co.uk`,
      W / 2,
      H - 38,
    )
  }

  //* Call function
  function downloadCertificate(opts: CertificateOptions) {
    const canvas = document.createElement("canvas")
    drawCertificate(canvas, opts)

    const slug = opts.companyName.replace(/\s+/g, "-").toLowerCase()
    const year = opts.year ?? new Date().getFullYear()
    const filename = `SustainEnergy-Certificate-${slug}-${year}.png`

    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
    }, "image/webp")
  }

  return { downloadCertificate }
}
