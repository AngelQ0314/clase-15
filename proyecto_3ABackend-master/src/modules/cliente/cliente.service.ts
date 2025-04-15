import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ClienteService {

  constructor(@InjectRepository(Cliente) private clienteRepository:Repository<Cliente>){}

  create(createClienteDto: CreateClienteDto) {
    return this.clienteRepository.save(createClienteDto);
  }

  buscar(buscar){
    return this.clienteRepository.findOne({
      where:[
        {dni: Like("%"+buscar+"%")},
        {nombre_completo: Like("%"+buscar+"%")}
      ]
    })
  }

  findAll() {
    return `This action returns all cliente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cliente`;
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return `This action updates a #${id} cliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
