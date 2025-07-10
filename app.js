const express=require('express');/* appel du module rxpress*/ 
const mongoose =require("mongoose")/*const:Crée une variable constante nommée mongoose,require('mongoose'):Charge la bibliothèque Mongoosenod */
const dotenv =require('dotenv')/*permet l'appel du contenu du fichier .env */
const categorieRouter=require("./routes/categories.route")/*importer le ficher categorie.route.js pour les routes de categorie*/
const SCategorieRouter=require("./routes/scategorie.route")/*importer le fichier scategorie.rout.js pour les routes de sous-categorie*/
const articleRouter=require("./routes/article.route")
const cors = require('cors')/*permet de faire des requetes entre le front et le back sans probleme de cors*/
dotenv.config()/*tjrs on faire .config avec le dotenv pour utiliser process .env 1 pour le port et l'autre pour le database*/
const app=express();
const paymentRouter =require("./routes/payment.route.js");

app.use(express.json())/* */
app.use(cors({
    origin: '*',/*permet de faire des requetes entre le front et le back sans probleme de cors:n'apporte quelle requette et origine*/
}));/*permet de faire des requetes entre le front et le back sans probleme de cors*/
app.get("/",(req,res)=> {
    res.send("Hello World!");/*.send s'affiche dans le site */

});
app.get("/contact",(req,res)=> {
    res.send("Page de contact");

});
app.get("/help",(req,res)=> {
    res.send("Page d'aide");
});
// Connexion à la base données
mongoose.connect(process.env.DATABASECloud)
.then(() => {console.log("DataBase Successfully Connected");})/*si la connection a reussi*/
.catch(err => { console.log("Unable to connect to database", err);/*si c'est eurreur*/
process.exit(); });
app.use("/api/categories",categorieRouter)/*pour faire le test avec thunder clinet */
app.use("/api/scategories",SCategorieRouter)
app.use("/api/articles",articleRouter)
app.use('/api/payment', paymentRouter);
const PORT=process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(  `Server is running on port ${PORT} `);/*.log s'affiche dans le console */
});
module.exports=app;/*exporter l'application pour pouvoir l'utiliser dans d'autres fichiers*/
