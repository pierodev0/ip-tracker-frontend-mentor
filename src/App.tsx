import Summary from 'components/Summary';
import Container from 'components/ui/Container';
import IconArrow from 'components/ui/icons/IconArrow';
import { LatLng } from 'leaflet';
import { cn } from 'lib/utils';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { IpResponse, IpSchema } from 'schemas';

const getUrl = (ipAddress: string) =>
  `https://geo.ipify.org/api/v2/country,city?apiKey=at_beezXoUULqLtGSqjffTV0RG0zM3bC&ipAddress=${ipAddress}`;

function App() {
  const [queryIp, setQueryIp] = useState('');
  const [position, setPosition] = useState<LatLng>(new LatLng(51.505, -0.09));
  const [error, setError] = useState(false);
  const [ipData, setIpData] = useState<IpResponse>({
    ip: '',
    location: {
      city: '',
      country: '',
      lat: 0,
      lng: 0,
      postalCode: '',
      region: '',
      timezone: '',
      geonameId: 0,
    },
    domains: [],
    as: {
      asn: 0,
      name: '',
      route: '',
      domain: '',
      type: '',
    },
    isp: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPosition('8.8.8.8');
  }, []);

  function getPosition(ipAddress: string) {
    setIsLoading(true);
    fetch(getUrl(ipAddress))
      .then((response) => response.json())
      .then((data) => IpSchema.parse(data))
      .then((result) => {
        if (result) {
          const {
            location: { lat, lng },
          } = result;
          setPosition(new LatLng(lat, lng));
          setIpData(result);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!queryIp || !/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(queryIp)) {
      setError(true);
      return;
    }
    getPosition(queryIp);
    setError(false);
    setQueryIp('');
  }

  return (
    <>
      <main className='flex h-screen flex-col bg-yellow-100'>
        <section className='relative bg-[url("/pattern-bg-desktop.png")] bg-cover bg-no-repeat py-12 pb-48 md:pb-24'>
          <Container className='space-y-4'>
            <h1 className='text-center text-4xl font-bold text-white'> IP Address Tracker</h1>
            <form
              className='relative mx-auto flex w-3/4 rounded-xl shadow-md lg:w-1/2'
              onSubmit={handleSubmit}
            >
              <input
                type='text'
                className={cn(
                  'h-12 w-[100px] flex-1 rounded-l-xl px-6 hover:cursor-pointer focus:outline-none',
                  error && 'text-red-400',
                )}
                // TODO: Add feature search by domains
                placeholder='Search for any IP address'
                value={queryIp}
                onChange={(e) => setQueryIp(e.target.value.trim())}
              />
              <button
                type='submit'
                className='flex w-12 shrink-0 items-center justify-center rounded-r-xl bg-black hover:bg-black/70'
              >
                <IconArrow />
              </button>

              {error && (
                <p className='absolute bottom-0 left-4 translate-y-full pt-2 italic text-red-400'>
                  Ip no valida
                </p>
              )}
            </form>
          </Container>
          <Summary
            isLoading={isLoading}
            ipData={ipData}
            className='absolute bottom-0 left-10 right-10 z-[9999] mx-auto translate-y-1/2'
          />
        </section>
        <div className='h-full bg-green-200'>
          <MapContainer
            center={position}
            zoom={6}
            scrollWheelZoom
            className='h-full'
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
            <CenterPosition position={position} />
          </MapContainer>
        </div>
      </main>
    </>
  );
}

function CenterPosition({ position }: { position: LatLng }) {
  const map = useMap();
  map.setView(position);

  return null;
}

export default App;
