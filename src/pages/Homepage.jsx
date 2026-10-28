import { useNavigate } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="p-2 bg-black min-h-screen">
        {/* Header Section */}
        <div className="flex justify-between px-2 py-4">
          <div>
            <h1 className="text-2xl text-white font-bold">Hello Conrad, </h1>
            <h2 className="text-white">where do you want to go?</h2>
          </div>

          {/* User Profile Container (Replaced bg-[url('user-96.png')]) */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-500 shrink-0">
            <img 
              src="user-96.png" 
              alt="User" 
              className="w-full h-full object-cover object-center" 
            />
          </div>
        </div>

        <div className="w-screen p-5">
          {/* Map Preview Container (Replaced bg-[url('map-icon.jpg')]) */}
          <div 
            onClick={() => navigate('/map')} 
            className="relative w-full h-[18vh] rounded-2xl bg-gray-200 overflow-hidden cursor-pointer"
          >
            <img 
              src="map-icon.jpg" 
              alt="Map" 
              className="w-full h-full object-cover object-center" 
            />
          </div>

          {/* Location & Courier Row */}
          <div className="flex w-full">
            <div 
              onClick={() => navigate('/map')} 
              className="w-1/3 h-[12vh] rounded-2xl bg-yellow-200 m-2 flex items-center justify-center cursor-pointer"
            >
              <img src="location-96.png" alt="Location Icon" className="w-8 h-8 object-cover" />
            </div>

            {/* Courier Card (Replaced bg-[url('courier.png')]) */}
            <div className="relative w-2/3 h-[12vh] rounded-2xl bg-indigo-300 m-2 overflow-hidden p-3">
              <h2 className="relative z-10 font-bold text-slate-900">Courier</h2>
              <img 
                src="courier.png" 
                alt="Courier" 
                className="absolute inset-0 w-full h-full object-contain object-center pointer-events-none" 
              />
            </div>
          </div>

          {/* Truck & Briefcase Row */}
          <div className="flex w-full">
            <div className="w-2/3 h-[12vh] rounded-2xl bg-sky-300 m-2">
              <img src="truck-96.png" alt="truck" className="w-full h-full object-contain object-left" />
            </div>
            <div className="w-1/3 h-[12vh] rounded-2xl bg-emerald-300 m-2">
              <img src="briefcase-48.png" alt="briefcase" className="w-full h-full object-contain object-center" />
            </div>
          </div>

          <div className="flex justify-between my-2 text-white">
            <h1>On Board</h1>
            <h3>View History</h3>
          </div>

          {/* Economy Card */}
          <div className="relative w-full h-[18vh] rounded-2xl bg-slate-800/80 border border-slate-700/60 p-4 my-3 flex justify-between items-center overflow-hidden shadow-lg hover:border-cyan-500/50 transition-all duration-300 group">
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-300" />
            
            <div className="z-10 flex flex-col justify-between h-full">
              <div>
                <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Affordable</span>
                <h2 className="text-xl font-bold text-white mt-0.5">Economy</h2>
              </div>
              <div>
                <p className="text-xs text-slate-400">4 seats • 3 min away</p>
                <p className="text-lg font-extrabold text-white mt-1">K50</p>
              </div>
            </div>

            <div className="relative z-10 h-full flex items-center">
              <img 
                src="silver-car.png" 
                alt="Economy Car" 
                className="h-full max-h-[14vh] object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] transform group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
          </div>

          {/* Standard Card */}
          <div className="relative w-full h-[18vh] rounded-2xl bg-slate-800/80 border border-slate-700/60 p-4 my-3 flex justify-between items-center overflow-hidden shadow-lg hover:border-amber-500/50 transition-all duration-300 group">
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-300" />

            <div className="z-10 flex flex-col justify-between h-full">
              <div>
                <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">Popular</span>
                <h2 className="text-xl font-bold text-white mt-0.5">Standard</h2>
              </div>
              <div>
                <p className="text-xs text-slate-400">4 seats • 2 min away</p>
                <p className="text-lg font-extrabold text-white mt-1">K30</p>
              </div>
            </div>

            <div className="relative z-10 h-full flex items-center">
              <img 
                src="yellow-car.png" 
                alt="Standard Car" 
                className="h-full max-h-[14vh] object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] transform group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Homepage;