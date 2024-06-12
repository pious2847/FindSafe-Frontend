function HomeBody() {
  return (
    <>
      <div className="flex flex-col gap-32 policiescard">
        <div className="container  flex gap-10  w-[95%] p-8 align-middle rounded-lg shadow-sm shadow-black  boldercontainer">
          <div className="flex flex-col gap-2 width_100 captioncontianer">
            <h2
              className="text-4xl flex-1 font-extrabold tracking-tight"
              style={{ textAlign: "left" }}
            >
              Live Tracking
            </h2>
            <p className="text-justify">
              FindSafe mobile app allows you to live track your mobile device
              connected to your user account. With the app’s real-time location
              tracking feature, you can monitor the whereabouts of your device
              at all times, ensuring its safety and security. Whether you’ve
              misplaced your phone or suspect it has been stolen, the live
              tracking functionality provides you with up-to-date location
              information, enabling you to take necessary actions promptly.
              Enjoy peace of mind knowing that you can always keep tabs on your
              valuable device with FindSafe’s mobile live tracking capabilities.
            </p>
          </div>
          <img
            src="livetracking.jpg"
            className="shadow-lg shadow-black cardimg  rounded-lg object-cover  h-[350px]"
          />
        </div>
        <div className="container  flex gap-10  w-[95%] p-8 align-middle rounded-lg shadow-sm shadow-black  boldercontainer">
        <img
            src="livetracking.jpg"
            className="shadow-lg shadow-black cardimg  rounded-lg object-cover  h-[350px]"
          />
          <div className="flex flex-col gap-2 width_100 captioncontianer">
            <h2
              className="text-4xl flex-1 font-extrabold tracking-tight"
              style={{ textAlign: "left" }}
            >
              Privacy & Security
            </h2>
            <p className="text-justify">
              FindSafe mobile app prioritizes your privacy and security when it
              comes to tracking your device. With our robust encryption and
              advanced security measures, you can rest assured that your
              device’s location data is kept confidential and protected from
              unauthorized access. The app’s real-time tracking feature allows
              you to monitor the whereabouts of your device discreetly, without
              compromising your privacy or revealing sensitive information.
              Whether you’re concerned about potential loss or theft, FindSafe’s
              secure tracking capabilities give you the peace of mind to take
              immediate action while safeguarding your personal data. Enjoy the
              convenience of location tracking with the utmost privacy and
              security.
            </p>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default HomeBody;
