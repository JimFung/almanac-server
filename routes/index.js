module.exports = (app, mongoose) => {
  const MonsterSchema = require('../schema/MonsterSchema')
  const Monster = mongoose.model('monster', MonsterSchema)

  app.get('/api', (req, res) => {
    res.send({
      status: 'green'
    })
  })

  app.get('/api/monster', (req, res) => {
    let result = Monster.find().exec()

    result.then(data => {
      let modified_data = data.map(elem => elem.name)
      res.send(modified_data)
    }).catch(err => {
      res.send(err)
    })
  })

  app.get('/api/monster/:input', (req, res) => {

    let result = isNaN(+req.params.input)
    ? Monster.find().where('name').equals(req.params.input).exec()
    : Monster.find().where('challenge_rating').equals(req.params.input).exec()

    result.then(data => {
      res.send(data)
    }).catch(err => {
      res.send(err)
    })
  })
}
