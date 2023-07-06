import React ,{useState}from "react";
import moment from "moment-timezone";
import Link from "next/link";
const getDateTimeInTimeZone = (timeZone) => {
  const dateTimeInTimeZone = moment().tz(timeZone).format("DD MMM YYYY, HH:mm");

  return dateTimeInTimeZone;
};
const CountryListItem = ({ country }) => {
  const [countries, setCountries] = useState([]);

  return (
    <div>
      <div className="box">
        <div className="img-box">
          <img src={country.flags.svg} alt="" className="index-img" />
        </div>

        <div className="country-info">
          <h5>{country?.name?.common}</h5>
          <p className="currencyindex">
            Currency :
            {country?.currencies
              ? Object.values(country.currencies).join(", ")
              : "-"}
          </p>
          <p>
            Current date and time:{" "}
            {getDateTimeInTimeZone(country.timezones[0])}
          </p>{" "}
          <button className="showmapbtn">
            <Link
              href={country.maps.googleMaps}
              target="_blank"
              className="showfont"
            >
              Show Map
            </Link>
          </button>
          <button className="showmapbtn">
            <Link
              href={`/details/${country.cca3}`}
              target="_blank"
              className="showfont"
            >
              Details
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountryListItem;
