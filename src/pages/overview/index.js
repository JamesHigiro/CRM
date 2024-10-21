"use client";
import useSWR from 'swr';
import { overviewService } from "@/utils/overviewService";
import SideBar from "@/components/nav";
import LoadingOrError from '@/components/cacheState';

// Fetcher function for SWR
const fetcher = async () => {
  const data = await overviewService();
  return data;
};

function Overview() {
  // Use SWR to fetch and cache data
    // here i meant it will fetch new datas after 10000000 milliseconds which is about 2hr and sth
  const { data, error } = useSWR('/api/overview', fetcher, { refreshInterval: 10000000 });

  return (
    <LoadingOrError {...{data, error}}>
    <div className="flex h-screen flex-col md:flex-row">
      <SideBar />
      <div className="flex-1 flex flex-col p-8 overflow-x-auto">
        <h2 className="text-center text-2xl font-bold mb-8 uppercase">Overview</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left border-b">Visitor ID</th>
              <th className="p-3 text-left border-b">Page Views</th>
              <th className="p-3 text-left border-b">Bounce Rate (%)</th>
              <th className="p-3 text-left border-b">Session Duration (s)</th>
              <th className="p-3 text-left border-b">Visit Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((data) => (
                <tr key={data.visitor_id} className="hover:bg-gray-100">
                  <td className="p-3 border-b">{data.visitor_id}</td>
                  <td className="p-3 border-b">{data.page_views}</td>
                  <td className="p-3 border-b">{data.bounce_rate}</td>
                  <td className="p-3 border-b">{data.session_duration}</td>
                  <td className="p-3 border-b">{data.visit_date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center border-b">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </LoadingOrError>
  );
}

export default Overview;
