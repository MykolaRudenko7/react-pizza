// кажу, що це не js module а спеціальний тип (для ТС)
declare module '*.svg' {
  const content: any;
  export default content;
}
declare module '*.png' {
  const content: any;
  export default content;
}
declare module '*.scss' {
  const content: any;
  export default content;
}
