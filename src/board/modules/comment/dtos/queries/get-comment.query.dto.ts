import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from "joi";

@JoiSchemaOptions({
  allowUnknown: false,
})
export class GetCommentQueryDto {
  @JoiSchema(Joi.number().integer().positive().required())
  boardId: number;

  @JoiSchema(Joi.string().valid("post").default("post"))
  boardType: "post";

  @JoiSchema(Joi.number().integer().positive().default(1))
  page?: number;

  @JoiSchema(Joi.number().integer().positive().default(10))
  limit?: number;
}
