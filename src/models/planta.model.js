const mongoose = require("mongoose");

const cuidadoEspecialSchema = new mongoose.Schema(
  {
    tipo: { type: String, required: true },
    nota: { type: String, required: true },
  },
  { _id: false },
);

const plantaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  especie: { type: String, required: true, trim: true },
  ubicacion: { type: String, required: true, trim: true },
  intervaloRiegoDias: {
    type: Number,
    required: true,
    min: 1,
    validate: Number.isInteger,
  },
  enReposo: { type: Boolean, default: false },
  cuidadosEspeciales: { type: [cuidadoEspecialSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports =
  mongoose.models.Planta || mongoose.model("Planta", plantaSchema);
