import { useEffect, useState } from "react";
export async function getServerSideProps(context) {
  const id = context.query.id;

  return {
    props: {
      id: id || null,
    },
  };
}
const Details = (props) => {
  const [countryData, setCountryData] = useState({});

  const [neighbourCountryData, setNeighbourCountryData] = useState([]);

  useEffect(() => {
    fetchCountryData(props?.id);
  }, [props]);

  const fetchCountryData = async (id) => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");

      const data = await response.json();

      const country = data?.filter((elem) => elem?.name?.common === id);

      const neighbourCountry = [];

      data

        ?.filter((elem) => elem?.name?.common === id)[0]
        ?.borders?.map((elem) => {
          let obj = data?.filter((item) => item?.cca3 === elem);

          if (obj?.length > 0) {
            neighbourCountry?.push(obj[0]);
          }
        });

      setCountryData(country[0]);

      setNeighbourCountryData(neighbourCountry);

      console.log(neighbourCountry, "neighbourCountry");

      console.log(country, "id");
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
                <div className="col-lg-6 col-11 my-3  country-img">
                  {countryData &&
                    countryData.flags &&
                    countryData.flags.png && (
                      <img src={countryData.flags.png} className="detail-img  col-12 mx-0 px-0" alt="" />
                    )}
                </div>
                <div className="col-lg-5 col-11 mt-0 country-all">
                  {/* <p>Native Name: {countryData?.name?.native?.official}</p> */}

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
                      ? Object.values(countryData.currencies).join(", ")
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
            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 mx-0 my-0 px-0 py-0"></div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>
          <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
            <div>
              <h4>Neighbour Countries</h4>

              <div className="row my-2 mx-2  border border-dark">
                <div className=" my-2 d-flex flex-wrap justify-content-between">
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
      </div>
    
  );
};

export default Details;
