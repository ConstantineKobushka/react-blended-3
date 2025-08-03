import { useEffect, useState } from 'react';

import { Container, CountryList, Heading, Loader, Section } from 'components';

import { getCountries } from 'service/countryApi';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setError('');
        setLoader(true);
        const result = await getCountries();
        setCountries(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <Section>
      <Container>
        {error && <Heading title={error} bottom />}
        {loader && <Loader />}
        <CountryList countries={countries} />
      </Container>
    </Section>
  );
};

export default Home;
