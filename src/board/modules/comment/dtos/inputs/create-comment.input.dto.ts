import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from "joi";

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreateCommentInputDto {
  @JoiSchema(Joi.number().integer().positive().required())
  boardId: number;

  @JoiSchema(Joi.string().valid("post").default("post"))
  boardType: "post";

  @JoiSchema(Joi.number().integer().positive().allow(null).default(null))
  rootCommentId: number | null;

  @JoiSchema(Joi.number().integer().positive().allow(null).default(null))
  parentCommentId: number | null;

  @JoiSchema(Joi.string().required())
  content: string;

  @JoiSchema(Joi.string().required())
  userName: string;
}
