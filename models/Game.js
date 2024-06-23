const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genres: { type: [String], default: [] },
  platform: { type: String, default: '' },
  graphics: String,
  story: String,
  gameplay: String,
  multiplayer: { type: Boolean, default: false },
  difficulty: String,
  duration: String,
  characters: String,
  gameWorld: String,
  sound: String,
  ai: String,
  physics: String,
  content: String,
  animation: String,
  levelEditor: { type: Boolean, default: false },
  developer: String,
  modding: { type: Boolean, default: false },
  microtransactions: { type: Boolean, default: false },
  achievements: { type: Boolean, default: false },
  realism: String,
  emotionalAppeal: String,
  ui: String,
  themeAndAtmosphere: String,
  campaignAndAddons: String,
  tutorials: { type: Boolean, default: false },
  setting: String,
  asynchronousMode: { type: Boolean, default: false },
  fanCommunity: { type: Boolean, default: false },
  gamePace: String,
  interactiveEnvironment: String,
  immersion: String,
  artStyle: String,
  physiologicalEffect: String,
  gameWorldCompleteness: String,
  dynamicLighting: String,
  replayability: String,
  interactiveMusic: String,
  antiGravity: { type: Boolean, default: false }
});

gameSchema.index({ title: 'text', customIndex: 1 });

module.exports = mongoose.model('Game', gameSchema, 'game-library');