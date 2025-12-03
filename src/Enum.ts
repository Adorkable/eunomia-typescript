
import { MapWithNoDuplicateValues } from './Map'

// TODO: is there a way to maintain the order of the fields passed into obj?
/** 
 * makeEnum: Typescript utility for making "more useful" enums, based on the help of Stack Overflow member jcalz: https://stackoverflow.com/a/79760980/96153
 * @example
 * const example = makeEnum({
 *     Dead: "Beef",
 *     Hello: "World",
 *     Lorum: "Ipsum"
 * })
 *
 * export const Example = example.map
 * // Result:
 * // const Example: {
 * //     readonly Dead: "Beef";
 * //     readonly Hello: "World";
 * //     readonly Lorum: "Ipsum";
 * // }
 * // Useful for value references: const value = Example.Hello
 *
 * export const ExampleValues = example.values
 * // Result:
 * // const ExampleValues: readonly ("Beef" | "World" | "Ipsum")[] 
 * // Useful for iterating over all values or runtime testing valid values
 * 
 * export type ExampleType = typeof example.type
 * // Result: 
 * // type ExampleType = "Beef" | "World" | "Ipsum"
 * // Useful for type checking when defining signatures of other types, functions, etc
*/
export const makeEnum = <const EnumRecord extends Record<string, string>>(object: MapWithNoDuplicateValues<string, string, EnumRecord>) => {
    return {
        map: object,
        values: (Object.keys(object) as (keyof EnumRecord)[]).map(k => object[k]) as EnumRecord[keyof EnumRecord][],
        type: null as unknown as EnumRecord[keyof EnumRecord],
    } as const
}