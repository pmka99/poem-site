import { IPolicy } from "./policies/IPolicy";

export interface IPolicyRegistry {
    register(policy: IPolicy): void;
    get(resource: string): IPolicy | undefined;
}

export class PolicyRegistry implements IPolicyRegistry {

    private policies = new Map<string, IPolicy>();

    register(policy: IPolicy) {
        this.policies.set(policy.resource, policy);
    }

    get(resource: string) {
        return this.policies.get(resource);
    }
}