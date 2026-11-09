const mongoose = require("mongoose");

const riegoSchema = new mongoose.Schema({
  planta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Planta",
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
    validate: {
      validator: (fecha) => fecha <= new Date(),
      message: "La fecha no puede ser futura",
    },
  },
  cantidadMl: { type: Number, required: true, min: Number.MIN_VALUE },
  cuidador: { type: String, required: true, trim: true },
});

module.exports = mongoose.models.Riego || mongoose.model("Riego", riegoSchema);
