/** Equipment type */
export enum DeviceEnum {
  Mobile,
  Desktop
}

/** Sidebar open status constant */
export const SIDEBAR_OPENED: string = "opened"
/** Sidebar closed state constant */
export const SIDEBAR_CLOSED: string = "closed"

export type SidebarOpened = typeof SIDEBAR_OPENED
export type SidebarClosed = typeof SIDEBAR_CLOSED
