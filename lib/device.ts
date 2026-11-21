import { headers } from "next/headers";
import { userAgent } from "next/server";

export type Device = {
  /** Een telefoon (geen tablet, laptop of desktop). */
  isPhone: boolean;
  /** Een iPhone of iPod. iPads melden zich als Mac en tellen dus niet mee. */
  isIPhone: boolean;
  isAndroidPhone: boolean;
};

/**
 * Bepaalt op de server welk soort toestel de pagina opvraagt, aan de hand
 * van de user-agent. Omdat dit op de server gebeurt, krijgt een telefoon
 * meteen de juiste versie te zien, zonder verspringen na het laden.
 */
export async function getDevice(): Promise<Device> {
  const { device, os } = userAgent({ headers: await headers() });
  const isPhone = device.type === "mobile";
  const isIPhone = isPhone && os.name === "iOS";
  const isAndroidPhone = isPhone && os.name === "Android";
  return { isPhone, isIPhone, isAndroidPhone };
}
