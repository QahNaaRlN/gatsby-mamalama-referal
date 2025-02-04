/**
 * Объект, содержащий информацию о различных доменах.
 * Каждый ключ объекта представляет собой URL домена, а значение — объект с информацией о домене.
 *
 * @type {Object}
 * @property {Object} 'zakaz1500.mamalama.kz/' - Информация о домене 'zakaz1500.mamalama.kz/'.
 * @property {string} 'zakaz1500.mamalama.kz/.name' - Название домена.
 * @property {Object} 'partners.mamalama.kz/' - Информация о домене 'partners.mamalama.kz/'.
 * @property {string} 'partners.mamalama.kz/.name' - Название домена.
 * @property {Object} 'partners2.mamalama.kz/' - Информация о домене 'partners2.mamalama.kz/'.
 * @property {string} 'partners2.mamalama.kz/.name' - Название домена.
 */
export const domains = {
  'zakaz1500': {
    name: 'zakaz1500.mamalama.kz',
  },
  'partners': {
    name: 'partners.mamalama.kz',
  },
  'partners2': {
    name: 'partners2.mamalama.kz',
  },
  'localhost': {
    name: 'localhost',
  },
} as const;