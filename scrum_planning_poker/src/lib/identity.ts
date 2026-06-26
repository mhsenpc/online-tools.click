const STORAGE_KEY = 'scrum-planning-poker/user-id'
const NAME_STORAGE_KEY = 'scrum-planning-poker/display-name'

export function getUserId() {
  if (typeof window === 'undefined') {
    return crypto.randomUUID()
  }

  const existingId = window.localStorage.getItem(STORAGE_KEY)
  if (existingId) {
    return existingId
  }

  const newId = crypto.randomUUID()
  window.localStorage.setItem(STORAGE_KEY, newId)
  return newId
}

export function getRememberedName() {
  if (typeof window === 'undefined') {
    return ''
  }

  return window.localStorage.getItem(NAME_STORAGE_KEY) ?? ''
}

export function rememberName(name: string) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(NAME_STORAGE_KEY, name)
}
