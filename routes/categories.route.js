const express=require("express")
// Créer une instance de categorie.
const Categorie = require('../models/categorie');
const router=express.Router()/*router:permet de creer un routeur pour les routes de categorie*/
router.get("/",async(req,res) =>{/*select* du categorie pour l'affichage*/
    try {
       const categories= await Categorie.find()/*mongoose qui faire la recherche*/
       res.status(200).json(categories)/*la reponse du serveur du format json  */
        
    } catch (error) {
        console.log(error)
    }

   })
 router.post('/', async (req, res) => {/*async:car le nodejs travaille asynchrone relier par await*/
    const{nomcategorie,imagecategorie}=req.body/*req.body c'est quoi le client ecrire*/
    const cat=new Categorie({nomcategorie:nomcategorie,imagecategorie:imagecategorie})/*creation d'un objet de type categorie on peut faire aussi :req.body.nomcategorie ou bien new categorie(req.body)*/
    try {
        await cat.save()/*permet  d'enrigistre dans la base de donnees*/
        res.status(200).json(cat);/*le serveur repondre cad rendre l'objet en format json*/
    }catch(error){
        console.log(error)

    }

 })
 // chercher une catégorie
router.get('/:categorieId',async(req, res)=>{
try {
const cat = await Categorie.findById(req.params.categorieId);

13
res.status(200).json(cat);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
 // Supprimer une catégorie qui a l'id specifié
router.delete('/:categorieId', async (req, res)=> {/*:id est un parametre dynamique qui change selon l'id de la categorie*/
const id = req.params.categorieId;/*req.params.categorieID permet de recuperer l'id de la categorie*/
await Categorie.findByIdAndDelete(id);/*findByIdAndDelete:permet de supprimer la categorie qui a l'id specifie*/
res.json({ message: "categorie deleted successfully." });

});
    // modifier une catégorie
router.put('/:categorieId', async (req, res)=> {
try {
const cat1 = await Categorie.findByIdAndUpdate(
req.params.categorieId,
{ $set: req.body },
{ new: true }
);
res.status(200).json(cat1);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
 module.exports = router;
