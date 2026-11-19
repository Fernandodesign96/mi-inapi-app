import {
  PDFDocument,
  PDFFont,
  PDFPage,
  StandardFonts,
  rgb,
  type RGB,
} from "pdf-lib";
import { mockUser, type Solicitud } from "@/lib/mockData";

const PAGE_H = 841.89;
const PAGE_W = 595.28;
const BLUE = rgb(0.058823529411764705, 0.4117647058823529, 0.7686274509803922);
const GRAY = rgb(0.4196078431372549, 0.4470588235294118, 0.5019607843137255);
const INK = rgb(0.2, 0.2, 0.2);
const TABLE_FILL = rgb(0.9764705882352941, 0.9803921568627451, 0.984313725490196);
const TABLE_STROKE = rgb(0.8980392156862745, 0.9058823529411765, 0.9215686274509803);
const MARGIN_X = 56;
const CONTENT_R = 539.28;
const VALUE_X = 182;
const LABEL_X = 64;
const MAX_W = CONTENT_R - MARGIN_X;

function winAnsi(text: string): string {
  return text
    .replace(/\u00a0/g, " ")
    .replace(/[–—]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .normalize("NFC");
}

function wrap(
  text: string,
  font: PDFFont,
  size: number,
  max: number
): string[] {
  const words = winAnsi(text).split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= max) current = next;
    else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function txt(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  size: number,
  font: PDFFont,
  color: RGB
) {
  page.drawText(winAnsi(text), { x, y, size, font, color });
}

function destinatarioEmail(solicitud: Solicitud): string {
  if (solicitud.solicitante === mockUser.name) return mockUser.email;
  return solicitud.notificacion?.contacto ?? "inapi@inapi.cl";
}

function numeroNotificacion(id: string): string {
  const n = Number.parseInt(id.replace(/\D/g, ""), 10);
  if (!Number.isFinite(n)) return "663257";
  return String(100000 + (n % 800000));
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function fechaSlash(value?: string): string {
  if (value) {
    const m = value.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
    if (m) return `${pad2(Number(m[1]))}/${pad2(Number(m[2]))}/${m[3]}`;
  }
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Santiago" })
  );
  return `${pad2(now.getDate())}/${pad2(now.getMonth() + 1)}/${now.getFullYear()}`;
}

function actuacionOficio(solicitud: Solicitud): string {
  const raw = (
    solicitud.accion ??
    solicitud.notificacion?.requerimiento ??
    "Actuación en el expediente"
  ).trim();
  return raw.replace(/\.+$/, "");
}

function fechaGuion(slash: string): string {
  return slash.replace(/\//g, "-");
}

function roundedTable(page: PDFPage) {
  const x = 56;
  const y = 532.774;
  const w = 483.28;
  const h = 137.8;
  const r = 6;
  page.drawSvgPath(
    `M ${x + r} ${y} L ${x + w - r} ${y} Q ${x + w} ${y} ${x + w} ${y + r} L ${x + w} ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h} L ${x + r} ${y + h} Q ${x} ${y + h} ${x} ${y + h - r} L ${x} ${y + r} Q ${x} ${y} ${x + r} ${y} Z`,
    { color: TABLE_FILL, borderColor: TABLE_STROKE, borderWidth: 1 }
  );
  for (const ly of [643.014, 615.454, 587.894, 560.334]) {
    page.drawLine({
      start: { x: 56, y: ly },
      end: { x: 539.28, y: ly },
      thickness: 0.5,
      color: TABLE_STROKE,
    });
  }
}

function underline(page: PDFPage, x: number, y: number, w: number) {
  page.drawLine({
    start: { x, y: y - 1.5 },
    end: { x: x + w, y: y - 1.5 },
    thickness: 1,
    color: BLUE,
  });
}

export async function buildResolucionLegalPdf(
  solicitud: Solicitud,
  logoBytes?: ArrayBuffer | Uint8Array
): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([PAGE_W, PAGE_H]);
  const helv = await pdf.embedFont(StandardFonts.Helvetica);
  const helvBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const fecha = fechaSlash(solicitud.fechaPresentacion);
  const destinatario = solicitud.solicitante ?? "Titular del expediente";
  const email = destinatarioEmail(solicitud);
  const actuacion = actuacionOficio(solicitud);
  const notifN = numeroNotificacion(solicitud.id);
  const generado = fechaSlash();

  if (logoBytes) {
    try {
      const logo = await pdf.embedJpg(logoBytes);
      page.drawImage(logo, {
        x: 56,
        y: 741.89,
        width: 48.087,
        height: 44,
      });
    } catch {
      /* logo opcional */
    }
  }

  txt(page, "Notificación electrónica", 370.365, 771.12, 15, helvBold, BLUE);
  txt(
    page,
    "Instituto Nacional de Propiedad Industrial · Marcas",
    338.058,
    755.428,
    9,
    helv,
    GRAY
  );

  page.drawLine({
    start: { x: 56, y: 729.89 },
    end: { x: 539.28, y: 729.89 },
    thickness: 2,
    color: BLUE,
  });

  const titulo = `Aviso de Notificación Electrónica INAPI Marcas: ${actuacion}. Solicitud ${solicitud.id}`;
  const titleLines = wrap(titulo, helvBold, 13, MAX_W);
  txt(page, titleLines[0] ?? titulo, 56, 704.556, 13, helvBold, INK);
  if (titleLines[1]) {
    txt(page, titleLines.slice(1).join(" "), 56, 689.086, 13, helvBold, INK);
  }

  roundedTable(page);

  const rows: [string, string, number, number][] = [
    ["Fecha", fecha, 655.112, 655.394],
    ["N° de solicitud", solicitud.id, 627.552, 627.834],
    ["Marca", solicitud.nombre, 599.992, 600.274],
    ["Actuación", actuacion, 572.432, 572.714],
    [
      "Destinatario",
      `${destinatario} (${email})`,
      544.872,
      545.154,
    ],
  ];
  for (const [label, value, ly, vy] of rows) {
    txt(page, label, LABEL_X, ly, 9, helv, GRAY);
    const vLines = wrap(value, helvBold, 10, CONTENT_R - 12 - VALUE_X);
    txt(page, vLines[0] ?? value, VALUE_X, vy, 10, helvBold, INK);
  }

  txt(page, "CONTENIDO DE LA NOTIFICACIÓN", 56, 506.312, 9, helvBold, GRAY);
  txt(page, `Estimado(a) ${destinatario}`, 56, 488.099, 10.5, helvBold, INK);
  txt(page, `Santiago, ${fechaGuion(fecha)}`, 56, 463.8575, 10.5, helv, INK);

  const p1a = `Informo a usted que en la tramitación de la Solicitud ${solicitud.id}, de la marca `;
  const p1b = solicitud.nombre;
  const p1c = ", se ha realizado una actuación. Para conocer su contenido, debe acceder a la casilla electrónica alojada en el sitio de trámites de INAPI, en el siguiente link https://tramites.inapi.cl/Notificaciones.";
  const intro = wrap(p1a + p1b + p1c, helv, 10.5, MAX_W);
  let y = 440.2229;
  for (const line of intro) {
    txt(page, line, 56, y, 10.5, helv, INK);
    const link = "https://tramites.inapi.cl/Notificaciones";
    const idx = line.indexOf(link);
    if (idx >= 0) {
      const x0 = 56 + helv.widthOfTextAtSize(line.slice(0, idx), 10.5);
      underline(page, x0, y, helv.widthOfTextAtSize(link, 10.5));
    }
    y -= 15.138;
  }

  const legal = wrap(
    "Se deja constancia que esta comunicación no constituye notificación legal. Asimismo, la imposibilidad de acceder a la dirección señalada o la ausencia de la información pertinente en ella, no afectará la validez de lo obrado en el expediente respectivo conforme lo dispuesto en el artículo 13 de la Ley Nº 19.039.",
    helv,
    10.5,
    MAX_W
  );
  y = 386.3123;
  for (const line of legal) {
    txt(page, line, 56, y, 10.5, helv, INK);
    y -= 15.138;
  }

  const auto = wrap(
    `Este correo electrónico ha sido generado automáticamente y enviado a ${email}, por favor no intente responder. Si desea comunicarse con nosotros escríbanos al correo inapi@inapi.cl.`,
    helv,
    10.5,
    MAX_W
  );
  y = 317.2637;
  for (const line of auto) {
    txt(page, line, 56, y, 10.5, helv, INK);
    const mail = "inapi@inapi.cl";
    const idx = line.indexOf(mail);
    if (idx >= 0) {
      const x0 = 56 + helv.widthOfTextAtSize(line.slice(0, idx), 10.5);
      underline(page, x0, y, helv.widthOfTextAtSize(mail, 10.5));
    }
    y -= 15.138;
  }

  const spam = wrap(
    "Para asegurar la recepción de nuestros correos, agregue  no_reply@mensajeria.inapi.cl a su lista de contactos.",
    helv,
    10.5,
    MAX_W
  );
  y = 278.4911;
  for (const line of spam) {
    txt(page, line, 56, y, 10.5, helv, INK);
    const addr = "no_reply@mensajeria.inapi.cl";
    const idx = line.indexOf(addr);
    if (idx >= 0) {
      const x0 = 56 + helv.widthOfTextAtSize(line.slice(0, idx), 10.5);
      underline(page, x0, y, helv.widthOfTextAtSize(addr, 10.5));
    }
    y -= 15.138;
  }

  txt(page, "Saluda atentamente a usted,", 56, 239.7185, 10.5, helv, INK);
  txt(
    page,
    "Instituto Nacional de Propiedad Industrial (INAPI)",
    56,
    219.7253,
    10.5,
    helv,
    INK
  );
  txt(page, "Carabineros de Chile, Nº 195", 56, 204.5873, 10.5, helv, INK);
  txt(page, "Santiago", 56, 189.4493, 10.5, helv, INK);
  txt(page, "F: (56 2) 2 887 0400", 56, 174.3113, 10.5, helv, INK);
  txt(page, "inapi@inapi.cl", 56, 159.1733, 10.5, helv, BLUE);
  underline(page, 56, 159.1733, helv.widthOfTextAtSize("inapi@inapi.cl", 10.5));

  const foot = `Notificación N° ${notifN} · Generado por MiINAPI el ${generado} · Página 1 de 1`;
  const footW = helv.widthOfTextAtSize(winAnsi(foot), 8);
  txt(page, foot, (PAGE_W - footW) / 2, 34.256, 8, helv, GRAY);

  return pdf.save();
}
