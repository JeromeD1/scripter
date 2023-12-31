const express = require("express")

const router = express.Router()

const { hashPassword, verifyPassword } = require("./services/authentification")
const {
  validateUserDataSignup,
  validateUserDataLogin,
} = require("./middleware/validateDataUsers")

const scenariosControllers = require("./controllers/scenariosControllers")
const utilisateursControllers = require("./controllers/UtilisateursControllers")
const forumCommControllers = require("./controllers/forumCommControllers")
const sujetForumControllers = require("./controllers/sujetForumControllers")
const savedStyleTextControllers = require("./controllers/savedStyleTextControllers")
const styleTextControllers = require("./controllers/styleTextControllers")
const styleImageControllers = require("./controllers/styleImageControllers")
const stylePageControllers = require("./controllers/stylePageControllers")
const savedStyleImageControllers = require("./controllers/savedStyleImageControllers")
const savedStylePageControllers = require("./controllers/savedStylePageControllers")
const auteursControllers = require("./controllers/auteursControllers")
const campagnesControllers = require("./controllers/campagnesControllers")
const pagesControllers = require("./controllers/pagesControllers")
const textesControllers = require("./controllers/textesControllers")
const rolegamesControllers = require("./controllers/rolegamesControllers")
const themesControllers = require("./controllers/themesControllers")
const scenarioThemesControllers = require("./controllers/scenarioThemesControllers")
const campagnesThemesControllers = require("./controllers/campagnesThemesControllers")
const imagesControllers = require("./controllers/imagesControllers")
const favoriteControllers = require("./controllers/favoriteControllers.js")
const auteursFavorisControllers = require("./controllers/auteursFavorisControllers")
const scenarioCommentControllers = require("./controllers/scenarioCommentControllers")
const campagnesMultiControllers = require("./controllers/campagnesMultiControllers")
const forumCategoriesControllers = require("./controllers/forumCategoriesControllers")
const campaignFavoriteControllers = require("./controllers/campaignFavoriteControllers")
const vuesCampagnesControllers = require("./controllers/vuesCampagnesControllers")
const vuesScenariosControllers = require("./controllers/vuesScenariosControllers")
const invitationsControllers = require("./controllers/invitationsControllers")
const chatCreationControllers = require("./controllers/chatCreationControllers")
const { authorization } = require("./middleware/authorization")

const multer = require("./middleware/multer-config")
const {
  deleteImage,
  destroyStyleFromImageID,
} = require("./middleware/deleteImage")
const {
  imageURLProvider,
  deleteImageForm,
} = require("./middleware/imageURLProvider")

router.post("/invitation", authorization, invitationsControllers.add)
router.get("/invitations/auteur/:id", invitationsControllers.readMyPropositions)
router.get(
  "/invitations/utilisateur/:id",
  invitationsControllers.readMyInvitations
)
router.put("/invitation/:id", authorization, invitationsControllers.update)

// router.get("/scenarios", scenariosControllers.browse)
router.get("/scenarios", scenariosControllers.browseScenarios)
router.get("/scenariosOneshot", scenariosControllers.browseScenariosOneshot)
// router.get("/scenarios/:id", scenariosControllers.read)
// router.get("/scenarios", scenariosControllers.browse)
// router.get("/scenarios/:id", scenariosControllers.read)
router.get("/scenarios/:id", scenariosControllers.readWithTheme)
router.put("/scenarios/:id", authorization, scenariosControllers.edit)
router.post("/scenarios", authorization, scenariosControllers.add)
router.delete("/scenarios/:id", authorization, scenariosControllers.destroy)
router.get("/scenarios/:id/pages", scenariosControllers.readPages)
router.get(
  "/scenariosFavorites/utilisateur/:id",
  scenariosControllers.findUserScenariosFavorite
)
router.get(
  "/scenariosAvis/utilisateur/:id",
  scenariosControllers.findUserScenariosAvis
)
router.get(
  "/scenariosInProgress/utilisateur/:id",
  scenariosControllers.findScenariosInProgress
)
router.get(
  "/scenariosFinished/utilisateur/:id",
  scenariosControllers.findScenariosFinished
)

router.get(
  "/readScenarios/utilisateur/:id",
  scenariosControllers.findUserReadScenarios
)

