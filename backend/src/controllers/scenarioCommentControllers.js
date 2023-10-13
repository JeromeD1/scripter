const models = require("../models")

const browse = (req, res) => {
  models.scenarcomms
    .findAll()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const getByScenarioID = (req, res) => {
  models.scenarcomms
    .getByScenarioID(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404)
      } else {
        res.send(rows)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const add = (req, res) => {
  const { utilisateurID, scenarioID, textcomment, datecomment } = req.body

  models.scenarcomms
    .add(utilisateurID, scenarioID, textcomment, datecomment)
    .then(([result]) => {
      res.sendStatus(201)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const edit = (req, res) => {
  const avis = req.body
  avis.id = parseInt(req.params.id, 10)

  models.scenarcomms
    .update(avis)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404)
      } else {
        res.sendStatus(204)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const destroy = (req, res) => {
  // const avis = req.body
  const id = req.params.id

  models.scenarcomms
    // .deleteComment(id, scenarioID, utilisateurID)
    .delete(id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404)
      } else {
        res.sendStatus(204)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

module.exports = {
  browse,
  getByScenarioID,
  add,
  edit,
  destroy,
}
