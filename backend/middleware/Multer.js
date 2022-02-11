const multer = require("multer");

// création de notre dictionnaire MIME_TYPE
const MIME_TYPE = {
    "image/jpg" : "jpg",
    "image/jpeg" : "jpg",
    "image/png": "png",
    "image/gif" : "gif",
}


const storage = multer.diskStorage ({
    // diskStorage pour l'enregistrer sur le disk du serveur
    //destination du stockage du fichier, donc le dossier images
    destination : (req, file, callback)=>{
        callback(null, "images");
    }, 
    filename : (req, file, callback) =>{
        // suppression des espaces dans le nom du fichier et mettre _
        const name = file.originalname.split(" ").join("_");       
        // création de l'extension qui sera l'élement de notre dictionnaire (MIME_TAPES) 
        const extension = MIME_TYPE[file.mimetype];
        callback(null, name + Date.now() + "." + extension); 
    }
    
})
const fileFilter = (req, file, cb) => {

    const fileSize = parseInt(req.headers['content-length']); //correspond à la taille d'image sélectionné
    console.log("============>", fileSize);
    
    if((file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/gif' || file.mimetype === 'application/octet-stream') && (fileSize <= 1500000)) {
    
    cb(null, true);
    
    }         
    else {       
    cb(null, false);   
    console.log("erreur, veuillez sélectionné une image qui contient moins de  1000000 Mo");    
    }

  }



module.exports = multer({storage, fileFilter}).single("image"); 

// limits: {fileSize: "1000000"}
//fileSize en octet donc 1mo
//fileFilter: imageFilter
// appeler la methode single pour dire que c'est un fichier unique et pas un groupe de fichiers