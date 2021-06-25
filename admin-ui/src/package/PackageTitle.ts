import { Package as TPackage } from "../api/package/Package";

export const PACKAGE_TITLE_FIELD = "name";

export const PackageTitle = (record: TPackage) => {
  return record.name;
};
