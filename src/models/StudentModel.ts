interface StudentTerrainValues {
  DamageDealt: string
  ShieldBlockRate: string
}

interface StudentTerrain {
  [key: string]: StudentTerrainValues
}

interface StudentAttribute {
  armorType: string
  baseStar: number
  bulletType: string
  name: string
  position: string
  profile: string
  rarity: string
  role: string
  squadType: string
  weaponType: string
}

interface StudentInfo {
  age: string
  artis: string
  club: string
  school: string
  schoolYear: string
  voiceActor: string
}

interface StudentStat {
  id: number
  attackLevel1: number
  attackLevel100: number
  maxHPLevel1: number
  maxHPLevel100: number
  defenseLevel1: number
  defenseLevel100: number
  healPowerLevel1: number
  healPowerLevel100: number
  defPenetrateLevel1: number
  defPenetrateLevel100: number
  ammoCount: number
  ammoCost: number
  range: number
  moveSpeed: number
  streetMood: string
  outdoorMood: string
  indoorMood: string
}

interface StudentSkillAttribute {
  level: number
  name: string
  description: string
  skillCost: number
  bulletType: number
}

interface StudentSkill {
  [key: string]: StudentSkillAttribute
}

interface StudentListAttributes {
  id: number
  baseStar: number
  rarity: string
  name: string
  profile: string
  armorType: string
  bulletType: string
  position: string
  role: string
  squadType: string
  weaponType: string
  terrain: StudentTerrain
}

interface StudentDetails {
  id: number
  isReleased: boolean
  isPlayable: boolean
  character: StudentAttribute
  info: StudentInfo
  stat: StudentStat
  terrain: StudentTerrain
  skills: StudentSkill
}

export type { StudentListAttributes, StudentDetails }
