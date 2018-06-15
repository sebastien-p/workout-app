// Because of TypeScript 2.6.2, otherwise, see https://goo.gl/2yJxVc.
declare module '*.json' {
  const value: any;
  export default value;
}
