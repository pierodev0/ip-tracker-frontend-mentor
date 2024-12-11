import { cn } from 'lib/utils';
import { IpResponse } from 'schemas';
interface SummaryProps extends React.HTMLAttributes<HTMLElement> {
  ipData: IpResponse;
  isLoading: boolean;
}

function Summary({ ipData, className, isLoading }: SummaryProps) {
  return (
    <article
      className={cn(
        'mx-auto flex flex-col divide-x-2 rounded-xl bg-white py-6 shadow-[2px_30px_36px_-3px_rgba(0,_0,_0,_0.1)] md:flex-row lg:w-3/4',
        className,
      )}
    >
      {isLoading ? (
        <p className='text-center text-2xl text-blue-400'>Loading</p>
      ) : (
        <>
          <div className='flex-1 p-2 text-center sm:p-0'>
            <h2 className='text-gray-400'>IP Address</h2>
            <p className='text-lg font-bold'>{ipData.ip}</p>
          </div>
          {/* <div className='flex-1 p-2 text-center sm:p-0'>
            <h2 className='text-gray-400'>Location</h2>
            <p className='text-lg font-bold'>{ipData.location.city}</p>
          </div>
          <div className='flex-1 p-2 text-center sm:p-0'>
            <h2 className='text-gray-400'>Timezone</h2>
            <p className='text-lg font-bold'>UTC {ipData.location.timezone}</p>
          </div>
          <div className='flex-1 p-2 text-center sm:p-0'>
            <h2 className='text-gray-400'>ISP</h2>
            <p className='text-lg font-bold'>{ipData.isp}</p>
          </div> */}
        </>
      )}
    </article>
  );
}

export default Summary;
