export function generateCredentialID(program, number) {
  const year = new Date().getFullYear();
  const num = String(number).padStart(3, '0');
  return `SHF-${year}-${program}-${num}`;
}