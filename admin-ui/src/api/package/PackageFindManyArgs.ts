import { PackageWhereInput } from "./PackageWhereInput";
import { PackageOrderByInput } from "./PackageOrderByInput";

export type PackageFindManyArgs = {
  where?: PackageWhereInput;
  orderBy?: PackageOrderByInput;
  skip?: number;
  take?: number;
};
