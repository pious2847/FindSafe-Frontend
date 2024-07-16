
function HomeBody() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Live Tracking */}
        <div className="col-span-1 md:col-span-2  rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-900">
          <img src="https://picsum.photos/800/400?random=1" alt="Live Tracking" className="w-full h-48 object-cover" />
          <div className="p-6">
            <h2 className="text-3xl font-extrabold mb-4">Live Tracking</h2>
            <p className="text-sm">
              FindSafe mobile app allows you to live track your mobile device, ensuring its safety and security with real-time location tracking.
            </p>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="col-span-1 md:col-span-2  rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-900">
          <img src="https://picsum.photos/800/400?random=2" alt="Privacy & Security" className="w-full h-48 object-cover" />
          <div className="p-6">
            <h2 className="text-3xl font-extrabold mb-4">Privacy & Security</h2>
            <p className="text-sm">
              Your device&apos;s location data is kept confidential and protected from unauthorized access with our robust encryption and advanced security measures.
            </p>
          </div>
        </div>

        {/* Real-time Alerts */}
        <div className="col-span-1  rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-900">
          <img src="https://picsum.photos/400/300?random=3" alt="Real-time Alerts" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">Real-time Alerts</h3>
            <p className="text-sm">Receive instant notifications about your device&apos;s location changes.</p>
          </div>
        </div>

        {/* Multi-device Support */}
        <div className="col-span-1  rounded-lg shadow-md overflow-hidden  bg-white dark:bg-gray-900">
          <img src="https://picsum.photos/400/300?random=4" alt="Multi-device Support" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">Multi-device Support</h3>
            <p className="text-sm">Track multiple devices from a single account with ease.</p>
          </div>
        </div>

        {/* User-friendly Interface */}
        <div className="col-span-1 md:col-span-2  rounded-lg shadow-md overflow-hidden  bg-white dark:bg-gray-900">
          <img src="https://picsum.photos/800/400?random=5" alt="User-friendly Interface" className="w-full h-48 object-cover" />
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2">User-friendly Interface</h3>
            <p className="text-sm">Navigate through our intuitive app design for a seamless tracking experience.</p>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="col-span-1 md:col-span-3 lg:col-span-4 bg-blue-600 text-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Start Tracking Today</h2>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-blue-100 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeBody;