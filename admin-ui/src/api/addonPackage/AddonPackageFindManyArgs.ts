import { AddonPackageWhereInput } from "./AddonPackageWhereInput";
import { AddonPackageOrderByInput } from "./AddonPackageOrderByInput";

export type AddonPackageFindManyArgs = {
  where?: AddonPackageWhereInput;
  orderBy?: AddonPackageOrderByInput;
  skip?: number;
  take?: number;
};
