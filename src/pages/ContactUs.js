import React, { useState } from 'react';
import Lottie from 'lottie-react';
import Globe from '../animations/Globe.json';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import RoundedButton from '../Components/common/RoundedButton/RoundedButton';
import { ArrowRight } from 'lucide-react';
import style from './ContactStyle/style.module.css'
import { toast } from 'sonner';
function Contact() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const controls = useAnimation();

  const handleAnimationComplete = () => {
    setAnimationCompleted(true);
    controls.start(i => ({
      opacity: 1,
      transition: { delay: i * 0.1 }
    }));
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    if (name === 'userName') setUserName(value);
    if (name === 'userEmail') setUserEmail(value);
    if (name === 'userMessage') setUserMessage(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Validate email using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      console.log('Invalid email');
      toast.error("Please enter a valid email")
      return;
    }

    // Log form values
    console.log('Name:', userName);
    console.log('Email:', userEmail);
    console.log('Department:', selectedDepartment);
    console.log('Message:', userMessage);

    // You can perform further actions here, like sending the form data to a server
  };
  return (
    <div className=' w-full absolute '>
    
      {!animationCompleted && (
        <Lottie
          animationData={Globe}
          loop={false} // Set loop to false
          width={20}
          height={20}
          style={{ height: '500px', width: 'auto', overflow: 'auto' }}
          onComplete={handleAnimationComplete}
        />
      )}
      {animationCompleted && 
      <motion.div
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 30 }
      }}
      initial="hidden"
      animate="visible"
      transition={{
        type: 'spring',
        damping: 10,
        stiffness: 100
      }}
      className='flex items-center justify-center absolute left-0 right-0'
    >

<div className='flex flex-col items-center'>
        <div className='flex flex-col items-center mb-20 p-4 '>
          <h1 className='text-[12vw] md:text-[8vw] mb-20'>Contact <span className='text-[#3A92DE]'>us</span> here</h1>
 
    <span className='text-sm md:text-lg text-gray-700' key="phrase2">
      Send en email here. Choose a subject if you wanna reach the different departments
    </span>

          <div className='Contact-Form mt-10  flex flex-col md:flex-row gap-20 xl:gap-52 mb-10 md:p-8 justify-between '  >

          <form
  className={`flex items-center w-full h-full m-auto ${style.Form}`}
  autoComplete='off'
  onSubmit={handleSubmit}
>
  <div className='w-full lg:w-[60vh]'>
    <div className='flex flex-col gap-5 justify-center '>
      <div className='flex items-baseline gap-2 border-b border-t flex-col'>
        <select
          className='p-2 border-none rounded'
          onChange={e => setSelectedDepartment(e.target.value)}
          value={selectedDepartment}
        >
          <option>Choose department</option>
          <option>Customer Service</option>
          <option>Warrenty</option>
          <option>Want to work with us?</option>
        </select>
        <label htmlFor="Name" className='text-sm md:text-lg mt-3'><span className='text-gray-400'>01</span>. What&apos;s your name?</label>
        <input
          type="text"
          name='userName'
          placeholder='John Doe'
          autoComplete='off'
          className='p-5 bg-transparent border-transparent outline-none focus:border-transparent focus:ring-0 active:bg-'
          onChange={handleInputChange}
          value={userName}
          required
        />
      </div>

      <div className='flex items-baseline gap-2 border-b flex-col'>
        <label htmlFor="Email" className='text-sm md:text-lg'><span className='text-gray-400'>02</span>. Enter your Email</label>
        <input
          type='email'
          name='userEmail'
          placeholder='Email@example.com'
          autoComplete='off'
          className='p-5 bg-transparent outline-none focus:ring-0 active:bg-transparent'
          onChange={handleInputChange}
          value={userEmail}
          required
        />
      </div>

      <div className='flex items-baseline gap-2 border-b flex-col'>
        <label htmlFor="FileUpload" className='text-sm md:text-lg'><span className='text-gray-400'>03</span> . Want to upload some files?</label>
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 lg:h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#3A92DE] dark:hover:bg-bray-800 dark:border-gray-300 dark:hover:bg-[#816b7f]">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>

              </svg>
              <p className="mb-2 text-sm text-gray-200 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-200 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
      </div>

      <div className='flex flex-col gap-2 border-b border-t w-full'>
        <label id='Message' htmlFor="Message" className='text-sm md:text-lg Message mt-3 '><span className='text-gray-400'>04</span> . Your message:</label>
        <textarea
          className='resize-none bg-transparent border-none rounded-lg outline-none h-32'
          placeholder='Type here...'
          name='userMessage'
          onChange={handleInputChange}
          value={userMessage}
          required
        ></textarea>
      </div>
      <div className="lg:w-3/6">
        <button type='submit'>
          <RoundedButton backgroundColor={"#FFF"}>
            <p type="submit" className='font-bold text-white px-2 py-4' id='Send'>Send it</p>
          </RoundedButton>
        </button>
      </div>
    </div>
  </div>
</form>



<div className="Social flex flex-col gap-2 mr-20">
 
  <span className='text-gray-800 text-xs w-3/5'>We strive to make a difference. Here at Ecommerce we care about our customers. Your satisfaction is what we aim to please.</span>

  <ul>
 

    <span className='text-gray-800 text-xs'>Socials</span>

    <li className=''>
      <Link href={"https://www.instagram.com/jorgenoino/"} target="_blank" className='text-lg mt-5 flex items-center gap-2 hover:scale-105 transition-all'>Instagram  </Link>
    </li>
    <li className=''>
      <Link href={"https://www.instagram.com/jorgenoino/"} target="_blank" className='text-lg mt-5 flex items-center gap-2 hover:scale-105 transition-all'>LinkedIn  </Link>
    </li>

  </ul>
</div>

</div>
    </div>
    
      </div>
        </motion.div>
      
      }
    </div>
  );
}

export default Contact;
