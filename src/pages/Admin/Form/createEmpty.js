import uuid from 'uuid'

export function createEmptyVariation() {
  return {id: uuid('v'), type: '', stock: '', price: '', is_new: true}
}

export function createEmptyPackagingOption() {
  return {id: uuid('p'), type: '', capacity: '', price: '', is_new: true,}
}
