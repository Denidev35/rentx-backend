import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

let specificationRepositoryInMemory: SpecificationsRepositoryInMemory;
let createSpecificationUseCase: CreateSpecificationUseCase;

describe('Create specification', () => {
  beforeEach(() => {
    specificationRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationRepositoryInMemory,
    );
  });

  it('Should be able to create a new specification', async () => {
    const specification = {
      name: 'Test specification',
      description: 'Desciption specification test',
    };

    await createSpecificationUseCase.execute({
      name: specification.name,
      description: specification.description,
    });

    const specificationCreated =
      await specificationRepositoryInMemory.findByName(specification.name);

    expect(specificationCreated).toHaveProperty('id');
  });

  it('Should not be able to create a new specification with name exists', async () => {
    expect(async () => {
      const specification = {
        name: 'Test Specification',
        description: 'Description test specification',
      };

      await createSpecificationUseCase.execute({
        name: specification.name,
        description: specification.description,
      });

      await createSpecificationUseCase.execute({
        name: specification.name,
        description: specification.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
