import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from "joi";

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreatePostInputDto {
  @JoiSchema(Joi.string().required())
  title: string;

  @JoiSchema(Joi.string().required())
  content: string;

  @JoiSchema(Joi.string().required())
  userName: string;

  @JoiSchema(Joi.string().required())
  password: string;
}
