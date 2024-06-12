
function HomeBody() {
  return (
    <>
      <div className="container  flex gap-10  w-[95%] p-8 align-middle rounded-lg shadow-lg shadow-black relative boldercontainer">
        <div className="flex flex-col gap-3   width_100 captioncontianer">
          <h2
            className="text-4xl flex-1 font-extrabold tracking-tight"
            style={{ textAlign: "left" }}
          >
            Live Tracking
          </h2>
          <p className="text-justify gap-2">
            FindSafe mobile app allows you to live track your mobile device
            connected to your user account. With the app’s real-time location
            tracking feature, you can monitor the whereabouts of your device at
            all times, ensuring its safety and security. Whether you’ve
            misplaced your phone or suspect it has been stolen, the live
            tracking functionality provides you with up-to-date location
            information, enabling you to take necessary actions promptly. Enjoy
            peace of mind knowing that you can always keep tabs on your valuable
            device with FindSafe’s mobile live tracking capabilities.
          </p>
        </div>
          <img src="livetracking.jpg"  className="shadow-lg shadow-black  rounded-lg object-cover w-[70%] h-[350px]" />
      
      </div>
    </>
  );
}

export default HomeBody;
