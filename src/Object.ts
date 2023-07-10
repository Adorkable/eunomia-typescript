interface ObjectConstructor {
  typedKeys<T>(obj: T): (keyof T)[]
}
Object.typedKeys = Object.keys as any