router.get(
  "/contributionScenarios/utilisateur/:id",
  scenariosControllers.findUserContributionScenarios
)

router.get("/themesScenarios", scenarioThemesControllers.browse)
router.put(
  "/themesScenarios/:id",
  authorization,
  scenarioThemesControllers.edit
)
router.post("/themesScenarios", authorization, scenarioThemesControllers.add)
router.delete(
  "/themesScenarios/:id",
  authorization,
  scenarioThemesControllers.destroy
)

router.get("/themesCampagnes", campagnesThemesControllers.browse)
router.put(
  "/themesCampagnes/:id",
  authorization,
  campagnesThemesControllers.edit
)
router.post("/themesCampagnes", authorization, campagnesThemesControllers.add)
router.delete(
  "/themesCampagnes/:id",
  authorization,
  campagnesThemesControllers.destroy
)

router.get("/utilisateurs", utilisateursControllers.browse)
router.get(
  "/utilisateurs/followers",
  utilisateursControllers.usersWhoAreFollowers
)
router.get("/utilisateurs/:id", utilisateursControllers.read)
router.get(
  "/utilisateurs/:id/comments",
  utilisateursControllers.findUserComments
)
router.get("/followers/:auteurId", utilisateursControllers.usersWhoAreFollowers)
router.post("/utilisateurs", authorization, utilisateursControllers.add)
router.put("/utilisateurs/:id", authorization, utilisateursControllers.edit)
router.put(
  "/password/:id",
  authorization,
  utilisateursControllers.changePassword
)
router.delete(
  "/utilisateurs/:id",
  authorization,
  utilisateursControllers.destroy
)
router.post(
  "/login",
  validateUserDataLogin,
  utilisateursControllers.readUserByEmailWithPassword,
  verifyPassword,
  utilisateursControllers.sendUserWhoHasGoodEmailAndPassword
)
router.post(
  "/signup",
  validateUserDataSignup,
  // utilisateursControllers.verifyEmail,
  // utilisateursControllers.verifyLogin,
  utilisateursControllers.verifyEmailAndLogin,
  hashPassword,
  utilisateursControllers.add
)

router.get("/logout", utilisateursControllers.logout)

router.get(
  "/utilisateurs/:userId/campagneFavorite/:campaignId",
  campaignFavoriteControllers.verifyCampaignIsFavoriteForUser
)
router.post("/favoriteCampaign", authorization, campaignFavoriteControllers.add)
router.delete(
  "/favoriteCampaign",
  authorization,
  campaignFavoriteControllers.destroy
)

router.get("/commentaires_forum", forumCommControllers.browse)
router.get("/commentaires_forum/:id", forumCommControllers.read)
router.get(
  "/sujet_forum/:id/commentaires_forum",
  forumCommControllers.findCommentsByTopicId
)

router.post("/commentaires_forum", authorization, forumCommControllers.add)
router.put("/commentaires_forum/:id", authorization, forumCommControllers.edit)
router.delete(
  "/commentaires_forum/:id",
  authorization,
  forumCommControllers.destroy
)

router.get("/sujet_forum", sujetForumControllers.browse)
router.get("/sujet_forum/:id", sujetForumControllers.read)
router.post("/sujet_forum", authorization, sujetForumControllers.add)
router.delete("/sujet_forum/:id", authorization, sujetForumControllers.destroy)

router.get("/saved_style_text", savedStyleTextControllers.browse)
router.get("/saved_style_text/:id", savedStyleTextControllers.read)
router.get(
  "/saved_style_text/utilisateur/:id",
  savedStyleTextControllers.readFromUtilisateurID
)
router.post("/saved_style_text", authorization, savedStyleTextControllers.add)
router.put(
  "/saved_style_text/:id",
  authorization,
  savedStyleTextControllers.edit
)
router.delete(
  "/saved_style_text/:id",
  authorization,
  savedStyleTextControllers.destroy
)

router.get("/styleText", styleTextControllers.browse)
router.get("/styleText/:id", styleTextControllers.read)
router.post("/styleText", authorization, styleTextControllers.add)
router.put("/styleText/:id", authorization, styleTextControllers.edit)
router.put(
  "/styleText/texte/:id",
  authorization,
  styleTextControllers.editStyleFromTexteID
)
router.delete("/styleText/:id", authorization, styleTextControllers.destroy)
router.delete(
  "/styleText/texte/:id",
  authorization,
  styleTextControllers.destroyFromTextID
)

