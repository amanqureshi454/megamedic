// "use client";
// import { useRef, useState, useEffect } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// gsap.registerPlugin(ScrollTrigger, useGSAP, ScrollToPlugin);

// const VideoScrub = () => {
//   const videoScrubRef = useRef(null);
//   const videoContainerRef = useRef(null);

//   const mainVideoRef = useRef(null);
//   const reverseVideoRef = useRef(null);
//   const { contextSafe } = useGSAP();
//   const [activeVideo, setActiveVideo] = useState("main"); // "main" or "reverse"

//   const intentObserver = useRef(null);

//   // Use refs instead of state to avoid closure issues
//   const mainVideoDuration = useRef(0);
//   const reverseVideoDuration = useRef(0);

//   const handleVideoSwitch = (direction) => {
//     if (direction === 1 && mainVideoRef.current.currentTime === 0) {
//       reverseVideoRef.current.pause();
//       mainVideoRef.current.play();
//       console.log(true);
//     } else if (direction === -1) {
//       mainVideoRef.current.pause();
//       reverseVideoRef.current.play();
//     }
//   };

//   // Function to calculate corresponding time between videos
//   const getCorrespondingTime = (currentTime, fromVideo) => {
//     if (fromVideo === "main" && reverseVideoDuration.current > 0) {
//       const progress = currentTime / mainVideoDuration.current;
//       return reverseVideoDuration.current * (1 - progress);
//     } else if (fromVideo === "reverse" && mainVideoDuration.current > 0) {
//       const progress = currentTime / reverseVideoDuration.current;
//       return mainVideoDuration.current * (1 - progress);
//     }
//     return 0;
//   };

//   // Load video durations
//   useEffect(() => {
//     const mainVideo = mainVideoRef.current;
//     const reverseVideo = reverseVideoRef.current;

//     if (!mainVideo || !reverseVideo) return;

//     const handleLoadedMetadata = () => {
//       if (mainVideo.duration && reverseVideo.duration) {
//         mainVideoDuration.current = mainVideo.duration;
//         reverseVideoDuration.current = reverseVideo.duration;
//       }
//     };

//     // Set durations if already loaded
//     if (mainVideo.readyState >= 1 && reverseVideo.readyState >= 1) {
//       handleLoadedMetadata();
//     }

//     // Listen for metadata load
//     mainVideo.addEventListener("loadedmetadata", handleLoadedMetadata);
//     reverseVideo.addEventListener("loadedmetadata", handleLoadedMetadata);

//     return () => {
//       mainVideo.removeEventListener("loadedmetadata", handleLoadedMetadata);
//       reverseVideo.removeEventListener("loadedmetadata", handleLoadedMetadata);
//     };
//   }, []);

//   // Monitor active video and log corresponding times
//   useEffect(() => {
//     const mainVideo = mainVideoRef.current;
//     const reverseVideo = reverseVideoRef.current;

//     if (!mainVideo || !reverseVideo) return;

//     const handleTimeUpdate = () => {
//       if (activeVideo === "main" && mainVideoDuration.current > 0) {
//         const currentTime = mainVideo.currentTime;
//         const correspondingTime = getCorrespondingTime(currentTime, "main");
//       } else if (
//         activeVideo === "reverse" &&
//         reverseVideoDuration.current > 0
//       ) {
//         const currentTime = reverseVideo.currentTime;
//         const correspondingTime = getCorrespondingTime(currentTime, "reverse");
//       }
//     };

//     const handleVideoEnded = () => {
//       console.log(
//         `🏁 ${activeVideo === "main" ? "Main" : "Reverse"} video ended!`,
//       );
//       intentObserver.current.disable();
//       gsap.to(window, {
//         scrollTo: {
//           y: videoScrubRef.current,
//           autoKill: true,
//           offsetY: activeVideo === "main" ? -200 : 50,
//         },
//       });
//     };

//     // Add event listeners
//     mainVideo.addEventListener("timeupdate", handleTimeUpdate);
//     reverseVideo.addEventListener("timeupdate", handleTimeUpdate);
//     mainVideo.addEventListener("ended", handleVideoEnded);
//     reverseVideo.addEventListener("ended", handleVideoEnded);

