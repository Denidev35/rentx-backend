import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import {
  ICreateSpecficationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];
  async create({
    name,
    description,
  }: ICreateSpecficationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);

    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      specification => specification.name === name,
    );
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpeficitaions = this.specifications.filter(specification =>
      ids.includes(specification.id),
    );

    return allSpeficitaions;
  }
}

export { SpecificationsRepositoryInMemory };
