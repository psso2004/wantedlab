import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from "joi";

@JoiSchemaOptions({
  allowUnknown: false,
})
export class UpdatePostInputDto {
  @JoiSchema(Joi.number().required())
  id: string;

  @JoiSchema(Joi.string().required())
  title: string;

  @JoiSchema(Joi.string().required())
  content: string;

  @JoiSchema(Joi.string().required())
  password: string;
}
