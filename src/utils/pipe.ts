
export const pipe = (...fns: any) => (arg: any) => fns.reduce((value:any, fns: any) => fns(value), arg)