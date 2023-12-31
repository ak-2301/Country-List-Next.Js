import { useEffect, useState } from "react";
import Router from "next/router";

export async function getServerSideProps(context) {
  const id = context.query.id;

  const result = await fetch(
    `https://restcountries.com/v3.1/alpha/${context.query.id}`
  );
  const response2 = await fetch("https://restcountries.com/v3.1/all");

  const particular_country_data = await result.json();

  const all_country_data = await response2.json();

  return {
    props: {
      id: id || null,
      particular_country_data: particular_country_data || null,
      all_country_data: all_country_data || null,
    },
  };
}
const Details = (props) => {
  const [countryData, setCountryData] = useState({});

  const [neighbourCountryData, setNeighbourCountryData] = useState([]);

  useEffect(() => {
    fetchCountryData(props?.id);
    if (props?.particular_country_data?.length > 0) {
      setCountryData(props?.particular_country_data[0]);
    } else {
      Router.push("/404");
    }
  }, [props]);
  // const fetchCountryData = async (id) => {
  //   try {
  //     const response = await fetch(
  //       `https://restcountries.com/v3.1/alpha/${id}`
  //     );
  //     const res = await fetch("https://restcountries.com/v3.1/all");

  //     const data = await response.json();
  //     const Country_data = await res.json();

  //     const neighbourCountry = [];

  //     data[0]?.borders?.map((elem) => {
  //       let obj = Country_data?.filter((item) => item?.cca3 === elem);

  //       if (obj?.length > 0) {
  //         neighbourCountry?.push(obj[0]);
  //       }
  //     });

  //     if (data?.length > 0) {
  //       setCountryData(data[0]);
  //     } else {
  //       Router.push("/404");
  //     }

  //     setNeighbourCountryData(neighbourCountry);

  //     console.log(neighbourCountry, "neighbourCountry");

  //     console.log(country, "id");
  //   } catch (error) {
  //     console.error("Error fetching country data:", error);
  //   }
  // };
  const fetchCountryData = async (id) => {
    try {
      const neighbourCountry = [];

      props?.particular_country_data[0]?.borders?.map((elem) => {
        let count_obj = props?.all_country_data?.filter(
          (item) => item?.cca3 === elem
        );

        if (count_obj?.length > 0) {
          neighbourCountry?.push(count_obj[0]);
        }
      });
      setNeighbourCountryData(neighbourCountry);

      // console.log(neighbourCountry, "neighbourCountry");

      // console.log(country, "id");
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };
  return (
    <div className="container-fluid">
      <div className="detail">
        <div className="row mx-0 my-0 px-0 py-0">
          <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 mx-0 my-0 px-0 py-0"></div>
          <div className="col-lg-10 col-md-10 col-sm-8 col-xs-10 mx-0 my-0 px-0 py-0">
            <div className="row my-1 mx-1 mt-2">
              <h3 className="mt-4">{countryData?.name?.common}</h3>
              <div className="showdiv">
                <div className="col-lg-8 col-md-10 my-3  country-img">
                  {countryData &&
                    countryData.flags &&
                    countryData.flags.png && (
                      <img
                        src={countryData.flags.png}
                        className="detail-img  "
                        alt=""
                      />
                    )}
                </div>
                <div className="col-11 mt-0 country-all">
                  {/* <p>Native Name: {countryData?.currencies
                      ? Object.values(countryData.currencies)[0].name
                      : "-"}</p> */}
                  <div className="details-about-country">
                    <p className="mt-3">Capital: {countryData?.capital}</p>

                    <p>Population: {countryData?.population}</p>

                    <p>Region: {countryData?.region}</p>

                    {console.log(countryData, "Country Data")}

                    <p>Subregion: {countryData?.subregion}</p>

                    <p>Area: {countryData?.area} km²</p>

                    <p>Country Code: {countryData?.cca2}</p>

                    <p>
                      Languages:{" "}
                      {countryData?.languages
                        ? Object.values(countryData.languages).join(", ")
                        : "-"}
                    </p>

                    <p>
                      Currencies:{" "}
                      {countryData?.currencies
                        ? Object.values(countryData.currencies)[0].name
                        : "-"}
                    </p>

                    <p>
                      Timezones:{" "}
                      {countryData?.timezones
                        ? countryData.timezones.join(", ")
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {neighbourCountryData?.length > 0 ? (
        <div className="row">
          <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>
          <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
            <div>
              <h4>Neighbour Countries</h4>

              <div className="row my-2 mx-2  border border-lightdark">
                <div className=" my-1 d-flex flex-wrap justify-content-between">
                  {neighbourCountryData?.map((elem) => {
                    return (
                      <img
                        src={elem?.flags?.png}
                        className="neighbour-country-img mt-2"
                        alt=""
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Details;
