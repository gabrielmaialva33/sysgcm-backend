import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { atribuicao } from './types/EnumTypes'
import DadosPessoais from './DadosPessoais'
import Endereco from 'App/Models/Endereco/Enderecos'

export default class Gcm extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public nome_guerra: string

  @column()
  public dados_pessoais_id: string

  @column()
  public endereco_id: string

  @column()
  public atribuicao: atribuicao

  @column()
  public historico: string[]

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /* ------------------------------------------------------------------------ */

  @hasOne(() => DadosPessoais, { localKey: 'dados_pessoais_id', foreignKey: 'id' })
  public dados_pessoais: HasOne<typeof DadosPessoais>

  @hasOne(() => Endereco, { localKey: 'endereco_id', foreignKey: 'id' })
  public endereco: HasOne<typeof Endereco>
}
