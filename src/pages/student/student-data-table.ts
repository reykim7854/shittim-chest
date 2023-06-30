import { computed, ref, Ref, reactive } from 'vue'

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    field: (row: { name: string }) => row.name,
    sortable: true
  },
  {
    name: 'squadType',
    required: true,
    label: 'Squad Type',
    field: (row: { squadType: string }) => row.squadType,
    sortable: true
  },
  {
    name: 'baseStar',
    required: true,
    label: 'Base Star',
    field: (row: { baseStar: number }) => row.baseStar,
    sortable: true
  },
  {
    name: 'school',
    required: true,
    label: 'School',
    field: (row: { school: string }) => row.school,
    sortable: true
  },
  {
    name: 'position',
    required: true,
    label: 'Position',
    field: (row: { position: string }) => row.position,
    sortable: true
  },
  {
    name: 'role',
    required: true,
    label: 'Role',
    field: (row: { role: string }) => row.role,
    sortable: true
  },
  {
    name: 'urban',
    required: true,
    label: 'Urban Terrain',
    field: (row: any) => row.terrain.urban.DamageDealt,
    sortable: true
  },
  {
    name: 'bulletType',
    required: true,
    label: 'Bullet Type',
    field: (row: { bulletType: string }) => row.bulletType,
    sortable: true
  },
  {
    name: 'armorType',
    required: true,
    label: 'Armor Type',
    field: (row: { armorType: string }) => row.armorType,
    sortable: true
  },
  {
    name: 'weaponType',
    required: true,
    label: 'Weapon Type',
    field: (row: { weaponType: string }) => row.weaponType,
    sortable: true
  }
]

const visibleColumns: string[] = ['name']
const name: Ref<string> = ref('')
const rowsPerPageOptions: number[] = [12, 18, 24, 30]
const pagination: object = {
  rowsPerPage: 18
}

const filterValues = reactive({
  'squad type': {
    value: '',
    multiple: false,
    options: [
      { label: 'All', value: '' },
      { label: 'Striker', value: 'striker' },
      { label: 'Special', value: 'special' }
    ]
  },
  'base star': {
    value: [3, 2, 1],
    multiple: true,
    options: [
      { label: '', value: 3 },
      { label: '', value: 2 },
      { label: '', value: 1 }
    ]
  },
  school: {
    value: [
      'abydos',
      'arius',
      'gehenna',
      'hyakkiyako',
      'millennium',
      'redwinter',
      'srt',
      'shanhaijing',
      'trinity',
      'valkyrie',
      'etc'
    ],
    multiple: true,
    options: [
      { label: 'Abydos', value: 'abydos' },
      { label: 'Arius', value: 'arius' },
      { label: 'Gehenna', value: 'gehenna' },
      { label: 'Hyakkiyako', value: 'hyakkiyako' },
      { label: 'Millennium', value: 'millennium' },
      { label: 'Red Winter', value: 'redwinter' },
      { label: 'SRT', value: 'srt' },
      { label: 'Shanhaijing', value: 'shanhaijing' },
      { label: 'Trinity', value: 'trinity' },
      { label: 'Valkyrie', value: 'valkyrie' },
      { label: 'Other', value: 'etc' }
    ]
  },
  position: {
    value: ['front', 'middle', 'back'],
    multiple: true,
    options: [
      { label: 'Front', value: 'front' },
      { label: 'Middle', value: 'middle' },
      { label: 'Back', value: 'back' }
    ]
  },
  role: {
    value: ['attacker', 'tanker', 'supporter', 'healer', 'tactical'],
    multiple: true,
    options: [
      { label: 'Attacker', value: 'attacker' },
      { label: 'Tanker', value: 'tanker' },
      { label: 'Supporter', value: 'supporter' },
      { label: 'Healer', value: 'healer' },
      { label: 'Tactical', value: 'tactical' }
    ]
  },
  'bullet type': {
    value: ['explosion', 'penetration', 'mystic'],
    multiple: true,
    options: [
      { label: 'Explosion', value: 'explosion' },
      { label: 'Penetration', value: 'penetration' },
      { label: 'Mystic', value: 'mystic' }
    ]
  },
  'armor type': {
    value: ['light armor', 'heavy armor', 'special armor'],
    multiple: true,
    options: [
      { label: 'Light Armor', value: 'light armor' },
      { label: 'Heavy Armor', value: 'heavy armor' },
      { label: 'Special Armor', value: 'special armor' }
    ]
  },
  'weapon type': {
    value: ['ar', 'gl', 'hg', 'mg', 'mt', 'rg', 'rl', 'sg', 'smg', 'sr'],
    multiple: true,
    options: [
      { label: 'Assault Rifle', value: 'ar' },
      { label: 'Grenade Launcher', value: 'gl' },
      { label: 'Handgun', value: 'hg' },
      { label: 'Machine Gun', value: 'mg' },
      { label: 'Mortar', value: 'mt' },
      { label: 'Rail Gun', value: 'rg' },
      { label: 'Rocket Launcher', value: 'rl' },
      { label: 'Shotgun', value: 'sg' },
      { label: 'Submachine Gun', value: 'smg' },
      { label: 'Sniper Rifle', value: 'sr' }
    ]
  }
})
const sortBy = ref('name')
const isAsc = ref(true)
const filter = computed(() => {
  return {
    name: name.value,
    squadType: filterValues['squad type'].value,
    baseStar: filterValues['base star'].value,
    school: filterValues.school.value,
    position: filterValues.position.value,
    role: filterValues.role.value,
    bulletType: filterValues['bullet type'].value,
    armorType: filterValues['armor type'].value,
    weaponType: filterValues['weapon type'].value
  }
})

const handleSaveFilter = (filter: any) => {
  for (const key in filter) {
    filterValues[key as keyof typeof filterValues].value = filter[key].value
  }
}

const filterMethod = (rows: readonly any[], terms: any) => {
  const filtered = rows.filter((row) => {
    const filtered: boolean[] = [
      terms.name === ''
        ? true
        : row.name.toLowerCase().includes(terms.name.toLowerCase()),
      terms.squadType === '' || terms.squadType === row.squadType.toLowerCase(),
      terms.baseStar.includes(row.baseStar),
      terms.school.includes(row.school.toLowerCase()),
      terms.position.includes(row.position.toLowerCase()),
      terms.role.includes(row.role.toLowerCase()),
      terms.bulletType.includes(row.bulletType.toLowerCase()),
      terms.armorType.includes(row.armorType.toLowerCase()),
      terms.weaponType.includes(row.weaponType.toLowerCase())
    ]
    return filtered.every((value) => value === true)
  })

  filtered.sort((a, b) => {
    const valueA = a[sortBy.value]
    const valueB = b[sortBy.value]

    if (valueA < valueB) {
      return isAsc.value ? -1 : 1
    }
    if (valueA > valueB) {
      return isAsc.value ? 1 : -1
    }

    return 0
  })

  return filtered
}

export {
  columns,
  visibleColumns,
  name,
  rowsPerPageOptions,
  pagination,
  filterValues,
  sortBy,
  isAsc,
  filter,
  handleSaveFilter,
  filterMethod
}
