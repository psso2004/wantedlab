import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import * as Joi from "joi";

@JoiSchemaOptions({
  allowUnknown: false,
})
export class DeletePostInputDto {
  @JoiSchema(Joi.number().required())
  id: string;

  @JoiSchema(Joi.string().required())
  password: string;
}
