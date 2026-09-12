export const OWNER_EMAIL = 'armando.campos.668837@facebook.com';
export type Role = 'owner' | 'creador' | 'critico' | 'especialista' | 'musica';
export const isOwner = (email: string) => email?.toLowerCase().includes('armando');
export const hasRole = (email: string, role: Role) => isOwner(email) ? true : false; // owner bypass todo
