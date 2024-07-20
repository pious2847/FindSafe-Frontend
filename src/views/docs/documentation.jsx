import AppBar from "@/components/Navigations/AppBar";
import Footer from "@/components/footer/footer";

const DocumentationPage = () => {
  return (
    <>
      <AppBar />
      <br />
      <div className="pricingtag relative top-20 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8" id="installation">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight  sm:text-4xl">
              FindSafe Documentation
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Discover the powerful features of the FindSafe app and learn how
              to leverage them for enhanced security and peace of mind.
            </p>

            <div className="mt-12">
              <h3 className="text-2xl font-bold  mb-4">
                Getting Started
              </h3>

              <div className=" rounded-lg shadow-md p-6 mb-8">
                <h4 className="text-xl font-bold  mb-4">
                  1. Download
                </h4>
                <p className="text-gray-600 mb-4">
                  Download the FindSafe app from the App Store (for iOS devices)
                  or Google Play Store (for Android devices).
                </p>

                <h4 className="text-xl font-bold  mb-4">
                  2. Install
                </h4>
                <p className="text-gray-600 mb-4">
                  Once downloaded, follow the on-screen instructions to install
                  the app on your device.
                </p>

                <h4 className="text-xl font-bold  mb-4">
                  3. Set Up
                </h4>
                <p className="text-gray-600">
                  After installation, open the app and follow the setup wizard
                  to create your account and customize your preferences. You can
                  also invite family members or friends to join your FindSafe
                  network for enhanced security and coordination.
                </p>
              </div>

                <br />
              <div className=" rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold  mb-4">
                  Features
                </h3>

                <div className="rounded-lg p-6">
                  <div className="mb-8">
                    <h4 className="text-xl font-bold  mb-2">
                      1. Real-time Tracking
                    </h4>
                    <p className="text-gray-600">
                      Stay connected with your loved ones through real-time
                      location tracking, providing you with peace of mind and
                      enhanced security. Monitor their whereabouts and receive
                      timely updates on their movements.
                    </p>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xl font-bold  mb-2">
                      2. Real-time Device Disable
                    </h4>
                    <p className="text-gray-600">
                      Protect your device and data from unauthorized access by
                      remotely disabling the device in case of loss or theft.
                      This feature ensures that your sensitive information
                      remains secure and inaccessible to others.
                    </p>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xl font-bold  mb-2">
                      3. Remote Wipe of Data
                    </h4>
                    <p className="text-gray-600">
                      In the event of device theft or loss, you can remotely
                      wipe all data from the device, preventing sensitive
                      information from falling into the wrong hands. This
                      feature provides an additional layer of security and
                      privacy protection.
                    </p>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xl font-bold  mb-2">
                      4. Remote Alarm Playing
                    </h4>
                    <p className="text-gray-600">
                      If you misplace your device, you can trigger a loud alarm
                      remotely to help locate it. This feature can be
                      particularly useful in crowded or noisy environments,
                      making it easier to find your device quickly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <Footer/>
    </>
  );
};

export default DocumentationPage;
