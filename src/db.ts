// import { Settings } from 'config';
// import { RDash } from 'rethinkdbdash';
// const r: RDash = require('rethinkdbdash')({ servers: Settings.rethink });

// class TableTypes {
//     constructor(public value: string) {
//     }

//     toString(): string {
//         return this.value;
//     }

//     // todo add your tables here!
//     static Users = new TableTypes('Users');
// }

// const x = TableTypes.Users;

// class DBDecorators {
//     /**
//      * provides the table setup for a method, to reduce boilerplate
//      * @param tableName the name of the table
//      * @param dbPostfix the distinguishing postFix for a particular guild
//      */
//     static withTable(table: TableTypes, dbPostfix = 'global'): MethodDecorator {
//         const buildFunctionWithInjectedArgs = function (tableName: string, method: Function) {
//             return async function () {
//                 let result: string;

//                 try {
//                     const method_ = method.bind({
//                         table: r.db(Settings.rethink.dbPrefix + dbPostfix).table(tableName)
//                     });
//                     result = await method_.call(this, ...arguments); // call method
//                 } catch (err) {
//                     throw err;
//                 }
//                 return result;
//             };
//         };

//         return function decorator(target: object, key: string, descriptor: TypedPropertyDescriptor<any>) {
//             descriptor.value = buildFunctionWithInjectedArgs(table.toString(), descriptor.value);
//             return descriptor;
//         };
//     }
// }

// export { r, DBDecorators, TableTypes };