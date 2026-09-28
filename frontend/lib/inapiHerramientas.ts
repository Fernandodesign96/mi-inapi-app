/** Herramientas oficiales INAPI (Fase 1 — búsqueda, revisión y clasificación). */

export type InapiHerramientaCategoria = "marcas" | "patentes" | "clasificacion";

export type InapiHerramientaAccent = "info" | "success" | "warning" | "accent";

export type InapiHerramienta = {
  id: string;
  categoria: InapiHerramientaCategoria;
  accent: InapiHerramientaAccent;
  title: string;
  shortLabel: string;
  href: string;
  paraQue: string;
  cuandoUsarla: string;
  bullets: readonly string[];
  ctaLabel: string;
};

export const INAPI_HERRAMIENTAS_INTRO = {
  title: "Herramientas INAPI",
  subtitle:
    "Herramientas de búsqueda y revisión de marcas, patentes y clasificación de productos y servicios",
  lead:
    "Antes de pedir un registro, usa estas herramientas oficiales para revisar si tu nombre, invención o clase de productos ya existe o está descrita de forma correcta. Se abren en el sitio de INAPI; MiINAPI te explica para qué sirve cada una.",
} as const;

export const INAPI_HERRAMIENTAS_PASOS = [
  {
    n: "1",
    title: "Busca primero",
    text: "Revisa marcas o patentes parecidas a lo que quieres proteger. Así reduces el riesgo de que te rechacen o te presenten una oposición.",
  },
  {
    n: "2",
    title: "Clasifica con precisión",
    text: "Elige la clase de Niza y describe productos o servicios concretos. Una descripción vaga suele generar observaciones de forma o de fondo.",
  },
  {
    n: "3",
    title: "Solicita en el portal",
    text: "Cuando tengas nombre, clase y antecedentes claros, inicia el trámite en el portal oficial. Después el seguimiento lo haces aquí, en MiINAPI.",
  },
] as const;

export const INAPI_HERRAMIENTAS: readonly InapiHerramienta[] = [
  {
    id: "buscador-marcas",
    categoria: "marcas",
    accent: "info",
    title: "Buscador de marcas",
    shortLabel: "Marcas",
    href: "https://buscadormarcas.inapi.cl/Marca/BuscarMarca.aspx",
    paraQue:
      "Consulta si ya existe una marca igual o parecida a la que quieres registrar. Sirve para revisar nombres, logos y solicitudes en trámite en Chile.",
    cuandoUsarla:
      "Úsala antes de presentar una solicitud de marca y también si recibes una observación de fondo por similitud.",
    bullets: [
      "Busca por denominación (el nombre escrito) o por otros datos del expediente.",
      "Compara resultados similares: no basta con que el nombre no sea idéntico.",
      "Revisa el estado (en trámite, registrada, caducada) para entender si sigue vigente.",
      "Anota el número de solicitud o registro si necesitas citarlo en un trámite.",
    ],
    ctaLabel: "Abrir buscador de marcas",
  },
  {
    id: "clasificador-niza",
    categoria: "clasificacion",
    accent: "success",
    title: "Clasificador de productos y servicios",
    shortLabel: "Clasificación",
    href: "https://tramites.inapi.cl/Trademark/TrademarkNizaClassifier",
    paraQue:
      "Te ayuda a ubicar la clase de Niza y a redactar una lista clara de productos o servicios. INAPI examina esa lista: si es genérica o incorrecta, puede emitir una observación.",
    cuandoUsarla:
      "Úsala al armar tu solicitud de marca y si te piden precisar la descripción (por ejemplo, «cosméticos» en lugar de un rubro demasiado amplio).",
    bullets: [
      "Las marcas se protegen por clase: la Clase 3 no cubre lo mismo que la Clase 35.",
      "Describe lo que realmente ofreces (producto o servicio), no un giro comercial vago.",
      "Puedes tener varias clases; cada una puede implicar tasas y un examen distinto.",
      "Copia el texto sugerido y ajústalo a tu caso antes de pegarlo en el formulario.",
    ],
    ctaLabel: "Abrir clasificador de Niza",
  },
  {
    id: "buscador-patentes",
    categoria: "patentes",
    accent: "warning",
    title: "Buscador de patentes",
    shortLabel: "Patentes",
    href: "https://buscadorpatentes.inapi.cl/UI/MainSearch.aspx",
    paraQue:
      "Permite revisar invenciones publicadas en Chile y, en muchos casos, documentos técnicos asociados. Sirve para ver si tu idea ya fue descrita o protegida.",
    cuandoUsarla:
      "Úsala antes de solicitar una patente o un modelo de utilidad, y para estudiar el estado de la técnica en tu rubro.",
    bullets: [
      "Busca por palabras clave del problema técnico, no solo por el nombre comercial.",
      "Revisa resúmenes y reivindicaciones para entender qué se protege realmente.",
      "Una invención ya divulgada puede afectar la novedad de tu solicitud.",
      "Guarda el número de publicación o solicitud si un ejecutivo te pide referencias.",
    ],
    ctaLabel: "Abrir buscador de patentes",
  },
  {
    id: "portal-solicitud-marca",
    categoria: "marcas",
    accent: "accent",
    title: "Portal de solicitud de marca",
    shortLabel: "Trámite",
    href: "https://tramites.inapi.cl/Trademark/TrademarkApplication/IndexTrademark",
    paraQue:
      "Es el canal oficial para iniciar una solicitud de marca en línea. MiINAPI no reemplaza este portal: aquí haces el seguimiento una vez que el trámite existe.",
    cuandoUsarla:
      "Úsala cuando ya revisaste el buscador de marcas y tienes la clasificación de productos o servicios lista.",
    bullets: [
      "Prepara ClaveÚnica, datos del titular y el signo que quieres proteger.",
      "Adjunta los documentos que el formulario pida (poder, etiquetas, etc.).",
      "Guarda el número de solicitud que te entregue el sistema.",
      "Vuelve a MiINAPI para ver etapas, plazos y si hay una acción requerida.",
    ],
    ctaLabel: "Ir al portal de solicitudes",
  },
];

export const INAPI_HERRAMIENTAS_LINKS = INAPI_HERRAMIENTAS.filter(
  (h) => h.id !== "portal-solicitud-marca"
).map((h) => ({ label: h.title, href: h.href }));
