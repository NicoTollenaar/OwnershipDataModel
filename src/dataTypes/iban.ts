import { BasicEntityInfo } from "./immediateOwnership";
import { NaturalPerson } from "./naturalPerson";

// still need to develop solution a CJ and en/of accounts

export interface IBAN_NaturalPerson extends NaturalPerson {
  otherAccountholders?: (NaturalPerson | BasicEntityInfo)[];
  bankName: string;
  leiCodeBank: string;
  swiftNumber: string; // BIC
  iban: string;
}

export interface IBAN_LegalPerson extends BasicEntityInfo {
  otherAccountholders?: (NaturalPerson | BasicEntityInfo)[];
  bankName: string;
  leiCodeBank: string;
  swiftNumber: string; // BIC
  iban: string;
}