//     return () => {
//       mainVideo.removeEventListener("timeupdate", handleTimeUpdate);
//       reverseVideo.removeEventListener("timeupdate", handleTimeUpdate);
//       mainVideo.removeEventListener("ended", handleVideoEnded);
//       reverseVideo.removeEventListener("ended", handleVideoEnded);
//     };
//   }, [activeVideo]);

//   useGSAP(() => {
//     const mainVideo = mainVideoRef.current;
//     const reverseVideo = reverseVideoRef.current;
//     let direction = 1;

//     intentObserver.current = ScrollTrigger.observe({
//       type: "wheel,touch",
//       onUp: () => {
//         if (direction === 1) {
//           setActiveVideo("reverse");
//           reverseVideo.currentTime = getCorrespondingTime(
//             mainVideo.currentTime,
//             "reverse",
//           );
//           reverseVideo.play();
//           mainVideo.pause();
//           direction = -1;
//         }
//       },
//       onDown: () => {
//         if (direction === -1) {
//           setActiveVideo("main");
//           mainVideo.currentTime = getCorrespondingTime(
//             reverseVideo.currentTime,
//             "main",
//           );
//           mainVideo.play();
//           reverseVideo.pause();
//           direction = 1;
//         }
//       },
//       tolerance: 10,

//       preventDefault: true,
//       onEnable(self) {
//         let savedScroll = self.scrollY();
//         self._restoreScroll = () => self.scrollY(savedScroll);
//         document.addEventListener("scroll", self._restoreScroll, {
//           passive: false,
//         });
//       },
//       onDisable: (self) => {
//         document.removeEventListener("scroll", self._restoreScroll);

//         // Pause videos when observer is disabled
//         const mainVideo = mainVideoRef.current;
//         const reverseVideo = reverseVideoRef.current;

//         if (mainVideo) mainVideo.pause();
//         if (reverseVideo) reverseVideo.pause();
//       },
//     });
//     intentObserver.current.disable();
//   });

//   useGSAP(() => {
//     ScrollTrigger.create({
//       trigger: videoScrubRef.current,
//       pin: true,
//       start: "top top",
//       end: "+=200",
//       onEnter: (self) => {
//         if (intentObserver.current.isEnabled) {
//           return;
//         }
//         self.scroll(self.start + 1);
//         intentObserver.current.enable();
//         handleVideoSwitch(1);

//         // gsap.to(videoContainerRef.current, {
//         //   height: "100vh",
//         //   width: "100%",
//         //   borderRadius: 0,
//         //   duration: 1,
//         //   ease: "power2.inOut",
//         //   overwrite: true,
//         //   onStart: () => {
//         //     handleVideoSwitch(1);
//         //   },
//         // });
//       },
//       onEnterBack: (self) => {
//         if (intentObserver.current.isEnabled) {
//           return;
//         }
//         reverseVideoRef.current.play();
//         mainVideoRef.current.pause();

//         self.scroll(self.end - 1);
//         intentObserver.current.enable();
//       },
//     });
//   }, {});

//   return (
//     <div ref={videoScrubRef} className="relative w-full">
//       <div
//         id="videoWrapper"
//         className="relative flex h-screen w-full items-center justify-center overflow-hidden"
//       >
//         <div
//           ref={videoContainerRef}
//           className="relative aspect-video w-full overflow-hidden rounded-3xl md:max-w-8/12"
//         >
//           <video
//             ref={mainVideoRef}
//             src="/main.mp4"
//             muted
//             className={`absolute top-0 left-0 size-full object-cover transition-opacity duration-100 ${
//               activeVideo === "main" ? "z-1 opacity-100" : "z-0 opacity-0"
//             }`}
//           />
//           <video
//             ref={reverseVideoRef}
//             src="/reverse.mp4"
//             muted
//             className={`absolute top-0 left-0 size-full object-cover transition-opacity duration-100 ${
//               activeVideo === "reverse" ? "z-1 opacity-100" : "z-0 opacity-0"
//             }`}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoScrub;
