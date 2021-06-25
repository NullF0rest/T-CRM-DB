import { AddonPackage as TAddonPackage } from "../api/addonPackage/AddonPackage";

export const ADDONPACKAGE_TITLE_FIELD = "name";

export const AddonPackageTitle = (record: TAddonPackage) => {
  return record.name;
};
