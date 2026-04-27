import type { CertificateLevel } from "~/types/app.types"

export default function (score: number): CertificateLevel {
  if (score >= 70) return "gold"
  if (score >= 40) return "silver"
  return "bronze"
}
