import DadosPessoais from 'App/Models/Gcm/DadosPessoais'
import Municipio from 'App/Models/Endereco/Municipio'

import ConflictException from 'App/Exceptions/ConflictException'
import NotFoundException from 'App/Exceptions/NotFoundException'

import {
  cutis,
  escolaridade,
  estado_civil,
  sexo,
  tipo_cnh,
  tipo_sanguineo,
} from 'App/Models/Gcm/types/EnumTypes'

interface IRequestData {
  nome: string
  rg: string
  cpf: string
  data_nascimento: Date
  nome_mae: string
  nome_pai?: string
  telefone: string[]
  municipio_nascimento: string
  sexo: sexo
  cutis: cutis
  tipo_sanguineo: tipo_sanguineo
  estado_civil: estado_civil
  profissao?: string[]
  escolaridade: escolaridade
  nome_conjuge?: string
  nome_filhos?: string[]
  titulo_eleitor: string
  zona_eleitoral: string
  cnh: string
  tipo_cnh: tipo_cnh
  validade_cnh: Date
  observacao?: string
}

class CreateDadosPessoaisService {
  public async execute({
    nome,
    rg,
    cpf,
    data_nascimento,
    telefone,
    nome_mae,
    nome_pai,
    municipio_nascimento,
    sexo,
    tipo_sanguineo,
    estado_civil,
    profissao,
    escolaridade,
    nome_conjuge,
    nome_filhos,
    titulo_eleitor,
    zona_eleitoral,
    cnh,
    tipo_cnh,
    validade_cnh,
    observacao,
  }: IRequestData) {
    // -> checker  exists
    const cpf_exists = await DadosPessoais.findBy('cpf', cpf)
    if (cpf_exists) {
      throw new ConflictException('❌  Cpf já cadastrado. 😓')
    }

    const titulo_eleitor_exists = await DadosPessoais.findBy('titulo_eleitor', titulo_eleitor)
    if (titulo_eleitor_exists) {
      throw new ConflictException('❌  Titulo de eleitor já cadastrado. 😓')
    }

    const chn_exists = await DadosPessoais.findBy('cnh', cnh)
    if (chn_exists) {
      throw new ConflictException('❌  Carteira Nacional de Habilitação já cadastrada. 😓')
    }

    const municipio_exists = await Municipio.findBy(
      'municipio',
      municipio_nascimento.toLocaleUpperCase()
    )
    if (!municipio_exists) {
      throw new NotFoundException('❌  Municipio de nascimento não encontrado. 😓')
    }

    // -> save on db
    const dados_pessoais = await DadosPessoais.create({
      nome,
      rg,
      cpf,
      data_nascimento,
      telefone,
      nome_mae,
      nome_pai,
      municipio_nascimento_id: municipio_exists.id,
      sexo,
      tipo_sanguineo,
      estado_civil,
      profissao,
      escolaridade,
      nome_conjuge,
      nome_filhos,
      titulo_eleitor,
      zona_eleitoral,
      cnh,
      tipo_cnh,
      validade_cnh,
      observacao,
    })

    return dados_pessoais.id
  }
}

export default new CreateDadosPessoaisService()