// Íconos de línea propios, todos con el mismo trazo.
const I = ({ d, size = 24, fill = false, children }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill={fill ? 'currentColor' : 'none'} stroke={fill ? 'none' : 'currentColor'} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {d ? <path d={d} /> : children}
  </svg>
)

export const COMIDA = {
  torta: (p) => <I {...p} d="M4 20h16M5 20v-7h14v7M5 16.5c2.3 1.4 4.7 1.4 7 0s4.7-1.4 7 0M12 13V9.5M12 7c.9-.9.9-1.9 0-2.8-.9.9-.9 1.9 0 2.8Z" />,
  medialuna: (p) => <I {...p} d="M3 15.5C4 10.3 7.9 7 12 7s8 3.3 9 8.5c-2 .8-3.6.4-4.7-1-1 1.7-2.5 2.6-4.3 2.6s-3.3-.9-4.3-2.6c-1.1 1.4-2.7 1.8-4.7 1ZM9.2 9l1.4 5.3M14.8 9l-1.4 5.3" />,
  alfajor: (p) => <I {...p}><ellipse cx="12" cy="8.5" rx="8" ry="3" /><path d="M4 8.5v2.2c0 1.7 3.6 3 8 3s8-1.3 8-3V8.5M4 13.2v2.3c0 1.7 3.6 3 8 3s8-1.3 8-3v-2.3" /></I>,
  tarta: (p) => <I {...p} d="M3 18.5h18L12 5.5 3 18.5ZM6.6 15.5h10.8M8.8 12.3h6.4M9.5 18.5l3.4-8.6M14.5 18.5l-3.4-8.6" />,
  budin: (p) => <I {...p} d="M4 11.5C4 8.4 7.6 6 12 6s8 2.4 8 5.5V19H4v-7.5ZM4 11.5h16M8.5 8.4v3.1M12 7.3v4.2M15.5 8.4v3.1" />,
  empanada: (p) => <I {...p} d="M3 16.5C3 11.8 7 8 12 8s9 3.8 9 8.5H3ZM5.2 16.5l.9-1.7M8 16.5l.6-2M11 16.5l.3-2.1M14 16.5l-.1-2.1M17 16.5l-.5-2M19.3 16.5l-.8-1.6" />,
  sandwich: (p) => <I {...p} d="M3 18h18L12 5 3 18ZM5.6 14.3c2.1.9 4.3.9 6.4 0s4.3-.9 6.4 0" />,
}

export const Buscar = (p) => <I {...p} d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15ZM16 16l5 5" />
export const Carrito = (p) => <I {...p} d="M3 4h2l2.2 10.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L20.5 8H6.1M10 20.5h.01M17 20.5h.01" />
export const Corazon = ({ lleno, ...p }) => <I {...p} fill={lleno} d="M12 20s-7.5-4.6-9.2-9.2C1.6 7.4 4 4.5 7 4.5c2 0 3.6 1.2 5 3 1.4-1.8 3-3 5-3 3 0 5.4 2.9 4.2 6.3C19.5 15.4 12 20 12 20Z" />
export const Casa = (p) => <I {...p} d="M4 10.5 12 4l8 6.5V20H14.5v-5.5h-5V20H4v-9.5Z" />
export const Grilla = (p) => <I {...p} d="M4 4h6.5v6.5H4zM13.5 4H20v6.5h-6.5zM4 13.5h6.5V20H4zM13.5 13.5H20V20h-6.5z" />
export const Ticket = (p) => <I {...p} d="M6 3h12v18l-3-2-3 2-3-2-3 2V3ZM9 8h6M9 12h6M9 16h3" />
export const Charla = (p) => <I {...p} d="M4 5h16v11H9l-5 4V5ZM8.5 9.5h7M8.5 12.5h4" />
export const Mas = (p) => <I {...p} d="M12 5v14M5 12h14" />
export const Menos = (p) => <I {...p} d="M5 12h14" />
export const Flecha = (p) => <I {...p} d="M5 12h14m-5-5 5 5-5 5" />
export const Trigo = (p) => <I {...p} d="M12 21V8M12 8c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4Zm0 0c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4Zm0 5c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4Zm0 0c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4Zm0 5c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4Zm0 0c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4Z" />
