import { createCrudHooks } from "../factories/createCrudHooks";
import { poemTypeService } from "../services/poem/poemType.service";
import { queryKeys } from "../queryKeys";

import type {
    PoemTypeResponse,
    CreatePoemTypeDTO,
    UpdatePoemTypeDTO,
} from "@/shared/types/poemType.type";

export const poemTypeHooks = createCrudHooks<
    PoemTypeResponse,
    CreatePoemTypeDTO,
    UpdatePoemTypeDTO
>(
    queryKeys.poemTypes,
    poemTypeService
);
