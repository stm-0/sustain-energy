export type MeasurementLevel = "red" | "amber" | "green" | "none"

export const MeasurementLevelScore = {
  red: 0,
  amber: 5,
  green: 10,
  none: 0,
} as const

export interface MeasurementItem {
  id: number
  icon: string
  title: string
  description: string
}

export interface Measurement {
  id: number
  level: MeasurementLevel
}

export const measurements: MeasurementItem[] = [
  {
    id: 1,
    icon: "ph:recycle-bold",
    title: "Waste Reduction",
    description:
      "Does the company actively reduce, reuse, and recycle waste materials?",
  },
  {
    id: 2,
    icon: "ph:lightning-bold",
    title: "Renewable Energy Usage",
    description:
      "What proportion of the company's energy comes from renewable sources?",
  },
  {
    id: 3,
    icon: "ph:drop-bold",
    title: "Water Conservation",
    description:
      "Has the company implemented measures to reduce water consumption?",
  },
  {
    id: 4,
    icon: "ph:bus-bold",
    title: "Sustainable Transportation",
    description:
      "Does the company encourage low-emission travel for staff and logistics?",
  },
  {
    id: 5,
    icon: "ph:tree-bold",
    title: "Carbon Offsetting",
    description:
      "Does the company offset its carbon emissions through verified programmes?",
  },
  {
    id: 6,
    icon: "ph:package-bold",
    title: "Sustainable Procurement",
    description:
      "Does the company source materials and services from sustainable suppliers?",
  },
  {
    id: 7,
    icon: "ph:users-bold",
    title: "Community Engagement",
    description:
      "Does the company engage with local environmental initiatives?",
  },
  {
    id: 8,
    icon: "ph:building-office-bold",
    title: "Green Facilities",
    description:
      "Is the company's workspace designed or retrofitted for energy efficiency?",
  },
  {
    id: 9,
    icon: "ph:graduation-cap-bold",
    title: "Staff Training",
    description:
      "Are employees trained and educated on sustainability practices?",
  },
  {
    id: 10,
    icon: "ph:file-text-bold",
    title: "Sustainability Reporting",
    description:
      "Does the company publish or maintain an internal sustainability report?",
  },
] as const

export type CertificateLevel = "bronze" | "silver" | "gold"
