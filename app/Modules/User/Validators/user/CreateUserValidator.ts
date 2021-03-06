import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome_usuario: schema.string({ trim: true, escape: true }, [
      rules.minLength(4),
      rules.maxLength(20),
      rules.unique({ table: 'users', column: 'nome_usuario' }),
    ]),
    email: schema.string({}, [
      rules.email(),
      rules.maxLength(100),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({ escape: true }, [rules.confirmed()]),
    keycode: schema.string({ trim: true, escape: true }, [
      rules.minLength(8),
      rules.maxLength(8),
      rules.exists({ table: 'keycodes', column: 'keycode' }),
    ]),
  })

  public messages = {}
}
