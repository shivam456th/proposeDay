import React, { useEffect, useRef, useState } from 'react';
import { Heart, Stars, XCircle } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import gsap from 'gsap';

function App() {
  const heartRef = useRef(null);
  const textRef = useRef(null);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showMessage, setShowMessage] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isProposed, setIsProposed] = useState(false);

  const messages = [
    "Are you sure? 🥺",
    "Really think about it! 💭",
    "You're breaking my heart! 💔",
    "Give it another thought! 🤔",
    "Don't be like that! 🥹",
    "Please reconsider! 🙏",
    "You know you want to say yes! 😊"
  ];

  useEffect(() => {
    const timeline = gsap.timeline({ repeat: -1 });
    
    timeline.to(heartRef.current, {
      scale: 1.1,
      duration: 0.5,
      ease: "power1.inOut"
    }).to(heartRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power1.inOut"
    });

    gsap.from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out"
    });
  }, []);

  const handleNoButtonHover = () => {
    const newX = Math.random() * (window.innerWidth - 200);
    const newY = Math.random() * (window.innerHeight - 200);
    setNoButtonPosition({ x: newX, y: newY });
    
    if (!showMessage) {
      setShowMessage(true);
    } else {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }
  };

  const handleYesClick = () => {
    setIsProposed(true);
    setShowMessage(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-love-100 to-love-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating hearts background */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-love-300 opacity-20"
          animate={{
            y: [-20, 20],
            x: [-10, 10],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          <Heart size={24} />
        </motion.div>
      ))}

      {/* Main content */}
      <div className="text-center z-10">
        <motion.div
          ref={heartRef}
          className="text-love-500 mb-8 inline-block"
          whileHover={{ scale: 1.2, rotate: 10 }}
        >
          <Heart size={120} fill="currentColor" />
        </motion.div>

        {/* <div ref={textRef}> */}
          <h1 className="dancing-script text-6xl md:text-7xl text-red-900 mb-6">
            Will You Be Mine Forever?
          </h1>
          
          {!isProposed ? (
            <>
              <p className="text-xl md:text-2xl text-gray-800 max-w-2xl mx-auto leading-relaxed mb-8">
                Every moment with you is a gift, and I want to cherish them all. Will you make me the happiest person alive?
              </p>

              {/* Message that appears when trying to click No */}
              {showMessage && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl text-gray-900 font-semibold mb-8"
                >
                  {messages[messageIndex]}
                </motion.p>
              )}

              <div className="flex items-center justify-center space-x-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYesClick}
                  className="bg-love-500 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-lg hover:bg-love-600 transition-colors duration-300"
                >
                  Yes, I Will! 💝
                </motion.button>

                <motion.button
                  className="bg-gray-200 text-gray-900 px-12 py-4 rounded-full text-xl font-semibold shadow-lg hover:bg-gray-300 transition-colors duration-300"
                  style={{
                    position: 'absolute',
                    left: noButtonPosition.x,
                    top: noButtonPosition.y,
                  }}
                  onMouseEnter={handleNoButtonHover}
                  onClick={handleNoButtonHover}
                >
                  No <XCircle className="inline ml-2" />
                </motion.button>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-2xl md:text-3xl text-gray-900 max-w-2xl mx-auto leading-relaxed mb-8 dancing-script">
                You've made me the happiest person alive! 💖
              </p>
              <div className="flex items-center justify-center space-x-2 text-gray-800">
                <Stars className="animate-float" />
                <span className="dancing-script text-2xl">Forever Together</span>
                <Stars className="animate-float" style={{ animationDelay: '0.5s' }} />
              </div>
            </motion.div>
          )}
        {/* </div> */}
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
    </div>
  );
}

export default App;