router.get("/styleImage", styleImageControllers.browse)
router.get("/styleImage/:id", styleImageControllers.read)
router.put(
  "/styleImage/image/:id",
  authorization,
  styleImageControllers.editStyleFromImageID
)
router.delete(
  "/styleImage/image/:id",
  authorization,
  styleImageControllers.destroyFromImageID
)

router.get("/stylePage", stylePageControllers.browse)
router.get("/stylePage/:id", stylePageControllers.read)
router.post("/stylePage", authorization, stylePageControllers.add)
router.put("/stylePage/:id", authorization, stylePageControllers.edit)
router.put(
  "/stylePage/page/:id",
  authorization,
  stylePageControllers.editStyleFromPageID
)
router.delete("/stylePage/:id", authorization, stylePageControllers.destroy)
router.delete(
  "/stylePage/page/:id",
  authorization,
  stylePageControllers.destroyFromPageID
)

router.get("/saved_style_image", savedStyleImageControllers.browse)
router.get("/saved_style_image/:id", savedStyleImageControllers.read)
router.put(
  "/saved_style_image/:id",
  authorization,
  savedStyleImageControllers.edit
)
router.post("/saved_style_image", authorization, savedStyleImageControllers.add)
router.delete(
  "/saved_style_image/:id",
  authorization,
  savedStyleImageControllers.destroy
)
router.get(
  "/saved_style_image/utilisateur/:id",
  savedStyleImageControllers.readFromUtilisateurID
)

router.get("/saved_style_page", savedStylePageControllers.browse)
router.get("/saved_style_page/:id", savedStylePageControllers.read)
router.get(
  "/saved_style_page/utilisateur/:id",
  savedStylePageControllers.readFromUtilisateurID
)
router.put(
  "/saved_style_page/:id",
  authorization,
  savedStylePageControllers.edit
)
router.post("/saved_style_page", authorization, savedStylePageControllers.add)
router.delete(
  "/saved_style_page/:id",
  authorization,
  savedStylePageControllers.destroy
)

router.get("/auteurs", auteursControllers.browse)
router.get("/auteurs/:id", auteursControllers.read)
router.get("/auteurs/user/:userID", auteursControllers.readFromUserID) // retourne l'id et le name de l'auteur en fonction de l'ID de l'utilisateur
router.post("/auteurs", authorization, auteursControllers.add)
router.put("/auteurs/:id", authorization, auteursControllers.edit)
router.delete("/auteurs/:id", authorization, auteursControllers.destroy)
router.get("/auteurs/:id/campagnes", auteursControllers.readAuthorsCampagnes) // recherche les campagnes d'un auteur (retourne : id, campagneName)

router.get("/campagnes", campagnesControllers.browse)
router.get("/detailedCampagnes", campagnesControllers.findCampagnesWithDetails)
router.get("/campagnes/:id", campagnesControllers.readWithTheme)
router.post("/campagnes", authorization, campagnesControllers.add)
router.put("/campagnes/:id", authorization, campagnesControllers.edit)
router.delete("/campagnes/:id", authorization, campagnesControllers.destroy)
router.get(
  "/campagnes/:id/scenarios",
  campagnesControllers.readCampagneScenarios
) // recherche les scenarios associés à une campagne (retourne : id, scenarioName)
router.get(
  "/campagnes/:id/detailedScenarios",
  campagnesControllers.readCampagneDetailedScenarios
) // recherche les scenarios associés à une campagne (retourne : id, scenarioName)

router.get(
  "/campagnesFavorites/utilisateur/:id",
  campagnesControllers.findUserFavoriteCampagnesWithDetails
)

router.get(
  "/campagnesDetailed/auteur/:id",
  campagnesControllers.findAuthorCampagnesWithDetails
)

router.get("/campagnesMulti", campagnesMultiControllers.findCampagnes)

router.get("/pages", pagesControllers.browse)
router.get("/pages/:id", pagesControllers.read)
router.post("/pages", authorization, pagesControllers.add)
router.put("/pages/:id", authorization, pagesControllers.edit)
router.delete("/pages/:id", authorization, pagesControllers.destroy)
router.get("/pages/:id/textes", pagesControllers.readPageTexts)
router.get("/pages/:id/images", pagesControllers.readPageImages)

