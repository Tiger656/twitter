import { BaseRepository } from './base.repository';

export abstract class BaseService<TModel, TCreateDto, TUpdateDto> {
  constructor(
    private readonly baseRepository: BaseRepository<TModel, TCreateDto, TUpdateDto>,
  ) {}

  async create(baseDto: TCreateDto) {
    return await this.baseRepository.create(baseDto);
  }

  async findAll(populatedField?: string | string[]) {
    return await this.baseRepository.findAll(populatedField);
  }

  async findOne(id: string) {
    return await this.baseRepository.findOne(id);
  }

  async update(id: string, updateDto: TUpdateDto) {
    return this.baseRepository.update(id, updateDto);
  }

  async remove(id: string) {
    await this.baseRepository.remove(id);
    return `You removed a #${id} post`;
  }

  async find(filter: any) {
    return await this.baseRepository.find(filter);
  }
}
