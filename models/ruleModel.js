import mongoose from "mongoose";
const { Schema } = mongoose;

const nodeSchema = new Schema({
  type: String,
  value: String,
  left: { type: Schema.Types.Mixed, default: null },
  right: { type: Schema.Types.Mixed, default: null },
});

const ruleSchema = new Schema({
  ruleString: String,
  ast: nodeSchema,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

export const Rule = mongoose.model("Rule", ruleSchema);
