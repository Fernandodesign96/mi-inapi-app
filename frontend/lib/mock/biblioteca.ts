// Mock data — Biblioteca de Recursos
export type RecursoTipo = "pdf" | "video" | "presentacion";
export type RecursoCat = "manuales" | "guias" | "videos" | "oficiales";

export interface RecursoBiblioteca {
  id: string;
  categoria: RecursoCat;
  tipo: RecursoTipo;
  tipoLabel: string;
  titulo: string;
  tamano: string;
  duracion?: string; // solo para video
  iconBg: string;
  iconColor: string;
}

export const bibliotecaMock: RecursoBiblioteca[] = [
  {
    id: "b1",
    categoria: "manuales",
    tipo: "pdf",
    tipoLabel: "PDF",
    titulo: "Manual de Registro de Marca — Guía Completa",
    tamano: "12 MB",
    iconBg: "#FEE2E2",
    iconColor: "#DC2626",
  },
  {
    id: "b2",
    categoria: "videos",
    tipo: "video",
    tipoLabel: "MP4",
    titulo: "Tutorial: Cómo ingresar una Solicitud de Patente",
    tamano: "",
    duracion: "03:45",
    iconBg: "#F3F4F6",
    iconColor: "#4B5563",
  },
  {
    id: "b3",
    categoria: "oficiales",
    tipo: "presentacion",
    tipoLabel: "PPTX",
    titulo: "Presentación Institucional INAPI 2026",
    tamano: "4.8 MB",
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
  },
  {
    id: "b4",
    categoria: "guias",
    tipo: "pdf",
    tipoLabel: "PDF",
    titulo: "Guía Práctica para Emprendedores: Protege tu Marca",
    tamano: "2.1 MB",
    iconBg: "#D1FAE5",
    iconColor: "#059669",
  },
  {
    id: "b5",
    categoria: "oficiales",
    tipo: "pdf",
    tipoLabel: "PDF",
    titulo: "Ley 19.039 de Propiedad Industrial — Texto Actualizado",
    tamano: "3.4 MB",
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
  },
  {
    id: "b6",
    categoria: "manuales",
    tipo: "pdf",
    tipoLabel: "PDF",
    titulo: "Manual de Patentes de Invención y Modelos de Utilidad",
    tamano: "8.7 MB",
    iconBg: "#FEE2E2",
    iconColor: "#DC2626",
  },
];

export const getBibliotecaByCategoria = (cat: RecursoCat | null) =>
  cat ? bibliotecaMock.filter((r) => r.categoria === cat) : bibliotecaMock;

export const searchBiblioteca = (query: string) => {
  const q = query.toLowerCase();
  return bibliotecaMock.filter((r) => r.titulo.toLowerCase().includes(q));
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
