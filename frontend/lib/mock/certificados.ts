// Mock data — Certificados
export type CertificadoTipo = "marca" | "patente" | "diseno";

export interface Certificado {
  id: string;
  tipo: CertificadoTipo;
  tipoLabel: string;
  nombre: string;
  registro: string;
  emision: string;
  iconColor: string;
  iconBg: string;
}

export const certificadosMock: Certificado[] = [
  {
    id: "c1",
    tipo: "marca",
    tipoLabel: "MARCA COMERCIAL",
    nombre: "SOLUCIONES TECH SPA",
    registro: "1.245.890",
    emision: "12 Oct 2023",
    iconColor: "#1A56DB",
    iconBg: "#EEF2FF",
  },
  {
    id: "c2",
    tipo: "patente",
    tipoLabel: "PATENTE DE INVENCIÓN",
    nombre: "SISTEMA FILTRADO ECO-PURE",
    registro: "2022-00567",
    emision: "3 Mar 2022",
    iconColor: "#7C3AED",
    iconBg: "#EDE9FE",
  },
  {
    id: "c3",
    tipo: "diseno",
    tipoLabel: "DISEÑO INDUSTRIAL",
    nombre: "BOTELLA ERGONÓMICA V3",
    registro: "8.442",
    emision: "20 Ago 2022",
    iconColor: "#059669",
    iconBg: "#D1FAE5",
  },
  {
    id: "c4",
    tipo: "marca",
    tipoLabel: "MARCA COMERCIAL",
    nombre: "AURA COSMETICS LTDA",
    registro: "1.189.234",
    emision: "15 Ene 2023",
    iconColor: "#1A56DB",
    iconBg: "#EEF2FF",
  },
];

export const getCertificadosByTipo = (tipo: CertificadoTipo | "todos") =>
  tipo === "todos"
    ? certificadosMock
    : certificadosMock.filter((c) => c.tipo === tipo);

export const searchCertificados = (query: string) => {
  const q = query.toLowerCase();
  return certificadosMock.filter(
    (c) =>
      c.nombre.toLowerCase().includes(q) ||
      c.registro.toLowerCase().includes(q)
  );
};