router.get("/images", imagesControllers.browse)
router.get("/images/:id", imagesControllers.read)
router.post("/images", authorization, imagesControllers.add)
router.delete(
  "/images/:id",
  authorization,
  deleteImage,
  destroyStyleFromImageID,
  imagesControllers.destroy
)

router.get("/textes", textesControllers.browse)
router.get("/textes/:id", textesControllers.read)
router.post("/textes", authorization, textesControllers.add)
router.put("/textes/:id", authorization, textesControllers.edit)
router.delete("/textes/:id", authorization, textesControllers.destroy)
router.post("/pages/:id/newtexte", authorization, textesControllers.createNew)
router.post("/pages/:id/texteCopy", authorization, textesControllers.createCopy)

router.post(
  "/pages/:id/newtexteAtPageCreation",
  authorization,
  textesControllers.createNewSpecific
)
router.post(
  "/pages/:id/ancientexte",
  authorization,
  textesControllers.recreatePrevious
)
router.get("/lasttexte/", textesControllers.getLast) // renvoie le dernier texte de la table avec son style

router.get("/rolegames", rolegamesControllers.browse)
router.get("/rolegames/:id", rolegamesControllers.read)
router.post("/rolegames", authorization, rolegamesControllers.add)
router.put("/rolegames/:id", authorization, rolegamesControllers.edit)
router.delete("/rolegames/:id", authorization, rolegamesControllers.destroy)

router.get("/themes", themesControllers.browse)
router.get("/themes/:id", themesControllers.read)
router.post("/themes", authorization, themesControllers.add)
router.put("/themes/:id", authorization, themesControllers.edit)
router.delete("/themes/:id", authorization, themesControllers.destroy)

router.post(
  "/pages/:id/newImage",
  authorization,
  multer,
  imagesControllers.createNew,
  imagesControllers.getLast
)

router.post(
  "/pages/:id/imageCopy",
  authorization,
  imagesControllers.createCopy,
  imagesControllers.getLast
)

router.post("/tmpImage", multer, imageURLProvider)
router.delete("/deleteTmpImage", deleteImageForm)

router.post("/favorite", authorization, favoriteControllers.add)
router.delete("/favorite", authorization, favoriteControllers.destroy)
router.get("/favorite/:id", favoriteControllers.read)
router.get(
  "/utilisateurs/:userId/scenarioFavorite/:scenarioId",
  favoriteControllers.verifyScenarioIsFavoriteForUser
)

router.post("/autorFavorite", authorization, auteursFavorisControllers.add)
router.delete(
  "/autorFavorite",
  authorization,
  auteursFavorisControllers.destroy
)
router.get("/autorFavorite/:id", auteursFavorisControllers.read)
router.get(
  "/utilisateurs/:userId/authorFavorite/:authorId",
  auteursFavorisControllers.verifyAuthorIsFavoriteForUser
)

router.get("/scenarcomm", scenarioCommentControllers.browse)
router.post("/scenarcomm", authorization, scenarioCommentControllers.add)
router.delete(
  "/scenarcomm/:id",
  authorization,
  scenarioCommentControllers.destroy
)
router.put("/scenarcomm/:id", authorization, scenarioCommentControllers.edit)
router.get(
  "/scenario/:id/scenarcomm",
  scenarioCommentControllers.getByScenarioID
)

router.get("/forumCategories", forumCategoriesControllers.browse)

router.post("/vuesScenarios", vuesScenariosControllers.add)
router.post(
  "/utilisateur/vuesScenarios",
  authorization,
  vuesScenariosControllers.addUserReadScenario
)
router.get(
  "/allUsersReadScenarios",
  vuesScenariosControllers.browseUserReadScenarios
)

router.put("/vuesScenarios", vuesScenariosControllers.edit)

router.post("/vuesCampagnes", vuesCampagnesControllers.add)
router.put("/vuesCampagnes", vuesCampagnesControllers.edit)

router.get("/chat/scenario/:id", chatCreationControllers.readFromScenarioId)
router.post("/chat", authorization, chatCreationControllers.add)

module.exports = router
