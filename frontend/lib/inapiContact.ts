/** Datos de contacto institucional INAPI (Fase 1 — pantalla Contacto). */

export const INAPI_INSTITUTION = {
  name: "Instituto Nacional de Propiedad Industrial (INAPI)",
  rut: "65.999.669-3",
} as const;

export type InapiContactChannel = {
  id: string;
  label: string;
  value: string;
  href?: string;
};

export const INAPI_CONTACT_CHANNELS: InapiContactChannel[] = [
  {
    id: "ubicacion",
    label: "Ubicación",
    value: "Av. Libertador Bernardo O'Higgins 194, Santiago",
    href: "https://maps.google.com/?q=Av.+Libertador+Bernardo+O'Higgins+194,+Santiago",
  },
  {
    id: "telefono",
    label: "Teléfono",
    value: "(56 2) 2 887 0400",
    href: "tel:+56228870400",
  },
  {
    id: "horario",
    label: "Horario telefónico",
    value:
      "Lunes a jueves, 09:00–18:00 hrs. · Viernes, 09:00–17:00 hrs.",
  },
  {
    id: "correo",
    label: "Correo electrónico",
    value: "inapi@inapi.cl",
    href: "mailto:inapi@inapi.cl",
  },
];

/** @deprecated Usar INAPI_INSTITUTION + INAPI_CONTACT_CHANNELS en UI nueva. */
export const INAPI_CONTACT_LINES = [
  INAPI_INSTITUTION.name,
  `RUT: ${INAPI_INSTITUTION.rut}`,
  `Ubicación: ${INAPI_CONTACT_CHANNELS[0].value}`,
  `Teléfono: ${INAPI_CONTACT_CHANNELS[1].value}`,
  `Horario de atención telefónica: ${INAPI_CONTACT_CHANNELS[2].value}`,
  `Correo electrónico: ${INAPI_CONTACT_CHANNELS[3].value}`,
] as const;
