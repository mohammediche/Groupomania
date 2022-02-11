const passwordValidator = require("password-validator");

const schémaPasswordValidator = new passwordValidator();

//le schéma que doit respecter le mdp
schémaPasswordValidator
  .is()
  .min(5) // min 5
  .is()
  .max(100) // max 100
  .has()
  .uppercase() // doit contenir des majuscule
  .has()
  .lowercase() // doit contenir des miniscule
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

module.exports = (req, res, next)=>{

    if (schémaPasswordValidator.validate(req.body.password)) {
        next()
        
    } else {
        return res.status(400).json({
            error: `votre mot de passe doit contenir : 5 caractères minimum, 1 majuscule, 1 miniscule, sans espace`,
          });
    }
}