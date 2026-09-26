export function senhaValida(senha: string): boolean {
  const LetraMaiuscula = /[A-Z]/.test(senha);
  const Numero = /[0-9]/.test(senha);
  const CaractereEspecial = /[^A-Za-z0-9]/.test(senha);
  return senha.length >= 8 && LetraMaiuscula && Numero && CaractereEspecial;
}