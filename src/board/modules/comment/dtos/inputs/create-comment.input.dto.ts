import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from "joi";

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreateCommentInputDto {
  @JoiSchema(Joi.number().integer().positive().required())
  boardPostId: number;

  @JoiSchema(Joi.number().integer().positive().allow(null).default(null))
  parentCommentId: number | null;

  @JoiSchema(Joi.string().required())
  content: string;

  @JoiSchema(Joi.string().required())
  userName: string;
}
