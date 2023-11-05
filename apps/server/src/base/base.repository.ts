import { Model } from 'mongoose';
import { BaseModel } from './base.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BaseRepository<TModel, TCreateDto, TUpdateDto> {
  constructor(
    @InjectModel(BaseModel.name) private readonly baseModel: Model<TModel>,
  ) {}

  async find(filter: any) {
    return (await this.baseModel.find(filter));
  }
  async create(createDto: TCreateDto): Promise<TModel> {
    const createdModel = new this.baseModel(createDto);
    return (await createdModel.save()).toObject();
  }

  async findAll(populatedField?: string | string[]): Promise<TModel[]> {
    return (await this.baseModel.find().populate(populatedField!));
  }

  async findOne(id: string): Promise<TModel> {
    return (await this.baseModel.findById(id))!.toObject();
  }

  async update(id: string, updateDto: TUpdateDto): Promise<TModel> {
    return (await this.baseModel.findByIdAndUpdate(id, updateDto!))!.toObject();
  }

  async remove(id: string) {
    await this.baseModel.findByIdAndRemove(id);
  }
}
