import { PackageWhereUniqueInput } from "./PackageWhereUniqueInput";
import { PackageUpdateInput } from "./PackageUpdateInput";

export type UpdatePackageArgs = {
  where: PackageWhereUniqueInput;
  data: PackageUpdateInput;
};
