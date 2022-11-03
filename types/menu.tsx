export interface MySelection {
    name: string,
    href?: string,
    types?: "int" | "ext"| 'admin',
    subMenu?: MySelection[],
    action?: () => void;
} 