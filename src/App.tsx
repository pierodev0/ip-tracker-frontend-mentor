import Summary from 'components/Summary';
import Container from 'components/ui/Container';
import IconArrow from 'components/ui/icons/IconArrow';
import { latLng, LatLng } from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { IpResponse, IpSchema } from 'schemas';

const getUrl = (ipAddress: string) =>
  `https://geo.ipify.org/api/v2/country,city?apiKey=at_beezXoUULqLtGSqjffTV0RG0zM3bC&ipAddress=${ipAddress}`;

function App() {
  const [queryIp, setQueryIp] = useState('');
  const [position, setPosition] = useState<LatLng>(new LatLng(51.505, -0.09));
  const [ipData, setIpData] = useState<IpResponse>({} as IpResponse);
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
    if (!queryIp) return;
    getPosition(queryIp);
  }

  return (
    <>
      <main className='flex h-screen flex-col bg-yellow-100'>
        <section className='relative bg-blue-200 py-12 pb-48 md:pb-24'>
          <Container className='space-y-4'>
            <h1 className='text-center text-4xl font-bold'> IP Address Tracker</h1>
            <form
              className='mx-auto flex w-3/4 overflow-hidden rounded-xl shadow-md lg:w-1/2'
              onSubmit={handleSubmit}
            >
              <input
                type='text'
                className='h-12 w-[100px] flex-1 px-6 focus:outline-none'
                placeholder='Search for any IP address or domain'
                value={queryIp}
                onChange={(e) => setQueryIp(e.target.value)}
              />
              <button
                type='submit'
                className='flex w-10 shrink-0 items-center justify-center bg-black'
              >
                <IconArrow />
              </button>
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
