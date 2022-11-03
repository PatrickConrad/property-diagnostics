export type SearchData = "properties"|"users"
export type SearchFilter = "id" | "city"|"owners"|"zip"|"group"|"scheduledInspectoinDate"| "lastInspectionDate" | 'inspector'|'email'|'firstName'|'lastName'|'roles'|'state'|'address'

export interface SearchParams {
  dataTypes: SearchData[],
  filterFields: SearchFilter[],
}