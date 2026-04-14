// Mock data — Biblioteca de Recursos
export type RecursoTipo = "pdf" | "video" | "presentacion" | "web";
export type RecursoCat = "manuales" | "guias" | "videos" | "oficiales";

export interface RecursoBiblioteca {
  id: string;
  categoria: RecursoCat;
  tipo: RecursoTipo;
  tipoLabel?: string;
  nombre: string;
  tamaño?: string;
  duracion?: string; // solo para video
  url: string;
  accion: 'descargar' | 'ver';
  ctaLabel?: string;
}

export const bibliotecaMock: RecursoBiblioteca[] = [
    {
      id: 'r1',
      tipo: 'pdf',
      tamaño: '5.6 MB',
      nombre: 'Guía Cómo registrar una marca en Chile 2025',
      categoria: 'guias',
      url: 'https://www.inapi.cl/docs/default-source/2025-doc/home/gu%C3%ADa-inapi_marcas-(1).pdf?sfvrsn=a12ca5b3_1',
      accion: 'descargar',
    },
    {
      id: 'r2',
      tipo: 'web',
      nombre: 'Capacitaciones INAPI — Martes Propiedad Industrial',
      categoria: 'oficiales',
      url: 'https://www.inapi.cl/aprende-de-propiedad-industrial/martes-de-propiedad-industrial',
      accion: 'ver',
      ctaLabel: 'Ver capacitaciones',
    },
    {
      id: 'r3',
      tipo: 'pdf',
      tamaño: '16.4 MB',
      nombre: 'Manual de usuario: Solicitud de marca internacional 2023',
      categoria: 'manuales',
      url: 'https://www.inapi.cl/docs/default-source/2023/sistema-madrid/tramites/manual-protocolo-de-madrid_inapi.pdf?sfvrsn=cbcd3d05_2',
      accion: 'descargar',
    },
    {
      id: 'r4',
      tipo: 'video',
      duracion: '16:35',
      nombre: 'Tutorial INAPI: ¿Cómo solicitar una marca en línea? Sesión 1',
      categoria: 'videos',
      url: 'https://www.youtube.com/watch?v=TEBAHRqo69w',
      accion: 'ver',
      ctaLabel: 'Ver ahora',
    },
    {
      id: 'r5',
      tipo: 'presentacion', // Using presentation to map WEB
      nombre: 'Clasificador de Niza — Herramienta oficial',
      categoria: 'oficiales',
      url: 'https://tramites.inapi.cl/Trademark/TrademarkNizaClassifier',
      accion: 'ver',
      ctaLabel: 'Ver ahora',
    },
    {
      id: 'r6',
      tipo: 'pdf',
      tamaño: '0.89 MB',
      nombre: 'Reglamento de la Ley 19.039 de Propiedad Industrial',
      categoria: 'oficiales',
      url: 'https://www.inapi.cl/docs/default-source/default-document-library/reglamento-de-la-ley-19-039-de-propiedad-industrialb4829545d0b14528878346e8eaff540b.pdf?sfvrsn=e87d63b4_0',
      accion: 'descargar',
    },
];

export const getBibliotecaByCategoria = (cat: RecursoCat | null) =>
  cat ? bibliotecaMock.filter((r) => r.categoria === cat) : bibliotecaMock;

export const searchBiblioteca = (query: string) => {
  const q = query.toLowerCase();
  return bibliotecaMock.filter((r) => r.nombre.toLowerCase().includes(q));
};

export interface CategoriaBiblioteca {
  id: RecursoCat;
  label: string;
  iconBg: string;
  iconColor: string;
}

export const categoriasBiblioteca: CategoriaBiblioteca[] = [
  { id: "manuales", label: "Manuales", iconBg: "#DBEAFE", iconColor: "#1A56DB" },
  { id: "guias", label: "Guías", iconBg: "#D1FAE5", iconColor: "#059669" },
  { id: "videos", label: "Videos", iconBg: "#EDE9FE", iconColor: "#7C3AED" },
  { id: "oficiales", label: "Oficiales", iconBg: "#FEF3C7", iconColor: "#D97706" },
];
