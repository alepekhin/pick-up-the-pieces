import { app } from './App'
const port = 3000; // default port to listen

console.log(typeof null)
enum Color {Red = 1, Green, Blue}
const colorName: string = Color[2];

console.log(Color.Green);
// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );