const mongoose = require('mongoose')

const MonsterSchema = new mongoose.Schema({
  index: Number,
  name: String,
  size: String,
  type: String,
  subtype: String,
  alignment: String,
  armor_class: Number,
  hit_points: Number,
  hit_dice: String,
  speed: String,
  strength: Number,
  dexterity: Number,
  constitution: Number,
  intelligence: Number,
  wisdom: Number,
  charisma: Number,
  constitution_save: Number,
  intelligence_save: Number,
  wisdom_save: Number,
  history: Number,
  perception: Number,
  damage_vulnerabilities: String,
  damage_resistances: String,
  damage_immunities: String,
  condition_immunities: String,
  senses: String,
  languages: String,
  challenge_rating: Number,
  special_abilities: [
    {
      attack_bonus: Number,
      desc: String,
      name: String
    }
  ],
  actions: [
    {
      damage_bonus: {type: Number, required: false},
      damage_dice: {type: String, required: false},
      attack_bonus: Number,
      desc: String,
      name: String
    }
  ],
  legendary_actions: {type: mongoose.Schema.Types.Mixed, required: false}
})

module.exports = MonsterSchema
