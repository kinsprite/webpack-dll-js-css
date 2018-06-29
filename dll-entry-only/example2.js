export default 10;

export async function myFunc() {
   await import('./async-d2.css');
   const myF = await import('./async-d2');
   myF();
}
