const provinces = [
  "AB",
  "Alberta",
  "BC",
  "British Columbia",
  "MB",
  "Manitoba",
  "NB",
  "New Brunswick",
  "NL",
  "Newfoundland",
  "NS",
  "Nova Scotia",
  "NT",
  "Northwest Territories",
  "NU",
  "Nunavut",
  "ON",
  "Ontario",
  "PE",
  "Prince Edward Island",
  "QC",
  "Quebec",
  "SK",
  "Saskatchewan",
  "YT",
  "Yukon",
];
const NAME_REGEX = /^[a-zA-Z]+$/;
const MIDDLENAME_REGEX = /^[A-Za-z]?$/;
const ADDRESS_REGEX = /^[0-9]+ [A-Za-z ]+(St|Ave|Rd|Blvd|Dr|Court|Way|Lane|Street|Road)$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const CITY_REGEX = /^[A-Za-z\s\-]+$/;
const POSTALCODE_REGEX = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/;
const COUNTRY_REGEX = /^[A-Za-z\s\-]+$/;
const PHONE_REGEX = /^(\+1)?[\s\-]?(\(?\d{3}\)?[\s\-]?)?\d{3}[\s\-]?\d{4}$/;

const validateName = (name) => {
  if (name == "") {
    alert("name must be filled out");
    return false;
  } else {
    let match = NAME_REGEX.test(name);
    if (!match) {
      alert("Invalid name");
      return false;
    }
    return true;
  }
};

const validateMiddleName = (name) => {
  if (name == "") {
    alert("middle must be filled out");
    return false;
  } else {
    let match = MIDDLENAME_REGEX.test(name);
    if (!match) {
      alert("Invalid middle name");
      return false;
    }
    return true;
  }
}
const validateAddress = (address) => {
  if (address == "") {
    alert("address must be filled out");
    return false;
  } else {
    let match = ADDRESS_REGEX.test(address);
    if (!match) {
      alert("Invalid address");
      return false;
    }
    return true;
  }
};

const validateEmail = (email) => {
  if (email == "") {
    alert("email must be filled out");
    return false;
  } else {
    let match = EMAIL_REGEX.test(email);
    if (!match) {
      alert("Invalid email");
      return false;
    }
    return true;
  }
};

const validateCity = (city) => {
  if (city == "") {
    alert("city must be filled out");
    return false;
  } else {
    let match = CITY_REGEX.test(city);
    if (!match) {
      alert("Invalid city");
      return false;
    }
    return true;
  }
};

const validateProvince = (province) => {
  if (province == "") {
    alert("province must be filled out");
    return false;
  } else {
    if (!provinces.includes(province)) {
      alert("invalid province");
      return false;
    }
  }
  return true;
};

const validatePostalCode = (postalCode) => {
  if (postalCode == "") {
    alert("postalCode must be filled out");
    return false;
  } else {
    if (!POSTALCODE_REGEX.test(postalCode)) {
      alert("invalid province");
      return false;
    }
  }
  return true;
};

const validateCountry = (country) => {
  if (country == "") {
    alert("country must be filled out");
    return false;
  } else {
    if (!COUNTRY_REGEX.test(country)) {
      alert("invalid country");
      return false;
    }
  }
  return true;
};

const validatePhone = (phone) => {
  if (phone == "") {
    alert("phoneNumber must be filled out");
    return false;
  } else {
    let match = PHONE_REGEX.test(phone);
    if (!match) {
      alert("Invalid phoneNumber");
      return false;
    }
  }
  return true;
};


