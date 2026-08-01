export default function capitalizeFirstLetter(to: string): string {
  return to.slice(0).charAt(0).toUpperCase() + to.slice(1);
}
