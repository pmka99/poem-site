import { PolicyRegistry } from "./policyRegistry";
import { AccessService } from "./access.service";
import { PoemPolicy } from "./policies/poem.policy";
import { HemistichPolicy } from "./policies/hemistich.policy";
import { CommentPolicy } from "./policies/comment.policy";

const registry = new PolicyRegistry();

registry.register(new PoemPolicy());
registry.register(new HemistichPolicy());
registry.register(new CommentPolicy());

export const accessService = new AccessService(registry);